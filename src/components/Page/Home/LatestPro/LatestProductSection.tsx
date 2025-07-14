import React, { useState, useEffect, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../../../../components/resuable/Section";
import LatestProductCard from "./LatestProductCard";
import { useDeviceContext } from "../../../../contexts/DeviceContext";

import MobileTopCarousel from "./MobileTopCarsaole";
import { useProjectDataContext } from "../../../../contexts/Api/ProjectDataContext";
import { useRootContext } from "../../../../contexts/RootContext";
import LatestHero from "./LatestHero";
const LatestProductSection: React.FC = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { topData } = useProjectDataContext();
  const {Data}=useRootContext()
  const device = useDeviceContext();
  const islarge=useMemo(()=>device==="lg" || device==="2xl" || device==="xl",[device])
  const isMobile = useMemo(() => device === "xs" || device === "sm", [device])
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
    <Section className="min-h-screen  lg:container realtive  flex flex-col items-center justify-center my-6">
       <div className='px-4 text-center mb-4 mt-6 '>
      <h1 className="sm:text-4xl text-xl sm:font-bold font-semibold text-blue-900">Our Latest Top isights</h1>
      <h3 className="sm:text-lg text-base text-gray-500">Innovative solutions tailored to your digital transformation needs.</h3>
      </div>
      <motion.div
        className="flex lg:flex-row flex-col-reverse gap-8 w-full h-full relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
<motion.div
  className="w-full lg:w-2/5 max-w-full relative rounded-2xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] border border-gray-200 bg-white"
  variants={sectionVariants}
>
  <LatestHero />
</motion.div>

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

      </motion.div>
    </Section>
  );
});

LatestProductSection.displayName = "LatestProductSection";

export default LatestProductSection;
