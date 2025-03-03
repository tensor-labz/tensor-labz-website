import React, { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {latestProject} from "../../../../data/project_data";
import LatestProductCard from "./LatestProductCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const MobileTopCarousel: React.FC = memo(() => {
  const topProjects =latestProject.map((project) => ({title:project?.title??"",description:project?.description??"",imgURL:project?.imgURL??"",...project}));
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext=()=>setCurrentIndex((prev) => (prev + 1) % topProjects.length);
  const goPrev=()=>setCurrentIndex((prev) => prev>0?prev--:topProjects.length);
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(
      goNext, 7000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [topProjects.length]);

  // Variants for carousel transitions
  const carouselVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { x: -300, opacity: 0, transition: { duration: 0.8, ease: "easeIn" } },
  };

  return (
    <div className="relative flex flex-col justify-center items-center w-full">
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
        {[{
          icon:<FaAngleLeft/>,
          position:"left-1",
          onClick:goPrev
        },{
          icon:<FaAngleRight/>,
          position:"right-1",
          onClick:goNext
        }].map((navi,index)=>(<button onClick={navi.onClick} className={`hover:text-white text-slate-300 absolute bg-transparent hover:bg-blue-900  top-1/2 p-1 rounded-full cursor-pointer ${navi.position}`} key={`navi${index}`}>{navi.icon}</button>))
          }
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
