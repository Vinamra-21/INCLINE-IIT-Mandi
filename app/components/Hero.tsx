"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import getStarfield from "./getStarfield";
import { getFresnelMat } from "./getFresnelMat";

const ROTATION_SPEED = 0.002;
const CLOUDS_ROTATION_SPEED = 0.0023;
const STARS_ROTATION_SPEED = 0.0002;

const Hero = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  const initScene = useCallback(() => {
    // Calculate dimensions for the right half of the screen
    const width = window.innerWidth * 0.6; // 60% of screen width to allow overlap
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // Enable transparency
    });
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setClearColor(0x000000, 0); // Transparent background

    if (canvasRef.current) {
      canvasRef.current.innerHTML = "";
      canvasRef.current.appendChild(renderer.domElement);
    }

    return { scene, camera, renderer };
  }, []);

  const createEarthGroup = useCallback(() => {
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180;

    const geometry = new THREE.IcosahedronGeometry(1, 12);
    const loader = new THREE.TextureLoader();

    // Earth base
    const earthMesh = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({
        map: loader.load("./textures/00_earthmap1k.jpg"),
        specularMap: loader.load("./textures/02_earthspec1k.jpg"),
        bumpMap: loader.load("./textures/01_earthbump1k.jpg"),
        bumpScale: 0.04,
      })
    );
    earthGroup.add(earthMesh);

    // Night lights
    const lightsMesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        map: loader.load("./textures/03_earthlights1k.jpg"),
        blending: THREE.AdditiveBlending,
        opacity: 1,
      })
    );
    earthGroup.add(lightsMesh);

    // Clouds
    const cloudsMesh = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({
        map: loader.load("./textures/04_earthcloudmap.jpg"),
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        alphaMap: loader.load("./textures/05_earthcloudmaptrans.jpg"),
      })
    );
    cloudsMesh.scale.setScalar(1.003);
    earthGroup.add(cloudsMesh);

    // Atmosphere glow
    const glowMesh = new THREE.Mesh(geometry, getFresnelMat());
    glowMesh.scale.setScalar(1.01);
    earthGroup.add(glowMesh);

    return { earthGroup, earthMesh, lightsMesh, cloudsMesh, glowMesh };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const { scene, camera, renderer } = initScene();
    const { earthGroup, earthMesh, lightsMesh, cloudsMesh, glowMesh } =
      createEarthGroup();

    scene.add(earthGroup);
    new OrbitControls(camera, renderer.domElement);

    // Add stars
    const stars = getStarfield({ numStars: 5000 });
    scene.add(stars);

    // Add lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 4.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    // Animation loop
    const animate = () => {
      earthMesh.rotation.y += ROTATION_SPEED;
      lightsMesh.rotation.y += ROTATION_SPEED;
      cloudsMesh.rotation.y += CLOUDS_ROTATION_SPEED;
      glowMesh.rotation.y += ROTATION_SPEED;
      stars.rotation.y -= STARS_ROTATION_SPEED;

      renderer.render(scene, camera);
      sceneRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resizing
    const handleResize = () => {
      const width = window.innerWidth * 0.6;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    rendererRef.current = renderer;

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [initScene, createEarthGroup]);

  return (
    <section className="relative h-screen flex overflow-hidden pt-16">
      {/* Left content section */}
      <div className="w-1/2 pl-8 flex items-center relative z-10">
        <div className="pr-16">
          {" "}
          {/* Add padding to prevent text from going too far right */}
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-green-800 dark:text-green-300 mb-8 leading-tight">
            Indian Climate Information Explorer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Essential data and tools for climate adaptation, resiliency
            building, and community engagement.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-green-600 dark:bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-200">
            Start Exploring
          </motion.button>
        </div>
      </div>

      {/* Right Earth visualization section */}
      <div className="absolute right-0 top-0 w-3/5 h-full">
        <div ref={canvasRef} className="w-full h-full" />
      </div>
    </section>
  );
};

export default Hero;
