import React, { memo } from 'react';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import { motion } from 'motion/react';

const ServiceEmpty: React.FC = memo(() => {
  return (
    <div className="col-span-1 flex flex-col items-center justify-center px-8 py-20 sm:col-span-2 lg:col-span-3">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="relative rounded-2xl border border-rim bg-raised p-8 shadow-sm">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <ReactIcon name="BsRobot" size={48} className="text-accent" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="max-w-md space-y-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <h3 className="text-2xl font-bold text-fg">No Projects Available</h3>
        <p className="text-base leading-relaxed text-muted">
          We&apos;re crafting something extraordinary for you
        </p>
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-rim bg-accent-soft px-5 py-2.5 text-sm font-medium text-accent"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <motion.div
            className="h-2 w-2 rounded-full bg-accent"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Coming Soon
        </motion.div>
      </motion.div>
    </div>
  );
});

ServiceEmpty.displayName = 'ServiceEmpty';
export default ServiceEmpty;
