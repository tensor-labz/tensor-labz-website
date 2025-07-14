import React, { memo } from 'react';
import { BsRobot } from "react-icons/bs";
import { motion } from 'framer-motion';

const EmptyServices: React.FC = memo(() => {
  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-20 px-8">
      {/* Icon Container */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border border-slate-200/50 shadow-sm">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <BsRobot className="text-5xl text-[#092B4A]" />
          </motion.div>
        </div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        className="text-center max-w-md space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <h3 className="text-2xl h5 text-[#092B4A]">
          No Projects Available
        </h3>

        <p className="text-slate-500 text-base leading-relaxed">
          We're crafting something extraordinary for you
        </p>

        {/* Status Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-[#092B4A]/5 text-[#092B4A] px-5 py-2.5 rounded-full text-sm font-medium border border-[#092B4A]/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="w-2 h-2 bg-[#092B4A] rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          Coming Soon
        </motion.div>
      </motion.div>
    </div>
  );
});

EmptyServices.displayName = 'EmptyServices';
export default EmptyServices;