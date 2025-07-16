import React, { memo, useCallback } from 'react';
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Section from "../../../../components/resuable/Section";
import HeroImageSlider from "./HeroImageSlider";
import HeroKeyPoint from "./HeroKeyPoint";
import { useRootContext } from "../../../../contexts/RootContext";
import Data from "../../../../data/data"
import { useProjectDataContext } from "../../../../contexts/Api/ProjectDataContext";
import {useServiceDataContext } from "../../../../contexts/Api/ServiceApiContext";
import {
  FaMicrochip,
  FaRobot,
  FaCube,
  FaWifi,
  FaCode,
  FaBolt
} from 'react-icons/fa';

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    background: "white"
  },
  visible: {
    opacity: 1,
    background: `url('${Data.Home.hero.hero_bg}')`,
    backgroundPosition: 'center',
    backgroundSize: "cover",
    transition: {
      duration: 1.0,
      ease: "easeInOut"
    }
  }
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: -50, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.8,
      delay: index * 0.15,
      ease: "easeOut"
    }
  })
};

const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
    scale: 0.9,
    rotate: 8
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1.4,
      ease: "easeOut"
    }
  }
};

// New floating icon variants
const floatingIconVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (index: number) => ({
    opacity: 0.6,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 1.2 + index * 0.1,
      ease: "easeOut"
    }
  })
};

const HeroSection: React.FC = memo(() => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  const projects = useProjectDataContext();
  const services=useServiceDataContext();
  const { Data } = useRootContext();
  const controls = useAnimation();
  const imageControls = useAnimation();
  const textControls = useAnimation();
  const iconControls = useAnimation();
  const triggerAnimations = useCallback(async () => {
    if (inView) {
      await controls.start("visible");
      await textControls.start("visible");
      await imageControls.start("visible");
      iconControls.start("visible");
    }
  }, [inView, controls, imageControls, textControls, iconControls]);

  React.useEffect(() => {
    triggerAnimations();
  }, [inView, triggerAnimations]);

  // Tech icons for floating animation
  const techIcons = [
    { icon: FaMicrochip, position: { top: '15%', left: '8%' } },
    { icon: FaRobot, position: { top: '25%', right: '12%' } },
    { icon: FaCube, position: { bottom: '30%', left: '5%' } },
    { icon: FaWifi, position: { bottom: '20%', right: '8%' } },
    { icon: FaCode, position: { top: '40%', left: '3%' } },
    { icon: FaBolt, position: { top: '60%', right: '15%' } }
  ];

  return (
    <Section
      ref={ref}
      className="relative md:bg-gradient-to-br from-white to-sky-50
      text-gray-800  py-10 sm:py-20 md:py-18 lg:py-24 px-6 md:px-8 lg:px-12
      min-h-screen flex lg:flex-row flex-col-reverse items-center justify-center gap-x-8 gap-y-4 overflow-hidden"
    >
   <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={controls}
        className=" absolute inset-0
        pointer-events-none z-0 animate-border-shine"
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-sky-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating Tech Icons */}
      {techIcons.map((tech, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={floatingIconVariants}
          initial="hidden"
          animate={iconControls}
          className="absolute hidden lg:block z-5 text-sky-500 "
          style={tech.position}
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="md:text-2xl text-lg opacity-30 hover:opacity-60 hover:scale-110 transition-all duration-300"
          >
            <tech.icon />
          </motion.div>
        </motion.div>
      ))}

      {/* Enhanced Hero Content */}
      <div className="flex flex-col justify-center lg:w-7/12 w-full z-20 relative  md:min-h-[200px]">

        <motion.h1
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate={textControls}
          className="hero relative"
        >
          {Data.Home.hero.title?.map((line:string, index:number) => (
            <span key={index} className="block">
              {line}</span>
          ))}

          {/* Subtle text decoration */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
            className="absolute -bottom-6 left-0 h-0.5 bg-gradient-to-r from-sky-500 to-blue-600 opacity-20 md:block hidden"
          />
        </motion.h1>
<div className="mt-4 md:mt-10 flex flex-col  justify-center lg:w-7/12 w-full">
        <motion.div
          initial="hidden"
          animate={textControls}
          variants={textVariants}
          custom={1}
          className="md:min-h-[60px] min-h-[40px]  relative"
        >
          <HeroKeyPoint />

          {/* Subtle glow effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ delay: 2, duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-sky-200 to-blue-200   blur-xl -z-10"
          />
        </motion.div>

        {/* Enhanced Stats/Metrics */}
        <motion.div
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate={textControls}
          className="md:mt-10 mt-4 flex gap-8 md:gap-12 text-sm lg:self-start self-center"
        >
          {[
            { value: `${projects.rawProjects?.length}+`, label: "Projects", icon: FaCube },
            { value: `${services?.service_data?.length}+`, label: "Services", icon: FaRobot },
            { value: `${new Date().getFullYear()-2023}+`, label: "Years", icon: FaBolt }
          ].map((stat, index) => (
            [projects?.isLoading,services?.isLoading].some(item=>item==true) ? ( <motion.div
      className="w-4 h-4 rounded-full bg-gray-400"
      animate={{
        scale: [1, 1.4, 1],
        opacity: [1, 0.6, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />): <motion.div
              key={stat.label}
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center gap-2 md:gap-3 text-sky-600"
            >
              <stat.icon className="text-lg md:text-5xl" />
              <div>
                <div className="font-bold text-xl md:text-2xl">{stat.value}</div>
                <div className="md:text-xl text-sm opacity-70">{stat.label}</div>
              </div>
            </motion.div>
          ))}
          </motion.div>
          </div>
      </div>

      {/* Enhanced Hero Image */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate={imageControls}
        className="lg:w-5/12 w-full z-10 overflow-hidden min-h-[500px]  relative "
        style={{ perspective: "1000px" }}
      >
        {/* Subtle glow behind image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ delay: 1.8, duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-sky-300 to-blue-500 blur-3xl -z-10 scale-75"
        />

        {/* Image container with subtle hover effect */}
        <motion.div
          whileHover={{ scale: 1.02, rotateY: 2 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full relative"
        >
          <HeroImageSlider />
        </motion.div>


      </motion.div>
    </Section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;