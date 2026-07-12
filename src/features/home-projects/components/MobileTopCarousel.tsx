import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LatestProductCard from './LatestProductCard';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
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
    <div className="relative flex min-h-full w-full flex-col items-center justify-center">
      <div className="relative h-full w-full overflow-hidden">
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
              id={String(currentIndex)}
            />
          </motion.div>
        </AnimatePresence>

        {[
          {
            icon: <ReactIcon name="FaAngleLeft" size={16} />,
            position: 'left-2',
            onClick: goPrev,
          },
          {
            icon: <ReactIcon name="FaAngleRight" size={16} />,
            position: 'right-2',
            onClick: goNext,
          },
        ].map((navi, index) => (
          <button
            key={`navi${index}`}
            onClick={navi.onClick}
            aria-label={index === 0 ? 'Previous slide' : 'Next slide'}
            className={`absolute top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-transparent p-2 text-slate-300 hover:bg-blue-900 hover:text-white ${navi.position} z-10`}
          >
            {navi.icon}
          </button>
        ))}
      </div>

      {topProjects.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {topProjects.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1 cursor-pointer rounded-full ${
                index === currentIndex ? 'w-6 bg-blue-500' : 'w-3 bg-gray-300'
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
