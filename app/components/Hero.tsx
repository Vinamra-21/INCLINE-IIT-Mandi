"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import getStarfield from "./GetStarfield";
import getFresnelMat from "./GetFresnelMat";

const ROTATION_SPEED = 0.0001;
const CLOUDS_ROTATION_SPEED = 0.0002;
const STARS_ROTATION_SPEED = 0.0002;

const Hero = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const [screenSize, setScreenSize] = useState("large");

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("small");
      } else if (width < 768) {
        setScreenSize("medium");
      } else if (width < 1024) {
        setScreenSize("large");
      } else {
        setScreenSize("xlarge");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const isSmallScreen = screenSize === "small";
  const isMediumScreen = screenSize === "medium";
  const isLargeScreen = screenSize === "large";
  const isXLargeScreen = screenSize === "xlarge";

  const initScene = useCallback(() => {
    // Only initialize scene for medium screens and larger
    if (isSmallScreen) return null;

    // Adjust width based on screen size
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    // Adjust camera position based on screen size more precisely
    if (isMobile) {
      camera.position.z = 2.5;
    } else if (isTablet) {
      camera.position.z = 1.8;
    } else {
      camera.position.z = 1.3;
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    if (canvasRef.current) {
      canvasRef.current.innerHTML = "";
      canvasRef.current.appendChild(renderer.domElement);
    }

    return { scene, camera, renderer };
  }, [isSmallScreen]);

  const createEarthGroup = useCallback(() => {
    // Skip for small screens
    if (isSmallScreen) return null;

    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (23.4 * Math.PI) / 180;
    earthGroup.rotation.x = (16.4 * Math.PI) / 180;
    earthGroup.rotation.y = (4.4 * Math.PI) / 180;

    // Use appropriate geometry detail based on device capability
    const geometryDetail = window.innerWidth < 768 ? 8 : 12;
    const geometry = new THREE.IcosahedronGeometry(1, geometryDetail);
    const loader = new THREE.TextureLoader();

    const earthMesh = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({
        map: loader.load("./textures/00_earthmap1k.jpg"),
        specularMap: loader.load("./textures/02_earthspec1k.jpg"),
        bumpMap: loader.load("./textures/01_earthbump1k.jpg"),
        bumpScale: 0.04,
        shininess: 15,
      })
    );
    earthGroup.add(earthMesh);

    const lightsMesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        map: loader.load("./textures/03_earthlights1k.jpg"),
        blending: THREE.AdditiveBlending,
        opacity: 0.8,
      })
    );
    earthGroup.add(lightsMesh);

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

    const glowMesh = new THREE.Mesh(geometry, getFresnelMat());
    glowMesh.scale.setScalar(1.01);
    earthGroup.add(glowMesh);

    return { earthGroup, earthMesh, lightsMesh, cloudsMesh, glowMesh };
  }, [isSmallScreen]);

  useEffect(() => {
    // Skip Three.js initialization for small screens
    if (isSmallScreen || !canvasRef.current) return;

    const sceneData = initScene();
    if (!sceneData) return;

    const { scene, camera, renderer } = sceneData;

    const earthData = createEarthGroup();
    if (!earthData) return;

    const { earthGroup, earthMesh, lightsMesh, cloudsMesh, glowMesh } =
      earthData;

    scene.add(earthGroup);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = window.innerWidth < 1024; // Auto-rotate on mobile and tablet

    // Reduce star count on mobile for performance
    const starCount = window.innerWidth < 768 ? 2000 : 5000;
    const stars = getStarfield({ numStars: starCount });
    scene.add(stars);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const handleColorSchemeChange = (e) => {
      const darkMode = e.matches;
      renderer.setClearColor(darkMode ? 0x111827 : 0xfffaed, 0.1);
    };

    const colorSchemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    colorSchemeMedia.addEventListener("change", handleColorSchemeChange);
    handleColorSchemeChange(colorSchemeMedia);

    const animate = () => {
      earthMesh.rotation.y += ROTATION_SPEED;
      lightsMesh.rotation.y += ROTATION_SPEED;
      cloudsMesh.rotation.y += CLOUDS_ROTATION_SPEED;
      glowMesh.rotation.y += ROTATION_SPEED;
      stars.rotation.y -= STARS_ROTATION_SPEED;

      controls.update();
      renderer.render(scene, camera);
      sceneRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Don't update if we're on a small screen
      if (width < 640) return;

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      camera.aspect = width / height;

      // More responsive camera positioning
      if (isMobile) {
        camera.position.z = 2.5;
      } else if (isTablet) {
        camera.position.z = 1.8;
      } else {
        camera.position.z = 1.3;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Update controls based on screen size
      controls.autoRotate = width < 1024;
    };

    window.addEventListener("resize", handleResize);
    rendererRef.current = renderer;

    return () => {
      colorSchemeMedia.removeEventListener("change", handleColorSchemeChange);
      window.removeEventListener("resize", handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [initScene, createEarthGroup, isSmallScreen]);

  return (
    <section
      className={`relative ${
        isSmallScreen ? "min-h-[80vh]" : "min-h-screen"
      } flex flex-col lg:flex-row overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300`}>
      {/* Content section */}
      <div
        className={`w-full ${
          !isSmallScreen ? "lg:w-1/2" : ""
        } px-4 sm:px-6 lg:px-8 flex items-center justify-center relative z-10`}>
        <div
          className={`w-full max-w-3xl mx-auto ${
            !isSmallScreen ? "lg:mx-0 lg:pr-8" : ""
          } py-12 lg:py-0 text-center`}>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`
              ${
                isSmallScreen
                  ? "text-3xl"
                  : isMediumScreen
                  ? "text-4xl"
                  : isLargeScreen
                  ? "text-5xl"
                  : "text-7xl"
              } 
              md:text-left font-bold text-green-600 dark:text-green-300 mb-4 leading-tight transition-colors duration-300
            `}>
            Indian Climate Information Explorer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`
              ${
                isSmallScreen
                  ? "text-lg"
                  : isMediumScreen
                  ? "text-xl"
                  : isLargeScreen
                  ? "text-2xl"
                  : "text-3xl"
              } 
              md:text-left text-gray-700 dark:text-gray-300 mb-6 transition-colors duration-300 font-bold
            `}>
            Essential data and tools for climate adaptation, resiliency
            building, and community engagement.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                w-full sm:w-auto 
                bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 
                text-white px-6 sm:px-8 py-3 
                rounded-full 
                ${
                  isSmallScreen
                    ? "text-lg"
                    : isMediumScreen
                    ? "text-lg"
                    : isLargeScreen
                    ? "text-xl"
                    : "text-2xl"
                } 
                 font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl max-w-xs
              `}>
              Start Exploring
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Earth visualization section - Only show on medium screens and larger */}
      {!isSmallScreen && (
        <div
          className={`absolute lg:relative right-0 top-0 w-full lg:w-1/2 h-full opacity-70 sm:opacity-80 lg:opacity-100`}>
          <div ref={canvasRef} className="w-full h-full" />
        </div>
      )}
    </section>
  );
};

export default Hero;
