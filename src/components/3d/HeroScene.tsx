"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Environment, MeshReflectorMaterial, useEnvironment } from "@react-three/drei";
import * as THREE from "three";

// ── Single apartment building block ──────────────────────────────────
function Building({
  position,
  width,
  depth,
  height,
  color,
  emissive,
  windowRows,
  windowCols,
}: {
  position: [number, number, number];
  width: number;
  depth: number;
  height: number;
  color: string;
  emissive: string;
  windowRows: number;
  windowCols: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const windowLights = useMemo(() =>
    Array.from({ length: windowRows * windowCols }, () => Math.random() > 0.25),
    [windowRows, windowCols]
  );

  return (
    <group position={position}>
      {/* Main building body */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.15}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Gold rooftop accent */}
      <mesh position={[0, height / 2 + 0.05, 0]}>
        <boxGeometry args={[width * 0.95, 0.12, depth * 0.95]} />
        <meshStandardMaterial color="#f98c07" emissive="#f98c07" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Windows — grid of glowing yellow/white boxes */}
      {Array.from({ length: windowRows }).map((_, row) =>
        Array.from({ length: windowCols }).map((_, col) => {
          const wx = (col - (windowCols - 1) / 2) * (width / (windowCols + 1)) * 1.6;
          const wy = (row - (windowRows - 1) / 2) * (height / (windowRows + 1)) * 1.1;
          const lit = windowLights[row * windowCols + col];
          return (
            <mesh key={`w-${row}-${col}`} position={[wx, wy, depth / 2 + 0.01]}>
              <planeGeometry args={[width * 0.08, height * 0.055]} />
              <meshStandardMaterial
                color={lit ? "#fff8dc" : "#1a2640"}
                emissive={lit ? "#ffe88a" : "#000"}
                emissiveIntensity={lit ? 1.2 : 0}
                roughness={0}
                metalness={0}
              />
            </mesh>
          );
        })
      )}
    </group>
  );
}

// ── Tall hero tower with slow float ──────────────────────────────────
function HeroTower() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.12;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Main hero skyscraper */}
        <Building
          position={[0, 0, 0]}
          width={1.2} depth={1.2} height={5.5}
          color="#1e3a6e" emissive="#3b82f6"
          windowRows={9} windowCols={3}
        />

        {/* Mid tower left */}
        <Building
          position={[-2.0, -0.8, -0.5]}
          width={0.9} depth={0.9} height={3.8}
          color="#172d56" emissive="#2563eb"
          windowRows={6} windowCols={2}
        />

        {/* Mid tower right */}
        <Building
          position={[2.1, -1.1, -0.3]}
          width={0.85} depth={0.85} height={3.2}
          color="#1a3460" emissive="#1d6ef5"
          windowRows={5} windowCols={2}
        />

        {/* Small building far left */}
        <Building
          position={[-3.4, -1.5, -1.0]}
          width={0.7} depth={0.7} height={2.4}
          color="#0f1f40" emissive="#1e40af"
          windowRows={4} windowCols={2}
        />

        {/* Small building far right */}
        <Building
          position={[3.3, -1.6, -1.2]}
          width={0.65} depth={0.65} height={2.0}
          color="#111d38" emissive="#1e40af"
          windowRows={3} windowCols={2}
        />

        {/* Tiny accent buildings deep back */}
        <Building
          position={[-1.0, -1.8, -2.5]}
          width={0.55} depth={0.5} height={1.6}
          color="#0d1830" emissive="#1e3a8a"
          windowRows={3} windowCols={1}
        />
        <Building
          position={[1.2, -1.9, -2.8]}
          width={0.5} depth={0.5} height={1.4}
          color="#0d1830" emissive="#1e3a8a"
          windowRows={2} windowCols={1}
        />

        {/* Ground plane / plaza */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.75, 0]} receiveShadow>
          <planeGeometry args={[12, 8]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={512}
            mixBlur={0.8}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050d1a"
            metalness={0.5}
            mirror={0}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ── Floating particles (like city lights) ────────────────────────────
function CityParticles() {
  const points = useRef<THREE.Points>(null);
  const count = 300;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
      const gold = Math.random() > 0.7;
      colors[i * 3]     = gold ? 0.98 : 0.4 + Math.random() * 0.4;
      colors[i * 3 + 1] = gold ? 0.55 : 0.5 + Math.random() * 0.3;
      colors[i * 3 + 2] = gold ? 0.04 : 0.9 + Math.random() * 0.1;
    }
    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} vertexColors sizeAttenuation transparent opacity={0.75} />
    </points>
  );
}

// ── HDRI Environment loader ───────────────────────────────────────────
// Menggunakan raw.githubusercontent.com (direct, tanpa redirect)
// agar RGBELoader tidak gagal karena CORS redirect
function HDRIEnvironment() {
  const envMap = useEnvironment({
    files: "https://raw.githubusercontent.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/potsdamer_platz_1k.hdr",
  });

  return <Environment map={envMap} background={false} />;
}

// ── Main exported scene ───────────────────────────────────────────────
export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 9], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        shadows
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.25} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.8}
            color="#93c5fd"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-4, 2, -4]} intensity={0.6} color="#f98c07" />
          <pointLight position={[0, 4, 2]} intensity={2.5} color="#3b82f6" distance={12} />
          <pointLight position={[2, -1, 3]} intensity={1.2} color="#fcd34d" distance={8} />

          {/* Stars background */}
          <Stars radius={80} depth={40} count={2500} factor={3} saturation={0} fade speed={0.8} />

          {/* Main city scene */}
          <HeroTower />

          {/* City light particles */}
          <CityParticles />

          {/* HDRI Environment — Potsdamer Platz 1K */}
          <HDRIEnvironment />
        </Suspense>
      </Canvas>
    </div>
  );
}
