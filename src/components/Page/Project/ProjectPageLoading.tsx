import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function ProfessionalLoading() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');

  const loadingStages = [
    { text: 'Initializing', threshold: 0 },
    { text: 'Loading resources', threshold: 25 },
    { text: 'Preparing interface', threshold: 60 },
    { text: 'Finalizing', threshold: 85 },
    { text: 'Ready', threshold: 100 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const remaining = 100 - prev;
        const increment = remaining > 20 ? Math.random() * 3 + 1 : Math.random() * 1.5 + 0.5;
        const newProgress = Math.min(prev + increment, 100);

        // Update loading text based on progress
        const currentStage = [...loadingStages].reverse().find(stage => newProgress >= stage.threshold);
        if (currentStage) {
          setLoadingText(currentStage.text);
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center space-y-8">
        {/* Logo/Brand Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full border-2 border-slate-200 border-t-blue-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" opacity="0.8" />
                <path d="M2 17L12 22L22 17" opacity="0.6" />
                <path d="M2 12L12 17L22 12" opacity="0.4" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {/* Progress Bar */}
          <div className="w-80 max-w-sm mx-auto">
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <motion.p
              key={loadingText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-slate-700 font-medium"
            >
              {loadingText}
            </motion.p>
            <p className="text-sm text-slate-500 font-mono">
              {Math.round(progress)}%
            </p>
          </div>
        </motion.div>

        {/* Animated Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center space-x-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}