import React, { memo } from 'react';
import { AppProviders } from './app/providers';
import OfflineWarning from './components/PlaceHolders/OfflineWarning';
import Layout from './shared/components/layout/Layout';
import ErrorBoundary from './components/PlaceHolders/ErrorBoundary';

const App: React.FC = memo(() => {
  return (
    <ErrorBoundary>
      <AppProviders>
        <div className="min-h-screen flex flex-col">
          <OfflineWarning />
          <Layout />
        </div>
      </AppProviders>
    </ErrorBoundary>
  );
});

App.displayName = 'App';
export default App;
