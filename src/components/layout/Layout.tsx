import React, { memo } from 'react';
import Header from './Header';
import Footer from './Footer';
import AppRoutes from '../../routes/Approutes';



const Layout: React.FC<{ className?: string }> = memo(() => {
    return (
        <>
        <Header />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </>
    )
})
Layout.displayName = 'Layout';
export default Layout;