import { useState, useEffect } from 'react';

export default function LoadingPlaceholder() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // Slow down as it approaches 100%
        const increment = 100 - prevProgress > 40 ? 5 : 2;
        const newProgress = Math.min(prevProgress + increment, 95);
        return newProgress;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-24 h-24 mb-6 relative">
        {/* Spinner */}
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div
          className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"
          style={{ animationDuration: '1.2s' }}
        ></div>

        {/* Company logo or icon could go here */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17" />
            <path d="M2 12L12 17L22 12" />
          </svg>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Loading text */}
      <div className="text-gray-700 font-medium text-center">
        <p>Loading application assets...</p>
        <p className="text-sm text-gray-500 mt-2">{progress.toFixed(0)}%</p>
      </div>
    </div>
  );
}