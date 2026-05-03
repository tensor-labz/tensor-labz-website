import React, { memo, Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
import AppRoutes from '../../../routes/Approutes';
import GlobalBackground from '../three/GlobalBackground';

const Layout: React.FC = memo(() => (
  <div
    className="relative"
    style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
  >
    <Suspense fallback={null}>
      <GlobalBackground />
    </Suspense>
    <div className="relative" style={{ zIndex: 1 }}>
      <Header />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  </div>
));

Layout.displayName = 'Layout';
export default Layout;
