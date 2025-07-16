import React, { useState, useEffect, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Section from "../../../../components/resuable/Section";
import { useDeviceContext } from "../../../../contexts/DeviceContext";
import MobileTopCarousel from "./MobileTopCarsaole";
import LatestProductCard from "./LatestProductCard";
import LatestHero from "./LatestHero";
import { useTopProjects } from './../../../../contexts/Api/useTopProjects';

const LatestProductSection: React.FC = memo(() => {
  const [currentPage, setCurrentPage] = useState(0);
  const  topData = useTopProjects();
  const device = useDeviceContext();

  const isLarge = useMemo(
    () => device === "lg" || device === "xl" || device === "2xl",
    [device]
  );
  const isMobile = useMemo(
    () => device === "xs" || device === "sm",
    [device]
  );

  const topProjects = topData ?? [];

  const visibleCount = !isMobile ? 4 : 1;
  const pageCount = Math.ceil(topProjects.length / visibleCount);

  // Auto-slide logic for pages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % pageCount);
    }, 8000);
    return () => clearInterval(interval);
  }, [pageCount]);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % pageCount);
  };

  const currentProjects = useMemo(() => {
    const start = currentPage * visibleCount;
    return topProjects.slice(start, start + visibleCount);
  }, [currentPage, topProjects, visibleCount]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const gridVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <Section className="min-h-screen lg:container flex flex-col items-center justify-center my-6">
      <div className="px-4 text-center mb-4 mt-6">
        <h1 className="sm:text-4xl text-xl sm:font-bold font-semibold text-blue-900">
          Our Latest Top Insights
        </h1>
        <h3 className="sm:text-lg text-base text-gray-500">
          Innovative solutions tailored to your digital transformation needs.
        </h3>
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
          className="w-10/12 mx-auto lg:w-2/5 max-w-full relative rounded-2xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] border border-gray-200 bg-white md:px-0 "
          variants={sectionVariants}
        >
          <LatestHero />
        </motion.div>

        {/* RIGHT SLIDES */}
        <div className="lg:w-3/5 lg:px-0 px-16 w-full flex flex-col gap-4 relative">
          {isMobile ? (
            <MobileTopCarousel />
          ) : (
            <div className="relative">
              {/* Page wrapper with animation */}
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
                          <LatestProductCard imageURL={project.imageURL} title={project.title} description={project.description } slug={project.slug}  key={i}  />
                      )
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Prev/Next icons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 p-2 cursor-pointer">
                <FiChevronLeft
                  size={32}
                  className="text-gray-700 hover:text-blue-600"
                  onClick={handlePrev}
                />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 p-2 cursor-pointer">
                <FiChevronRight
                  size={32}
                  className="text-gray-700 hover:text-blue-600"
                  onClick={handleNext}
                />
              </div>

              {/* Indicators */}
              <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i === currentPage
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </Section>
  );
});

LatestProductSection.displayName = "LatestProductSection";

export default LatestProductSection;
