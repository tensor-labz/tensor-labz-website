import React, { memo } from 'react';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import { motion } from 'motion/react';

const ServiceEmpty: React.FC = memo(() => {
  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-20 px-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div
          className="relative p-8 rounded-2xl shadow-sm"
          style={{
            backgroundColor: 'var(--bg-raised)',
            border: '1px solid var(--border)',
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <ReactIcon name="BsRobot" size={48} style={{ color: 'var(--accent)' }} />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="text-center max-w-md space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <h3
          className="text-2xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          No Projects Available
        </h3>
        <p
          className="text-base leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          We&apos;re crafting something extraordinary for you
        </p>
        <motion.div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
          style={{
            backgroundColor: 'var(--accent-soft)',
            color: 'var(--accent)',
            border: '1px solid var(--border)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
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
