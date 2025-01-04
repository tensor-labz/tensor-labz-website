import { motion } from 'framer-motion'; // Ensure you're using 'framer-motion'
import { useHeroContext } from "../../../../contexts/HeroContext";

export default function HeroKeyPoint() {
  const { currentSlide, slider } = useHeroContext();

  return (
    <motion.h1 
      key={currentSlide} 
      initial={{ opacity: 0,rotateX:-45,textShadow:"1px 1px 1px grey" }}  // Start off-screen to the left
      animate={{ opacity: 1, rotateX:0,textShadow:"none"}}     // Move to its original position while fading in
      exit={{ opacity: 0,rotateX:45,textShadow:"1px 1px 1px grey" }}      // Move off-screen to the right while fading out
      transition={{ duration:2.3 }}      // Smooth transition duration
      className="text-2xl lg:text-4xl lg:text-justify text-center font-bold text-blue-900 drop-shadow-lg"
    >
      {slider.title}
    </motion.h1>
  );
}
