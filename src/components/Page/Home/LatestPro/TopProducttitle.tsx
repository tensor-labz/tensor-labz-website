import React, { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";

// Memoized Component for Performance Optimization
const TopProductTitle: React.FC = memo(() => {
  const title = "Our Top Insights";
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < title.length ? prevIndex + 1 : 0
      );
    }, 2000); // Adjust the interval speed here

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [title.length]);

  return (
    <h3 className="text-2xl text-center font-bold absolute bottom-4 w-full text-slate-50">
      {/* Container for staggered animation */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        key={currentIndex} // Ensure re-render for animation
        className="inline-block"
      >
        {/* Render characters dynamically */}
        {title.split("").map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={characterVariants}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    </h3>
  );
});

export default TopProductTitle;

// Variants for container (staggered effect)
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Delay between each character's animation
    },
  },
};

// Variants for individual characters
const characterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};
