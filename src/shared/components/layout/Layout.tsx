import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AppRoutes from '../../../routes/Approutes';

const ADMIN_ROUTES = ['/login', '/admin'];

const Layout: React.FC = memo(() => {
  const { pathname } = useLocation();
  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <div className="relative" style={{ zIndex: 1 }}>
      {!isAdminRoute && <Header />}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
});

Layout.displayName = 'Layout';
export default Layout;
