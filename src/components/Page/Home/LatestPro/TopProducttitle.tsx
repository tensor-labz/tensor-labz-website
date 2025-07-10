import React, { memo } from "react";
import { motion } from "framer-motion";

const TopProductTitle: React.FC = memo(() => {
  const title = "Innovating in 3D Modeling, Embedded Systems & IoT";

  return (
    <div className="w-full flex flex-col items-center">
      <motion.h3
        className="text-3xl md:text-4xl text-center font-extrabold text-slate-50"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {title.split(" ").map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={wordVariants}
            className="inline-block mx-1"
          >
            {word}
          </motion.span>
        ))}
      </motion.h3>
      <motion.p
        className="mt-2 text-slate-300 text-sm md:text-base text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
      >
        Tensor Labs — Pioneering Next-Gen Tech Solutions
      </motion.p>
    </div>
  );
});

export default TopProductTitle;

// Container animation: stagger words
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Word animation: fade + subtle skew for 3D effect
const wordVariants = {
  hidden: { opacity: 0, y: 10, skewY: 5 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};