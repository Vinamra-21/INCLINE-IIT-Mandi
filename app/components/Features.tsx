import { motion } from "framer-motion";
import {
  ThermometerSun,
  CloudRain,
  Mountain,
  BarChart2,
  Database,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: ThermometerSun,
    title: "Climate Impact Snapshot",
    description:
      "Get a quick overview of climate impacts in your region with projections for temperature and precipitation using CMIP6. Designed for accessibility, this app helps users explore climate trends across India.",
    link: "/climateImpact",
  },
  {
    icon: CloudRain,
    title: "Drought Monitor App",
    description:
      "Track and analyze drought conditions using SPI, SPEI, and NDVI indices. This tool provides insights into precipitation trends, drought severity, and vegetation health, offering a comprehensive view of climate-driven changes.",
    link: "/droughtMonitor",
  },
  {
    icon: Mountain,
    title: "Incline Watershed Delineation",
    description:
      "Easily delineate watersheds across India using high-quality datasets like MERIT-Hydro and MERIT-Basins. Visualize watershed boundaries and export data in multiple formats for further analysis.",
    link: "/watershedDelineation",
  },
  {
    icon: BarChart2,
    title: "Extreme Indices",
    description:
      "Analyze extreme climate indices, including temperature and precipitation trends. This tool offers time series visualization and allows users to compute indices using their own datasets.",
    link: "/extremeIndices",
  },
  {
    icon: Database,
    title: "Data Portal",
    description:
      "Access tools to help communities plan and prepare for climate change by leveraging scientific data and insights.",
    link: "/dataPortal",
  },
  {
    icon: Sparkles,
    title: "View More Features",
    description:
      "Exciting new features are on the horizon—stay tuned for what's next. ✨",
    link: "/features",
  },
];

const Features = () => {
  const isFeaturePage = window.location.pathname === "/features";

  // Filter out the last feature if on the features page
  const visibleFeatures = isFeaturePage ? features.slice(0, -1) : features;

  return (
    <section
      id="features"
      className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-green-600 dark:text-green-300 mb-12">
          Our Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.a
                key={index}
                href={feature.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl dark:hover:shadow-green-500/30 transition-all duration-300 border border-gray-100 dark:border-gray-700 block">
                <div className="flex items-center justify-center w-16 h-16 bg-green-50 dark:bg-green-900 rounded-full mb-4">
                  <Icon className="w-10 h-10 text-green-500 dark:text-green-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
