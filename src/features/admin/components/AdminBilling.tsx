import { memo, useState } from 'react';
import { motion } from 'motion/react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  FaCreditCard,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaDownload,
  FaSearch,
  FaFilter,
} from 'react-icons/fa';

type PlanType = 'Starter' | 'Pro' | 'Enterprise';
type TxStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded';

interface Customer {
  id: string;
  name: string;
  email: string;
  plan: PlanType;
  status: TxStatus;
  amount: number;
  nextBilling: string;
  joined: string;
}

const CUSTOMERS: Customer[] = [
  {
    id: 'C001',
    name: 'AgriTech Lanka',
    email: 'billing@agritech.lk',
    plan: 'Enterprise',
    status: 'Paid',
    amount: 299,
    nextBilling: 'Jun 1, 2026',
    joined: 'Jan 2025',
  },
  {
    id: 'C002',
    name: 'GreenField Solutions',
    email: 'pay@greenfield.io',
    plan: 'Pro',
    status: 'Paid',
    amount: 79,
    nextBilling: 'May 18, 2026',
    joined: 'Mar 2025',
  },
  {
    id: 'C003',
    name: 'FutureFarm Co.',
    email: 'accounts@futurefarm.com',
    plan: 'Starter',
    status: 'Pending',
    amount: 19,
    nextBilling: 'May 10, 2026',
    joined: 'Apr 2025',
  },
  {
    id: 'C004',
    name: 'RoboHarvest Inc.',
    email: 'finance@roboharvest.net',
    plan: 'Enterprise',
    status: 'Paid',
    amount: 299,
    nextBilling: 'Jun 7, 2026',
    joined: 'Nov 2024',
  },
  {
    id: 'C005',
    name: 'SmartCrop AI',
    email: 'pay@smartcrop.ai',
    plan: 'Pro',
    status: 'Failed',
    amount: 79,
    nextBilling: 'May 8, 2026',
    joined: 'Feb 2025',
  },
  {
    id: 'C006',
    name: 'TechRoots Pvt Ltd',
    email: 'billing@techroots.com',
    plan: 'Starter',
    status: 'Paid',
    amount: 19,
    nextBilling: 'May 22, 2026',
    joined: 'Jan 2025',
  },
  {
    id: 'C007',
    name: 'NanoFarm Systems',
    email: 'accounts@nanofarm.lk',
    plan: 'Pro',
    status: 'Refunded',
    amount: 79,
    nextBilling: '—',
    joined: 'Mar 2025',
  },
];

const REVENUE_TREND = [
  { month: 'Nov', revenue: 620 },
  { month: 'Dec', revenue: 740 },
  { month: 'Jan', revenue: 890 },
  { month: 'Feb', revenue: 1020 },
  { month: 'Mar', revenue: 950 },
  { month: 'Apr', revenue: 1140 },
  { month: 'May', revenue: 1310 },
];

const PLAN_DIST = [
  {
    name: 'Starter',
    value: CUSTOMERS.filter((c) => c.plan === 'Starter').length,
    color: '#94a3b8',
  },
  {
    name: 'Pro',
    value: CUSTOMERS.filter((c) => c.plan === 'Pro').length,
    color: '#38bdf8',
  },
  {
    name: 'Enterprise',
    value: CUSTOMERS.filter((c) => c.plan === 'Enterprise').length,
    color: '#a78bfa',
  },
];

const PLAN_PRICE: Record<PlanType, { color: string; bg: string }> = {
  Starter: { color: '#94a3b8', bg: 'rgba(148,163,184,0.12)' },
  Pro: { color: '#38bdf8', bg: 'rgba(56,189,248,0.12)' },
  Enterprise: { color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
};

const TX_META: Record<
  TxStatus,
  { color: string; bg: string; icon: React.ReactNode }
> = {
  Paid: {
    color: '#34d399',
    bg: 'rgba(52,211,153,0.12)',
    icon: <FaCheckCircle size={10} />,
  },
  Pending: {
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.12)',
    icon: <FaClock size={10} />,
  },
  Failed: {
    color: '#f87171',
    bg: 'rgba(248,113,113,0.12)',
    icon: <FaTimesCircle size={10} />,
  },
  Refunded: {
    color: '#94a3b8',
    bg: 'rgba(148,163,184,0.12)',
    icon: <FaCreditCard size={10} />,
  },
};

const mrr = CUSTOMERS.filter((c) => c.status === 'Paid').reduce(
  (s, c) => s + c.amount,
  0
);

const STATS = [
  {
    label: 'Monthly Revenue',
    value: `$${mrr.toLocaleString()}`,
    sub: '+12% vs last month',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
  },
  {
    label: 'Active Customers',
    value: CUSTOMERS.filter((c) => c.status === 'Paid').length,
    sub: 'Paid & current',
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.1)',
  },
  {
    label: 'Pending Invoices',
    value: CUSTOMERS.filter((c) => c.status === 'Pending').length,
    sub: 'Awaiting payment',
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.1)',
  },
  {
    label: 'Failed Payments',
    value: CUSTOMERS.filter((c) => c.status === 'Failed').length,
    sub: 'Needs attention',
    color: '#f87171',
    bg: 'rgba(248,113,113,0.1)',
  },
];

const RevTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-3.5 py-2.5 text-xs shadow-xl"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--glass-border-strong)',
        color: 'var(--text-primary)',
      }}
    >
      <p
        className="font-semibold mb-0.5"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </p>
      <p style={{ color: '#34d399' }}>
        Revenue: <span className="font-bold">${payload[0].value}</span>
      </p>
    </div>
  );
};

