import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FaUserPlus,
  FaSearch,
  FaTrash,
  FaEdit,
  FaShieldAlt,
  FaUserCheck,
  FaUserClock,
  FaBan,
  FaEllipsisV,
  FaTimes,
  FaSave,
} from 'react-icons/fa';

type Role = 'Super Admin' | 'Admin' | 'Editor' | 'Viewer';
type Status = 'Active' | 'Inactive' | 'Suspended';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  lastLogin: string;
  joined: string;
  avatar?: string;
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Thanu Mahee',
    email: 'thanu@tensorlabz.com',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: '2 min ago',
    joined: 'Jan 2024',
  },
  {
    id: '2',
    name: 'Kasun Perera',
    email: 'kasun@tensorlabz.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '1 hr ago',
    joined: 'Mar 2024',
  },
  {
    id: '3',
    name: 'Nimasha Silva',
    email: 'nimasha@tensorlabz.com',
    role: 'Editor',
    status: 'Active',
    lastLogin: '3 days ago',
    joined: 'May 2024',
  },
  {
    id: '4',
    name: 'Ravin Fernando',
    email: 'ravin@tensorlabz.com',
    role: 'Viewer',
    status: 'Inactive',
    lastLogin: '2 weeks ago',
    joined: 'Jun 2024',
  },
  {
    id: '5',
    name: 'Dilani Bandara',
    email: 'dilani@tensorlabz.com',
    role: 'Editor',
    status: 'Active',
    lastLogin: '5 hrs ago',
    joined: 'Aug 2024',
  },
  {
    id: '6',
    name: 'Tharaka Wijesinghe',
    email: 'tharaka@tensorlabz.com',
    role: 'Viewer',
    status: 'Suspended',
    lastLogin: '1 month ago',
    joined: 'Sep 2024',
  },
];

const ROLE_META: Record<Role, { color: string; bg: string }> = {
  'Super Admin': { color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  Admin: { color: '#38bdf8', bg: 'rgba(56,189,248,0.12)' },
  Editor: { color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
  Viewer: { color: '#94a3b8', bg: 'rgba(148,163,184,0.12)' },
};

const STATUS_META: Record<
  Status,
  { color: string; bg: string; icon: React.ReactNode }
> = {
  Active: {
    color: '#34d399',
    bg: 'rgba(52,211,153,0.12)',
    icon: <FaUserCheck size={10} />,
  },
  Inactive: {
    color: '#94a3b8',
    bg: 'rgba(148,163,184,0.12)',
    icon: <FaUserClock size={10} />,
  },
  Suspended: {
    color: '#f87171',
    bg: 'rgba(248,113,113,0.12)',
    icon: <FaBan size={10} />,
  },
};

const STATS = [
  {
    label: 'Total Users',
    value: MOCK_USERS.length,
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.1)',
  },
  {
    label: 'Active',
    value: MOCK_USERS.filter((u) => u.status === 'Active').length,
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
  },
  {
    label: 'Admins',
    value: MOCK_USERS.filter(
      (u) => u.role === 'Admin' || u.role === 'Super Admin'
    ).length,
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.1)',
  },
  {
    label: 'Suspended',
    value: MOCK_USERS.filter((u) => u.status === 'Suspended').length,
    color: '#f87171',
    bg: 'rgba(248,113,113,0.1)',
  },
];

/* ── Avatar initials ── */
const Avatar = ({ name, size = 36 }: { name: string; size?: number }) => {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const colors = [
    '#38bdf8',
    '#818cf8',
    '#34d399',
    '#fb923c',
    '#f472b6',
    '#a78bfa',
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className="flex items-center justify-center rounded-full font-bold shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: `${color}22`,
        color,
        fontSize: size * 0.36,
      }}
    >
      {initials}
    </div>
  );
};

