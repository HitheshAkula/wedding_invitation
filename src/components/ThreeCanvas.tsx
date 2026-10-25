import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import * as THREE from 'three';

export interface ThreeCanvasHandle {
  setScrollProgress: (progress: number) => void;
}

export interface ThreeCanvasProps {
  scrollProgress?: number;
}

export const ThreeCanvas = forwardRef<ThreeCanvasHandle, ThreeCanvasProps>(
  ({ scrollProgress = 0 }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hasWebGL, setHasWebGL] = useState(true);
    const scrollRef = useRef<number>(scrollProgress);

    useImperativeHandle(ref, () => ({
      setScrollProgress: (p: number) => {
        scrollRef.current = p;
      },
    }));

    useEffect(() => {
      scrollRef.current = scrollProgress;
    }, [scrollProgress]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      // Check WebGL availability
      try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
        if (!gl) {
          setHasWebGL(false);
          return;
        }
      } catch {
        setHasWebGL(false);
        return;
      }

      // Three.js Scene Setup
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x16080D, 0.035);

      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0, 10);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);

      // Warm Atmospheric Lighting
      const ambientLight = new THREE.AmbientLight(0xffecd2, 0.7);
      scene.add(ambientLight);

      const goldKeyLight = new THREE.DirectionalLight(0xffd700, 1.2);
      goldKeyLight.position.set(5, 8, 5);
      scene.add(goldKeyLight);

      // Warm candlelight point lights simulating brass lamps
      const lampLight1 = new THREE.PointLight(0xff9933, 1.5, 15);
      lampLight1.position.set(-4, -1, 3);
      scene.add(lampLight1);

      const lampLight2 = new THREE.PointLight(0xffaa44, 1.5, 15);
      lampLight2.position.set(4, -1, 3);
      scene.add(lampLight2);

      // 3D Floating Gold Dust Particles
      const particleCount = 200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);
      const speeds = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 14;

        scales[i] = Math.random() * 0.14 + 0.04;
        speeds[i] = Math.random() * 0.008 + 0.004;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

      // Particle Texture
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 240, 180, 1)');
        grad.addColorStop(0.3, 'rgba(235, 185, 85, 0.8)');
        grad.addColorStop(0.7, 'rgba(200, 140, 40, 0.3)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      const particleTexture = new THREE.CanvasTexture(canvas);

      const material = new THREE.PointsMaterial({
        size: 0.3,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: 0xffd97d,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Parallax tracking
      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;

      const handlePointerMove = (e: MouseEvent | TouchEvent) => {
        let clientX = 0;
        let clientY = 0;
        if ('touches' in e && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else if ('clientX' in e) {
          clientX = e.clientX;
          clientY = e.clientY;
        }
        targetMouseX = (clientX / window.innerWidth - 0.5) * 1.5;
        targetMouseY = (clientY / window.innerHeight - 0.5) * 1.5;
      };

      window.addEventListener('mousemove', handlePointerMove, { passive: true });
      window.addEventListener('touchmove', handlePointerMove, { passive: true });

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
      const clock = new THREE.Clock();
      let isVisible = true;

      const handleVisibilityChange = () => {
        isVisible = !document.hidden;
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsedTime = clock.getElapsedTime();
        const p = scrollRef.current;

        // Smooth mouse parallax interpolation
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Continuous 3D camera depth driven by scroll
        const targetZ = 10 - p * 4.5;
        camera.position.z += (targetZ - camera.position.z) * 0.1;
        camera.position.x = currentMouseX;
        camera.position.y = -currentMouseY + Math.sin(p * Math.PI) * 0.5;
        camera.lookAt(0, 0, 0);

        // Flickering candlelight point lights
        lampLight1.intensity = 1.3 + Math.sin(elapsedTime * 6.0) * 0.25;
        lampLight2.intensity = 1.3 + Math.cos(elapsedTime * 5.2) * 0.25;

        // Particle physics: gently rising and swirling gold dust
        const posArray = geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          posArray[idx + 1] += speeds[i] * (1 + p * 0.5);
          posArray[idx] += Math.sin(elapsedTime * 0.5 + i) * 0.003;

          if (posArray[idx + 1] > 9) {
            posArray[idx + 1] = -9;
            posArray[idx] = (Math.random() - 0.5) * 20;
          }
        }
        geometry.attributes.position.needsUpdate = true;

        particles.rotation.y = elapsedTime * 0.02 + p * 0.5;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('touchmove', handlePointerMove);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        cancelAnimationFrame(animationFrameId);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        particleTexture.dispose();
        renderer.dispose();
      };
    }, []);

    return (
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-10"
        aria-hidden="true"
      >
        {!hasWebGL && (
          <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        )}
      </div>
    );
  }
);

ThreeCanvas.displayName = 'ThreeCanvas';