const AdminBilling = memo(() => {
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState<PlanType | 'All'>('All');

  const filtered = CUSTOMERS.filter((c) => {
    const q = search.toLowerCase();
    const matchQ =
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q);
    const matchP = planFilter === 'All' || c.plan === planFilter;
    return matchQ && matchP;
  });

  return (
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
            Customers & Billing
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Subscriptions, invoices, and payment history
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold self-start sm:self-auto"
          style={{
            backgroundColor: 'var(--glass-bg-raised)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-primary)',
          }}
        >
          <FaDownload size={12} /> Export CSV
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-4 flex flex-col gap-3"
            style={{
              backgroundColor: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-semibold"
                style={{ color: 'var(--text-muted)' }}
              >
                {s.label}
              </span>
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: s.bg, color: s.color }}
              >
                <FaCreditCard size={11} />
              </span>
            </div>
            <p
              className="text-3xl font-bold tracking-tight"
              style={{
                color: 'var(--text-primary)',
                fontFamily: '"Syne", sans-serif',
              }}
            >
              {s.value}
            </p>
            <p className="text-xs" style={{ color: s.color }}>
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        {/* Revenue trend */}
        <div
          className="lg:col-span-2 rounded-2xl p-5 flex flex-col"
          style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <div className="mb-5">
            <p
              className="font-bold text-sm"
              style={{
                color: 'var(--text-primary)',
                fontFamily: '"Syne", sans-serif',
              }}
            >
              Revenue Trend
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: 'var(--text-muted)' }}
            >
              Monthly recurring revenue (USD)
            </p>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={REVENUE_TREND}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--glass-border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<RevTip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#34d399"
                  strokeWidth={2}
                  fill="url(#gRev)"
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: '#34d399',
                    stroke: 'var(--bg-surface)',
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Plan distribution */}
        <div
          className="rounded-2xl p-5 flex flex-col"
          style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <div className="mb-5">
            <p
              className="font-bold text-sm"
              style={{
                color: 'var(--text-primary)',
                fontFamily: '"Syne", sans-serif',
              }}
            >
              Plan Distribution
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: 'var(--text-muted)' }}
            >
              Customers by plan tier
            </p>
          </div>
          <div className="h-[140px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PLAN_DIST}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {PLAN_DIST.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div
                        className="rounded-xl px-3 py-2 text-xs shadow-xl"
                        style={{
                          backgroundColor: 'var(--bg-surface)',
                          border: '1px solid var(--glass-border-strong)',
                        }}
                      >
                        <p style={{ color: d.color }} className="font-bold">
                          {d.name}
                        </p>
                        <p style={{ color: 'var(--text-muted)' }}>
                          Customers:{' '}
                          <span
                            className="font-semibold"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {d.value}
                          </span>
                        </p>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div
            className="space-y-2 pt-3"
            style={{ borderTop: '1px solid var(--glass-border-subtle)' }}
          >
            {PLAN_DIST.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {d.name}
                  </span>
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </div>
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
            placeholder="Search customers…"
            className="w-full pl-8 pr-3 py-2.5 rounded-xl text-sm"
            style={{
              backgroundColor: 'var(--input-bg)',
              border: '1px solid var(--input-border)',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <FaFilter size={11} style={{ color: 'var(--text-muted)' }} />
          {(['All', 'Starter', 'Pro', 'Enterprise'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlanFilter(p)}
              className="px-3 py-2 rounded-lg text-xs font-medium transition-colors"
              style={
                planFilter === p
                  ? { backgroundColor: 'var(--accent)', color: '#fff' }
                  : {
                      backgroundColor: 'var(--glass-bg-raised)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--glass-border)',
                    }
              }
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Customer table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <div
          className="grid items-center px-5 py-3 text-[10px] font-semibold tracking-widest uppercase"
          style={{
            gridTemplateColumns: '80px 1fr 110px 90px 110px 140px',
            color: 'var(--text-muted)',
            borderBottom: '1px solid var(--glass-border)',
            backgroundColor: 'var(--glass-bg-subtle)',
          }}
        >
          <span>ID</span>
          <span>Customer</span>
          <span>Plan</span>
          <span className="hidden sm:block">Status</span>
          <span className="hidden md:block">Amount</span>
          <span className="hidden lg:block">Next Billing</span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex items-center justify-center py-14">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              No customers match your search.
            </p>
          </div>
        ) : (
          filtered.map((c, i) => {
            const plan = PLAN_PRICE[c.plan];
            const tx = TX_META[c.status];
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.28 }}
                className="grid items-center px-5 py-4"
                style={{
                  gridTemplateColumns: '80px 1fr 110px 90px 110px 140px',
                  borderBottom:
                    i < filtered.length - 1
                      ? '1px solid var(--glass-border-subtle)'
                      : 'none',
                }}
              >
                <span
                  className="text-xs font-mono"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {c.id}
                </span>
                <div className="min-w-0 pr-3">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {c.name}
                  </p>
                  <p
                    className="text-xs truncate"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {c.email}
                  </p>
                </div>
                <span
                  className="text-[11px] font-semibold px-2 py-1 rounded-lg w-fit"
                  style={{ backgroundColor: plan.bg, color: plan.color }}
                >
                  {c.plan}
                </span>
                <span
                  className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium px-2 py-1 rounded-lg w-fit"
                  style={{ backgroundColor: tx.bg, color: tx.color }}
                >
                  {tx.icon} {c.status}
                </span>
                <span
                  className="hidden md:block text-sm font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  ${c.amount}
                  <span
                    className="text-xs font-normal"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    /mo
                  </span>
                </span>
                <span
                  className="hidden lg:block text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {c.nextBilling}
                </span>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
});

AdminBilling.displayName = 'AdminBilling';
export default AdminBilling;
