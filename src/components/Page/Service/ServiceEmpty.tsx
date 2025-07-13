import React, { memo } from 'react';
import { BsRobot } from "react-icons/bs";
import { motion } from 'framer-motion';

const EmptyServices: React.FC = memo(() => {
  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-20 px-8">
      {/* Icon Container */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-slate-100 p-6 rounded-xl border border-slate-200">
          <BsRobot className="text-4xl text-slate-600" />
        </div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        className="text-center max-w-sm space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-xl font-semibold text-slate-800">
          No Projects Available
        </h3>

        <p className="text-slate-600">
          We're working on something amazing
        </p>

        {/* Status Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          Coming Soon
        </motion.div>
      </motion.div>
    </div>
  );
});

EmptyServices.displayName = 'EmptyServices';
export default EmptyServices;