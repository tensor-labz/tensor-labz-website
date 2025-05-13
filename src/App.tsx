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
import AppContextProvider from './contexts/Api/AppContext';
import OfflineWarning from './components/OfflineWarning';



const App: React.FC = memo(() => {
  return (
    <DeviceContextProvider>
      <AppContextProvider>
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
    </AppContextProvider>
    </DeviceContextProvider>
  );
});

App.displayName = 'App';
export default App;