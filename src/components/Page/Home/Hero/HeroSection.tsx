import React, { memo, useCallback } from 'react';
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Section from "../../../../components/resuable/Section";
import HeroContextProvider from "../../../../contexts/HeroContext";
import HeroImageSlider from "./HeroImageSlider";
import HeroKeyPoint from "./HeroKeyPoint";
import { home } from "../../../../data/page_data";
import bg from "../../../../assets/images/Page/Home/Hero/b1.webp";

// Define variants for consistent animations
const sectionVariants: Variants = {
  hidden: { 
    opacity: 0,
    background: "white"
  },
  visible: { 
    opacity: 1,
    background: `url('${bg}')`,
    backgroundPosition: 'center',
    backgroundSize: "cover",
    transition: { 
      duration: 0.8, 
      ease: "easeInOut" 
    }
  }
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.6, 
      delay: index * 0.2, 
      ease: "easeOut" 
    }
  })
};

const imageVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50, 
    y: 50, 
    rotate: 10 
  },
  visible: { 
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { 
      duration: 1.2, 
      ease: "easeOut" 
    }
  }
};

const HeroSection: React.FC = memo(() => {
  // Intersection Observer setup
  const [ref, inView] = useInView({ threshold: 0.3 });
  
  // Animation controllers
  const controls = useAnimation();
  const imageControls = useAnimation();
  const textControls = useAnimation();

  // Memoized animation trigger
  const triggerAnimations = useCallback(async () => {
    if (inView) {
      await Promise.all([
        controls.start("visible"),
        textControls.start("visible"),
        imageControls.start("visible")
      ]);
    } else {
      await Promise.all([
        controls.start("hidden"),
        textControls.start("hidden"),
        imageControls.start("hidden")
      ]);
    }
  }, [inView, controls, imageControls, textControls]);

  // Use effect to trigger animations
  React.useEffect(() => {
    triggerAnimations();
  }, [inView, triggerAnimations]);

  return (
    <HeroContextProvider delay={5000}>
      <Section
        ref={ref}
        className="relative md:bg-gradient-to-br from-white to-sky-50 dark:from-gray-800 dark:to-gray-900 
        text-gray-800 dark:text-gray-100 py-10 sm:py-20 md:py-18 lg:py-24 px-6 md:px-8 lg:px-12 
        min-h-screen flex md:flex-row flex-col-reverse items-center justify-center gap-x-8 gap-y-4 overflow-hidden"
      >
        {/* Curve Container */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
          className="border-sky-700 md:border-l-2 lg:border-l-4 absolute inset-0 
          rounded-bl-none lg:rounded-bl-[38%] pointer-events-none z-0 animate-border-shine"
        />

        {/* Hero Content */}
        <div className="flex lg:flex-col flex-col-reverse justify-center lg:w-7/12 w-full z-20 relative font-serif">
          <motion.h1
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate={textControls}
            className="hero"
          >
            {home.hero.title}
          </motion.h1>

          <motion.div 
            initial="hidden" 
            animate={textControls} 
            variants={textVariants}
            custom={1}
            className="mt-6"
          >
            <HeroKeyPoint />
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={imageControls}
          className="lg:w-5/12 w-full z-10 overflow-hidden"
        >
          <HeroImageSlider />
        </motion.div>
      </Section>
    </HeroContextProvider>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;