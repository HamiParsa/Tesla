"use client";

// ============================================================
// DEPENDENCIES
// ============================================================
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiTesla } from "react-icons/si";
import { 
  FaBolt, 
  FaBatteryFull, 
  FaRoad, 
  FaArrowRight,
  FaCloudSun,
  FaSnowflake,
  FaMicrochip,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaTachometerAlt,
} from "react-icons/fa";
import { MdSpeed } from "react-icons/md";

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function Home() {
  // ==========================================================
  // STATE MANAGEMENT
  // ==========================================================

  const [darkMode, setDarkMode] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [, setIsFullscreen] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const autoRotateTimer = useRef<NodeJS.Timeout | null>(null);
  const glitchTimer = useRef<NodeJS.Timeout | null>(null);


  // ==========================================================
  // EFFECTS
  // ==========================================================

  /**
   * Loading screen simulation
   */
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Load dark mode preference
   */
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(saved === "true");
  }, []);

  /**
   * Auto-rotate through sections
   */
useEffect(() => {
  if (isAutoRotating && !isLoading) {
    autoRotateTimer.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carData.length);
    }, 4500);
  }
  return () => {
    if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isAutoRotating, isLoading]);

  /**
   * Random glitch effect
   */
  useEffect(() => {
    glitchTimer.current = setInterval(() => {
      if (Math.random() > 0.85) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 3000);
    return () => {
      if (glitchTimer.current) clearInterval(glitchTimer.current);
    };
  }, []);

  // ==========================================================
  // EVENT HANDLERS
  // ==========================================================

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", (!darkMode).toString());
  };

  const goToSection = (index: number) => {
    setActiveIndex(index);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 6000);
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStart;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSection(Math.max(0, activeIndex - 1));
      } else {
        goToSection(Math.min(carData.length - 1, activeIndex + 1));
      }
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // ==========================================================
  // DATA
  // ==========================================================

  const carData = [
    {
      id: 0,
      model: "CyberBeast X",
      tagline: "Future. Reinvented.",
      description: "The pinnacle of electric engineering with a revolutionary exoskeleton design. Built for the next century with cutting-edge AI and unparalleled performance.",
      image: "https://www.pngall.com/wp-content/uploads/11/Tesla-Model-S-PNG-Images-HD.png",
      specs: {
        acceleration: "1.9s",
        topSpeed: "200 mph",
        range: "396 mi",
        power: "1,020 hp",
        torque: "1,050 lb-ft",
        battery: "100 kWh",
      },
      features: ["Tri-Motor AWD", "Exoskeleton Frame", "Autopilot 4.0", "17\" Screen"],
      color: "#FF6B35",
      gradient: "from-orange-600 to-red-600",
      icon: <FaBolt />,
      efficiency: "98%",
    },
    {
      id: 1,
      model: "Lunar Eclipse",
      tagline: "Beyond the horizon.",
      description: "Luxury redefined with zero-emission performance. Experience the quietest cabin ever built with active noise cancellation and premium materials.",
      image: "https://www.nicepng.com/png/full/77-778891_model-s-tesla-model-3-png.png",
      specs: {
        acceleration: "2.3s",
        topSpeed: "180 mph",
        range: "420 mi",
        power: "850 hp",
        torque: "900 lb-ft",
        battery: "95 kWh",
      },
      features: ["Dual Motor", "Air Suspension", "Soundproof Glass", "22\" Wheels"],
      color: "#4ECDC4",
      gradient: "from-teal-400 to-cyan-500",
      icon: <FaCloudSun />,
      efficiency: "96%",
    },
    {
      id: 2,
      model: "Apex GT",
      tagline: "Unleash the storm.",
      description: "Uncompromising performance meets sustainable luxury. The ultimate grand tourer with active aerodynamics and track-ready suspension.",
      image: "https://www.pngplay.com/wp-content/uploads/13/Tesla-Model-X-Free-PNG.png",
      specs: {
        acceleration: "2.5s",
        topSpeed: "175 mph",
        range: "350 mi",
        power: "780 hp",
        torque: "850 lb-ft",
        battery: "90 kWh",
      },
      features: ["Falcon Doors", "HEPA Filter", "Bioweapon Mode", "Tow Package"],
      color: "#FF6B6B",
      gradient: "from-rose-500 to-pink-600",
      icon: <FaSnowflake />,
      efficiency: "94%",
    },
    {
      id: 3,
      model: "Nova R",
      tagline: "Drive the future.",
      description: "Compact, agile, and fiercely efficient. The perfect urban electric companion with intuitive controls and maximum cargo flexibility.",
      image: "https://www.pngplay.com/wp-content/uploads/13/Tesla-Model-Y-PNG-Photos.png",
      specs: {
        acceleration: "3.5s",
        topSpeed: "160 mph",
        range: "330 mi",
        power: "680 hp",
        torque: "750 lb-ft",
        battery: "82 kWh",
      },
      features: ["Compact SUV", "Glass Roof", "Cargo Space", "Trailer Hitch"],
      color: "#FFD93D",
      gradient: "from-yellow-400 to-orange-500",
      icon: <FaBatteryFull />,
      efficiency: "97%",
    },
    {
      id: 4,
      model: "Quantum S",
      tagline: "Evolve beyond.",
      description: "The most advanced vehicle on the planet. Neural interface ready for tomorrow with quantum computing capabilities and self-healing materials.",
      image: "https://www.pngall.com/wp-content/uploads/11/Tesla-Model-S-PNG-Images-HD.png",
      specs: {
        acceleration: "1.7s",
        topSpeed: "210 mph",
        range: "450 mi",
        power: "1,200 hp",
        torque: "1,100 lb-ft",
        battery: "120 kWh",
      },
      features: ["Quantum Drive", "Neural Link", "Solar Roof", "AI Assistant"],
      color: "#A78BFA",
      gradient: "from-purple-500 to-indigo-600",
      icon: <FaMicrochip />,
      efficiency: "99%",
    },
    {
      id: 5,
      model: "Terra X",
      tagline: "Adventure awaits.",
      description: "Off-road electric SUV with unmatched capability. Conquer any terrain silently with adaptive suspension and all-terrain tires.",
      image: "https://www.nicepng.com/png/full/77-778891_model-s-tesla-model-3-png.png",
      specs: {
        acceleration: "3.8s",
        topSpeed: "150 mph",
        range: "310 mi",
        power: "650 hp",
        torque: "800 lb-ft",
        battery: "88 kWh",
      },
      features: ["Off-Road Mode", "Underbody Shield", "Winch Ready", "Roof Rack"],
      color: "#6B8E23",
      gradient: "from-green-600 to-emerald-700",
      icon: <FaRoad />,
      efficiency: "92%",
    },
  ];

  const currentCar = carData[activeIndex];

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <main
      className={`${
        darkMode ? "bg-[#0a0a0f] text-white" : "bg-[#f5f5f7] text-gray-900"
      } relative w-full min-h-screen overflow-hidden transition-colors duration-700`}
    >
      {/* ==========================================================
          LOADING SCREEN
          ========================================================== */}

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0a0a0f]"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-6xl mb-8"
            >
              <SiTesla />
            </motion.div>
            <motion.div
              className="w-48 h-1 bg-white/10 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: 192 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            >
              <motion.div
                className="h-full bg-linear-to-r from-orange-500 to-red-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.p
              className="mt-4 text-xs tracking-[0.3em] text-white/30 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              INITIALIZING SYSTEM
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================================
          AMBIENT BACKGROUND EFFECTS
          ========================================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-60 -left-60 w-[600px] h-[600px] rounded-full blur-[120px]"
          animate={{
            x: [0, 150, -80, 0],
            y: [0, -80, 120, 0],
            scale: [1, 1.3, 0.7, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ 
            background: `radial-gradient(circle, ${currentCar.color}40, transparent 70%)`,
          }}
        />
        <motion.div
          className="absolute -bottom-60 -right-60 w-[600px] h-[600px] rounded-full blur-[120px]"
          animate={{
            x: [0, -120, 100, 0],
            y: [0, 100, -80, 0],
            scale: [1, 0.7, 1.3, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          style={{ 
            background: `radial-gradient(circle, ${currentCar.color}30, transparent 70%)`,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ 
            background: `radial-gradient(circle, ${currentCar.color}20, transparent 70%)`,
          }}
        />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${currentCar.color} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ==========================================================
          HEADER
          ========================================================== */}

      <header className={`fixed top-0 left-0 z-50 w-full flex justify-between items-center px-6 md:px-12 py-4 ${
        darkMode 
          ? "bg-linear-to-b from-black/80 to-transparent border-white/5" 
          : "bg-linear-to-b from-white/80 to-transparent border-gray-200/20"
      } backdrop-blur-2xl border-b transition-all duration-500`}>
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className={`text-2xl ${darkMode ? "text-white" : "text-gray-800"}`}
          >
            <SiTesla />
          </motion.div>
          <div>
            <h1 className={`text-xl md:text-2xl font-bold tracking-[0.2em] ${
              darkMode 
                ? "bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent" 
                : "bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            }`}>
              VELOCITY
            </h1>
            <div className={`text-[8px] tracking-[0.4em] font-mono ${darkMode ? "text-white/20" : "text-gray-400"}`}>
              ELECTRIC PERFORMANCE
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden lg:flex gap-2">
            {carData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSection(idx)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  activeIndex === idx
                    ? `w-10 ${darkMode ? "bg-white shadow-lg shadow-white/30" : "bg-gray-900 shadow-lg shadow-gray-900/30"}`
                    : `w-3 ${darkMode ? "bg-white/20 hover:bg-white/40" : "bg-gray-300 hover:bg-gray-500"}`
                }`}
                aria-label={`Go to ${carData[idx].model}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={toggleAutoRotate}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode 
                  ? "hover:bg-white/10 text-white/60 hover:text-white" 
                  : "hover:bg-gray-200 text-gray-500 hover:text-gray-800"
              }`}
              title={isAutoRotating ? "Pause auto-rotate" : "Resume auto-rotate"}
            >
              {isAutoRotating ? <FaPause size={12} /> : <FaPlay size={12} />}
            </button>

            <button
              onClick={toggleMute}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode 
                  ? "hover:bg-white/10 text-white/60 hover:text-white" 
                  : "hover:bg-gray-200 text-gray-500 hover:text-gray-800"
              }`}
            >
              {isMuted ? <FaVolumeMute size={12} /> : <FaVolumeUp size={12} />}
            </button>

            <button
              onClick={toggleFullscreen}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode 
                  ? "hover:bg-white/10 text-white/60 hover:text-white" 
                  : "hover:bg-gray-200 text-gray-500 hover:text-gray-800"
              }`}
            >
              <FaExpand size={12} />
            </button>

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 ${
                darkMode 
                  ? "hover:bg-white/10 text-white/60 hover:text-white" 
                  : "hover:bg-gray-200 text-gray-500 hover:text-gray-800"
              }`}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================================
          MAIN 3D CARD
          ========================================================== */}

      <div
        ref={containerRef}
        className="relative z-10 flex items-center justify-center w-full h-screen px-4 md:px-8"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <motion.div
          className="relative w-full max-w-7xl"
          style={{ perspective: 1400 }}
        >
          <motion.div
            ref={cardRef}
            className={`relative rounded-3xl border shadow-[0_40px_120px_rgba(0,0,0,0.4)] overflow-hidden transition-colors duration-500 ${
              darkMode 
                ? "bg-white/4 border-white/10" 
                : "bg-white/80 border-gray-200/50"
            }`}
            style={{
              transformStyle: "preserve-3d",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
            }}
            animate={{
              boxShadow: darkMode
                ? [
                    `0 40px 120px ${currentCar.color}15, 0 0 80px ${currentCar.color}05`,
                    `0 40px 160px ${currentCar.color}25, 0 0 120px ${currentCar.color}10`,
                    `0 40px 120px ${currentCar.color}15, 0 0 80px ${currentCar.color}05`,
                  ]
                : [
                    `0 40px 120px rgba(0,0,0,0.08)`,
                    `0 40px 160px ${currentCar.color}15`,
                    `0 40px 120px rgba(0,0,0,0.08)`,
                  ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[70vh]">
              {/* ==========================================================
                  LEFT - IMAGE
                  ========================================================== */}

              <motion.div
                className={`relative flex items-center justify-center p-8 md:p-12 lg:p-16 ${
                  darkMode 
                    ? "bg-linear-to-br from-black/60 via-black/20 to-transparent" 
                    : "bg-linear-to-br from-white/60 via-white/20 to-transparent"
                }`}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {Object.entries(currentCar.specs).slice(0, 3).map(([key, value], idx) => (
                    <motion.div
                      key={key}
                      className={`px-3 py-1.5 backdrop-blur-xl rounded-full border text-xs font-mono transition-colors duration-300 flex items-center gap-2 ${
                        darkMode
                          ? "bg-black/60 border-white/10 text-white/80"
                          : "bg-white/80 border-gray-200/50 text-gray-700 shadow-sm"
                      }`}
                      initial={{ opacity: 0, x: -30, rotate: -5 }}
                      animate={{ opacity: 1, x: 0, rotate: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      whileHover={{ scale: 1.05, x: 5 }}
                    >
                      <span className="text-[8px] uppercase opacity-50">{key}:</span>
                      <span className="font-bold">{value}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="relative w-full max-w-md lg:max-w-lg"
                  animate={{
                    y: [0, -8, 0],
                    rotateY: [-2, 2, -2],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.img
                    src={currentCar.image}
                    alt={currentCar.model}
                    className="w-full h-auto object-contain relative z-10 drop-shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                    initial={{ opacity: 0, scale: 0.6, rotateY: 30 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    whileHover={{ scale: 1.04, rotateY: 4 }}
                    style={{
                      filter: darkMode ? "brightness(1.1)" : "brightness(1)",
                    }}
                  />

                  <motion.div
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: darkMode ? [0.3, 0.5, 0.3] : [0.15, 0.3, 0.15],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ background: currentCar.color }}
                  />
                </motion.div>

                <div className="absolute bottom-6 right-6 flex flex-wrap gap-2 max-w-[70%] justify-end">
                  {currentCar.features.slice(0, 3).map((feature, idx) => (
                    <motion.span
                      key={feature}
                      className={`px-3 py-1.5 backdrop-blur-xl rounded-full text-[10px] font-mono border transition-colors duration-300 ${
                        darkMode
                          ? "bg-black/60 text-white/80 border-white/10"
                          : "bg-white/80 text-gray-700 border-gray-200/50 shadow-sm"
                      }`}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* ==========================================================
                  RIGHT - CONTENT
                  ========================================================== */}

              <motion.div
                className="flex flex-col justify-center p-8 md:p-12 lg:p-16 space-y-5"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex items-center justify-between">
                  <motion.div
                    className={`inline-flex items-center gap-2 px-4 py-1.5 w-fit rounded-full border text-xs font-mono transition-colors duration-300 ${
                      darkMode
                        ? "bg-linear-to-r from-white/10 to-transparent border-white/10 text-white/60"
                        : "bg-linear-to-r from-gray-200/50 to-transparent border-gray-200/50 text-gray-600"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full animate-pulse" 
                      style={{ background: currentCar.color }} 
                    />
                    ELECTRIC PERFORMANCE
                  </motion.div>

                  <div className={`text-xs font-mono ${darkMode ? "text-white/20" : "text-gray-400"}`}>
                    {activeIndex + 1}/{carData.length}
                  </div>
                </div>

                <motion.div
                  className="relative"
                  animate={glitchActive ? { x: [0, -4, 4, -2, 2, 0] } : {}}
                  transition={{ duration: 0.1 }}
                >
                  <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span className={`${
                      darkMode 
                        ? "bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent"
                        : "bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                    }`}>
                      {currentCar.model}
                    </span>
                  </motion.h2>
                  
                  {glitchActive && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.4, 0] }}
                      transition={{ duration: 0.15 }}
                    >
                      <span className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold ${
                        darkMode ? "text-red-400" : "text-red-600"
                      }`}>
                        {currentCar.model}
                      </span>
                    </motion.div>
                  )}
                </motion.div>

                <motion.p
                  className={`text-xl md:text-2xl font-light tracking-wide transition-colors duration-300 ${
                    darkMode ? "text-white/50" : "text-gray-600"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {currentCar.tagline}
                </motion.p>

                <motion.p
                  className={`text-sm md:text-base max-w-md leading-relaxed transition-colors duration-300 ${
                    darkMode ? "text-white/60" : "text-gray-700"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {currentCar.description}
                </motion.p>

                <motion.div
                  className="grid grid-cols-4 gap-2 pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  {[
                    { label: "0-60", value: currentCar.specs.acceleration, icon: <MdSpeed /> },
                    { label: "Range", value: currentCar.specs.range, icon: <FaRoad /> },
                    { label: "Power", value: currentCar.specs.power, icon: <FaBolt /> },
                    { label: "Efficiency", value: currentCar.efficiency, icon: <FaBatteryFull /> },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className={`p-3 rounded-xl border text-center transition-colors duration-300 ${
                        darkMode
                          ? "bg-white/5 border-white/5 hover:bg-white/10"
                          : "bg-white/50 border-gray-200/30 hover:bg-white/80"
                      }`}
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ type: "spring" }}
                    >
                      <div className={`text-lg ${darkMode ? "text-white/40" : "text-gray-400"} flex justify-center`}>
                        {item.icon}
                      </div>
                      <div className={`text-xs font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {item.value}
                      </div>
                      <div className={`text-[8px] uppercase tracking-widest font-mono ${darkMode ? "text-white/20" : "text-gray-400"}`}>
                        {item.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-3 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: `0 0 50px ${currentCar.color}60` }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-10 py-3.5 rounded-full bg-linear-to-r ${currentCar.gradient} text-white font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg`}
                  >
                    Explore <FaArrowRight className="ml-1" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-10 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 border backdrop-blur-sm ${
                      darkMode
                        ? "bg-white/10 hover:bg-white/20 text-white border-white/10"
                        : "bg-gray-200/50 hover:bg-gray-300/50 text-gray-800 border-gray-200/30"
                    }`}
                  >
                    Configure
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            <div className={`absolute bottom-0 left-0 right-0 h-2px ${darkMode ? "bg-white/5" : "bg-gray-200/50"}`}>
              <motion.div
                className="h-full"
                style={{ background: `linear-gradient(to right, ${currentCar.color}, ${currentCar.color}dd)` }}
                initial={{ width: 0 }}
                animate={{ width: `${((activeIndex + 1) / carData.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ==========================================================
          BOTTOM NAVIGATION
          ========================================================== */}

      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2 md:gap-3 px-4 py-2 rounded-full border transition-colors duration-300 backdrop-blur-2xl ${
        darkMode
          ? "bg-black/60 border-white/10"
          : "bg-white/80 border-gray-200/50 shadow-lg"
      }`}>
        {carData.map((car, idx) => (
          <motion.button
            key={idx}
            onClick={() => goToSection(idx)}
            className={`relative group px-3 md:px-4 py-1.5 rounded-full text-xs transition-all duration-300 ${
              activeIndex === idx
                ? `bg-linear-to-r ${car.gradient} text-white font-bold shadow-lg`
                : darkMode
                  ? "text-white/40 hover:text-white/80 hover:bg-white/10"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-200/50"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-1.5">
              <span className={darkMode ? "text-white/70" : "text-gray-600"}>
                {car.icon}
              </span>
              <span className="hidden sm:inline">{car.model}</span>
              <span className="sm:hidden">{idx + 1}</span>
            </span>
            {activeIndex === idx && (
              <motion.div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                layoutId="activeDot"
                style={{ background: car.color }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* ==========================================================
          SIDE STATS PANEL
          ========================================================== */}

      <div className={`fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-2 text-xs transition-colors duration-300`}>
        {[
          { label: "RANGE", value: currentCar.specs.range, icon: <FaRoad /> },
          { label: "POWER", value: currentCar.specs.power, icon: <FaBolt /> },
          { label: "TORQUE", value: currentCar.specs.torque, icon: <FaTachometerAlt /> },
          { label: "0-60", value: currentCar.specs.acceleration, icon: <MdSpeed /> },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl border backdrop-blur-sm transition-colors duration-300 ${
              darkMode
                ? "bg-black/40 border-white/5 hover:bg-black/60"
                : "bg-white/60 border-gray-200/30 hover:bg-white/80"
            }`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            whileHover={{ x: -4 }}
          >
            <span className={darkMode ? "text-white/30" : "text-gray-400"}>
              {item.icon}
            </span>
            <div className="flex flex-col">
              <span className={`font-mono text-[8px] tracking-widest ${darkMode ? "text-white/20" : "text-gray-400"}`}>
                {item.label}
              </span>
              <span className={`font-bold text-xs ${darkMode ? "text-white" : "text-gray-800"}`}>
                {item.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ==========================================================
          STATUS INDICATOR
          ========================================================== */}

      <motion.div
        className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-30 text-[8px] font-mono tracking-[0.4em] transition-colors duration-300 flex items-center gap-3 ${
          darkMode ? "text-white/15" : "text-gray-400"
        }`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className={`w-1 h-1 rounded-full ${isAutoRotating ? "bg-green-500" : "bg-yellow-500"}`} />
        {isAutoRotating ? "AUTO ROTATING" : "MANUAL MODE"}
        <span className="w-px h-3 bg-current opacity-20" />
        <span>{activeIndex + 1}/{carData.length}</span>
      </motion.div>

      {/* ==========================================================
          CORNER DECORATIONS
          ========================================================== */}

      <div className="fixed bottom-6 left-6 z-30 hidden lg:block">
        <div className={`text-[8px] font-mono tracking-[0.2em] ${darkMode ? "text-white/10" : "text-gray-300"}`}>
          DESIGNED FOR THE FUTURE
        </div>
      </div>

      <div className="fixed top-24 right-6 z-30 hidden lg:block">
        <div className={`text-[8px] font-mono tracking-[0.2em] ${darkMode ? "text-white/10" : "text-gray-300"}`}>
          ELECTRIC • SUSTAINABLE • INTELLIGENT
        </div>
      </div>
    </main>
  );
}