import React, { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRootContext } from "../../../../contexts/RootContext";

const LatestHero: React.FC = memo(() => {
  const [latestNews, setLatestNews] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { googleSheet_URl } = useRootContext();

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch(`${googleSheet_URl}LatestData`);
        const data = await response.json();
        setLatestNews(data.data[0]);
      } catch (error) {
        console.error("Error fetching latest news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestNews();
  }, [googleSheet_URl]);

  // Get images array from different formats
  const getImages = () => {
    if (!latestNews?.Value) return [];

    if (Array.isArray(latestNews.Value)) {
      return latestNews.Value;
    }

    if (typeof latestNews.Value === 'string') {
      try {
        const parsed = JSON.parse(latestNews.Value);
        return Array.isArray(parsed) ? parsed : [latestNews.Value];
      } catch {
        return latestNews.Value.includes(',')
          ? latestNews.Value.split(',').map((img: string) => img.trim())
          : [latestNews.Value];
      }
    }

    return [];
  };

  // Auto slideshow
  useEffect(() => {
    if (latestNews?.type !== "slider") return;

    const images = getImages();
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [latestNews, currentIndex]);

  const handlePrev = () => {
    const images = getImages();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    const images = getImages();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (isLoading) {
    return (
      <motion.div
        className="w-full h-full relative rounded-2xl overflow-hidden bg-gray-200"
        animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)",
          backgroundSize: "200% 100%",
        }}
      />
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl md:p-2 p-6">
      {latestNews?.type === "vedio" ? (
        <video
          src={latestNews?.Value}
          className="w-full h-full object-cover object-center rounded-2xl"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : latestNews?.type === "slider" ? (
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          {/* Remove mode="wait" for seamless crossfade */}
          <AnimatePresence>
            {(() => {
              const images = getImages();
              if (images.length === 0) return null;

              return (
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`Slide ${currentIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  initial={{
                    opacity: 0,
                    scale: 1.05
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                />
              );
            })()}
          </AnimatePresence>

          {/* Navigation Controls */}
          {getImages().length > 1 && (
            <>
              {/* Left Arrow */}
              <motion.button
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:from-black/60 hover:to-black/30 transition-all duration-300 z-10 shadow-lg"
                onClick={handlePrev}
                whileHover={{
                  scale: 1.15,
                  rotate: -5,
                  boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{
                  scale: 0.9,
                  rotate: 0
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                <motion.svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: -1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </motion.svg>
              </motion.button>

              {/* Right Arrow */}
              <motion.button
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:from-black/60 hover:to-black/30 transition-all duration-300 z-10 shadow-lg"
                onClick={handleNext}
                whileHover={{
                  scale: 1.15,
                  rotate: 5,
                  boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{
                  scale: 0.9,
                  rotate: 0
                }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                <motion.svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.button>

              {/* Dots Indicator */}
              <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
                {getImages().map((_:any, index:number) => (
                  <motion.button
                    key={index}
                    className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-white"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              {/* Image Counter */}
              <motion.div
                className="absolute top-3 md:top-4 right-3 md:right-4 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-md border border-white/10 rounded-full px-2 py-1 md:px-3 md:py-1 text-white text-xs md:text-sm font-medium shadow-lg"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.3)"
                }}
              >
                <motion.span
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentIndex + 1}/{getImages().length}
                </motion.span>
              </motion.div>

              {/* Cinematic Progress Bar */}
              <motion.div
                className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 rounded-full shadow-lg shadow-blue-500/30"
                key={currentIndex}
                initial={{ width: "0%", opacity: 0.8 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{
                  width: { duration: 4, ease: "linear" },
                  opacity: { duration: 0.3 }
                }}
              />

              {/* Cinematic Vignette Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              />
            </>
          )}
        </div>
      ) : (
        <img
          src={latestNews?.Value}
          alt="Latest News"
          className="w-full h-full object-cover object-center"
        />
      )}

      {/* Overlay gradient glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 pointer-events-none mix-blend-overlay rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating blurred shape */}
      <motion.div
        className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, 20, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
});

LatestHero.displayName = "LatestHero";

export default LatestHero;