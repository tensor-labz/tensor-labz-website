import React, { memo, useCallback } from 'react';
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Section from "../../../../components/resuable/Section";
import HeroImageSlider from "./HeroImageSlider";
import HeroKeyPoint from "./HeroKeyPoint";
import bg from "../../../../assets/images/Page/Home/Hero/b1.webp";
import { useAppContext } from '../../../../contexts/Api/AppContext';
// Define variants with consistent animation durations
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
    scale: 0.95,
    rotate: 5
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut"
    }
  }
};

const HeroSection: React.FC = memo(() => {
  // Increased threshold for more reliable triggering
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true // Prevent repeated animations on scroll
  });
const {data}=useAppContext()
  const controls = useAnimation();
  const imageControls = useAnimation();
  const textControls = useAnimation();

  // Memoized animation trigger with staggered sequence
  const triggerAnimations = useCallback(async () => {
    if (inView) {
      await controls.start("visible");
      await textControls.start("visible");
      await imageControls.start("visible");
    }
  }, [inView, controls, imageControls, textControls]);

  React.useEffect(() => {
    triggerAnimations();
  }, [inView, triggerAnimations]);

  // if(isLoading) return <LoadingHeroPlaceholder/>
  return (
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

        {/* Hero Content - Fixed width to prevent layout shifts */}
        <div className="flex lg:flex-col flex-col-reverse justify-center lg:w-7/12 w-full z-20 relative font-serif min-h-[200px]">
          <motion.h1
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate={textControls}
            className="hero"
          >
            {data?.hero_title || ""}
          </motion.h1>

          <motion.div
            initial="hidden"
            animate={textControls}
            variants={textVariants}
            custom={1}
            className="mt-6 min-h-[60px]"
          >
            <HeroKeyPoint />
          </motion.div>
        </div>

        {/* Hero Image - Fixed dimensions to prevent layout shifts */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={imageControls}
          className="lg:w-5/12 w-full z-10 overflow-hidden md:min-h-[500px] min-h-80 relative"
          style={{ perspective: "1000px" }}
        >
          <HeroImageSlider />
        </motion.div>
      </Section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;