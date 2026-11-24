import gsap from 'gsap';

type FreezeListener = (frozen: boolean) => void;

let frozen = false;
let pausedGsap = false;
const listeners = new Set<FreezeListener>();

const SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
]);

const isEditableTarget = (target: EventTarget | null) => {
  const element = target as HTMLElement | null;
  if (!element || !element.tagName) return false;
  const tag = element.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || tag === 'select' || element.isContentEditable;
};

// Capture-phase listeners stop interaction without changing layout or hover
// styles, so the view-transition snapshots stay pixel-identical.
const blockWheel = (event: Event) => {
  if (frozen) event.preventDefault();
};

const blockKeys = (event: KeyboardEvent) => {
  if (!frozen || isEditableTarget(event.target)) return;
  if (SCROLL_KEYS.has(event.key)) event.preventDefault();
};

const blockPointer = (event: Event) => {
  if (!frozen) return;
  event.preventDefault();
  event.stopPropagation();
};

const startBlocking = () => {
  window.addEventListener('wheel', blockWheel, { passive: false, capture: true });
  window.addEventListener('touchmove', blockWheel, { passive: false, capture: true });
  window.addEventListener('keydown', blockKeys, { capture: true });
  window.addEventListener('click', blockPointer, { capture: true });
  window.addEventListener('pointerdown', blockPointer, { capture: true });
};

const stopBlocking = () => {
  window.removeEventListener('wheel', blockWheel, { capture: true });
  window.removeEventListener('touchmove', blockWheel, { capture: true });
  window.removeEventListener('keydown', blockKeys, { capture: true });
  window.removeEventListener('click', blockPointer, { capture: true });
  window.removeEventListener('pointerdown', blockPointer, { capture: true });
};

export const isAppFrozen = () => frozen;

export const onFreezeChange = (listener: FreezeListener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const setAppFrozen = (next: boolean) => {
  if (frozen === next) return;
  frozen = next;

  if (frozen) {
    startBlocking();
    if (!gsap.globalTimeline.paused()) {
      gsap.globalTimeline.pause();
      pausedGsap = true;
    }
  } else {
    stopBlocking();
    if (pausedGsap) {
      gsap.globalTimeline.resume();
      pausedGsap = false;
    }
  }

  listeners.forEach((listener) => listener(frozen));
};
