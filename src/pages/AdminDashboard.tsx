import { memo, useState } from 'react';
import { motion } from 'motion/react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import ReactIcon from '../shared/components/ui/ReactIcon';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { signOut, selectAuthUser } from '../store/authSlice';
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
  const info = useCompanyInfo();
  const logoSrc = resolveLogo(info, logo);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await dispatch(signOut());
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden text-fg">
      <HeaderHelmet title="Admin Dashboard" />

      {/* ── Top bar ── */}
      <header
        className="sticky top-0 z-50 flex shrink-0 items-center justify-between px-5 py-3.5"
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
            className="flex h-8 w-8 items-center justify-center rounded-lg lg:hidden"
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
          <span className="hidden text-xs text-muted sm:block">
            {user?.displayName || user?.email}
          </span>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium"
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
      <div className="flex min-h-0 flex-1">
        <AdminSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main area — offset by fixed sidebar width on desktop */}
        <main className="min-h-0 flex-1 overflow-y-auto lg:ml-56">
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
