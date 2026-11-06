import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Canvas3DHeroProps {
  className?: string;
  accentColor?: string; // Hex string, e.g. '#06b6d4' | '#8b5cf6' | '#f97316'
  scrollProgress?: number; // 0 to 1
}

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export const Canvas3DHeroFallback: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`relative w-full h-full flex items-center justify-center pointer-events-none ${className}`}
    aria-hidden="true"
  >
    {/* Ambient Static Cosmic Fallback */}
    <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-purple-600/20 via-pink-600/15 to-cyan-500/20 blur-3xl animate-pulse-slow" />
    <div className="w-52 h-52 sm:w-72 sm:h-72 rounded-full border border-purple-500/20 opacity-40 shadow-[0_0_60px_rgba(139,92,246,0.15)]" />
  </div>
);

export const Canvas3DHero: React.FC<Canvas3DHeroProps> = ({
  className = '',
  accentColor = '#8b5cf6',
  scrollProgress = 0
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isWebGLSupported = checkWebGLSupport();

  // Keep latest accentColor & scrollProgress in refs for the animation loop
  const targetColorRef = useRef<THREE.Color>(new THREE.Color(accentColor));
  const scrollRef = useRef<number>(scrollProgress);

  useEffect(() => {
    targetColorRef.current.set(accentColor);
  }, [accentColor]);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    if (!isWebGLSupported) return;

    const container = mountRef.current;
    if (!container) return;

    // Check device capabilities
    const isMobile = window.innerWidth < 768;
    const isLowEnd =
      isMobile ||
      (typeof navigator !== 'undefined' &&
        Boolean(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4));
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = isMobile ? 8.5 : 7.0;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isLowEnd,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Root Group for Parallax & Scroll Rotations
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Central Hero Sculpture: Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(1.4, 0.42, isLowEnd ? 70 : 120, isLowEnd ? 16 : 24, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.5,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    masterGroup.add(knotMesh);

    // Outer Wireframe Ghost Lattice
    const wireGeo = new THREE.TorusKnotGeometry(1.42, 0.44, isLowEnd ? 40 : 60, isLowEnd ? 12 : 16, 2, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    masterGroup.add(wireMesh);

    // 2. Gyroscope Rings (Data Science cyan, Web dev purple, Creative highlight pink)
    const ring1Geo = new THREE.TorusGeometry(2.4, 0.025, 16, isLowEnd ? 50 : 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.8,
      roughness: 0.3,
      metalness: 0.9
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    masterGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.7, 0.02, 16, isLowEnd ? 50 : 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.9
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    masterGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(3.0, 0.03, 16, isLowEnd ? 50 : 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xbe185d,
      emissiveIntensity: 0.7,
      roughness: 0.4,
      metalness: 0.8
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 5;
    masterGroup.add(ring3);

    // 3. Floating Geometric Satellites
    const satellites: THREE.Mesh[] = [];
    const satelliteCount = isLowEnd ? 4 : 10;
    const icosahedronGeo = new THREE.IcosahedronGeometry(0.18, 0);
    const octahedronGeo = new THREE.OctahedronGeometry(0.2, 0);

    for (let i = 0; i < satelliteCount; i++) {
      const geo = i % 2 === 0 ? icosahedronGeo : octahedronGeo;
      const color = i % 3 === 0 ? 0x06b6d4 : i % 3 === 1 ? 0xf97316 : 0x8b5cf6;
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8
      });
      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / satelliteCount) * Math.PI * 2;
      const radius = 2.4 + (i % 3) * 0.4;
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 1.5) * 1.2,
        Math.sin(angle) * radius
      );
      masterGroup.add(mesh);
      satellites.push(mesh);
    }

    // 4. Particle Quantum Nebula (Data & Light Dust)
    // Mobile or low-end: 400 particles; Desktop: 1400
    const particleCount = isLowEnd ? 400 : 1400;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color('#06b6d4'); // Data Science
    const c2 = new THREE.Color('#8b5cf6'); // Web Engineering
    const c3 = new THREE.Color('#3b82f6'); // Azure Blue
    const c4 = new THREE.Color('#ec4899'); // Rare highlight

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 3.0 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i3 + 2] = radius * Math.cos(phi);

      const mixed = Math.random();
      const chosenColor =
        mixed < 0.35 ? c1 : mixed < 0.7 ? c2 : mixed < 0.9 ? c3 : c4;

      particleColors[i3] = chosenColor.r;
      particleColors[i3 + 1] = chosenColor.g;
      particleColors[i3 + 2] = chosenColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const primaryLight = new THREE.PointLight(0x8b5cf6, 4.5, 20);
    primaryLight.position.set(5, 5, 4);
    scene.add(primaryLight);

    const secondaryLight = new THREE.PointLight(0x06b6d4, 3.5, 20);
    secondaryLight.position.set(-5, -4, 3);
    scene.add(secondaryLight);

    const warmLight = new THREE.PointLight(0xf97316, 3.0, 20);
    warmLight.position.set(0, 6, -4);
    scene.add(warmLight);

    // Mouse Parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Visibility & In-View State Management
    let isInView = true;
    let isTabVisible = !document.hidden;
    let animationFrameId: number | null = null;
    const clock = new THREE.Clock();

    // Color Lerping Variable
    const currentColor = new THREE.Color(0x8b5cf6);

    const renderSingleFrame = () => {
      if (renderer) renderer.render(scene, camera);
    };

    const animate = () => {
      if (!isInView || !isTabVisible) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Parallax easing
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Subtle scroll influence on masterGroup (Phase 3 requirement)
      const scrollRotation = scrollRef.current * Math.PI * 0.8;

      masterGroup.rotation.y = currentX + elapsedTime * 0.15 + scrollRotation * 0.5;
      masterGroup.rotation.x = -currentY + Math.sin(elapsedTime * 0.25) * 0.08 + scrollRotation * 0.2;

      // Smooth color lerp to active discipline color (Phase 2 requirement)
      currentColor.lerp(targetColorRef.current, 0.04);
      knotMat.color.copy(currentColor);
      primaryLight.color.copy(currentColor);

      // Knot spin
      knotMesh.rotation.x = elapsedTime * 0.2 + scrollRotation * 0.3;
      knotMesh.rotation.y = elapsedTime * 0.35;
      wireMesh.rotation.x = elapsedTime * 0.2 + scrollRotation * 0.3;
      wireMesh.rotation.y = elapsedTime * 0.35;

      // Rings counter-rotations
      ring1.rotation.z = elapsedTime * 0.3;
      ring1.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.4) * 0.1;

      ring2.rotation.x = elapsedTime * -0.25;
      ring2.rotation.y = Math.PI / 4 + Math.cos(elapsedTime * 0.35) * 0.15;

      ring3.rotation.y = elapsedTime * 0.2;
      ring3.rotation.z = Math.PI / 5 + Math.sin(elapsedTime * 0.5) * 0.1;

      // Satellites orbiting
      satellites.forEach((sat, i) => {
        const speed = 0.4 + (i % 3) * 0.1;
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.03;
        const currentPos = sat.position;
        currentPos.y += Math.sin(elapsedTime * speed + i) * 0.003;
      });

      // Subtle particle slow drift
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = elapsedTime * 0.02;

      if (renderer) renderer.render(scene, camera);
    };

    const startAnimation = () => {
      if (prefersReducedMotion) {
        renderSingleFrame();
        return;
      }
      if (animationFrameId === null) {
        clock.start();
        animate();
      }
    };

    // If reduced motion is requested, render once and freeze
    if (prefersReducedMotion) {
      renderSingleFrame();
    } else {
      startAnimation();
    }

    // IntersectionObserver to pause loop when Hero is not in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView && isTabVisible && !prefersReducedMotion) {
          startAnimation();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Tab visibility listener
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isInView && isTabVisible && !prefersReducedMotion) {
        startAnimation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Full Resource Disposal on unmount
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose geometries
      knotGeo.dispose();
      wireGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      icosahedronGeo.dispose();
      octahedronGeo.dispose();
      particleGeo.dispose();

      // Dispose materials
      knotMat.dispose();
      wireMat.dispose();
      ring1Mat.dispose();
      ring2Mat.dispose();
      ring3Mat.dispose();
      particleMat.dispose();
      satellites.forEach((sat) => {
        if (Array.isArray(sat.material)) {
          sat.material.forEach((m) => m.dispose());
        } else {
          sat.material.dispose();
        }
      });

      // Dispose lights and renderer
      scene.remove(masterGroup);
      scene.remove(ambientLight);
      scene.remove(primaryLight);
      scene.remove(secondaryLight);
      scene.remove(warmLight);

      if (renderer) {
        renderer.dispose();
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [isWebGLSupported]);

  if (!isWebGLSupported) {
    return <Canvas3DHeroFallback className={className} />;
  }

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
