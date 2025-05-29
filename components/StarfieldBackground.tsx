'use client';

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { inSphere } from "maath/random";
import { Group } from "three";

const StarBackground = (props: any) => {
  const ref = useRef<Group>(null!);
  const [sphere] = useState(() => {
    const arr = new Float32Array(8000);
    return inSphere(arr);
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <primitive object={new Group()} ref={ref}>
      <Points positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#fff"
          size={0.003}
          sizeAttenuation
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </primitive>
  );
};

const StarsCanvas = () => (
  <div className="w-full h-screen fixed inset-0 z-0 bg-black/90">
    <Canvas 
      camera={{ position: [0, 0, 1] }}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
      <Preload all />
    </Canvas>
  </div>
);

export default StarsCanvas;