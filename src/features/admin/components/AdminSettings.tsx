import { memo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import { MODULES } from '../config/modules';
import {
  DEFAULT_PAGE_COMPONENTS,
  type PageComponentConfig,
} from '../../../shared/types/pageConfig';
import { supabase } from '../../../lib/supabase';
import type { TableColumnConfig } from '../../../shared/types/tableConfig';

type SectionId =
  | 'general'
  | 'appearance'
  | 'integrations'
  | 'security'
  | 'pages'
  | 'tables'
  | 'forms';

interface Section {
  id: SectionId;
  label: string;
  icon: string;
  color: string;
  bg: string;
}

const SECTIONS: Section[] = [
  {
    id: 'general',
    label: 'General',
    icon: 'FaGlobe',
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.1)',
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: 'FaPalette',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.1)',
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: 'FaPlug',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
  },
  {
    id: 'security',
    label: 'Security',
    icon: 'FaShieldAlt',
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.1)',
  },
  {
    id: 'pages',
    label: 'Pages',
    icon: 'FaColumns',
    color: '#818cf8',
    bg: 'rgba(129,140,248,0.1)',
  },
  {
    id: 'tables',
    label: 'Tables',
    icon: 'FaTable',
    color: '#f472b6',
    bg: 'rgba(244,114,182,0.1)',
  },
  {
    id: 'forms',
    label: 'Forms',
    icon: 'FaListAlt',
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.1)',
  },
];

