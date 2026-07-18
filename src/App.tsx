import React, { memo, Suspense } from 'react';
import { AppProviders } from './app/providers';
import OfflineWarning from './components/PlaceHolders/OfflineWarning';
import Layout from './shared/components/layout/Layout';
import ErrorBoundary from './components/PlaceHolders/ErrorBoundary';
import GlobalBackground from './shared/components/three/GlobalBackground';

const App: React.FC = memo(() => {
  return (
    <ErrorBoundary>
      <AppProviders>
        <div className="relative flex min-h-screen flex-col bg-canvas text-fg">
          {/* Three.js background — fixed, always behind everything */}
          <Suspense fallback={null}>
            <GlobalBackground />
          </Suspense>
          <OfflineWarning />
          <Layout />
        </div>
      </AppProviders>
    </ErrorBoundary>
  );
});

App.displayName = 'App';
export default App;
