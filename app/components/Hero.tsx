"use client";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <img
        src="/india-map.jpg"
        alt="Map of India"
        className="absolute z-0 opacity-20 dark:opacity-10"
      />
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-green-800 dark:text-green-300 mb-6">
          Indian Climate Information Explorer
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
          Explore, Analyze, and Plan for India's Changing Climate
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
    </section>
  );
};

export default Hero;
