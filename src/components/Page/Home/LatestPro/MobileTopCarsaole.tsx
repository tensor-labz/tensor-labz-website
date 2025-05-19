import React, { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LatestProductCard from "./LatestProductCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useProjectDataContext } from "../../../../contexts/Api/ProjectDataContext";

const MobileTopCarousel: React.FC = memo(() => {
  const { topData, isLoading } = useProjectDataContext();
  const topProjects = isLoading
    ? []
    :topData?.map((project: any) => ({
        title: project?.title ?? "",
        description: project?.description ?? "",
        imageURL: project?.imageURL
        ?? "",
        ...project
      })) || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % topProjects.length);
  const goPrev = () => setCurrentIndex((prev) => (prev === 0 ? topProjects.length - 1 : prev - 1));

  // Auto-slide functionality
  useEffect(() => {
    if (topProjects.length <= 1) return; // Don't auto-slide if there's only one or zero items

    const interval = setInterval(goNext, 7000); // Change every 7 seconds
    return () => clearInterval(interval);
  }, [topProjects.length]);

  // Variants for carousel transitions
  const carouselVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { x: -300, opacity: 0, transition: { duration: 0.8, ease: "easeIn" } },
  };

  // If no projects or still loading, show placeholder or nothing
  if (topProjects.length === 0) {
    return null; // Or return a placeholder component
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-full">
      {/* Carousel Container */}
      <div className="overflow-hidden w-full relative">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            className="w-full px-4 sm:px-10"
            variants={carouselVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <LatestProductCard
              id={currentIndex}
              {...topProjects[currentIndex]}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {[
          {
            icon: <FaAngleLeft size={16} />,
            position: "left-2",
            onClick: goPrev
          },
          {
            icon: <FaAngleRight size={16} />,
            position: "right-2",
            onClick: goNext
          }
        ].map((navi, index) => (
          <button
            onClick={navi.onClick}
            className={`hover:text-white text-slate-300 absolute bg-transparent hover:bg-blue-900 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer ${navi.position} z-10`}
            key={`navi${index}`}
            aria-label={index === 0 ? "Previous slide" : "Next slide"}
          >
            {navi.icon}
          </button>
        ))}
      </div>

      {/* Indicators */}
      {topProjects.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {topProjects.map((_:any, index:number) => (
            <motion.div
              key={index}
              className={`h-1 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-blue-500 w-6" : "bg-gray-300 w-3"
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      )}
    </div>
  );
});

MobileTopCarousel.displayName = "MobileTopCarousel";
export default MobileTopCarousel;