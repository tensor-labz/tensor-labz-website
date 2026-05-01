import React, { memo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { RootContextProvider } from './contexts/RootContext';
import OfflineWarning from './components/PlaceHolders/OfflineWarning';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/PlaceHolders/ErrorBoundary';

const App: React.FC = memo(() => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <RootContextProvider>
          <div className="min-h-screen flex flex-col">
            <OfflineWarning />
            <Layout />
          </div>
        </RootContextProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
});

App.displayName = 'App';
export default App;