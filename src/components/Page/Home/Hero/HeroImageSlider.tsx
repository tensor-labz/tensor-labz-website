import { useHeroContext } from "../../../../contexts/HeroContext";
import { motion } from "framer-motion";

export default function HeroImageSlider() {
  const { currentSlide, slider } = useHeroContext();

  return (
    <motion.div
      key={currentSlide}
      initial={{
        opacity: 0,
        scale: 0.95, // Slightly reduced scale for the entry of the image
        x: -100, // Image starts from the left (entering from the left)
        zIndex: 1, // Ensure the current image is behind the new one
        rotateY: 10, // Added slight rotation for a 3D effect on entry
      }}
      animate={{
        opacity: 1, // Fade in the image
        scale: 1, // Image reaches its full size
        x: 0, // Image moves to the center
        zIndex: 2, // Ensure this image is on top during the transition
        rotateY: 0, // Reset the rotation to a neutral position
      }}
      exit={{
        opacity: 0, // Fade out the image
        scale: 1.1, // Slightly increase the scale as it "moves away"
        x: 100, // Move the previous image to the right (opposite direction of entry)
        zIndex: 1, // Lower the zIndex to push the previous image behind
        rotateY: -10, // Added slight rotation for a more 3D effect on exit
      }}
      transition={{
        duration: 2, // Smooth transition duration
        ease: "easeInOut", // Use easeInOut for smooth acceleration and deceleration
      }}
      className="w-full relative overflow-hidden mx-auto"
    >
      <img
        src={slider.img}
        alt={`Hero Image ${slider.title}`}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
