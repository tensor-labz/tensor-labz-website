import React, { memo } from 'react';
import { BrowserRouter } from "react-router-dom";
import {AnimatePresence } from 'framer-motion';
import AppRoutes from './routes/Approutes';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { RootContextProvider } from './contexts/RootContext';
import OfflineWarning from './components/OfflineWarning';



const App: React.FC = memo(() => {
  return (
<RootContextProvider>
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
      </RootContextProvider>
  );
});

App.displayName = 'App';
export default App;