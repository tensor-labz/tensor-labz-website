import React, { useState, useEffect, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../../../../components/resuable/Section";
import LatestProductCard from "./LatestProductCard";
import ProjectData from "../../../../data/project_data";
import LatestBanner from "../../../../assets/vedio/Home/topProducts/topProductBanner.mp4";
import { useDeviceContext } from "../../../../contexts/DeviceContext";
import TopProductTitle from "./TopProducttitle";
import MobileTopCarousel from "./MobileTopCarsaole";

const LatestProductSection: React.FC = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const device = useDeviceContext();
  const islarge=useMemo(()=>device==="lg" || device==="2xl" || device==="xl",[device])
  const isMobile=useMemo(()=>device==="xs" || device==="sm" ,[device])
  const topProjects = ProjectData.filter((project) => project.isTop).slice(0, islarge?3:2);


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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
  };

  // Auto-slide logic for projects
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topProjects.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [topProjects.length]);

  return (
    <Section className="min-h-screen  lg:container realtive  flex flex-col items-center justify-center">
      <motion.div
        className="flex lg:flex-row flex-col gap-8 w-full h-full relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        {/* Video Banner */}
       {islarge?(<motion.div
          className="lg:w-2/5 w-full relative"
          variants={sectionVariants}
        >
          <video
            src={LatestBanner}
            className="object-cover object-center w-full rounded-md h-[400px] lg:h-[600px]"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute bottom-4 w-full md:bottom-0">
            <TopProductTitle />
          </div>
        </motion.div>):(
          <>
         <h3 className="text-2xl text-center font-bold w-full text-slate-50 py-3">Our Top Insights</h3>
            <video
            src={LatestBanner}
            className="object-cover object-center w-full rounded-md h-[600px] absolute top-0 left-0 z-[-30]"
            autoPlay
            muted
            loop
            playsInline
          />
            </>
        )} 

        {/* Vertical Scrolling Projects */}
        {isMobile?(<MobileTopCarousel/>):(  <motion.div className="flex lg:w-3/5 w-full flex-col gap-6 h-full overflow-hidden lg:p-0 px-8 py-4">
          <AnimatePresence>
            {topProjects
              .slice(currentIndex, currentIndex + (islarge?3:2))
              .map((project, index) => (
                <motion.div
                  className={index % 2 === 0 ? "self-start" : "self-end"}
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <LatestProductCard {...{ id: index, ...project }} />
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>)}
      
      </motion.div>
    </Section>
  );
});

LatestProductSection.displayName = "LatestProductSection";

export default LatestProductSection;
