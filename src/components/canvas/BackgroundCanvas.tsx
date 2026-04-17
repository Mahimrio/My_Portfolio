import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

const BackgroundCanvas = () => {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          {/* Models and particles will be injected in Issue 3.3 */}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BackgroundCanvas;
