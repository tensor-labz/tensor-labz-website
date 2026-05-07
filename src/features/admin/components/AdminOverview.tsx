import { memo, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import {
  FaProjectDiagram,
  FaCogs,
  FaImages,
  FaEnvelope,
  FaInfoCircle,
  FaAddressBook,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';

/* ── Static dataset ── */
const MODULE_COUNTS = [
  { name: 'Hero',     count: 2,  icon: FaImages,         color: '#38bdf8' },
  { name: 'Services', count: 3,  icon: FaCogs,           color: '#818cf8' },
  { name: 'Projects', count: 5,  icon: FaProjectDiagram, color: '#34d399' },
  { name: 'About',    count: 4,  icon: FaInfoCircle,     color: '#fb923c' },
  { name: 'Contact',  count: 3,  icon: FaEnvelope,       color: '#f472b6' },
  { name: 'Social',   count: 4,  icon: FaAddressBook,    color: '#a78bfa' },
];

const MONTHLY_ACTIVITY = [
  { month: 'Jan', updates: 4,  additions: 2  },
  { month: 'Feb', updates: 7,  additions: 3  },
  { month: 'Mar', updates: 5,  additions: 5  },
  { month: 'Apr', updates: 9,  additions: 4  },
  { month: 'May', updates: 6,  additions: 7  },
  { month: 'Jun', updates: 12, additions: 6  },
  { month: 'Jul', updates: 8,  additions: 9  },
  { month: 'Aug', updates: 15, additions: 5  },
  { month: 'Sep', updates: 10, additions: 8  },
  { month: 'Oct', updates: 18, additions: 11 },
  { month: 'Nov', updates: 14, additions: 7  },
  { month: 'Dec', updates: 22, additions: 13 },
];

const RADIAL_DATA = MODULE_COUNTS.map((m) => ({
  name: m.name,
  value: m.count,
  fill: m.color,
}));

const RECENT_ACTIVITY = [
  { module: 'Projects', action: 'Updated', title: 'Smart Farm Monitor',    time: '2 min ago',  type: 'update' },
  { module: 'Services', action: 'Created', title: 'IoT Solutions',         time: '1 hr ago',   type: 'create' },
  { module: 'About',    action: 'Updated', title: 'Our Mission',           time: '3 hrs ago',  type: 'update' },
  { module: 'Social',   action: 'Created', title: 'YouTube Link',          time: '1 day ago',  type: 'create' },
  { module: 'Hero',     action: 'Deleted', title: 'Old Hero Slide',        time: '2 days ago', type: 'delete' },
  { module: 'Contact',  action: 'Updated', title: 'Email Us',              time: '3 days ago', type: 'update' },
];

const STATS = [
  {
    label: 'Total Records',
    value: MODULE_COUNTS.reduce((a, m) => a + m.count, 0),
    delta: '+3 this week',
    up: true,
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.1)',
  },
  {
    label: 'Active Modules',
    value: MODULE_COUNTS.length,
    delta: 'All operational',
    up: true,
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
  },
  {
    label: 'Featured Projects',
    value: 2,
    delta: '+1 this month',
    up: true,
    color: '#818cf8',
    bg: 'rgba(129,140,248,0.1)',
  },
  {
    label: 'Pending Updates',
    value: 5,
    delta: '-2 from last week',
    up: false,
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.1)',
  },
];

const actColor: Record<string, string> = {
  update: '#38bdf8',
  create: '#34d399',
  delete: '#f87171',
};

/* ── Animated counter ── */
const Counter = ({ target }: { target: number }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <>{val}</>;
};

