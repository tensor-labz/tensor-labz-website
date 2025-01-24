import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Section from "../../../../components/resuable/Section";
import HeroContextProvider from "../../../../contexts/HeroContext";
import HeroImageSlider from "./HeroImageSlider";
import HeroKeyPoint from "./HeroKeyPoint";
import { home } from "../../../../data/page_data";
import bg from "../../../../assets/images/Page/Home/Hero/b1.webp"

const HeroSection = () => {
  // Intersection Observer to detect when the section is in view
  const [ref, inView] = useInView({ threshold: 0.3 });
  const controls = useAnimation();
  const imageControls = useAnimation();
  const textControls = useAnimation();

  // Trigger animations based on visibility
  useEffect(() => {
    if (inView) {
      // Animate the curve container
      controls.start({
        opacity: 1,
        // background: "linear-gradient(to top right, #66ccff 0%, #ffffff 25%)",
        background:`url('${bg}')`,
        backgroundPosition:'center',
backgroundSize:"cover",
        transition: { duration: 0.8, ease: "easeInOut" },
      });

      // Animate the text one by one
      textControls.start((index) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, delay: index * 0.2, ease: "easeOut" },
      }));

      // Animate the image container with rotation and bottom-right movement
      imageControls.start({
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        transition: { duration: 1.2, ease: "easeOut" },
      });
    } else {
      // Reset animations when out of view
      controls.start({ opacity: 0, background: "white", transition: { duration: 0.8, ease: "easeInOut" } });
      textControls.start({ opacity: 0, x: -50 });
      imageControls.start({ opacity: 0, x: 50, y: 50, rotate: 30 });
    }
  }, [inView, controls, imageControls, textControls]);

  return (
    <HeroContextProvider delay={5000}>
    <Section
      ref={ref}
      className="relative md:bg-gradient-to-br from-white to-sky-50 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 py-10 sm:py-20 md:py-18 lg:py-24 px-6 md:px-8 lg:px-12 min-h-screen 
      flex md:flex-row flex-col-reverse items-center justify-center gap-x-8 gap-y-4 overflow-hidden"
    >
      {/* Curve Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        className="border-sky-700 md:border-l-2 lg:border-l-4 absolute inset-0 rounded-bl-none lg:rounded-bl-[38%] pointer-events-none z-0 animate-border-shine"
      ></motion.div>

      {/* Hero Content Start */}
      <div className="flex lg:flex-col flex-col-reverse justify-center lg:w-7/12 w-full z-20 relative font-serif">
        <motion.h1
          custom={0} // Pass index for stagger effect
          initial={{ opacity: 0, x: -50 }}
          animate={textControls}
          className="hero"
        >
          {home.hero.title}
        </motion.h1>
        {/* <motion.p
          custom={1} // Pass index for stagger effect
          initial={{ opacity: 0, x: -50 }}
          animate={textControls}
          className="mt-4 lg:text-xl text-lg lg:text-justify text-center text-gray-600 dark:text-gray-300"
        >
         {home.hero.subtitle}
        </motion.p> */}
        <motion.div initial={{ opacity: 0,x: -50  }} animate={textControls} className="mt-6">
          <HeroKeyPoint/>
        </motion.div>
      </div>
      {/* Hero Content End */}

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: 50, rotate: 30 }}
        animate={imageControls}
        className="lg:w-5/12 w-full z-10 overflow-hidden "
      >
        <HeroImageSlider />
      </motion.div>
    </Section>
    </HeroContextProvider>
  );
};

export default HeroSection;
