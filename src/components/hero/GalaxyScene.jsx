import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useBreakpoint } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function GalaxyParticles({ count }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.4;
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <group rotation={[0.2, 0, 0]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3cd7ff"
          size={0.025}
          sizeAttenuation
          depthWrite={false}
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#d0bcff"
          size={0.015}
          sizeAttenuation
          depthWrite={false}
          opacity={0.5}
        />
      </Points>
    </group>
  );
}

function Scene({ particleCount }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <GalaxyParticles count={particleCount} />
    </>
  );
}

function GalaxyCanvas({ particleCount, dpr }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Scene particleCount={particleCount} />
    </Canvas>
  );
}

export default function GalaxyScene() {
  const reduced = useReducedMotion();
  const { isMobile, isTablet } = useBreakpoint();

  const particleCount = isMobile ? 1200 : isTablet ? 2200 : 3500;
  const dpr = isMobile ? [1, 1.25] : isTablet ? [1, 1.5] : [1, 2];

  if (reduced) {
    return (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(60,215,255,0.15) 0%, transparent 60%)',
        }}
        aria-hidden
      />
    );
  }

  return (
    <div
      className="absolute inset-0 opacity-40 sm:opacity-50 pointer-events-none min-h-[100dvh]"
      aria-hidden
    >
      <Suspense fallback={null}>
        <GalaxyCanvas particleCount={particleCount} dpr={dpr} />
      </Suspense>
    </div>
  );
}
