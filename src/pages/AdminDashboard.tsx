import { memo, useState } from 'react';
import { motion } from 'motion/react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import ReactIcon from '../shared/components/ui/ReactIcon';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { signOut, selectAuthUser } from '../store/authSlice';
import { useTheme } from '../shared/hooks/useTheme';
import AdminSidebar from '../features/admin/components/AdminSidebar';
import AdminOverview from '../features/admin/components/AdminOverview';
import AdminDataTable from '../features/admin/components/AdminDataTable';
import AdminCrudForm from '../features/admin/components/AdminCrudForm';
import AdminFormBuilder from '../features/admin/components/AdminFormBuilder';
import AdminSiteControl from '../features/admin/components/AdminSiteControl';
import AdminBilling from '../features/admin/components/AdminBilling';
import AdminSettings from '../features/admin/components/AdminSettings';
import HeaderHelmet from '../base/Head';
import { useCompanyInfo, resolveLogo } from '../shared/hooks/useCompanyInfo';
import logo from '../assets/images/logo.png';

const AdminDashboard = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectAuthUser);
  const { theme, toggleTheme } = useTheme();
  const info = useCompanyInfo();
  const logoSrc = resolveLogo(info, theme, logo);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await dispatch(signOut());
    navigate('/login', { replace: true });
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col text-fg">
      <HeaderHelmet title="Admin Dashboard" />

      {/* ── Top bar ── */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-5 py-3.5 shrink-0"
        style={{
          backgroundColor: 'var(--header-bg)',
          borderBottom: '1px solid var(--glass-border)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg"
            style={{
              backgroundColor: 'var(--bg-raised)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}
            aria-label="Open menu"
          >
            <ReactIcon name="FaBars" size={13} />
          </motion.button>

          {logoSrc && (
            <Link to="/">
              <img
                src={logoSrc}
                alt={info.name}
                className="h-8 object-contain"
              />
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-xs hidden sm:block text-muted">
            {user?.displayName || user?.email}
          </span>

          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-base shrink-0"
            style={{
              backgroundColor: 'var(--bg-raised)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}
          >
            {theme === 'dark' ? (
              <ReactIcon name="RiSunLine" size={16} />
            ) : (
              <ReactIcon name="RiMoonLine" size={16} />
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
            style={{
              backgroundColor: 'var(--glass-bg-raised)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
            }}
          >
            <ReactIcon name="FaSignOutAlt" size={12} />
            <span className="hidden sm:inline">Sign out</span>
          </motion.button>
        </div>
      </header>

      {/* ── Body: sidebar + content ── */}
      <div className="flex flex-1 min-h-0">
        <AdminSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main area — offset by fixed sidebar width on desktop */}
        <main className="flex-1 min-h-0 overflow-y-auto lg:ml-56">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="billing" element={<AdminBilling />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="site-control" element={<AdminSiteControl />} />
            <Route path=":module" element={<AdminDataTable />} />
            <Route path=":module/form-config" element={<AdminFormBuilder />} />
            <Route path=":module/:id" element={<AdminCrudForm />} />
          </Routes>
        </main>
      </div>
    </div>
  );
});

AdminDashboard.displayName = 'AdminDashboard';
export default AdminDashboard;
