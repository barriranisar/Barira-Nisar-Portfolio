import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Canvas3DHeroProps {
  className?: string;
}

export const Canvas3DHero: React.FC<Canvas3DHeroProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check device capabilities
    const isMobile = window.innerWidth < 768;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = isMobile ? 8.5 : 7.0;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Root Group for Mouse Parallax
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Central Hero Sculpture: Multi-layered Torus Knot / Quantum Polyhedron
    // Core Knot (Electric purple & hot pink iridescent vibe)
    const knotGeo = new THREE.TorusKnotGeometry(1.4, 0.42, 120, 24, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.5,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    masterGroup.add(knotMesh);

    // Outer Wireframe Ghost Lattice
    const wireGeo = new THREE.TorusKnotGeometry(1.42, 0.44, 60, 16, 2, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    masterGroup.add(wireMesh);

    // 2. Gyroscope Rings (Representing Data, Code, and Photography)
    // Ring 1: Data Orbital (Cyan)
    const ring1Geo = new THREE.TorusGeometry(2.4, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.8,
      roughness: 0.3,
      metalness: 0.9,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    masterGroup.add(ring1);

    // Ring 2: Web Developer Matrix Ring (Violet/Magenta)
    const ring2Geo = new THREE.TorusGeometry(2.7, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xbe185d,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    masterGroup.add(ring2);

    // Ring 3: Camera Lens Aperture Ring (Warm Amber/Coral)
    const ring3Geo = new THREE.TorusGeometry(3.0, 0.03, 16, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xc2410c,
      emissiveIntensity: 0.7,
      roughness: 0.4,
      metalness: 0.8,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 5;
    masterGroup.add(ring3);

    // 3. Floating Geometric Satellites (Data Nodes & Optical Prisms)
    const satellites: THREE.Mesh[] = [];
    const satelliteCount = isMobile ? 6 : 12;
    const icosahedronGeo = new THREE.IcosahedronGeometry(0.18, 0);
    const octahedronGeo = new THREE.OctahedronGeometry(0.2, 0);

    for (let i = 0; i < satelliteCount; i++) {
      const geo = i % 2 === 0 ? icosahedronGeo : octahedronGeo;
      const color = i % 3 === 0 ? 0x06b6d4 : i % 3 === 1 ? 0xec4899 : 0xa855f7;
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
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
    const particleCount = isMobile ? 600 : 1400;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color('#8b5cf6');
    const c2 = new THREE.Color('#ec4899');
    const c3 = new THREE.Color('#06b6d4');
    const c4 = new THREE.Color('#f97316');

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
        mixed < 0.35 ? c1 : mixed < 0.65 ? c2 : mixed < 0.85 ? c3 : c4;

      particleColors[i3] = chosenColor.r;
      particleColors[i3 + 1] = chosenColor.g;
      particleColors[i3 + 2] = chosenColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeo.setAttribute(
      'color',
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 4, 20);
    purpleLight.position.set(5, 5, 4);
    scene.add(purpleLight);

    const pinkLight = new THREE.PointLight(0xec4899, 4, 20);
    pinkLight.position.set(-5, -4, 3);
    scene.add(pinkLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 3.5, 20);
    cyanLight.position.set(0, 6, -4);
    scene.add(cyanLight);

    // 6. Smooth Mouse Parallax Tracking
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

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth parallax interpolation
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      masterGroup.rotation.y = currentX + elapsedTime * 0.15;
      masterGroup.rotation.x = -currentY + Math.sin(elapsedTime * 0.25) * 0.08;

      // Knot spin
      knotMesh.rotation.x = elapsedTime * 0.2;
      knotMesh.rotation.y = elapsedTime * 0.35;
      wireMesh.rotation.x = elapsedTime * 0.2;
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

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Clean up geometries and materials
      knotGeo.dispose();
      knotMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      icosahedronGeo.dispose();
      octahedronGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

