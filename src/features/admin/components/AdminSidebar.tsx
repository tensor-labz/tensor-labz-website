import { memo } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  FaTimes,
  FaChartPie,
  FaUsers,
  FaCreditCard,
  FaCog,
  FaGlobe,
} from 'react-icons/fa';
import { MODULES } from '../config/modules';

/* Modules consolidated into Site Control — hidden from the main sidebar */
const SITE_CONTROL_IDS = new Set(['contact', 'social', 'about']);

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

const SIDEBAR_W = 224; // px — keep in sync with lg:ml-56 (56 × 4 = 224) in AdminDashboard

const AdminSidebar = memo(({ open, onClose }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { module: activeModule } = useParams();

  const isOverview =
    location.pathname === '/admin' || location.pathname === '/admin/';
  const isUsers = location.pathname.startsWith('/admin/users');
  const isBilling = location.pathname.startsWith('/admin/billing');
  const isSettings = location.pathname.startsWith('/admin/settings');
  const isSiteControl =
    location.pathname.startsWith('/admin/site-control') ||
    (activeModule !== undefined && SITE_CONTROL_IDS.has(activeModule));

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  const NavBtn = ({
    isActive,
    onClick,
    icon: Icon,
    label,
    layoutId,
  }: {
    isActive: boolean;
    onClick: () => void;
    icon: React.ElementType;
    label: string;
    layoutId?: string;
  }) => (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left w-full transition-colors"
      style={
        isActive
          ? { backgroundColor: 'var(--accent)', color: '#fff' }
          : { backgroundColor: 'transparent', color: 'var(--text-muted)' }
      }
    >
      <Icon size={15} className="shrink-0" />
      <span>{label}</span>
      {isActive && (
        <motion.div
          layoutId={layoutId ?? 'sidebar-indicator'}
          className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
        />
      )}
    </motion.button>
  );

  const SidebarContent = () => (
    <nav className="flex flex-col gap-1 p-4">
      <p
        className="text-[10px] font-semibold tracking-[0.25em] uppercase px-3 mb-2"
        style={{ color: 'var(--text-muted)' }}
      >
        Overview
      </p>
      <NavBtn
        isActive={isOverview}
        onClick={() => handleNav('/admin')}
        icon={FaChartPie}
        label="Dashboard"
        layoutId="sidebar-indicator"
      />

      <div
        className="my-2"
        style={{ borderTop: '1px solid var(--glass-border-subtle)' }}
      />

      <p
        className="text-[10px] font-semibold tracking-[0.25em] uppercase px-3 mb-2"
        style={{ color: 'var(--text-muted)' }}
      >
        Modules
      </p>
      <NavBtn
        isActive={isSiteControl}
        onClick={() => handleNav('/admin/site-control')}
        icon={FaGlobe}
        label="Site Control"
      />
      {MODULES.filter((mod) => !SITE_CONTROL_IDS.has(mod.id)).map((mod) => {
        const isActive =
          !isOverview &&
          !isUsers &&
          !isBilling &&
          !isSettings &&
          !isSiteControl &&
          activeModule === mod.id;
        return (
          <NavBtn
            key={mod.id}
            isActive={isActive}
            onClick={() => handleNav(`/admin/${mod.id}`)}
            icon={mod.icon}
            label={mod.label}
          />
        );
      })}

      <div
        className="my-2"
        style={{ borderTop: '1px solid var(--glass-border-subtle)' }}
      />

      <p
        className="text-[10px] font-semibold tracking-[0.25em] uppercase px-3 mb-2"
        style={{ color: 'var(--text-muted)' }}
      >
        Management
      </p>
      <NavBtn
        isActive={isUsers}
        onClick={() => handleNav('/admin/users')}
        icon={FaUsers}
        label="Users"
      />
      <NavBtn
        isActive={isBilling}
        onClick={() => handleNav('/admin/billing')}
        icon={FaCreditCard}
        label="Billing"
      />

      <div
        className="my-2"
        style={{ borderTop: '1px solid var(--glass-border-subtle)' }}
      />

      <p
        className="text-[10px] font-semibold tracking-[0.25em] uppercase px-3 mb-2"
        style={{ color: 'var(--text-muted)' }}
      >
        System
      </p>
      <NavBtn
        isActive={isSettings}
        onClick={() => handleNav('/admin/settings')}
        icon={FaCog}
        label="Settings"
      />
    </nav>
  );

  return (
    <>
      {/* ── Desktop: fixed, never scrolls, never shifts ── */}
      <aside
        className="hidden lg:flex flex-col"
        style={{
          position: 'fixed',
          top: 57, // header height
          left: 0,
          width: SIDEBAR_W,
          height: 'calc(100vh - 57px)',
          overflowY: 'auto',
          borderRight: '1px solid var(--glass-border)',
          backgroundColor: 'var(--glass-bg-subtle)',
          zIndex: 40,
        }}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile: slide-in drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-64 z-50 lg:hidden flex flex-col"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRight: '1px solid var(--glass-border)',
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-4"
                style={{ borderBottom: '1px solid var(--glass-border)' }}
              >
                <span
                  className="font-bold text-base"
                  style={{
                    color: 'var(--text-primary)',
                    fontFamily: '"Syne", sans-serif',
                  }}
                >
                  Menu
                </span>
                <button
                  onClick={onClose}
                  style={{ color: 'var(--text-muted)' }}
                >
                  <FaTimes size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

AdminSidebar.displayName = 'AdminSidebar';
export default AdminSidebar;