/* ── Card shell — consistent padding + border ── */
const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-2xl p-5 ${className}`}
    style={{
      backgroundColor: 'var(--glass-bg)',
      border: '1px solid var(--glass-border)',
    }}
  >
    {children}
  </div>
);

/* ── Card header ── */
const CardHeader = ({ title, sub }: { title: string; sub: string }) => (
  <div className="mb-5">
    <p
      className="font-bold text-sm"
      style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}
    >
      {title}
    </p>
    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
      {sub}
    </p>
  </div>
);

/* ── Fade-in with optional className forwarded to the motion div ── */
const FadeIn = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/* ── Tooltips ── */
const AreaTip = ({ active, payload, label }: any) => {
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
      <p className="font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

const BarTip = ({ active, payload, label }: any) => {
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
      <p className="font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
      <p style={{ color: payload[0]?.fill }}>
        Records: <span className="font-bold">{payload[0]?.value}</span>
      </p>
    </div>
  );
};

/* ── Main ── */
const AdminOverview = memo(() => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">

      {/* ── Page heading ── */}
      <FadeIn delay={0}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2
              className="text-2xl font-bold"
              style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}
            >
              Dashboard
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {today}
            </p>
          </div>
          <span
            className="text-xs px-3 py-1.5 rounded-full font-medium self-start sm:self-auto"
            style={{
              backgroundColor: 'rgba(52,211,153,0.1)',
              color: '#34d399',
              border: '1px solid rgba(52,211,153,0.2)',
            }}
          >
            ● All systems operational
          </span>
        </div>
      </FadeIn>

      {/* ── Row 1: Stat cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
        {STATS.map((s, i) => (
          <FadeIn key={s.label} delay={0.06 + i * 0.07} className="flex">
            <Card className="flex-1 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-2">
                <span
                  className="text-xs font-semibold leading-tight"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {s.label}
                </span>
                <span
                  className="w-7 h-7 flex items-center justify-center rounded-lg shrink-0"
                  style={{ backgroundColor: s.bg, color: s.color }}
                >
                  {s.up ? <FaArrowUp size={11} /> : <FaArrowDown size={11} />}
                </span>
              </div>
              <p
                className="text-4xl font-bold tracking-tight"
                style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}
              >
                <Counter target={s.value} />
              </p>
              <p className="text-xs mt-auto" style={{ color: s.up ? '#34d399' : '#fb923c' }}>
                {s.delta}
              </p>
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* ── Row 2: Area chart (2/3) + Radial chart (1/3) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">

        {/* Area chart */}
        <FadeIn delay={0.28} className="lg:col-span-2 flex">
          <Card className="flex-1 flex flex-col">
            <div className="flex items-start justify-between gap-3 mb-5">
              <CardHeader title="Content Activity" sub="Updates & additions over the year" />
              <div className="flex items-center gap-4 text-xs shrink-0 pt-0.5" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-px inline-block" style={{ backgroundColor: '#38bdf8' }} />
                  Updates
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-px inline-block" style={{ backgroundColor: '#818cf8' }} />
                  Additions
                </span>
              </div>
            </div>
            <div className="h-[220px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_ACTIVITY} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gUpdates" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#38bdf8" stopOpacity={0.22} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}    />
                    </linearGradient>
                    <linearGradient id="gAdditions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#818cf8" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<AreaTip />} />
                  <Area type="monotone" dataKey="updates" name="Updates" stroke="#38bdf8" strokeWidth={2}
                    fill="url(#gUpdates)" dot={false}
                    activeDot={{ r: 4, fill: '#38bdf8', stroke: 'var(--bg-surface)', strokeWidth: 2 }} />
                  <Area type="monotone" dataKey="additions" name="Additions" stroke="#818cf8" strokeWidth={2}
                    fill="url(#gAdditions)" dot={false}
                    activeDot={{ r: 4, fill: '#818cf8', stroke: 'var(--bg-surface)', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </FadeIn>

        {/* Radial chart */}
        <FadeIn delay={0.36} className="flex">
          <Card className="flex-1 flex flex-col">
            <CardHeader title="Content Distribution" sub="Records per module" />
            <div className="h-[170px] min-w-0 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%" cy="50%"
                  innerRadius="18%" outerRadius="88%"
                  barSize={9}
                  data={RADIAL_DATA}
                  startAngle={90} endAngle={-270}
                >
                  <RadialBar background={{ fill: 'var(--glass-bg-raised)' }} dataKey="value" cornerRadius={5} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-xl px-3 py-2 text-xs shadow-xl"
                          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--glass-border-strong)', color: 'var(--text-primary)' }}>
                          <p style={{ color: d.fill }} className="font-bold">{d.name}</p>
                          <p style={{ color: 'var(--text-muted)' }}>
                            Records: <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{d.value}</span>
                          </p>
                        </div>
                      );
                    }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-3" style={{ borderTop: '1px solid var(--glass-border-subtle)' }}>
              {MODULE_COUNTS.map((m) => (
                <div key={m.name} className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                  <span className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {m.name}
                    <span className="ml-1 font-semibold" style={{ color: 'var(--text-primary)' }}>{m.count}</span>
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>
      </div>

      {/* ── Row 3: Bar chart (1/2) + Activity feed (1/2) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">

        {/* Bar chart */}
        <FadeIn delay={0.44} className="flex">
          <Card className="flex-1 flex flex-col">
            <CardHeader title="Records by Module" sub="Total content entries per section" />
            <div className="h-[210px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={MODULE_COUNTS.map((m) => ({ name: m.name, count: m.count, color: m.color }))}
                  margin={{ top: 4, right: 4, left: -22, bottom: 0 }}
                  barCategoryGap="34%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip content={<BarTip />} cursor={{ fill: 'var(--glass-bg-raised)' }} />
                  <Bar dataKey="count" radius={[5, 5, 0, 0]}>
                    {MODULE_COUNTS.map((m) => (
                      <Cell key={m.name} fill={m.color} fillOpacity={0.88} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </FadeIn>

        {/* Recent activity feed */}
        <FadeIn delay={0.51} className="flex">
          <Card className="flex-1 flex flex-col">
            <CardHeader title="Recent Activity" sub="Latest changes across all modules" />
            <div className="flex-1 flex flex-col">
              {RECENT_ACTIVITY.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.54 + i * 0.06, duration: 0.3, ease: 'easeOut' }}
                  className="flex items-start gap-3 py-3 flex-1"
                  style={{
                    borderBottom: i < RECENT_ACTIVITY.length - 1
                      ? '1px solid var(--glass-border-subtle)'
                      : 'none',
                  }}
                >
                  {/* Timeline */}
                  <div className="flex flex-col items-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: actColor[item.type] }} />
                    {i < RECENT_ACTIVITY.length - 1 && (
                      <span className="w-px flex-1 mt-1.5" style={{ backgroundColor: 'var(--glass-border-subtle)', minHeight: 16 }} />
                    )}
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-[11px] font-semibold px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: `${actColor[item.type]}18`, color: actColor[item.type] }}
                      >
                        {item.action}
                      </span>
                      <span className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {item.module} · {item.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </FadeIn>
      </div>

      {/* ── Row 4: Module health ── */}
      <FadeIn delay={0.58}>
        <Card>
          <CardHeader title="Module Health" sub="Record count relative to the busiest module" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {MODULE_COUNTS.map((m, i) => {
              const Icon = m.icon;
              const max = Math.max(...MODULE_COUNTS.map((x) => x.count));
              const pct = Math.round((m.count / max) * 100);
              return (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.055, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl p-3.5 flex flex-col gap-3"
                  style={{
                    backgroundColor: 'var(--glass-bg-raised)',
                    border: '1px solid var(--glass-border)',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${m.color}18`, color: m.color }}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <p
                      className="text-2xl font-bold leading-none"
                      style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}
                    >
                      {m.count}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                      {m.name}
                    </p>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--glass-bg)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: m.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.68 + i * 0.055, duration: 0.65, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </FadeIn>

    </div>
  );
});

AdminOverview.displayName = 'AdminOverview';
export default AdminOverview;
