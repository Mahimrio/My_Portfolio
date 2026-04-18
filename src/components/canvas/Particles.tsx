import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

const Particles = () => {
  const ref = useRef<any>(null);
  
  const [sphere] = useState(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for(let i = 0; i < count; i++) {
        const radius = Math.random() * 10;
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        positions[i*3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i*3+1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i*3+2] = radius * Math.cos(phi);
    }
    return positions;
  });

  const groupRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Automatic slow continuous rotation
      groupRef.current.rotation.x -= delta / 15;
      groupRef.current.rotation.y -= delta / 20;
    }

    if (ref.current) {
      // Interactive mouse-tilt effect
      const targetX = state.pointer.x * 0.3;
      const targetY = state.pointer.y * 0.3;
      
      ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.05;
      ref.current.rotation.x += (-targetY - ref.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ff88"
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
};

export default Particles;
