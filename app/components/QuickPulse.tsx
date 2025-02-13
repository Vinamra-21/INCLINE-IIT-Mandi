import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TimelineData = [
  {
    year: 2020,
    title: "The Beginning",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipispor incididunt ut labore.",
  },
  {
    year: 2021,
    title: "The Journey",
    content:
      "Ut enim ad minim veniam, quis nosboris nisi ut aliquip ex ea commodo.",
  },
  {
    year: 2022,
    title: "The Progress",
    content: "Duis aute irure dolor in reprehu fugiat nulla.",
  },
];

const QuickPulse = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Generate Zigzag Path
  const createZigzagPath = () => {
    const segmentHeight = 30;
    const zigzagWidth = 450;
    const curveRadius = 20;
    const totalSegments = TimelineData.length * 2;

    let path = `M 100 0`;

    path += ` v ${
      segmentHeight - curveRadius
    } q 0 ${curveRadius} ${curveRadius} ${curveRadius}`;
    for (let i = 0; i < totalSegments; i++) {
      path += ` h ${
        zigzagWidth - curveRadius
      } q ${curveRadius} 0 ${curveRadius} ${curveRadius}`;
      path += ` v ${
        segmentHeight - curveRadius
      } q 0 ${curveRadius} -${curveRadius} ${curveRadius}`;
      path += ` h -${
        zigzagWidth - curveRadius
      } q -${curveRadius} 0 -${curveRadius} ${curveRadius}`;
      if (i < totalSegments - 1) {
        path += ` v ${
          segmentHeight - curveRadius
        } q 0 ${curveRadius} ${curveRadius} ${curveRadius}`;
      }
    }

    path += ` v ${
      segmentHeight - curveRadius
    } q 0 ${curveRadius} ${curveRadius} ${curveRadius}`;
    path += ` h ${
      zigzagWidth - curveRadius
    } q ${curveRadius} 0 ${curveRadius} ${curveRadius}`;
    path += ` v ${segmentHeight * 2 - curveRadius}`;

    return path;
  };

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1.5]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-25 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Zigzag SVG Line */}
      <div className="absolute left-0 top-0 bottom-0">
        <svg
          width="600"
          height={TimelineData.length * 220}
          viewBox={`0 0 600 ${TimelineData.length * 220}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          {/* Background Line (Adapts to Dark Mode) */}
          <path
            d={createZigzagPath()}
            stroke="currentColor"
            className="text-green-800 dark:text-green-400"
            strokeWidth="3"
          />

          {/* Animated Glowing Line */}
          <motion.path
            d={createZigzagPath()}
            stroke="currentColor"
            className="text-green-500 dark:text-green-300 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)] dark:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
            strokeWidth="4"
            style={{
              pathLength,
              strokeLinecap: "round",
            }}
          />
        </svg>

        {/* CTA Button */}
        <div className="flex justify-end mt-6">
          <a href="/ecoPulse">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-lg font-semibold text-white bg-green-600 dark:bg-green-500 rounded-full shadow-lg transition-all duration-300 
          hover:bg-green-700 dark:hover:bg-green-400 hover:shadow-[0_0_12px_rgba(34,197,94,0.7)] focus:outline-none focus:ring-4 focus:ring-green-400">
              EcoPulse
            </motion.button>
          </a>
        </div>
      </div>

      {/* Timeline Items (Text on the Right) */}
      <div className="ml-[700px]">
        {TimelineData.map((item, index) => (
          <motion.div
            key={item.year}
            className="relative flex items-center mb-28"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}>
            {/* Text Container */}
            <div className="w-11/12 pl-12 text-left">
              <h3 className="mb-2 text-3xl font-bold text-gray-800 dark:text-gray-200">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickPulse;
