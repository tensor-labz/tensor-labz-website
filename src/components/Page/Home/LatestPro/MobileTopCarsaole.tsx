import React, { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectData from "../../../../data/project_data";
import LatestProductCard from "./LatestProductCard";

const MobileTopCarousel: React.FC = memo(() => {
  const topProjects = ProjectData.filter((project) => project.isTop);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topProjects.length);
    }, 7000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [topProjects.length]);

  // Variants for carousel transitions
  const carouselVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { x: -300, opacity: 0, transition: { duration: 0.8, ease: "easeIn" } },
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-md mx-auto">
      {/* Carousel Container */}
      <div className="overflow-hidden w-full relative">
        <AnimatePresence initial={false} mode="wait">
          {topProjects.length > 0 && (
            <motion.div
              key={currentIndex}
              className="w-full px-10"
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <LatestProductCard
                {...{ id: currentIndex, ...topProjects[currentIndex] }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {topProjects.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-blue-500 w-2" : "bg-gray-300 w-1"
            }`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
});

MobileTopCarousel.displayName = "MobileTopCarousel";
export default MobileTopCarousel;
