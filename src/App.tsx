import React, { memo } from 'react';
import {AnimatePresence } from 'framer-motion';
import { RootContextProvider } from './contexts/RootContext';
import OfflineWarning from './components/OfflineWarning';
import Layout from './components/layout/Layout';



const App: React.FC = memo(() => {
  return (
<RootContextProvider>
        <div className="min-h-screen flex flex-col">
          <AnimatePresence>
          <OfflineWarning />
          <Layout/>
          </AnimatePresence>
        </div>
      </RootContextProvider>
  );
});

App.displayName = 'App';
export default App;