import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ============================================
   STARS — 4000 points in a sphere
   ============================================ */
function Stars() {
  const ref = useRef();
  const scrollY = useRef(0);

  const positions = useMemo(() => {
    const pos = new Float32Array(4000 * 3);
    for (let i = 0; i < 4000; i++) {
      const radius = 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random());
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    // Gentle auto-rotation
    ref.current.rotation.y += 0.0002;
    // Scroll-driven drift
    ref.current.rotation.x = scrollY.current * 0.00003;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={4000}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#e8eaf0"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ============================================
   EARTH — Blue sphere, visible during hero
   ============================================ */
function Earth({ visible }) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={ref} position={[4, 1.5, -5]} visible={visible}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshPhongMaterial
        color="#1a6cf6"
        emissive="#0a2a5e"
        emissiveIntensity={0.3}
        shininess={30}
      />
    </mesh>
  );
}

/* ============================================
   MARS — Rust sphere, appears during landing
   ============================================ */
function Mars({ visible }) {
  const ref = useRef();
  const [scale, setScale] = useState(0);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setScale(1), 100);
      return () => clearTimeout(t);
    } else {
      setScale(0);
    }
  }, [visible]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
      // Smooth scale transition
      ref.current.scale.lerp(
        new THREE.Vector3(scale, scale, scale),
        0.05
      );
    }
  });

  return (
    <mesh ref={ref} position={[4, 1, -5]} scale={[0, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshPhongMaterial
        color="#c1440e"
        emissive="#5a2000"
        emissiveIntensity={0.2}
        shininess={10}
      />
    </mesh>
  );
}

/* ============================================
   DPR LIMITER
   ============================================ */
function DprLimiter() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setPixelRatio(Math.min(2, window.devicePixelRatio));
  }, [gl]);
  return null;
}

/* ============================================
   STARFIELD CANVAS — fixed fullscreen
   ============================================ */
export default function StarField({ activeSection = 0 }) {
  const showEarth = activeSection <= 0;
  const showMars = activeSection >= 3;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 'var(--z-starfield)' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <DprLimiter />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 5, 5]} intensity={1} />
        <Stars />
        <Earth visible={showEarth} />
        <Mars visible={showMars} />
      </Canvas>
    </div>
  );
}
