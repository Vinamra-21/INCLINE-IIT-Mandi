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
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const createZigzagPath = () => {
    const segmentHeight = isMobile ? 20 : 30;
    const zigzagWidth = isMobile ? 150 : 450;
    const curveRadius = isMobile ? 10 : 20;
    const totalSegments = TimelineData.length * 2;

    let path = `M ${isMobile ? 50 : 100} 0`;

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
  const svgHeight = TimelineData.length * (isMobile ? 90 : 240);

  // Calculate the final endpoint position
  const zigzagWidth = isMobile ? 150 : 450;
  const endX = (isMobile ? 50 : 100) + zigzagWidth + (isMobile ? 10 : 20);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-8 md:py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Zigzag SVG Line Container */}
      <div className="absolute h-full left-0 top-0 bottom-0 w-full md:w-auto">
        <div className="relative">
          <svg
            className="w-[200px] md:w-[400px] lg:w-[600px]"
            height={svgHeight}
            viewBox={`0 0 ${isMobile ? 300 : 600} ${svgHeight}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d={createZigzagPath()}
              stroke="currentColor"
              className="text-green-800 dark:text-green-400"
              strokeWidth={isMobile ? 2 : 3}
            />

            <motion.path
              d={createZigzagPath()}
              stroke="currentColor"
              className="text-green-500 dark:text-green-300 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)] dark:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
              strokeWidth={isMobile ? 3 : 4}
              style={{
                pathLength,
                strokeLinecap: "round",
              }}
            />
          </svg>

          {/* CTA Button positioned at the end of vertical line */}
          <div
            className="absolute z-10"
            style={{
              left: endX,
              top: svgHeight - (isMobile ? 10 : 30),
              transform: "translate(-50%, 0)",
            }}>
            <a href="/ecoPulse">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-2 mr-36 mt-2 md:mr-96 md:mt-0 lg:m-0 md:px-6 py-1 md:py-3 text-xs md:text-lg font-semibold text-white bg-green-600 dark:bg-green-500 rounded-full shadow-lg transition-all duration-300 
                hover:bg-green-700 dark:hover:bg-green-400 hover:shadow-[0_0_12px_rgba(34,197,94,0.7)] focus:outline-none focus:ring-4 focus:ring-green-400">
                EcoPulse
              </motion.button>
            </a>
          </div>
        </div>
      </div>

      {/* Timeline Items */}
      <div className="relative ml-[200px] md:ml-[400px] lg:ml-[600px] md:mt-0">
        {TimelineData.map((item, index) => (
          <motion.div
            key={item.year}
            className="relative flex items-center mb-14 md:mb-36"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}>
            <div className="w-full md:w-11/12 md:pl-10 text-left">
              <h3 className="md:mb-2 text-sm md:text-3xl font-bold text-gray-800 dark:text-gray-200">
                {item.title}
              </h3>
              <p className="text-[10px] md:text-base text-gray-600 dark:text-gray-400">
                {item.content}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickPulse;
