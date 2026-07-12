import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const loadingStages = [
  { text: 'Initializing', threshold: 0 },
  { text: 'Loading resources', threshold: 25 },
  { text: 'Preparing interface', threshold: 60 },
  { text: 'Finalizing', threshold: 85 },
  { text: 'Ready', threshold: 100 },
];

export default function ProjectPageLoading() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const remaining = 100 - prev;
        const increment =
          remaining > 20 ? Math.random() * 3 + 1 : Math.random() * 1.5 + 0.5;
        const next = Math.min(prev + increment, 100);
        const stage = [...loadingStages]
          .reverse()
          .find((s) => next >= s.threshold);
        if (stage) setLoadingText(stage.text);
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="h-16 w-16 rounded-full border-2 border-slate-200 border-t-blue-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-blue-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" opacity="0.8" />
                <path d="M2 17L12 22L22 17" opacity="0.6" />
                <path d="M2 12L12 17L22 12" opacity="0.4" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="mx-auto w-80 max-w-sm">
            <div className="h-1 overflow-hidden rounded-full bg-slate-200">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <motion.p
              key={loadingText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-medium text-slate-700"
            >
              {loadingText}
            </motion.p>
            <p className="font-mono text-sm text-slate-500">
              {Math.round(progress)}%
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center space-x-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-blue-500"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
