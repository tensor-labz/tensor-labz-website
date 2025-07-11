import React, { useState, useEffect, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../../../../components/resuable/Section";
import LatestProductCard from "./LatestProductCard";
import { useDeviceContext } from "../../../../contexts/DeviceContext";
import TopProductTitle from "./TopProducttitle";
import MobileTopCarousel from "./MobileTopCarsaole";
import { useProjectDataContext } from "../../../../contexts/Api/ProjectDataContext";
import { useRootContext } from "../../../../contexts/RootContext";
import { HiOutlineCubeTransparent } from "react-icons/hi";
const LatestProductSection: React.FC = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { topData } = useProjectDataContext();
  const {Data}=useRootContext()
  const device = useDeviceContext();
  const islarge=useMemo(()=>device==="lg" || device==="2xl" || device==="xl",[device])
  const isMobile=useMemo(()=>device==="xs" || device==="sm" ,[device])
  // const topProjects =topData?.slice(0, islarge?4:2);
  const topProjects =topData
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

  //Auto-slide logic for projects
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (topProjects?.length??1));
    }, 5000);
    return () => clearInterval(interval);
  }, [topProjects?.length]);

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
        {islarge ? (
        <motion.div
        className="lg:w-2/5 w-full relative overflow-hidden rounded-md"
        variants={sectionVariants}
        whileHover={{ scale: 1.02 }}
      >
        {/* Video */}
        <video
          src={Data?.Home?.latest_project?.hero_bg?.lg}
          className="object-cover object-center w-full rounded-md h-[400px] lg:h-[600px]"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Overlay gradient glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 pointer-events-none mix-blend-overlay"
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

        {/* Rotating cube icon */}
        <motion.div
  className="absolute text-white opacity-40 w-10 h-10"
  animate={{
    rotate: [0, 360],
    top: ["1rem", "1rem", "calc(100% - 2.5rem)", "calc(100% - 2.5rem)"],
    left: ["1rem", "calc(100% - 2.5rem)", "calc(100% - 2.5rem)", "1rem"],
  }}
  transition={{
    rotate: {
      repeat: Infinity,
      duration: 8,
      ease: "linear",
    },
    top: {
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut",
    },
    left: {
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
>
  <HiOutlineCubeTransparent className="w-full h-full" />
</motion.div>

        {/* Bottom text */}
        <div className="absolute bottom-4 w-full md:bottom-0">
          <TopProductTitle />
        </div>
      </motion.div>
       ):(
          <>
         <h3 className="text-2xl text-center font-bold w-full text-slate-50 py-3">Our Top Insights</h3>
            <img
            src={Data?.Home?.latest_project?.hero_bg?.sm}
            className="object-cover object-center w-full rounded-md h-[600px] absolute top-0 left-0 z-[-30]"
          />
            </>
        )}

        {/* Vertical Scrolling Projects */}
        {isMobile ? (<MobileTopCarousel />) : (
          <div className="lg:w-3/5 w-full min-h-full">
          <motion.div className="flex   flex-col gap-6 h-full overflow-hidden lg:p-0 px-8 py-4">
          <AnimatePresence>
            {topProjects
              ?.slice(currentIndex, currentIndex + (islarge?4:2))
              ?.map((project:any, index:number) => (
                <motion.div
                  className={`${index % 2 === 0 ? "self-start" : "self-end"} w-4/5`}
                  key={`latestProd-${index}`}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <LatestProductCard slug={project?.slug} description={project?.description??""} imageURL={project?.imageURL??""} title={project?.title??""} id={index} />
                </motion.div>
              ))}
          </AnimatePresence>

        </motion.div>
                 <div className="flex justify-center gap-2 mt-4">
  {Array.from({ length: Math.ceil(topProjects?.length??1 / (islarge ? 4 : 2)) }).map((_, i) => (
    <div
      key={`indicator-${i}`}
      className={`h-2 w-2 rounded-full transition-all duration-300 ${
        i === Math.floor(currentIndex / (islarge ? 4 : 2))
          ? "bg-blue-600 w-4"
          : "bg-gray-400"
      }`}
    ></div>
  ))}
</div>
            </div>
        )}

      </motion.div>
    </Section>
  );
});

LatestProductSection.displayName = "LatestProductSection";

export default LatestProductSection;
