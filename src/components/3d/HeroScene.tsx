"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars, Environment } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.3;
      meshRef.current.rotation.y = clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.4}
          speed={2.5}
          roughness={0}
          metalness={0.8}
          transparent
          opacity={0.85}
          envMapIntensity={1.5}
        />
      </Sphere>
    </Float>
  );
}

function FloatingCubes() {
  const cubesData = [
    { position: [3, 1.5, -2] as [number, number, number], scale: 0.3, color: "#f98c07" },
    { position: [-3.5, 0.5, -1] as [number, number, number], scale: 0.2, color: "#3b82f6" },
    { position: [2.5, -1.5, -3] as [number, number, number], scale: 0.4, color: "#60a5fa" },
    { position: [-2, 2, -2] as [number, number, number], scale: 0.25, color: "#fcd34d" },
    { position: [0, -2.5, -1] as [number, number, number], scale: 0.2, color: "#93c5fd" },
    { position: [4, -0.5, -4] as [number, number, number], scale: 0.35, color: "#f98c07" },
  ];

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    refs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x = clock.elapsedTime * (0.3 + i * 0.1);
        mesh.rotation.y = clock.elapsedTime * (0.2 + i * 0.05);
        mesh.position.y = cubesData[i].position[1] + Math.sin(clock.elapsedTime + i) * 0.3;
      }
    });
  });

  return (
    <>
      {cubesData.map((cube, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={cube.position}
          scale={cube.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={cube.color}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </>
  );
}

function ParticleRing() {
  const points = useRef<THREE.Points>(null);
  const particleCount = 200;

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 3.5 + Math.random() * 0.5;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.05;
      points.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#60a5fa" />
          <directionalLight position={[-5, -2, -3]} intensity={0.8} color="#f98c07" />
          <pointLight position={[0, 0, 3]} intensity={2} color="#3b82f6" />

          <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={1} />
          <AnimatedSphere />
          <FloatingCubes />
          <ParticleRing />

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
