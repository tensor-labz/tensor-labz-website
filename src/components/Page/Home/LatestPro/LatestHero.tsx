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

  const getImages = () => {
    if (!latestNews?.Value) return [];

    if (Array.isArray(latestNews.Value)) {
      return latestNews.Value;
    }

    if (typeof latestNews.Value === "string") {
      try {
        const parsed = JSON.parse(latestNews.Value);
        return Array.isArray(parsed) ? parsed : [latestNews.Value];
      } catch {
        return latestNews.Value.includes(",")
          ? latestNews.Value.split(",").map((img:string) => img.trim())
          : [latestNews.Value];
      }
    }

    return [];
  };

  useEffect(() => {
    if (latestNews?.type !== "slider") return;

    const images = getImages();
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [latestNews]);

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
        className="w-full h-[300px] md:h-full relative rounded-2xl overflow-hidden bg-gray-200"
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
    <div className="relative w-full h-[300px] md:h-full overflow-hidden rounded-2xl md:p-2 p-4">
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
          <AnimatePresence>
            {getImages().length > 0 && (
              <motion.img
                key={currentIndex}
                src={getImages()[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-center"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              />
            )}
          </AnimatePresence>

          {getImages().length > 1 && (
            <>
              <motion.button
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition z-10"
                onClick={handlePrev}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </motion.svg>
              </motion.button>

              <motion.button
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition z-10"
                onClick={handleNext}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </motion.svg>
              </motion.button>

              <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {getImages().map((_:any, index:number) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex ? "bg-white" : "bg-white/50"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              <motion.div
                className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                key={currentIndex}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
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
