import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  BarChart,
  CloudSun,
  PieChart,
  Building,
  Users,
  Lightbulb,
} from "lucide-react";

const TimelineData = [
  {
    index: 1,
    title: "Climate Data Visualization",
    icon: BarChart,
  },
  {
    index: 2,
    title: "Historical Weather Patterns",
    icon: CloudSun,
  },
  {
    index: 3,
    title: "Future Projections & Modeling",
    icon: PieChart,
  },
  {
    index: 4,
    title: "Climate Impact Analysis",
    icon: Building,
  },
  {
    index: 5,
    title: "Community Resilience Planning",
    icon: Users,
  },
  {
    index: 6,
    title: "Adaptive Strategies and Solutions",
    icon: Lightbulb,
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
    const segmentHeight = isMobile ? 15 : 20;
    const zigzagWidth = isMobile ? 150 : 450;
    const curveRadius = isMobile ? 10 : 20;
    const totalSegments = TimelineData.length * 2;

    let path = `M ${isMobile ? 50 : 100} 0`;

    path += ` v ${
      segmentHeight - curveRadius
    } q 0 ${curveRadius} ${curveRadius} ${curveRadius}`;
    for (let i = 0; i < totalSegments - 4; i++) {
      path += ` h ${
        zigzagWidth - curveRadius
      } q ${curveRadius} 0 ${curveRadius} ${curveRadius}`;
      path += ` v ${
        segmentHeight - curveRadius
      } q 0 ${curveRadius} -${curveRadius} ${curveRadius}`;
      path += ` h -${
        zigzagWidth - curveRadius
      } q -${curveRadius} 0 -${curveRadius} ${curveRadius}`;
      if (i < totalSegments - 5) {
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

  const svgHeight = TimelineData.length * (isMobile ? 60 : 140);

  const zigzagWidth = isMobile ? 150 : 450;
  const endX = (isMobile ? 50 : 120) + zigzagWidth + (isMobile ? 10 : 20);

  return (
    <div
      id="quickPulse"
      ref={containerRef}
      className="relative w-full bg-white dark:bg-gray-900 transition-colors duration-300 flex justify-center">
      <div className="relative max-w-7xl w-full pb-12">
        {/* Zigzag SVG Line Container */}
        <div className="absolute h-full left-0 top-0 bottom-0 ">
          <div className="relative">
            <svg
              className="w-[200px] md:w-[400px] lg:w-[600px] xl:w-[700px]"
              height={svgHeight}
              viewBox={`0 0 ${isMobile ? 300 : 600} ${
                isMobile ? 550 : svgHeight
              }`}
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

            <div
              className="absolute z-10"
              style={{
                left: endX,
                top: svgHeight - (isMobile ? 80 : 160),
                transform: "translate(-50%, 0)",
              }}>
              <a href="/ecoPulse">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 md:px-6 py-1 md:py-3 text-xs md:text-lg font-semibold text-white bg-green-600 dark:bg-green-500 rounded-full shadow-lg transition-all duration-300 
                hover:bg-green-700 dark:hover:bg-green-400 hover:shadow-[0_0_12px_rgba(34,197,94,0.7)] focus:outline-none focus:ring-4 focus:ring-green-400">
                  EcoPulse
                </motion.button>
              </a>
            </div>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="relative ml-[200px] md:ml-[400px] lg:ml-[600px] xl:ml-[700px] md:mt-0 pt-0 max-w-[calc(100%-200px)] md:max-w-[calc(100%-400px)] lg:max-w-[calc(100%-600px)] xl:max-w-[calc(100%-700px)]">
          {TimelineData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.index}
                className="relative flex items-center mb-6 md:mb-20"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <div className="w-full pr-4 md:pr-8 text-left flex items-center">
                  <Icon
                    className="mr-2 text-green-600 dark:text-green-400 flex-shrink-0"
                    size={isMobile ? 16 : 24}
                  />
                  <h3 className="text-sm md:text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickPulse;
