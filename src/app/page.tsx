"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiTesla } from "react-icons/si";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(saved === "true");
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", (!darkMode).toString());
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [stars, setStars] = useState<{ x: number; size: number; speed: number; glow: string }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: 5 + Math.random() * 10,
      glow: `0 0 ${Math.random() * 6 + 2}px white`,
    }));
    setStars(newStars);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setTrail((prev) => [...prev.slice(-4), { x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const sections = [
    { title: "Model S", description: "Plaid | Dual Motor All-Wheel Drive", image: "https://www.pngall.com/wp-content/uploads/11/Tesla-Model-S-PNG-Images-HD.png" },
    { title: "Model 3", description: "Electric Performance | From $38,990", image: "https://www.nicepng.com/png/full/77-778891_model-s-tesla-model-3-png.png" },
    { title: "Model X", description: "Luxury SUV | Falcon Wing Doors", image: "https://www.pngplay.com/wp-content/uploads/13/Tesla-Model-X-Free-PNG.png" },
    { title: "Model Y", description: "Compact SUV | Range up to 330 mi", image: "https://www.pngplay.com/wp-content/uploads/13/Tesla-Model-Y-PNG-Photos.png" },
  ];

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.02]);
  const yCar = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <main className={`${darkMode ? "bg-black text-white" : "bg-gray-100 text-black"} relative w-full`}>
      {/* Cursor Trail */}
      {trail.map((pos, i) => (
        <motion.div
          key={i}
          style={{ translateX: pos.x, translateY: pos.y }}
          className="fixed top-0 left-0 w-4 h-4 bg-white/60 rounded-full pointer-events-none mix-blend-difference"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.6 }}
        />
      ))}

      {/* Main Cursor */}
      <motion.div
        style={{ translateX: mousePos.x, translateY: mousePos.y }}
        className="fixed top-0 left-0 w-6 h-6 bg-white/80 rounded-full pointer-events-none mix-blend-difference"
      />

      {/* Header */}
      <header className="fixed top-0 left-0 z-50 w-full flex justify-between items-center px-8 py-4  from-black/70 to-transparent">
        <h1 className={`${darkMode ? "text-white" : "text-black"} flex text-2xl font-bold tracking-wide`}>TESLA
          <SiTesla className="mt-1.5" />
        </h1>
        <button onClick={toggleDarkMode} className="px-4 py-2 border rounded-full text-sm hover:scale-105 transition">
          {darkMode ? "Light" : "Dark"}
        </button>
      </header>

      {/* Sections */}
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
        {sections.map((section, i) => (
          <section key={i} className="snap-start relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
            {/* Galactic Background */}
            <motion.div
              style={{ y: yBg, scale: scaleBg }}
              className="absolute inset-0 w-full h-full will-change-transform"
            >
              {/* Stars */}
              {stars.map((star, idx) => (
                <motion.div
                  key={idx}
                  className="absolute rounded-full"
                  style={{
                    width: star.size,
                    height: star.size,
                    left: `${star.x}%`,
                    bottom: "-2px",
                    boxShadow: star.glow,
                    backgroundColor: "white",
                  }}
                  animate={{ bottom: ["-2px", "110%"] }}
                  transition={{ repeat: Infinity, duration: star.speed, ease: "linear" }}
                />
              ))}

              {/* Overlay */}
              <div className={`${darkMode ? "bg-black/30" : "bg-white/20"} absolute inset-0 w-full h-full`} />
            </motion.div>

            {/* Content */}
            <motion.div
              className="relative z-10 flex flex-col items-center gap-4 px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h2 className={`${darkMode ? "text-white" : "text-black"} text-4xl md:text-5xl font-bold`}>
                {section.title}
              </motion.h2>

              {/* Car Image */}
              <motion.img
                src={section.image}
                alt={section.title}
                className="w-full max-w-md h-auto object-contain"
                style={{ y: yCar }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              />

              <motion.p className={`${darkMode ? "text-white/90" : "text-black/90"} mt-2 text-center md:text-base text-sm`}>
                {section.description}
              </motion.p>

              {/* Buttons */}
              <motion.div className="flex flex-col md:flex-row gap-4 mt-4">
                <motion.button whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(255,255,255,0.9)" }} className={`${darkMode ? "bg-white text-black" : "bg-black text-white"} px-8 py-2 rounded-full text-sm font-semibold transition`}>
                  Order Now
                </motion.button>
                <motion.button whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(255,255,255,0.9)" }} className={`${darkMode ? "bg-black/70 text-white" : "bg-white/70 text-black"} px-8 py-2 rounded-full text-sm font-semibold transition`}>
                  Demo Drive
                </motion.button>
              </motion.div>
            </motion.div>
          </section>
        ))}
      </div>
    </main>
  );
}
