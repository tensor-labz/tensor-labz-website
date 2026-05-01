import React, { memo } from 'react';
import {AnimatePresence } from 'motion/react';
import { RootContextProvider } from './contexts/RootContext';
import OfflineWarning from './components/PlaceHolders/OfflineWarning';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/PlaceHolders/ErrorBoundary';



const App: React.FC = memo(() => {
  return (
    <ErrorBoundary>
<RootContextProvider>
        <div className="min-h-screen flex flex-col">
          <AnimatePresence>
          <OfflineWarning />
          <Layout/>
          </AnimatePresence>
        </div>
      </RootContextProvider>
    </ErrorBoundary>
  );
});

App.displayName = 'App';
export default App;