/* ── Invite / Edit modal ── */
const UserModal = ({
  user,
  onClose,
}: {
  user: Partial<User> | null;
  onClose: () => void;
}) => {
  const isNew = !user?.id;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="rounded-2xl p-6 w-full max-w-md"
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--glass-border)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3
            className="font-bold text-lg"
            style={{
              color: 'var(--text-primary)',
              fontFamily: '"Syne", sans-serif',
            }}
          >
            {isNew ? 'Invite User' : 'Edit User'}
          </h3>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <FaTimes size={14} />
          </button>
        </div>
        <div className="space-y-4">
          {['Full Name', 'Email Address'].map((lbl) => (
            <div key={lbl}>
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--text-muted)' }}
              >
                {lbl}
              </label>
              <input
                type={lbl === 'Email Address' ? 'email' : 'text'}
                defaultValue={lbl === 'Full Name' ? user?.name : user?.email}
                placeholder={
                  lbl === 'Email Address' ? 'user@tensorlabz.com' : 'Full name'
                }
                className="w-full px-3 py-2.5 rounded-lg text-sm"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
            </div>
          ))}
          <div>
            <label
              className="block text-xs font-semibold mb-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              Role
            </label>
            <select
              defaultValue={user?.role ?? 'Viewer'}
              className="w-full px-3 py-2.5 rounded-lg text-sm"
              style={{
                backgroundColor: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            >
              {(['Super Admin', 'Admin', 'Editor', 'Viewer'] as Role[]).map(
                (r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                )
              )}
            </select>
          </div>
          {!isNew && (
            <div>
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--text-muted)' }}
              >
                Status
              </label>
              <select
                defaultValue={user?.status ?? 'Active'}
                className="w-full px-3 py-2.5 rounded-lg text-sm"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              >
                {(['Active', 'Inactive', 'Suspended'] as Status[]).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium"
            style={{
              backgroundColor: 'var(--glass-bg-raised)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-muted)',
            }}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            <FaSave size={12} />
            {isNew ? 'Send Invite' : 'Save Changes'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Row action menu ── */
const ActionMenu = ({
  onEdit,
  onDelete,
}: {
  user?: User;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-7 h-7 flex items-center justify-center rounded-lg"
        style={{
          color: 'var(--text-muted)',
          backgroundColor: open ? 'var(--glass-bg-raised)' : 'transparent',
        }}
      >
        <FaEllipsisV size={12} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-9 z-30 rounded-xl overflow-hidden shadow-xl w-36"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <button
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-xs font-medium hover:bg-[var(--glass-bg-raised)] transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              <FaEdit size={11} style={{ color: '#38bdf8' }} /> Edit
            </button>
            <button
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-xs font-medium hover:bg-[var(--glass-bg-raised)] transition-colors"
              style={{ color: '#f87171' }}
            >
              <FaTrash size={11} /> Remove
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Main ── */
const AdminUsers = memo(() => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | 'All'>('All');
  const [modal, setModal] = useState<Partial<User> | null | false>(false);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchQ =
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchR = roleFilter === 'All' || u.role === roleFilter;
    return matchQ && matchR;
  });

  const handleDelete = (id: string) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2
              className="text-2xl font-bold"
              style={{
                color: 'var(--text-primary)',
                fontFamily: '"Syne", sans-serif',
              }}
            >
              Users
            </h2>
            <p
              className="text-xs mt-0.5"
              style={{ color: 'var(--text-muted)' }}
            >
              Manage access and roles for your team
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setModal({})}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold self-start sm:self-auto"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            <FaUserPlus size={13} /> Invite User
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-4 flex items-center gap-3"
              style={{
                backgroundColor: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: s.bg, color: s.color }}
              >
                <FaShieldAlt size={14} />
              </div>
              <div>
                <p
                  className="text-2xl font-bold leading-none"
                  style={{
                    color: 'var(--text-primary)',
                    fontFamily: '"Syne", sans-serif',
                  }}
                >
                  {s.value}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FaSearch
              size={12}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              className="w-full pl-8 pr-3 py-2.5 rounded-xl text-sm"
              style={{
                backgroundColor: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['All', 'Super Admin', 'Admin', 'Editor', 'Viewer'] as const).map(
              (r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className="px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                  style={
                    roleFilter === r
                      ? { backgroundColor: 'var(--accent)', color: '#fff' }
                      : {
                          backgroundColor: 'var(--glass-bg-raised)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--glass-border)',
                        }
                  }
                >
                  {r}
                </button>
              )
            )}
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
          }}
        >
          {/* Header */}
          <div
            className="grid items-center px-5 py-3 text-[10px] font-semibold tracking-widest uppercase"
            style={{
              gridTemplateColumns: '1fr 1fr 120px 100px 130px 40px',
              color: 'var(--text-muted)',
              borderBottom: '1px solid var(--glass-border)',
              backgroundColor: 'var(--glass-bg-subtle)',
            }}
          >
            <span>User</span>
            <span className="hidden md:block">Email</span>
            <span>Role</span>
            <span className="hidden sm:block">Status</span>
            <span className="hidden lg:block">Last Login</span>
            <span />
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                No users match your search.
              </p>
            </div>
          ) : (
            filtered.map((user, i) => {
              const role = ROLE_META[user.role];
              const status = STATUS_META[user.status];
              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="grid items-center px-5 py-3.5 group"
                  style={{
                    gridTemplateColumns: '1fr 1fr 120px 100px 130px 40px',
                    borderBottom:
                      i < filtered.length - 1
                        ? '1px solid var(--glass-border-subtle)'
                        : 'none',
                  }}
                >
                  {/* User */}
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={user.name} />
                    <div className="min-w-0">
                      <p
                        className="text-sm font-semibold truncate"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {user.name}
                      </p>
                      <p
                        className="text-xs truncate md:hidden"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {user.email}
                      </p>
                    </div>
                  </div>
                  {/* Email */}
                  <p
                    className="text-xs truncate hidden md:block"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {user.email}
                  </p>
                  {/* Role */}
                  <span
                    className="text-[11px] font-semibold px-2 py-1 rounded-lg w-fit"
                    style={{ backgroundColor: role.bg, color: role.color }}
                  >
                    {user.role}
                  </span>
                  {/* Status */}
                  <span
                    className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium px-2 py-1 rounded-lg w-fit"
                    style={{ backgroundColor: status.bg, color: status.color }}
                  >
                    {status.icon} {user.status}
                  </span>
                  {/* Last login */}
                  <p
                    className="text-xs hidden lg:block"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {user.lastLogin}
                  </p>
                  {/* Actions */}
                  <ActionMenu
                    user={user}
                    onEdit={() => setModal(user)}
                    onDelete={() => handleDelete(user.id)}
                  />
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      <AnimatePresence>
        {modal !== false && (
          <UserModal user={modal ?? {}} onClose={() => setModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
});

AdminUsers.displayName = 'AdminUsers';
export default AdminUsers;
