import React, { memo, useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdSignalWifiOff,
  MdRefresh
} from 'react-icons/md';

import AppRoutes from './routes/Approutes';
import DeviceContextProvider from './contexts/DeviceContext';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

// Offline Warning Component
const OfflineWarning: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };

  }, []);
  const getData = async () => {
    try {
      const res = await fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRmFKioUp0LypY4N1QlLdAjRt4pOHN0i0SmQ_VKDNmyKSnFLKJdJfqOvKmL3j4u50j-FhiHwO_Lqu6P/pubhtml"
      );
      const data = await res.json();
      const a = Object.keys(data).map((key) => data[key]);
      console.log(a);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isOnline) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-0 left-0 w-full bg-red-500 text-white p-3 z-50 flex items-center justify-center space-x-2"
    >
      <MdSignalWifiOff className="w-6 h-6" />
      <span className="font-semibold">No Internet Connection</span>
      <button
        onClick={() => window.location.reload()}
        className="ml-4 bg-white text-red-500 px-3 py-1 rounded flex items-center space-x-1 hover:bg-gray-100 transition"
      >
        <MdRefresh />
        <span>Retry</span>
      </button>
    </motion.div>
  );
};

const App: React.FC = memo(() => {
  return (
    <DeviceContextProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <AnimatePresence>
            <OfflineWarning />
          </AnimatePresence>

          <Header />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </DeviceContextProvider>
  );
});

App.displayName = 'App';
export default App;