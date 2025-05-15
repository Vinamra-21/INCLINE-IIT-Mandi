import React, { useState, useEffect } from "react";
import { Sun, Moon, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useDarkMode from "./useDarkMode";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const [theme, toggleTheme] = useDarkMode() as [string, () => void];
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const { isAuthenticated } = useAuth();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Set current path for conditional rendering
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);

      // Update path on navigation
      const handleRouteChange = () => {
        setCurrentPath(window.location.pathname);
      };

      window.addEventListener("popstate", handleRouteChange);
      return () => window.removeEventListener("popstate", handleRouteChange);
    }
  }, []);

  // Check if current route is a feature route
  const isFeatureRoute = () => {
    const featureRoutes = [
      "/climateImpact",
      "/droughtMonitor",
      "/extremeIndices",
      "/watershedDelineation",
      "/jalShakti",
    ];
    return featureRoutes.some((route) => currentPath.startsWith(route));
  };

  // Get info text based on current route
  const getInfoText = () => {
    switch (true) {
      case currentPath.startsWith("/climateImpact"):
        return (
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            <h3 className="font-semibold text-base text-gray-900 dark:text-white">
              Temporal Snapshot
            </h3>

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-800 dark:text-gray-300">
                Data Sources and Definitions:
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <span className="font-medium">Variables:</span> Precipitation,
                maximum temperature, and minimum temperature.
              </p>

              <div className="ml-2 space-y-2">
                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  IMD Data:
                </h5>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>
                    Observed Data (Precipitation): Daily rainfall records from
                    the Indian Meteorological Department.
                  </li>
                  <li>Original Resolution: 0.25º × 0.25º.</li>
                  <li>
                    Downscaled: To 0.125º × 0.125º using bilinear interpolation
                    for consistency.
                  </li>
                  <li>Observed Data Range: 1979–2014.</li>
                </ul>

                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  IMDAA Data:
                </h5>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>
                    Observed Data (Temperature): Daily minimum and maximum
                    temperature records from Indian Monsoon Assimilation and
                    Analysis system.
                  </li>
                  <li>Original Resolution: 0.125º × 0.125º.</li>
                  <li>Observed Data Range: 1979–2014.</li>
                </ul>

                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  CMIP6 Models:
                </h5>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>
                    Used for future projections from 2015–2100 under two
                    scenarios:
                    <ul className="list-disc ml-4">
                      <li>SSP2-4.5: Medium emission.</li>
                      <li>SSP5-8.5: High emission.</li>
                    </ul>
                  </li>
                  <li>
                    Ensemble mean of 12 CMIP6 models: ACCESS-CM2, ACCESS-ESM1-5,
                    BCC-CSM2-MR, CMCC-CM2, INM-CM4-8, INM-CM5-0, MPI-ESM1-2LR,
                    MRI-ESM2-0, NESM3, NorESM2-LM, NorESM2-MM, TaiESM1
                  </li>
                </ul>

                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  Spatial Aggregation:
                </h5>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>
                    District-wise means calculated by overlaying district
                    boundaries on gridded data.
                  </li>
                  <li>
                    Similar processes applied for river basins and states.
                  </li>
                  <li>
                    Resolution: Gridded datasets standardized to 0.125º ×
                    0.125º.
                  </li>
                </ul>

                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  Temporal Scales:
                </h5>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>
                    Daily, monthly (resampled with Python's xarray library), and
                    annual intervals.
                  </li>
                  <li>Historical Data: 1979–2014.</li>
                  <li>Future Projections: 2015–2100.</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case currentPath.startsWith("/droughtMonitor"):
        return (
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            <h3 className="font-semibold text-base text-gray-900 dark:text-white">
              Drought Monitoring
            </h3>

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-800 dark:text-gray-300">
                Drought Indicators:
              </h4>

              <div className="ml-2 space-y-3">
                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  SPI (Standardized Precipitation Index):
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  SPI is a popular meteorological drought index based on
                  precipitation data. It quantifies precipitation deficits over
                  various timescales, helping to assess drought severity by
                  comparing current conditions to historical data.
                </p>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>Scales Available: 1-month, 3-month, 6-month</li>
                  <li>
                    Range:
                    <ul className="list-disc ml-4">
                      <li>Wet Conditions: SPI &gt; 1.0</li>
                      <li>Normal Conditions: SPI between -1.0 and 1.0</li>
                      <li>Dry Conditions: SPI &lt; -1.0</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  SPEI (Standardized Precipitation Evapotranspiration Index):
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  SPEI allows comparison of drought severity through time and
                  space. It combines the sensitivity of PDSI with the simplicity
                  of calculation and the multi-temporal nature of SPI,
                  incorporating temperature and evapotranspiration.
                </p>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>Scales Available: 1-month, 3-month, 6-month</li>
                  <li>
                    Range:
                    <ul className="list-disc ml-4">
                      <li>Wet Conditions: SPEI &gt; 1.0</li>
                      <li>Normal Conditions: SPEI between -1.0 and 1.0</li>
                      <li>Dry Conditions: SPEI &lt; -1.0</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  NDVI (Normalized Difference Vegetation Index):
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  NDVI is a remote sensing-based index that measures vegetation
                  conditions using the advanced very high resolution radiometer
                  (AVHRR). It analyzes the difference between near-infrared and
                  visible light reflectance to assess vegetation health.
                </p>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>Scales Available: No temporal scale</li>
                  <li>
                    Range:
                    <ul className="list-disc ml-4">
                      <li>Healthy Vegetation: NDVI &gt; 0.6</li>
                      <li>
                        Moderate Vegetation Stress: NDVI between 0.2 and 0.6
                      </li>
                      <li>Severe Vegetation Stress: NDVI &lt; 0.2</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <h4 className="font-medium text-sm text-gray-800 dark:text-gray-300 mt-3">
                Components:
              </h4>

              <div className="ml-2 space-y-2">
                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  Temporal Snapshot:
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Provides a time-series analysis of SPI, SPEI, and NDVI.
                </p>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>
                    Temporal Scales:
                    <ul className="list-disc ml-4">
                      <li>SPI and SPEI: 1, 3, and 6-month scales</li>
                      <li>NDVI: No temporal scale</li>
                    </ul>
                  </li>
                  <li>Resolution: 0.125º × 0.125º</li>
                  <li>
                    Spatial Aggregation: District-wise, state-wise, and river
                    basin-wise
                  </li>
                </ul>

                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  Spatial Pattern of Drought:
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Displays raster layers based on the selected index and scale
                  with various color bar options.
                </p>
              </div>

              <h4 className="font-medium text-sm text-gray-800 dark:text-gray-300 mt-3">
                Data Contributors:
              </h4>
              <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                <li>Ashish Patania, PhD Scholar in HIMPACT LAB, IIT Mandi</li>
                <li>
                  Syed Bakhtawar Bilal, PhD Scholar in HIMPACT LAB, IIT Mandi
                </li>
                <li className="italic">
                  Bilal, S.B. and Gupta, V. (2024) 'Deciphering the spatial
                  fingerprint of drought propagation through precipitation,
                  vegetation and groundwater', International Journal of
                  Climatology, 44(12), pp. 4443–4461.
                </li>
              </ul>
            </div>
          </div>
        );

      case currentPath.startsWith("/extremeIndices"):
        return (
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            <h3 className="font-semibold text-base text-gray-900 dark:text-white">
              Extreme Indices App
            </h3>

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-800 dark:text-gray-300">
                ETCCDI Indices
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                The ETCCDI (Expert Team on Climate Change Detection and Indices)
                defines several indices to monitor the occurrence of climate
                extremes related to precipitation and temperature.
              </p>

              <div className="ml-2 space-y-3">
                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  Precipitation Indices:
                </h5>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>
                    <span className="font-medium">Rx1day:</span> Maximum 1-day
                    precipitation amount. Measures the highest amount of
                    precipitation that falls in a single day within a given
                    period.
                  </li>
                  <li>
                    <span className="font-medium">Rx5day:</span> Maximum 5-day
                    precipitation amount. Measures the highest amount of
                    precipitation that falls within any consecutive 5-day
                    period.
                  </li>
                  <li>
                    <span className="font-medium">R10mm:</span> Number of heavy
                    precipitation days. Counts the number of days with
                    precipitation ≥ 10mm.
                  </li>
                  <li>
                    <span className="font-medium">R20mm:</span> Number of very
                    heavy precipitation days. Counts the number of days with
                    precipitation ≥ 20mm.
                  </li>
                  <li>
                    <span className="font-medium">CDD:</span> Consecutive dry
                    days. Measures the maximum number of consecutive days with
                    precipitation &lt; 1mm.
                  </li>
                  <li>
                    <span className="font-medium">CWD:</span> Consecutive wet
                    days. Measures the maximum number of consecutive days with
                    precipitation ≥ 1mm.
                  </li>
                  <li>
                    <span className="font-medium">PRCPTOT:</span> Annual total
                    wet-day precipitation. Sums the total precipitation on days
                    with precipitation ≥ 1mm over a year.
                  </li>
                </ul>

                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  Temperature Extreme Indices:
                </h5>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>
                    <span className="font-medium">TNx:</span> Warmest Night.
                    Monthly maximum value of daily minimum temperature.
                  </li>
                  <li>
                    <span className="font-medium">TNn:</span> Coldest Night.
                    Monthly minimum value of daily minimum temperature.
                  </li>
                  <li>
                    <span className="font-medium">FD:</span> Frost Days. Counts
                    the number of days where the daily minimum temperature is
                    below 0°C.
                  </li>
                  <li>
                    <span className="font-medium">ID:</span> Icing Days. Counts
                    the number of days where the daily maximum temperature is
                    below 0°C.
                  </li>
                  <li>
                    <span className="font-medium">SU:</span> Summer Days. Counts
                    the number of days where the daily maximum temperature
                    exceeds 25°C.
                  </li>
                  <li>
                    <span className="font-medium">TR:</span> Tropical Nights.
                    Counts the number of days where the daily minimum
                    temperature exceeds 20°C.
                  </li>
                  <li>
                    <span className="font-medium">GSL:</span> Growing Season
                    Length. Measures the length of the growing season, defined
                    as the number of days between specific temperature
                    thresholds.
                  </li>
                  <li>
                    <span className="font-medium">TX10p:</span> Cool Days.
                    Percentage of days where the daily maximum temperature is
                    below the 10th percentile.
                  </li>
                  <li>
                    <span className="font-medium">TX90p:</span> Warm Days.
                    Percentage of days where the daily maximum temperature is
                    above the 90th percentile.
                  </li>
                  <li>
                    <span className="font-medium">TN10p:</span> Cool Nights.
                    Percentage of days where the daily minimum temperature is
                    below the 10th percentile.
                  </li>
                  <li>
                    <span className="font-medium">TN90p:</span> Warm Nights.
                    Percentage of days where the daily minimum temperature is
                    above the 90th percentile.
                  </li>
                  <li>
                    <span className="font-medium">WSDI:</span> Warm Spell
                    Duration Index. Measures the number of days in a year where
                    at least six consecutive days have daily maximum temperature
                    above the 90th percentile.
                  </li>
                  <li>
                    <span className="font-medium">CSDI:</span> Cold Spell
                    Duration Index. Measures the number of days in a year where
                    at least six consecutive days have daily minimum temperature
                    below the 10th percentile.
                  </li>
                  <li>
                    <span className="font-medium">DTR:</span> Diurnal
                    Temperature Range. Measures the difference between the daily
                    maximum and daily minimum temperature.
                  </li>
                </ul>

                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  Methodology:
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  The functions used to generate these indices were derived from
                  the xclim library, a Python-based library for climate data
                  analysis. xclim provides robust implementations of climate
                  indicators following international standards, ensuring
                  accuracy and consistency in the calculations.
                </p>
              </div>
            </div>
          </div>
        );

      case currentPath.startsWith("/watershedDelineation"):
        return (
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            <h3 className="font-semibold text-base text-gray-900 dark:text-white">
              Watershed Delineation App
            </h3>

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-800 dark:text-gray-300">
                Key Features:
              </h4>

              <div className="ml-2 space-y-3">
                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  Data Sources:
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  The app utilizes data from MERIT-Hydro, a high-resolution
                  global hydrography dataset.
                </p>

                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  Interactive Visualization:
                </h5>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>
                    Users can interactively explore watershed boundaries and
                    visualize the upstream area from any selected point within a
                    watershed.
                  </li>
                  <li>
                    The app provides detailed, real-time maps, helping users
                    understand hydrological dynamics in the region.
                  </li>
                </ul>

                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  Downloadable Data:
                </h5>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>
                    Watershed boundaries and associated data can be downloaded
                    in multiple formats, including Shapefile, for integration
                    with GIS tools.
                  </li>
                  <li>
                    This feature makes it easy for users to utilize the data for
                    further analysis, reporting, and decision-making.
                  </li>
                </ul>

                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  Upstream Mapping:
                </h5>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>
                    By clicking on any point within the watershed, users can
                    visualize the upstream area of that location along with the
                    delineated boundary.
                  </li>
                  <li>
                    This feature is particularly useful for understanding water
                    flow, catchment areas, and potential impacts on water
                    resources.
                  </li>
                  <li>
                    Data and method used in this app are based on Matthew
                    Heberger's research.
                  </li>
                </ul>
              </div>

              <h4 className="font-medium text-sm text-gray-800 dark:text-gray-300 mt-3">
                Interactive Features:
              </h4>
              <div className="ml-2 space-y-2">
                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  Watershed Boundary Visualization:
                </h5>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>
                    Users can view detailed watershed boundaries overlaid on
                    real-time maps, which represent the drainage basins of a
                    region.
                  </li>
                  <li>
                    Each watershed is clearly delineated, allowing users to
                    focus on specific regions for analysis.
                  </li>
                </ul>

                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  Upstream Area Exploration:
                </h5>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>
                    Users can select any location within the watershed to
                    explore the upstream area and view the hydrological flow
                    from that point.
                  </li>
                  <li>
                    This feature provides insight into water catchment dynamics,
                    upstream water sources, and potential water resource
                    management implications.
                  </li>
                </ul>

                <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300">
                  Data Download Options:
                </h5>
                <ul className="list-disc ml-4 text-xs text-gray-600 dark:text-gray-400">
                  <li>
                    Shapefiles of watershed boundaries and associated
                    hydrological data can be downloaded for use in GIS software
                    for more detailed spatial analysis.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return "This feature provides detailed information about climate impacts in India.";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Hide navbar when scrolling down
      } else {
        setShowNavbar(true); // Show navbar when scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed w-full top-0 z-50 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/">
            <div className="flex items-center">
              <img
                src="/INCLINE.png"
                alt="INCLINE Logo"
                className="h-10 w-10 mr-3"
              />
              <span className="text-xl font-bold text-black dark:text-white">
                INCLINE
              </span>
            </div>
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/ecoPulse">EcoPulse</NavLink>
            {isAuthenticated && <NavLink href="/jalShakti">Jal Shakti</NavLink>}

            {/* Information button - only show on feature routes */}
            {isFeatureRoute() && (
              <div className="relative">
                <button
                  onClick={() => setShowInfoPopup(!showInfoPopup)}
                  className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
                  aria-label="Show information">
                  <Info
                    size={20}
                    className="text-blue-700 dark:text-blue-300"
                  />
                </button>

                {/* Info popup */}
                <AnimatePresence>
                  {showInfoPopup && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-64 md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-sm z-50">
                      <p className="text-gray-800 dark:text-gray-200">
                        {getInfoText()}
                      </p>
                      <button
                        onClick={() => setShowInfoPopup(false)}
                        className="mt-2 text-blue-600 dark:text-blue-400 text-xs hover:underline">
                        Close
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label="Toggle dark mode">
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-300" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
          </nav>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Toggle menu">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6 py-4 space-y-4">
              <NavLink href="/features" onClick={() => setIsOpen(false)}>
                Features
              </NavLink>
              <NavLink href="about" onClick={() => setIsOpen(false)}>
                About
              </NavLink>
              <NavLink href="/ecoPulse" onClick={() => setIsOpen(false)}>
                EcoPulse
              </NavLink>
              {isAuthenticated && (
                <NavLink href="/jalShakti" onClick={() => setIsOpen(false)}>
                  Jal Shakti
                </NavLink>
              )}

              {/* Information button in mobile menu - only show on feature routes */}
              {isFeatureRoute() && (
                <div className="relative">
                  <button
                    onClick={() => setShowInfoPopup(!showInfoPopup)}
                    className="flex items-center space-x-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                    aria-label="Show information">
                    <Info size={16} />
                    <span>Feature Information</span>
                  </button>

                  {/* Mobile info popup */}
                  <AnimatePresence>
                    {showInfoPopup && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 text-sm">
                        <p className="text-gray-800 dark:text-gray-200">
                          {getInfoText()}
                        </p>
                        <button
                          onClick={() => setShowInfoPopup(false)}
                          className="mt-2 text-blue-600 dark:text-blue-400 text-xs hover:underline">
                          Close
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label="Toggle dark mode">
                {theme === "dark" ? (
                  <Sun size={20} className="text-yellow-300" />
                ) : (
                  <Moon size={20} className="text-gray-700" />
                )}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <a
    href={href}
    className="relative block text-gray-800 dark:text-gray-200 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200 text-sm font-medium group"
    onClick={onClick}>
    {children}
    <motion.div className="absolute left-0 bottom-0 h-0.5 bg-green-500 dark:bg-green-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
  </a>
);

export default Header;