/* ── Shared input ── */
const Input = ({
  label,
  defaultValue,
  type = 'text',
  placeholder = '',
  hint = '',
}: {
  label: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  hint?: string;
}) => {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div>
      <label
        className="block text-xs font-semibold mb-1.5"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={isPassword && !show ? 'password' : 'text'}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 rounded-lg text-sm"
          style={{
            backgroundColor: 'var(--input-bg)',
            border: '1px solid var(--input-border)',
            color: 'var(--text-primary)',
            outline: 'none',
            paddingRight: isPassword ? '2.5rem' : undefined,
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--text-muted)' }}
          >
            {show ? (
              <ReactIcon name="FaEyeSlash" size={13} />
            ) : (
              <ReactIcon name="FaEye" size={13} />
            )}
          </button>
        )}
      </div>
      {hint && (
        <p
          className="text-[11px] mt-1.5"
          style={{ color: 'var(--text-muted)' }}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

/* ── Masked field (API keys) ── */
const MaskedField = ({
  label,
  value,
  hint = '',
}: {
  label: string;
  value: string;
  hint?: string;
}) => {
  const [reveal, setReveal] = useState(false);
  const masked = value.slice(0, 6) + '•'.repeat(Math.max(0, value.length - 6));
  return (
    <div>
      <label
        className="block text-xs font-semibold mb-1.5"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          readOnly
          value={reveal ? value : masked}
          className="w-full px-3 py-2.5 pr-10 rounded-lg text-sm font-mono"
          style={{
            backgroundColor: 'var(--input-bg)',
            border: '1px solid var(--input-border)',
            color: 'var(--text-primary)',
            outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={() => setReveal((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--text-muted)' }}
        >
          {reveal ? (
            <ReactIcon name="FaEyeSlash" size={13} />
          ) : (
            <ReactIcon name="FaEye" size={13} />
          )}
        </button>
      </div>
      {hint && (
        <p
          className="text-[11px] mt-1.5"
          style={{ color: 'var(--text-muted)' }}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

/* ── Toggle row ── */
const ToggleRow = ({
  label,
  sub,
  defaultOn = false,
}: {
  label: string;
  sub?: string;
  defaultOn?: boolean;
}) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div
      className="flex items-center justify-between gap-4 py-3"
      style={{ borderBottom: '1px solid var(--glass-border-subtle)' }}
    >
      <div>
        <p
          className="text-sm font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {label}
        </p>
        {sub && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {sub}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        className="relative w-11 h-6 rounded-full shrink-0 transition-colors duration-200"
        style={{
          backgroundColor: on ? 'var(--accent)' : 'var(--glass-bg-raised)',
        }}
        role="switch"
        aria-checked={on}
      >
        <motion.span
          animate={{ x: on ? 22 : 2 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
        />
      </button>
    </div>
  );
};

/* ── Color swatch picker ── */
const ACCENT_OPTIONS = [
  { label: 'Sky', light: '#0ea5e9', dark: '#38bdf8' },
  { label: 'Violet', light: '#8b5cf6', dark: '#a78bfa' },
  { label: 'Emerald', light: '#10b981', dark: '#34d399' },
  { label: 'Rose', light: '#f43f5e', dark: '#fb7185' },
  { label: 'Amber', light: '#f59e0b', dark: '#fbbf24' },
  { label: 'Cyan', light: '#06b6d4', dark: '#22d3ee' },
];

/* ── Save toast ── */
const SavedToast = ({ visible }: { visible: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
    transition={{ duration: 0.25 }}
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium shadow-xl pointer-events-none"
    style={{ backgroundColor: '#34d399', color: '#fff' }}
  >
    <ReactIcon name="FaCheck" size={12} /> Settings saved
  </motion.div>
);

/* ── Section card shell ── */
const SectionCard = ({
  title,
  sub,
  children,
  onSave,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
  onSave: () => void;
}) => (
  <div
    className="rounded-2xl overflow-hidden"
    style={{
      backgroundColor: 'var(--glass-bg)',
      border: '1px solid var(--glass-border)',
    }}
  >
    <div
      className="px-6 py-4"
      style={{ borderBottom: '1px solid var(--glass-border-subtle)' }}
    >
      <p
        className="font-bold text-sm"
        style={{
          color: 'var(--text-primary)',
          fontFamily: '"Syne", sans-serif',
        }}
      >
        {title}
      </p>
      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
        {sub}
      </p>
    </div>
    <div className="px-6 py-5 space-y-4">{children}</div>
    <div
      className="px-6 py-4 flex justify-end"
      style={{ borderTop: '1px solid var(--glass-border-subtle)' }}
    >
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={onSave}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
        style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
      >
        <ReactIcon name="FaSave" size={12} /> Save Changes
      </motion.button>
    </div>
  </div>
);

const ALIGN_ICONS = {
  left: <ReactIcon name="FiAlignLeft" size={13} />,
  center: <ReactIcon name="FiAlignCenter" size={13} />,
  right: <ReactIcon name="FiAlignRight" size={13} />,
};

/* ── helpers ── */
function defaultColumns(moduleId: string): TableColumnConfig[] {
  const mod = MODULES.find((m) => m.id === moduleId);
  if (!mod) return [];

  // Fields that appear visible by default in the table
  const visibleByDefault = new Set(
    [
      mod.imageField,
      mod.titleField,
      ...(mod.tableColumns ?? []),
      mod.descriptionField,
    ].filter(Boolean) as string[]
  );

  return mod.fields.map((f, i) => ({
    field: f.key,
    title: f.label,
    visible: visibleByDefault.has(f.key),
    align: 'left' as const,
    sortable: !['image', 'images', 'richtext', 'toggle', 'checkbox'].includes(
      f.type
    ),
    order: i,
    ...(f.type === 'image' || f.type === 'images' ? { width: '68px' } : {}),
  }));
}

/* ── Available page component types ── */
const AVAILABLE_PAGE_COMPONENTS: {
  type: string;
  label: string;
  description: string;
}[] = [
  {
    type: 'table',
    label: 'Data Table',
    description: 'Main CRUD list with search, sort, and pagination',
  },
];

/* ── Page Components Section ── */
const PageConfigSection = memo(() => {
  const [activeModule, setActiveModule] = useState(MODULES[0].id);
  const [configs, setConfigs] = useState<Record<string, PageComponentConfig[]>>(
    {}
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from('page_config')
      .select('*')
      .then(({ data, error }) => {
        if (error || !data) return;
        const map: Record<string, PageComponentConfig[]> = {};
        (
          data as { module_id: string; components: PageComponentConfig[] }[]
        ).forEach((r) => {
          map[r.module_id] = r.components;
        });
        setConfigs(map);
      });
  }, []);

  const components = configs[activeModule] ?? DEFAULT_PAGE_COMPONENTS;

  const toggleVisible = (type: string) => {
    setConfigs((prev) => {
      const base = prev[activeModule] ?? DEFAULT_PAGE_COMPONENTS;
      const exists = base.find((c) => c.type === type);
      const next = exists
        ? base.map((c) =>
            c.type === type ? { ...c, visible: c.visible === false } : c
          )
        : [...base, { type, visible: true, order: base.length }];
      return { ...prev, [activeModule]: next };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    await supabase
      .from('page_config')
      .upsert(
        { module_id: activeModule, components },
        { onConflict: 'module_id' }
      );
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-4"
        style={{ borderBottom: '1px solid var(--glass-border-subtle)' }}
      >
        <p
          className="font-bold text-sm"
          style={{
            color: 'var(--text-primary)',
            fontFamily: '"Syne", sans-serif',
          }}
        >
          Page Components
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Configure which components appear on each module&apos;s admin page
        </p>
      </div>

      {/* Module tabs */}
      <div
        className="px-6 pt-4 flex flex-wrap gap-1.5 pb-4"
        style={{ borderBottom: '1px solid var(--glass-border-subtle)' }}
      >
        {MODULES.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={
              activeModule === m.id
                ? { backgroundColor: 'var(--accent)', color: '#fff' }
                : {
                    backgroundColor: 'var(--glass-bg-raised)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--glass-border)',
                  }
            }
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Component list */}
      <div className="px-6 py-4 space-y-2">
        {AVAILABLE_PAGE_COMPONENTS.map((avail, idx) => {
          const conf = components.find((c) => c.type === avail.type);
          const visible = conf?.visible !== false;
          return (
            <motion.div
              key={avail.type}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                backgroundColor: 'var(--glass-bg-raised)',
                border: '1px solid var(--glass-border-subtle)',
                opacity: visible ? 1 : 0.5,
              }}
            >
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {avail.label}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {avail.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleVisible(avail.type)}
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                style={
                  visible
                    ? { backgroundColor: 'var(--accent)', color: '#fff' }
                    : {
                        backgroundColor: 'var(--glass-bg)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--glass-border)',
                      }
                }
                title={visible ? 'Hide component' : 'Show component'}
              >
                {visible ? (
                  <ReactIcon name="FaEye" size={11} />
                ) : (
                  <ReactIcon name="FaEyeSlash" size={11} />
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        className="px-6 py-4 flex justify-end"
        style={{ borderTop: '1px solid var(--glass-border-subtle)' }}
      >
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60"
          style={{
            backgroundColor: saved ? '#34d399' : 'var(--accent)',
            color: '#fff',
          }}
        >
          {saved ? (
            <>
              <ReactIcon name="FaCheck" size={11} /> Saved
            </>
          ) : (
            <>
              <ReactIcon name="FaSave" size={11} />{' '}
              {saving ? 'Saving…' : 'Save Changes'}
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
});
PageConfigSection.displayName = 'PageConfigSection';

/* ── Column row with expandable link input ── */
const ColRow = memo(
  ({
    col,
    idx,
    onChange,
  }: {
    col: TableColumnConfig;
    idx: number;
    onChange: (patch: Partial<TableColumnConfig>) => void;
  }) => {
    const [expanded, setExpanded] = useState(false);

    const inputStyle = {
      backgroundColor: 'var(--input-bg)',
      border: '1px solid var(--input-border)',
      color: 'var(--text-primary)',
      outline: 'none',
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.04 }}
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: 'var(--glass-bg-raised)',
          border: '1px solid var(--glass-border-subtle)',
          opacity: col.visible !== false ? 1 : 0.5,
        }}
      >
        {/* Main row */}
        <div
          className="grid gap-3 items-center py-2.5 px-3"
          style={{ gridTemplateColumns: '1fr 160px 48px 96px 28px' }}
        >
          {/* Field badge */}
          <span
            className="text-xs font-mono px-2 py-0.5 rounded w-fit truncate"
            style={{
              backgroundColor: 'var(--glass-bg)',
              color: 'var(--text-muted)',
              border: '1px solid var(--glass-border)',
            }}
          >
            {col.field}
          </span>

          {/* Title input */}
          <input
            type="text"
            value={col.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="px-2.5 py-1.5 rounded-lg text-xs w-full"
            style={inputStyle}
          />

          {/* Visibility */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() =>
                onChange({ visible: col.visible === false ? true : false })
              }
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={
                col.visible !== false
                  ? { backgroundColor: 'var(--accent)', color: '#fff' }
                  : {
                      backgroundColor: 'var(--glass-bg)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--glass-border)',
                    }
              }
              title={col.visible !== false ? 'Hide column' : 'Show column'}
            >
              {col.visible !== false ? (
                <ReactIcon name="FaEye" size={11} />
              ) : (
                <ReactIcon name="FaEyeSlash" size={11} />
              )}
            </button>
          </div>

          {/* Alignment */}
          <div className="flex gap-1 justify-center">
            {(['left', 'center', 'right'] as const).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => onChange({ align: a })}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={
                  col.align === a
                    ? { backgroundColor: 'var(--accent)', color: '#fff' }
                    : {
                        backgroundColor: 'var(--glass-bg)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--glass-border)',
                      }
                }
                title={a}
              >
                {ALIGN_ICONS[a]}
              </button>
            ))}
          </div>

          {/* Expand toggle */}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="w-7 h-7 flex items-center justify-center rounded-lg"
            style={
              expanded
                ? { backgroundColor: 'var(--accent)', color: '#fff' }
                : {
                    backgroundColor: 'var(--glass-bg)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--glass-border)',
                  }
            }
            title="Advanced options"
          >
            {expanded ? (
              <ReactIcon name="FaChevronUp" size={9} />
            ) : (
              <ReactIcon name="FaChevronDown" size={9} />
            )}
          </button>
        </div>

        {/* Expanded: cell type + link URL */}
        {expanded && (
          <div
            className="px-3 pb-3 pt-2 space-y-3"
            style={{ borderTop: '1px solid var(--glass-border-subtle)' }}
          >
            {/* Cell type */}
            <div>
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: 'var(--text-muted)' }}
              >
                Cell Type
              </p>
              <div className="flex gap-1.5">
                {(['text', 'url'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      onChange({ type: t === 'text' ? undefined : t })
                    }
                    className="flex-1 py-1 rounded-lg text-xs font-medium"
                    style={
                      (col.type ?? 'text') === t
                        ? { backgroundColor: 'var(--accent)', color: '#fff' }
                        : {
                            backgroundColor: 'var(--glass-bg)',
                            color: 'var(--text-muted)',
                            border: '1px solid var(--glass-border)',
                          }
                    }
                  >
                    {t === 'url' ? 'URL (icon)' : 'Text'}
                  </button>
                ))}
              </div>
            </div>

            <p
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              Link URL
            </p>
            <input
              type="text"
              value={col.link ?? ''}
              onChange={(e) => onChange({ link: e.target.value || undefined })}
              placeholder="/admin/services/${service_id}"
              className="w-full px-2.5 py-1.5 rounded-lg text-xs font-mono"
              style={inputStyle}
            />
            <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
              Use {'${fieldName}'} for dynamic row values — e.g.{' '}
              <code
                className="px-1 py-0.5 rounded"
                style={{ backgroundColor: 'var(--glass-bg)' }}
              >
                /admin/services/$&#123;service_id&#125;
              </code>
            </p>
          </div>
        )}
      </motion.div>
    );
  }
);
ColRow.displayName = 'ColRow';

/* ── Table Columns Section ── */
const TableColumnsSection = memo(() => {
  const [activeModule, setActiveModule] = useState(MODULES[0].id);
  const [configs, setConfigs] = useState<Record<string, TableColumnConfig[]>>(
    {}
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /* load all configs once */
  useEffect(() => {
    supabase
      .from('table_config')
      .select('*')
      .then(({ data }) => {
        if (!data) return;
        const map: Record<string, TableColumnConfig[]> = {};
        (data as { module_id: string; columns: TableColumnConfig[] }[]).forEach(
          (r) => {
            map[r.module_id] = r.columns;
          }
        );
        setConfigs(map);
      });
  }, []);

  const cols = configs[activeModule] ?? defaultColumns(activeModule);

  const updateCol = useCallback(
    (idx: number, patch: Partial<TableColumnConfig>) => {
      setConfigs((prev) => {
        const base = prev[activeModule] ?? defaultColumns(activeModule);
        const next = base.map((c, i) => (i === idx ? { ...c, ...patch } : c));
        return { ...prev, [activeModule]: next };
      });
    },
    [activeModule]
  );

  const handleSave = async () => {
    setSaving(true);
    await supabase
      .from('table_config')
      .upsert(
        { module_id: activeModule, columns: cols },
        { onConflict: 'module_id' }
      );
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-4"
        style={{ borderBottom: '1px solid var(--glass-border-subtle)' }}
      >
        <p
          className="font-bold text-sm"
          style={{
            color: 'var(--text-primary)',
            fontFamily: '"Syne", sans-serif',
          }}
        >
          Table Columns
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Control label, visibility and alignment for each module&apos;s table
          columns
        </p>
      </div>

      {/* Module tabs */}
      <div
        className="px-6 pt-4 flex flex-wrap gap-1.5"
        style={{
          borderBottom: '1px solid var(--glass-border-subtle)',
          paddingBottom: '1rem',
        }}
      >
        {MODULES.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={
              activeModule === m.id
                ? { backgroundColor: 'var(--accent)', color: '#fff' }
                : {
                    backgroundColor: 'var(--glass-bg-raised)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--glass-border)',
                  }
            }
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Column rows */}
      <div className="px-6 py-4 space-y-2">
        {/* Row header */}
        <div
          className="grid gap-3 mb-3 text-xs font-semibold tracking-widest uppercase"
          style={{
            color: 'var(--text-muted)',
            gridTemplateColumns: '1fr 160px 48px 96px 28px',
          }}
        >
          <span>Field</span>
          <span>Title</span>
          <span className="text-center">Show</span>
          <span className="text-center">Align</span>
          <span />
        </div>

        {cols.map((col, idx) => (
          <ColRow
            key={col.field}
            col={col}
            idx={idx}
            onChange={(patch) => updateCol(idx, patch)}
          />
        ))}
      </div>

      {/* Footer */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderTop: '1px solid var(--glass-border-subtle)' }}
      >
        <button
          type="button"
          onClick={() =>
            setConfigs((prev) => ({
              ...prev,
              [activeModule]: defaultColumns(activeModule),
            }))
          }
          className="text-xs underline"
          style={{ color: 'var(--text-muted)' }}
        >
          Reset to defaults
        </button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60"
          style={{
            backgroundColor: saved ? '#34d399' : 'var(--accent)',
            color: '#fff',
          }}
        >
          {saved ? (
            <>
              <ReactIcon name="FaCheck" size={11} /> Saved
            </>
          ) : (
            <>
              <ReactIcon name="FaSave" size={11} />{' '}
              {saving ? 'Saving…' : 'Save Changes'}
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
});
TableColumnsSection.displayName = 'TableColumnsSection';

/* ── Form Builder Links (replaces inline editor — each module has its own builder page) ── */
const FormBuilderLinks = memo(() => {
  const navigate = useNavigate();
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
      }}
    >
      <div
        className="px-6 py-4"
        style={{ borderBottom: '1px solid var(--glass-border-subtle)' }}
      >
        <p
          className="font-bold text-sm"
          style={{
            color: 'var(--text-primary)',
            fontFamily: '"Syne", sans-serif',
          }}
        >
          Form Builder
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Open the dedicated builder to add, edit, reorder, or delete fields for
          any module.
        </p>
      </div>
      <div className="px-6 py-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {MODULES.map((m) => (
          <button
            key={m.id}
            onClick={() => navigate(`/admin/${m.id}/form-config`)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors"
            style={{
              backgroundColor: 'var(--glass-bg-raised)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
            }}
          >
            <ReactIcon
              name={m.icon}
              size={15}
              style={{ color: 'var(--accent)', flexShrink: 0 }}
            />
            <span className="text-sm font-medium truncate">{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
});
FormBuilderLinks.displayName = 'FormBuilderLinks';

/* ── Main ── */
const AdminSettings = memo(() => {
  const [activeSection, setActiveSection] = useState<SectionId>('general');
  const [accentPick, setAccentPick] = useState(0);
  const [defaultTheme, setDefaultTheme] = useState<'light' | 'dark'>('dark');
  const [toast, setToast] = useState(false);

  const save = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  };

  return (
    <>
      <div className="p-6 max-w-5xl mx-auto space-y-5">
        {/* Header */}
        <div>
          <h2
            className="text-2xl font-bold"
            style={{
              color: 'var(--text-primary)',
              fontFamily: '"Syne", sans-serif',
            }}
          >
            Settings
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Configure your site, appearance, and integrations
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* Sidebar tabs */}
          <div className="w-full lg:w-48 shrink-0 flex flex-row lg:flex-col gap-1.5 flex-wrap">
            {SECTIONS.map((s) => {
              const active = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors"
                  style={
                    active
                      ? { backgroundColor: 'var(--accent)', color: '#fff' }
                      : {
                          backgroundColor: 'var(--glass-bg)',
                          border: '1px solid var(--glass-border)',
                          color: 'var(--text-muted)',
                        }
                  }
                >
                  <span
                    className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: active ? 'rgba(255,255,255,0.2)' : s.bg,
                      color: active ? '#fff' : s.color,
                    }}
                  >
                    <ReactIcon name={s.icon} size={12} />
                  </span>
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Section panels */}
          <div className="flex-1 min-w-0 space-y-5">
            {activeSection === 'general' && (
              <motion.div
                key="general"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <SectionCard
                  title="General"
                  sub="Basic site information and contact details"
                  onSave={save}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Site Name" defaultValue="Tensor Labz" />
                    <Input
                      label="Tagline"
                      defaultValue="Creating Sustainable Impact Through Technology"
                    />
                    <Input
                      label="Admin Email"
                      defaultValue="admin@tensorlabz.com"
                      type="email"
                    />
                    <Input
                      label="Support Email"
                      defaultValue="hello@tensorlabz.com"
                      type="email"
                    />
                    <div className="sm:col-span-2">
                      <Input
                        label="Site URL"
                        defaultValue="https://tensorlabz.com"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        className="block text-xs font-semibold mb-1.5"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Site Description
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="Tensor Labz builds innovative AI, robotics and IoT solutions for sustainable impact."
                        className="w-full px-3 py-2.5 rounded-lg text-sm resize-none"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          border: '1px solid var(--input-border)',
                          color: 'var(--text-primary)',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>
                </SectionCard>
              </motion.div>
            )}

            {activeSection === 'appearance' && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <SectionCard
                  title="Theme & Colors"
                  sub="Default appearance for your admin panel"
                  onSave={save}
                >
                  <div>
                    <label
                      className="block text-xs font-semibold mb-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Default Theme
                    </label>
                    <div className="flex gap-3">
                      {(['light', 'dark'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setDefaultTheme(t)}
                          className="flex-1 py-2.5 rounded-xl text-sm font-medium capitalize border transition-colors"
                          style={
                            defaultTheme === t
                              ? {
                                  backgroundColor: 'var(--accent)',
                                  color: '#fff',
                                  borderColor: 'var(--accent)',
                                }
                              : {
                                  backgroundColor: 'var(--glass-bg-raised)',
                                  color: 'var(--text-muted)',
                                  borderColor: 'var(--glass-border)',
                                }
                          }
                        >
                          {t === 'light' ? '☀️ ' : '🌙 '}
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold mb-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Accent Color
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {ACCENT_OPTIONS.map((a, idx) => (
                        <button
                          key={a.label}
                          onClick={() => setAccentPick(idx)}
                          title={a.label}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-transform"
                          style={{
                            backgroundColor: a.dark,
                            transform:
                              accentPick === idx ? 'scale(1.2)' : 'scale(1)',
                            boxShadow:
                              accentPick === idx
                                ? `0 0 0 2px var(--bg-surface), 0 0 0 4px ${a.dark}`
                                : 'none',
                          }}
                        >
                          {accentPick === idx && (
                            <ReactIcon name="FaCheck" size={10} color="#fff" />
                          )}
                        </button>
                      ))}
                    </div>
                    <p
                      className="text-[11px] mt-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Selected: {ACCENT_OPTIONS[accentPick].label}
                    </p>
                  </div>
                  <ToggleRow
                    label="Animations"
                    sub="Enable motion and transition effects"
                    defaultOn
                  />
                  <ToggleRow
                    label="Compact Mode"
                    sub="Reduce padding for denser layouts"
                  />
                </SectionCard>
              </motion.div>
            )}

            {activeSection === 'integrations' && (
              <motion.div
                key="integrations"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <SectionCard
                  title="Firebase"
                  sub="Firestore database and authentication config"
                  onSave={save}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <MaskedField
                      label="API Key"
                      value="AIzaSyCExAMPLEkeyHere1234567890abcdef"
                      hint="From Firebase Console → Project Settings"
                    />
                    <Input
                      label="Project ID"
                      defaultValue="tensor-labz-website"
                    />
                    <Input
                      label="Auth Domain"
                      defaultValue="tensor-labz-website.firebaseapp.com"
                    />
                    <Input
                      label="Storage Bucket"
                      defaultValue="tensor-labz-website.appspot.com"
                    />
                  </div>
                </SectionCard>
                <SectionCard
                  title="Google Sheets CMS"
                  sub="Sheet URL used as headless CMS"
                  onSave={save}
                >
                  <Input
                    label="Sheet API Base URL"
                    defaultValue="https://sheets.googleapis.com/v4/spreadsheets/..."
                    hint="VITE_SHEET_URL — do not expose to public clients"
                  />
                  <ToggleRow
                    label="Cache Responses"
                    sub="Cache sheet data for 5 minutes to reduce API calls"
                    defaultOn
                  />
                </SectionCard>
                <SectionCard
                  title="AWS"
                  sub="S3 bucket for image uploads"
                  onSave={save}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Bucket Name"
                      defaultValue="tensor-labz-media"
                    />
                    <Input label="Region" defaultValue="ap-south-1" />
                    <MaskedField
                      label="Access Key ID"
                      value="AKIAIOSFODNN7EXAMPLE"
                    />
                    <MaskedField
                      label="Secret Access Key"
                      value="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                    />
                    <div className="sm:col-span-2">
                      <Input
                        label="CDN Base URL (optional)"
                        defaultValue="https://cdn.tensorlabz.com"
                        hint="CloudFront or custom domain in front of the bucket"
                      />
                    </div>
                  </div>
                </SectionCard>
              </motion.div>
            )}

            {activeSection === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <SectionCard
                  title="Password"
                  sub="Change your admin account password"
                  onSave={save}
                >
                  <div className="space-y-4">
                    <Input label="Current Password" type="password" />
                    <Input
                      label="New Password"
                      type="password"
                      hint="Minimum 8 characters"
                    />
                    <Input label="Confirm New Password" type="password" />
                  </div>
                </SectionCard>
                <SectionCard
                  title="Access & Sessions"
                  sub="Control authentication and session behaviour"
                  onSave={save}
                >
                  <ToggleRow
                    label="Two-Factor Authentication"
                    sub="Require 2FA on every login"
                  />
                  <ToggleRow
                    label="Require Email Verification"
                    sub="New users must verify email before accessing admin"
                    defaultOn
                  />
                  <ToggleRow
                    label="Auto Sign-Out"
                    sub="Sign out after 30 minutes of inactivity"
                    defaultOn
                  />
                  <div>
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Session Timeout
                    </label>
                    <select
                      className="w-full px-3 py-2.5 rounded-lg text-sm"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    >
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>4 hours</option>
                      <option>1 day</option>
                    </select>
                  </div>
                </SectionCard>
                <SectionCard
                  title="Allowed Domains"
                  sub="Restrict admin access to these email domains"
                  onSave={save}
                >
                  <Input
                    label="Allowed Email Domains"
                    defaultValue="tensorlabz.com"
                    hint="Comma-separated list, e.g. tensorlabz.com, partner.com"
                  />
                  <ToggleRow
                    label="Block External Logins"
                    sub="Only allow users from the domains listed above"
                    defaultOn
                  />
                </SectionCard>
              </motion.div>
            )}

            {activeSection === 'pages' && (
              <motion.div
                key="pages"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <PageConfigSection />
              </motion.div>
            )}

            {activeSection === 'tables' && (
              <motion.div
                key="tables"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <TableColumnsSection />
              </motion.div>
            )}

            {activeSection === 'forms' && (
              <motion.div
                key="forms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FormBuilderLinks />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <SavedToast visible={toast} />
    </>
  );
});

AdminSettings.displayName = 'AdminSettings';
export default AdminSettings;
