import React, { memo, useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import ReactIcon from '../ui/ReactIcon';
import { throttle } from '../../utils/throttle';

const OfflineWarning: React.FC = memo(() => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const setOnlineStatus = useRef(() => setIsOnline(navigator.onLine));

  useEffect(() => {
    const throttledHandler = throttle(() => {
      setOnlineStatus.current();
    }, 1000);

    window.addEventListener('online', throttledHandler);
    window.addEventListener('offline', throttledHandler);

    return () => {
      window.removeEventListener('online', throttledHandler);
      window.removeEventListener('offline', throttledHandler);
    };
  }, []);

  if (isOnline) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-0 left-0 w-full bg-red-500 text-white p-3 z-[1000] flex items-center justify-center space-x-2"
    >
      <ReactIcon name="MdSignalWifiOff" size={24} />
      <span className="font-semibold">No Internet Connection</span>
      <button
        onClick={() => window.location.reload()}
        className="ml-4 bg-white text-red-500 px-3 py-1 rounded flex items-center space-x-1 hover:bg-gray-100 transition"
      >
        <ReactIcon name="MdRefresh" size={16} />
        <span>Retry</span>
      </button>
    </motion.div>
  );
});

OfflineWarning.displayName = 'OfflineWarning';
export default OfflineWarning;
