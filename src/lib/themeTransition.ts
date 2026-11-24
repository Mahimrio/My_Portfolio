import { flushSync } from 'react-dom';
import { setAppFrozen } from './appFreeze';

export type ThemeName = 'dark' | 'light';

interface ThemeTransitionOptions {
  nextTheme: ThemeName;
  originElement: HTMLElement | null;
  applyTheme: () => void;
}

interface ViewTransitionLike {
  ready: Promise<void>;
  finished: Promise<void>;
}

type DocumentWithViewTransition = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => ViewTransitionLike;
};

const POINT_COUNT = 220;
const EXPAND_DURATION = 1.3;
const RETRACT_DURATION = 1;
const HOLD_BUFFER = 0.08;
const TAU = Math.PI * 2;
const FROZEN_CLASS = 'theme-venom-frozen';

// Tendrils radiate towards the middle of the page so the ink reaches into
// the content instead of only spreading along the edge of the viewport.
// Each one pairs a soft lobe with a narrow leading tip for an inky finger.
const TENDRILLS = [
  { offset: -0.78, width: 0.09, strength: 0.32, drift: 0.24, speed: 1.05 },
  { offset: -0.14, width: 0.06, strength: 0.26, drift: -0.18, speed: 0.85 },
  { offset: 0.46, width: 0.11, strength: 0.36, drift: 0.28, speed: 0.95 },
  { offset: 0.95, width: 0.052, strength: 0.22, drift: -0.22, speed: 1.3 },
  { offset: 1.38, width: 0.075, strength: 0.28, drift: 0.3, speed: 1.45 },
];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const buildVenomClip = (
  originX: number,
  originY: number,
  progress: number,
  maxRadius: number,
  startRadius: number,
  expanding: boolean
): string => {
  const p = clamp01(progress);
  const phase = p * 6.2;
  const baseRadius = expanding
    ? startRadius + (maxRadius - startRadius) * p
    : maxRadius * p;
  const tendrilPower = Math.pow(p, 0.65);
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const towardCenter = Math.atan2(
    viewportHeight / 2 - originY,
    viewportWidth / 2 - originX
  );

  // The last part of the reveal is the corner furthest from the toggle.
  // A dedicated finger there makes the ink lead the spread instead of
  // arriving as one smooth circle.
  const corners = [
    { x: 0, y: 0 },
    { x: viewportWidth, y: 0 },
    { x: 0, y: viewportHeight },
    { x: viewportWidth, y: viewportHeight },
  ];
  let farthestCorner = corners[0];
  let farthestDistance = -1;
  for (const corner of corners) {
    const distance = Math.hypot(corner.x - originX, corner.y - originY);
    if (distance > farthestDistance) {
      farthestDistance = distance;
      farthestCorner = corner;
    }
  }
  const towardFarthestCorner = Math.atan2(
    farthestCorner.y - originY,
    farthestCorner.x - originX
  );

  const points: string[] = [];

  for (let i = 0; i < POINT_COUNT; i++) {
    const theta = (i / POINT_COUNT) * TAU;

    // Layered waves give the edge a liquid, never-repeating wobble.
    const wobble =
      0.06 * Math.sin(3 * theta + phase * 1.15 + 0.6) +
      0.038 * Math.sin(6 * theta - phase * 1.4 + 2.4) +
      0.02 * Math.sin(11 * theta + phase * 1.9 + 4.1) +
      0.012 * Math.sin(19 * theta - phase * 2.6);

    // Narrow bells become the symbiote-like tendrils reaching ahead.
    let tendrils = 0;
    for (const tendril of TENDRILLS) {
      const drift =
        Math.sin(phase * tendril.speed + tendril.offset * 5) * tendril.drift;
      const angle = towardCenter + tendril.offset + drift;
      let delta = theta - angle;
      delta = Math.atan2(Math.sin(delta), Math.cos(delta));
      const softWidth = tendril.width;
      const tipWidth = tendril.width * 0.3;
      const bell = Math.exp(
        -(delta * delta) / (2 * softWidth * softWidth)
      );
      const tip = Math.exp(-(delta * delta) / (2 * tipWidth * tipWidth));
      tendrils += tendril.strength * (bell + tip * 0.6);
    }

    const cornerWidth = 0.075;
    const cornerDrift = Math.sin(phase * 1.15 + 2.2) * 0.06;
    let cornerDelta = theta - (towardFarthestCorner + cornerDrift);
    cornerDelta = Math.atan2(Math.sin(cornerDelta), Math.cos(cornerDelta));
    const cornerBell = Math.exp(
      -(cornerDelta * cornerDelta) / (2 * cornerWidth * cornerWidth)
    );
    const cornerTipWidth = cornerWidth * 0.3;
    const cornerTip = Math.exp(
      -(cornerDelta * cornerDelta) / (2 * cornerTipWidth * cornerTipWidth)
    );
    tendrils += 0.32 * (cornerBell + cornerTip * 0.95);

    const radius = Math.max(
      0,
      baseRadius * (1 + wobble + tendrils * tendrilPower)
    );
    const x = originX + Math.cos(theta) * radius;
    const y = originY + Math.sin(theta) * radius;
    points.push(`${x.toFixed(1)}px ${y.toFixed(1)}px`);
  }

  return `polygon(${points.join(', ')})`;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Same curves as GSAP's power3.in / power3.inOut, but driven by rAF so the
// blob keeps animating while the rest of the page is frozen.
const power3In = (t: number) => t * t * t;
const power3InOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const runThemeTransition = ({
  nextTheme,
  originElement,
  applyTheme,
}: ThemeTransitionOptions): Promise<void> => {
  const doc = document as DocumentWithViewTransition;

  if (
    !originElement ||
    typeof doc.startViewTransition !== 'function' ||
    prefersReducedMotion()
  ) {
    applyTheme();
    return Promise.resolve();
  }

  const root = document.documentElement;
  const rect = originElement.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const farthestCorner = Math.hypot(
    Math.max(originX, viewportWidth - originX),
    Math.max(originY, viewportHeight - originY)
  );
  const maxRadius = farthestCorner * 1.16 + 60;
  const startRadius = Math.hypot(rect.width, rect.height) / 2 + 12;
  const expanding = nextTheme === 'dark';
  const duration = expanding ? EXPAND_DURATION : RETRACT_DURATION;

  let animationFrame = 0;
  let isFrozen = false;

  const cleanup = () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    root.classList.remove(
      'theme-venom-active',
      'theme-venom-expand',
      'theme-venom-retract',
      FROZEN_CLASS
    );
    root.style.removeProperty('--venom-clip');
    root.style.removeProperty('--venom-duration');
    if (isFrozen) {
      setAppFrozen(false);
      isFrozen = false;
    }
  };

  // Freeze first so both snapshots capture the same, paused page state.
  root.classList.add(
    'theme-venom-active',
    expanding ? 'theme-venom-expand' : 'theme-venom-retract',
    FROZEN_CLASS
  );
  setAppFrozen(true);
  isFrozen = true;

  root.style.setProperty('--venom-duration', `${duration + HOLD_BUFFER}s`);
  root.style.setProperty(
    '--venom-clip',
    buildVenomClip(
      originX,
      originY,
      expanding ? 0 : 1,
      maxRadius,
      startRadius,
      expanding
    )
  );

  let transition: ViewTransitionLike;

  try {
    transition = doc.startViewTransition(() => {
      flushSync(applyTheme);
    });
  } catch {
    cleanup();
    applyTheme();
    return Promise.resolve();
  }

  transition.ready.then(
    () => {
      const startedAt = performance.now();
      const ease = expanding ? power3InOut : power3In;

      const tick = (now: number) => {
        const t = Math.min(1, (now - startedAt) / (duration * 1000));
        const progress = expanding ? ease(t) : 1 - ease(t);
        root.style.setProperty(
          '--venom-clip',
          buildVenomClip(
            originX,
            originY,
            progress,
            maxRadius,
            startRadius,
            expanding
          )
        );
        if (t < 1) animationFrame = requestAnimationFrame(tick);
      };

      animationFrame = requestAnimationFrame(tick);
    },
    () => {
      // The browser skipped the transition; `finished` still cleans up.
    }
  );

  return transition.finished
    .catch(() => undefined)
    .finally(cleanup);
};
