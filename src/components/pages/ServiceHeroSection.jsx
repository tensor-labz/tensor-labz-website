import React from 'react';
import { motion } from 'framer-motion';
import { useTabContext } from '../context/TabContext';
import hero from "../../asserts/images/page/hero.webp"
import { homedata } from './../../data/Data_Page';
const HeroSection = () => {
  const { activeTab } = useTabContext();

  return (
    <motion.div
      key={activeTab?.slug} // Unique key for animation
      className="relative p-8 text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg shadow-lg overflow-hidden h-48 py-3"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <img
        src={activeTab?.image??hero}
        alt={activeTab?.title}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="relative z-10">
        {/* Title */}
        <h1 className="text-5xl font-bold drop-shadow-lg">{activeTab?.title??homedata.hero.title}</h1>
        {/* Description */}
        <p className="mt-4 text-lg">{activeTab?.description??homedata.hero.content}</p>
      </div>
    </motion.div>
  );
};

export default HeroSection;
