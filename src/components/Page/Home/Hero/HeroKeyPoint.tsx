import { motion } from 'framer-motion'; // Ensure you're using 'framer-motion'
import { useHeroContext } from "../../../../contexts/HeroContext";

export default function HeroKeyPoint() {
  const { currentSlide, slider } = useHeroContext();

  return (
    <motion.h1 
      key={currentSlide} 
      initial={{ opacity: 0, x: -100 }}  // Start off-screen to the left
      animate={{ opacity: 1, x: 0 }}     // Move to its original position while fading in
      exit={{ opacity: 0, x: 100 }}      // Move off-screen to the right while fading out
      transition={{ duration: 0.5 }}      // Smooth transition duration
      className="text-4xl lg:text-justify text-center font-bold text-blue-900"
    >
      {slider.title}
    </motion.h1>
  );
}
