import React, { memo } from 'react';
import Header from './Header';
import Footer from './Footer';
import AppRoutes from '../../routes/Approutes';

const Layout: React.FC<{ className?: string }> = memo(() => {
  return (
    <div style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <Header />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
});

Layout.displayName = 'Layout';
export default Layout;
