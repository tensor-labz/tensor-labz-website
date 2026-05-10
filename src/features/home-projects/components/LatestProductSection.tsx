import React, { useState, useEffect, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import Section from '../../../shared/components/ui/Section';
import { useDevice } from '../../../shared/hooks/useDevice';
import MobileTopCarousel from './MobileTopCarousel';
import LatestProductCard from './LatestProductCard';
import LatestHero from './LatestHero';
import { useLatestProjectsController } from '../hooks/useLatestProjectsController';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
};

const gridVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const LatestProductSection: React.FC = memo(() => {
  const [currentPage, setCurrentPage] = useState(0);
  const { topProjects } = useLatestProjectsController();
  const device = useDevice();

  const isMobile = useMemo(() => device === 'xs' || device === 'sm', [device]);
  const visibleCount = isMobile ? 1 : 4;
  const pageCount = Math.ceil(topProjects.length / visibleCount);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentPage((prev) => (prev + 1) % pageCount),
      8000
    );
    return () => clearInterval(interval);
  }, [pageCount]);

  const handlePrev = () =>
    setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount);

  const handleNext = () => setCurrentPage((prev) => (prev + 1) % pageCount);

  const currentProjects = useMemo(() => {
    const start = currentPage * visibleCount;
    return topProjects.slice(start, start + visibleCount);
  }, [currentPage, topProjects, visibleCount]);

  return (
    <Section className="min-h-screen lg:container flex flex-col items-center justify-center py-10 sm:py-20 md:py-18 lg:py-24">
      <div className="px-4 text-center mb-4 mt-6">
        <h1
          className="sm:text-4xl text-xl sm:font-bold font-semibold"
          style={{
            color: 'var(--text-primary)',
            fontFamily: '"Syne", sans-serif',
          }}
        >
          Our Latest Top Insights
        </h1>
      </div>

      <motion.div
        className="flex lg:flex-row flex-col-reverse gap-8 w-full h-full relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        {/* LEFT HERO */}
        <motion.div
          className="w-10/12 mx-auto lg:w-2/5 max-w-full relative rounded-2xl overflow-hidden
            shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)] md:px-0"
          style={{
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-surface)',
          }}
          variants={sectionVariants}
        >
          <LatestHero />
        </motion.div>

        {/* RIGHT SLIDES */}
        <div className="lg:w-3/5 lg:px-0 md:px-16 px-4 w-full flex flex-col gap-4 relative">
          {isMobile ? (
            <MobileTopCarousel />
          ) : (
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  variants={gridVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 grid-rows-2 gap-6"
                >
                  {currentProjects.map(
                    (project, i) =>
                      project && (
                        <LatestProductCard
                          key={i}
                          imageURL={project.imageURL}
                          title={project.title}
                          description={project.description}
                          slug={project.slug}
                          id={project.id}
                        />
                      )
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-1/2 -translate-y-1/2 -left-10 p-2 cursor-pointer" onClick={handlePrev}>
                <ReactIcon
                  name="FiChevronLeft"
                  size={32}
                  style={{ color: 'var(--text-muted)' }}
                  className="font-bold hover:text-sky-500 transition-colors"
                />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-10 p-2 cursor-pointer" onClick={handleNext}>
                <ReactIcon
                  name="FiChevronRight"
                  size={32}
                  style={{ color: 'var(--text-muted)' }}
                  className="font-bold hover:text-sky-500 transition-colors"
                />
              </div>

              <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor:
                        i === currentPage ? 'var(--accent)' : 'var(--border)',
                    }}
                    className="w-2.5 h-2.5 rounded-full transition-colors"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </Section>
  );
});

LatestProductSection.displayName = 'LatestProductSection';
export default LatestProductSection;
