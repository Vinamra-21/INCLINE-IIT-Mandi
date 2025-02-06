// import { motion } from "framer-motion";
// // import {
// //   BarChart3,
// //   CloudSun,
// //   TrendingUp,
// //   Zap,
// //   Shield,
// //   Lightbulb,
// // } from "lucide-react";

// const features = [
//   {
//     // icon: BarChart3,
//     title: "Climate Data Visualization",
//     description:
//       "Interactive charts and maps to visualize complex climate data.",
//   },
//   {
//     // icon: CloudSun,
//     title: "Historical Weather Patterns",
//     description: "Analyze past climate trends and weather events across India.",
//   },
//   {
//     // icon: TrendingUp,
//     title: "Future Projections & Modeling",
//     description:
//       "Explore climate scenarios and predictions for different regions.",
//   },
//   {
//     // icon: Zap,
//     title: "Climate Impact Analysis",
//     description:
//       "Assess potential impacts on agriculture, water resources, and more.",
//   },
//   {
//     // icon: Shield,
//     title: "Community Resilience Planning",
//     description:
//       "Tools for communities to plan and prepare for climate changes.",
//   },
//   {
//     // icon: Lightbulb,
//     title: "Adaptive Strategies and Solutions",
//     description:
//       "Discover and share innovative approaches to climate adaptation.",
//   },
// ];

// const Features = () => {
//   return (
//     <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto px-4">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-3xl font-bold text-center text-green-800 dark:text-green-300 mb-12">
//           Our Features
//         </motion.h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => {
//             // const Icon = feature.icon;
//             return (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
//                 <div className="mb-4">
//                   {/* <Icon className="w-12 h-12 text-green-600 dark:text-green-400" /> */}
//                 </div>
//                 <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300">
//                   {feature.description}
//                 </p>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;
