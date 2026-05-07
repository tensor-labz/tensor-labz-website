import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LatestProductCard from './LatestProductCard';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useAppSelector } from '../../../app/hooks';
import { selectTopProjects } from '../../../store/projectsSlice';

const carouselVariants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  exit: { x: -300, opacity: 0, transition: { duration: 0.8, ease: 'easeIn' } },
};

const MobileTopCarousel: React.FC = memo(() => {
  const topProjects = useAppSelector(selectTopProjects);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () =>
    setCurrentIndex((prev) => (prev + 1) % topProjects.length);
  const goPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? topProjects.length - 1 : prev - 1));

  useEffect(() => {
    if (topProjects.length <= 1) return;
    const interval = setInterval(goNext, 7000);
    return () => clearInterval(interval);
  }, [topProjects.length]);

  if (topProjects.length === 0) return null;

  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-full">
      <div className="overflow-hidden w-full relative h-full">
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
              {...topProjects[currentIndex]}
              id={currentIndex}
            />
          </motion.div>
        </AnimatePresence>

        {[
          {
            icon: <FaAngleLeft size={16} />,
            position: 'left-2',
            onClick: goPrev,
          },
          {
            icon: <FaAngleRight size={16} />,
            position: 'right-2',
            onClick: goNext,
          },
        ].map((navi, index) => (
          <button
            key={`navi${index}`}
            onClick={navi.onClick}
            aria-label={index === 0 ? 'Previous slide' : 'Next slide'}
            className={`hover:text-white text-slate-300 absolute bg-transparent hover:bg-blue-900 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer ${navi.position} z-10`}
          >
            {navi.icon}
          </button>
        ))}
      </div>

      {topProjects.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {topProjects.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1 rounded-full cursor-pointer ${
                index === currentIndex ? 'bg-blue-500 w-6' : 'bg-gray-300 w-3'
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

MobileTopCarousel.displayName = 'MobileTopCarousel';
export default MobileTopCarousel;
