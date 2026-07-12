import { memo } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import { MODULES } from '../config/modules';

/* Modules consolidated into Site Control — hidden from the main sidebar */
const SITE_CONTROL_IDS = new Set(['contact', 'social', 'about']);

/* Modules shown under Management section instead of the Modules list */
const MANAGEMENT_IDS = new Set(['users', 'customers', 'orders']);

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
  const isCustomers = location.pathname.startsWith('/admin/customers');
  const isOrders = location.pathname.startsWith('/admin/orders');
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
    icon,
    label,
    layoutId,
  }: {
    isActive: boolean;
    onClick: () => void;
    icon: string;
    label: string;
    layoutId?: string;
  }) => (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors"
      style={
        isActive
          ? { backgroundColor: 'var(--accent)', color: '#fff' }
          : { backgroundColor: 'transparent', color: 'var(--text-muted)' }
      }
    >
      <ReactIcon name={icon} size={15} className="shrink-0" />
      <span>{label}</span>
      {isActive && (
        <motion.div
          layoutId={layoutId ?? 'sidebar-indicator'}
          className="ml-auto h-1.5 w-1.5 rounded-full bg-white"
        />
      )}
    </motion.button>
  );

  const SidebarContent = () => (
    <nav className="flex flex-col gap-1 p-4">
      <p
        className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.25em]"
        style={{ color: 'var(--text-muted)' }}
      >
        Overview
      </p>
      <NavBtn
        isActive={isOverview}
        onClick={() => handleNav('/admin')}
        icon="FaChartPie"
        label="Dashboard"
        layoutId="sidebar-indicator"
      />

      <div
        className="my-2"
        style={{ borderTop: '1px solid var(--glass-border-subtle)' }}
      />

      <p
        className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.25em]"
        style={{ color: 'var(--text-muted)' }}
      >
        Modules
      </p>
      <NavBtn
        isActive={isSiteControl}
        onClick={() => handleNav('/admin/site-control')}
        icon="FaGlobe"
        label="Site Control"
      />
      {MODULES.filter(
        (mod) => !SITE_CONTROL_IDS.has(mod.id) && !MANAGEMENT_IDS.has(mod.id)
      ).map((mod) => {
        const isActive =
          !isOverview &&
          !isUsers &&
          !isCustomers &&
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
        className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.25em]"
        style={{ color: 'var(--text-muted)' }}
      >
        Management
      </p>
      <NavBtn
        isActive={isUsers}
        onClick={() => handleNav('/admin/users')}
        icon="FaUsers"
        label="Users"
      />
      <NavBtn
        isActive={isCustomers}
        onClick={() => handleNav('/admin/customers')}
        icon="FaAddressCard"
        label="Customers"
      />
      <NavBtn
        isActive={isOrders}
        onClick={() => handleNav('/admin/orders')}
        icon="FaClipboardList"
        label="Orders"
      />
      <NavBtn
        isActive={isBilling}
        onClick={() => handleNav('/admin/billing')}
        icon="FaCreditCard"
        label="Billing"
      />

      <div
        className="my-2"
        style={{ borderTop: '1px solid var(--glass-border-subtle)' }}
      />

      <p
        className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.25em]"
        style={{ color: 'var(--text-muted)' }}
      >
        System
      </p>
      <NavBtn
        isActive={isSettings}
        onClick={() => handleNav('/admin/settings')}
        icon="FaCog"
        label="Settings"
      />
    </nav>
  );

  return (
    <>
      {/* ── Desktop: fixed, never scrolls, never shifts ── */}
      <aside
        className="hidden flex-col lg:flex"
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
              className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col lg:hidden"
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
                  className="text-base font-bold"
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
                  <ReactIcon name="FaTimes" size={16} />
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
