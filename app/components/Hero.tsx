"use client";

import { useEffect, useRef, useCallback } from "react";
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

  const dims = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;
    return { width, height, isMobile };
  }, []);

  const initScene = useCallback(() => {
    const { width, height, isMobile } = dims();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    // Adjust camera position based on screen size
    camera.position.z = isMobile ? 2 : 1.3;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    if (canvasRef.current) {
      canvasRef.current.innerHTML = "";
      canvasRef.current.appendChild(renderer.domElement);
    }

    return { scene, camera, renderer };
  }, []);

  const createEarthGroup = useCallback(() => {
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (23.4 * Math.PI) / 180;
    earthGroup.rotation.x = (16.4 * Math.PI) / 180;
    earthGroup.rotation.y = (4.4 * Math.PI) / 180;

    const geometry = new THREE.IcosahedronGeometry(1, 12);
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
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const { scene, camera, renderer } = initScene();
    const { width, height, isMobile } = dims();
    const { earthGroup, earthMesh, lightsMesh, cloudsMesh, glowMesh } =
      createEarthGroup();

    scene.add(earthGroup);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enableRotate = !isMobile;
    controls.enablePan = false;

    const stars = getStarfield({ numStars: 10000 });
    scene.add(stars);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // const handleColorSchemeChange = (e) => {
    //   const darkMode = e.matches;
    //   renderer.setClearColor(darkMode ? 0x111827 : 0xfffaed, 0.1);
    // };

    // const colorSchemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    // colorSchemeMedia.addListener(handleColorSchemeChange);

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
      const isMobile = width < 768;

      camera.aspect = width / height;
      // Adjust camera position on resize
      camera.position.z = isMobile ? 2 : 1.3;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    rendererRef.current = renderer;

    return () => {
      // colorSchemeMedia.removeListener(handleColorSchemeChange);
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
    <section className=" relative min-h-screen flex flex-col lg:flex-row overflow-hidden   bg-gray-900 transition-colors duration-300 ">
      {/* Content section */}
      <div className="md:mt-14 mt-20 w-full lg:w-1/2 px-4 sm:px-6 lg:px-8 flex items-center relative z-10">
        <div className="max-w-3xl mx-auto lg:mx-0 py-12 lg:py-0 lg:pr-16 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-green-300 mb-4 sm:mb-6 lg:mb-8 leading-tight transition-colors duration-300 ">
            Indian Climate Information Explorer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 transition-colors duration-300 font-bold">
            Essential data and tools for climate adaptation, resiliency
            building, and community engagement.
          </motion.p>
          <a href="#quickPulse">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="lg:w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
              Start Exploring
            </motion.button>
          </a>
        </div>
      </div>

      {/* Earth visualization section */}
      <div className="absolute lg:relative right-0 top-0 w-full lg:w-1/2 h-full opacity-80 md:opacity-100 pointer-events-none md:pointer-events-auto">
        <div ref={canvasRef} className="w-full h-full" />
      </div>
    </section>
  );
};

export default Hero;
