import React, { memo } from 'react';
import { motion } from 'framer-motion';

const ServiceLoading: React.FC = memo(() => {
  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-20 px-8">
      {/* 3D Cube Loading Animation */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="relative w-16 h-16"
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Front Face */}
          <div
            className="absolute w-16 h-16 bg-gradient-to-br from-[#092B4A] to-[#0d3a5c] border border-[#092B4A]/20 rounded-lg"
            style={{
              transform: 'translateZ(32px)',
            }}
          />

          {/* Back Face */}
          <div
            className="absolute w-16 h-16 bg-gradient-to-br from-[#0d3a5c] to-[#092B4A] border border-[#092B4A]/20 rounded-lg"
            style={{
              transform: 'translateZ(-32px) rotateY(180deg)',
            }}
          />

          {/* Right Face */}
          <div
            className="absolute w-16 h-16 bg-gradient-to-br from-[#0a2940] to-[#092B4A] border border-[#092B4A]/20 rounded-lg"
            style={{
              transform: 'rotateY(90deg) translateZ(32px)',
            }}
          />

          {/* Left Face */}
          <div
            className="absolute w-16 h-16 bg-gradient-to-br from-[#092B4A] to-[#0a2940] border border-[#092B4A]/20 rounded-lg"
            style={{
              transform: 'rotateY(-90deg) translateZ(32px)',
            }}
          />

          {/* Top Face */}
          <div
            className="absolute w-16 h-16 bg-gradient-to-br from-[#0e4259] to-[#092B4A] border border-[#092B4A]/20 rounded-lg"
            style={{
              transform: 'rotateX(90deg) translateZ(32px)',
            }}
          />

          {/* Bottom Face */}
          <div
            className="absolute w-16 h-16 bg-gradient-to-br from-[#092B4A] to-[#0e4259] border border-[#092B4A]/20 rounded-lg"
            style={{
              transform: 'rotateX(-90deg) translateZ(32px)',
            }}
          />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#092B4A]/30 rounded-full"
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 40],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 40],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Subtle Glow Effect */}
      <motion.div
        className="absolute w-32 h-32 bg-[#092B4A]/10 rounded-full blur-xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
});

ServiceLoading.displayName = 'ServiceLoading';
export default ServiceLoading;