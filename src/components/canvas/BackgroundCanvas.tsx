import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Particles from './Particles';

const BackgroundCanvas = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
  );

  useEffect(() => {
    const handler = (e: Event) => setTheme((e as CustomEvent).detail === 'light' ? 'light' : 'dark');
    window.addEventListener('themechange', handler);
    return () => window.removeEventListener('themechange', handler);
  }, []);

  const isLight = theme === 'light';
  const particleColor = isLight ? '#2563eb' : '#00ff88';
  const particleOpacity = isLight ? 0.7 : 0.4;
  const particleSize = isLight ? 0.04 : 0.025;

  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Particles color={particleColor} opacity={particleOpacity} size={particleSize} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BackgroundCanvas;
