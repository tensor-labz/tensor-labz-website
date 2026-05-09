import { memo, useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  FaGlobe,
  FaPalette,
  FaPlug,
  FaShieldAlt,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTable,
  FaListAlt,
  FaTrash,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { FiAlignLeft, FiAlignCenter, FiAlignRight } from 'react-icons/fi';
import { MODULES, type FieldConfig } from '../config/modules';
import { supabase } from '../../../lib/supabase';
import type { TableColumnConfig } from '../../../shared/types/tableConfig';

type SectionId =
  | 'general'
  | 'appearance'
  | 'integrations'
  | 'security'
  | 'tables'
  | 'forms';

interface Section {
  id: SectionId;
  label: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

const SECTIONS: Section[] = [
  {
    id: 'general',
    label: 'General',
    icon: FaGlobe,
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.1)',
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: FaPalette,
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.1)',
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: FaPlug,
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
  },
  {
    id: 'security',
    label: 'Security',
    icon: FaShieldAlt,
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.1)',
  },
  {
    id: 'tables',
    label: 'Tables',
    icon: FaTable,
    color: '#f472b6',
    bg: 'rgba(244,114,182,0.1)',
  },
  {
    id: 'forms',
    label: 'Forms',
    icon: FaListAlt,
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
            {show ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
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
          {reveal ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
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
    <FaCheck size={12} /> Settings saved
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
        <FaSave size={12} /> Save Changes
      </motion.button>
    </div>
  </div>
);

const ALIGN_ICONS = {
  left: <FiAlignLeft size={13} />,
  center: <FiAlignCenter size={13} />,
  right: <FiAlignRight size={13} />,
};

/* ── helpers ── */
function defaultColumns(moduleId: string): TableColumnConfig[] {
  const mod = MODULES.find((m) => m.id === moduleId);
  if (!mod) return [];
  const cols: TableColumnConfig[] = [];
  if (mod.imageField)
    cols.push({
      field: mod.imageField,
      title: 'Image',
      visible: true,
      align: 'left',
    });
  cols.push({
    field: mod.titleField,
    title: 'Title',
    visible: true,
    align: 'left',
  });
  if (mod.descriptionField)
    cols.push({
      field: mod.descriptionField,
      title: 'Description',
      visible: true,
      align: 'left',
    });
  return cols;
}

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
              onClick={() => onChange({ visible: col.visible === false ? true : false })}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={
                col.visible !== false
                  ? { backgroundColor: 'var(--accent)', color: '#fff' }
                  : { backgroundColor: 'var(--glass-bg)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }
              }
              title={col.visible !== false ? 'Hide column' : 'Show column'}
            >
              {col.visible !== false ? <FaEye size={11} /> : <FaEyeSlash size={11} />}
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
                    : { backgroundColor: 'var(--glass-bg)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }
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
                : { backgroundColor: 'var(--glass-bg)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }
            }
            title="Advanced options"
          >
            {expanded ? <FaChevronUp size={9} /> : <FaChevronDown size={9} />}
          </button>
        </div>

        {/* Expanded: link URL */}
        {expanded && (
          <div
            className="px-3 pb-3 pt-2 space-y-2"
            style={{ borderTop: '1px solid var(--glass-border-subtle)' }}
          >
            <p
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              Link URL
            </p>
            <input
              type="text"
              value={col.link ?? ''}
              onChange={(e) =>
                onChange({ link: e.target.value || undefined })
              }
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
              <FaCheck size={11} /> Saved
            </>
          ) : (
            <>
              <FaSave size={11} /> {saving ? 'Saving…' : 'Save Changes'}
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
});
TableColumnsSection.displayName = 'TableColumnsSection';

/* ── Field type options ── */
const FIELD_TYPES: { value: FieldConfig['type']; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'textarea', label: 'Long Text' },
  { value: 'url', label: 'URL' },
  { value: 'image', label: 'Image' },
  { value: 'images', label: 'Image Gallery' },
  { value: 'toggle', label: 'Toggle Switch' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'tags', label: 'Tags' },
  { value: 'multiinput', label: 'Multi-input (Array)' },
  { value: 'richtext', label: 'Rich Text (Quill)' },
  { value: 'radio', label: 'Radio Buttons' },
  { value: 'select', label: 'Dropdown Select' },
];

function needsOptions(type: FieldConfig['type']) {
  return type === 'radio' || type === 'select';
}

function defaultFieldConfig(): FieldConfig {
  return {
    key: '',
    label: '',
    type: 'text',
    span: 'full',
    required: false,
    placeholder: '',
  };
}

function defaultFormFields(moduleId: string): FieldConfig[] {
  return MODULES.find((m) => m.id === moduleId)?.fields ?? [];
}

/* ── Single field row in Form Fields editor ── */
const FieldRow = memo(
  ({
    field,
    idx,
    total,
    onChange,
    onDelete,
    onMove,
  }: {
    field: FieldConfig;
    idx: number;
    total: number;
    onChange: (patch: Partial<FieldConfig>) => void;
    onDelete: () => void;
    onMove: (dir: -1 | 1) => void;
  }) => {
    const [expanded, setExpanded] = useState(false);

    const inputStyle = {
      backgroundColor: 'var(--input-bg)',
      border: '1px solid var(--input-border)',
      color: 'var(--text-primary)',
      outline: 'none',
    };

    const optionsText = (field.options ?? []).join('\n');
    const updateOptions = (raw: string) =>
      onChange({
        options: raw
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      });

    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.03 }}
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: 'var(--glass-bg-raised)',
          border: '1px solid var(--glass-border-subtle)',
        }}
      >
        {/* Primary row */}
        <div className="flex items-center gap-2 px-3 py-2.5">
          {/* Reorder */}
          <div className="flex flex-col gap-0.5 shrink-0">
            <button
              type="button"
              disabled={idx === 0}
              onClick={() => onMove(-1)}
              className="w-5 h-4 flex items-center justify-center rounded disabled:opacity-30"
              style={{ color: 'var(--text-muted)' }}
            >
              <FaChevronUp size={8} />
            </button>
            <button
              type="button"
              disabled={idx === total - 1}
              onClick={() => onMove(1)}
              className="w-5 h-4 flex items-center justify-center rounded disabled:opacity-30"
              style={{ color: 'var(--text-muted)' }}
            >
              <FaChevronDown size={8} />
            </button>
          </div>

          {/* Key */}
          <input
            type="text"
            value={field.key}
            onChange={(e) => onChange({ key: e.target.value })}
            placeholder="key"
            className="px-2 py-1.5 rounded-lg text-xs font-mono w-24 shrink-0"
            style={inputStyle}
          />

          {/* Label */}
          <input
            type="text"
            value={field.label}
            onChange={(e) => onChange({ label: e.target.value })}
            placeholder="Label"
            className="flex-1 min-w-0 px-2 py-1.5 rounded-lg text-xs"
            style={inputStyle}
          />

          {/* Type */}
          <select
            value={field.type}
            onChange={(e) =>
              onChange({ type: e.target.value as FieldConfig['type'] })
            }
            className="text-xs py-1.5 px-2 rounded-lg appearance-none shrink-0 cursor-pointer"
            style={{
              width: 148,
              backgroundColor: '#fff',
              border: '1px solid var(--input-border)',
              color: '#111',
              outline: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23888'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 6px center',
              paddingRight: '1.5rem',
            }}
          >
            {FIELD_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>

          {/* Expand / delete */}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="w-7 h-7 flex items-center justify-center rounded-lg shrink-0"
            style={{
              backgroundColor: expanded ? 'var(--accent)' : 'var(--glass-bg)',
              color: expanded ? '#fff' : 'var(--text-muted)',
              border: '1px solid var(--glass-border)',
            }}
          >
            {expanded ? <FaChevronUp size={9} /> : <FaChevronDown size={9} />}
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="w-7 h-7 flex items-center justify-center rounded-lg shrink-0"
            style={{
              backgroundColor: 'rgba(239,68,68,0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239,68,68,0.2)',
            }}
          >
            <FaTrash size={10} />
          </button>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div
            className="px-3 pb-3 space-y-3 pt-1"
            style={{ borderTop: '1px solid var(--glass-border-subtle)' }}
          >
            <div className="grid grid-cols-2 gap-3">
              {/* Span */}
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Span
                </p>
                <div className="flex gap-1">
                  {(['half', 'full'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => onChange({ span: s })}
                      className="flex-1 py-1 rounded-lg text-xs font-medium capitalize"
                      style={
                        field.span === s
                          ? { backgroundColor: 'var(--accent)', color: '#fff' }
                          : {
                              backgroundColor: 'var(--glass-bg)',
                              color: 'var(--text-muted)',
                              border: '1px solid var(--glass-border)',
                            }
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Required */}
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Required
                </p>
                <button
                  type="button"
                  onClick={() => onChange({ required: !field.required })}
                  className="relative w-11 h-6 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: field.required
                      ? 'var(--accent)'
                      : 'var(--glass-bg-raised)',
                  }}
                  role="switch"
                  aria-checked={!!field.required}
                >
                  <motion.span
                    animate={{ x: field.required ? 22 : 2 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
                  />
                </button>
              </div>
            </div>

            {/* Placeholder */}
            <div>
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                style={{ color: 'var(--text-muted)' }}
              >
                Placeholder
              </p>
              <input
                type="text"
                value={field.placeholder ?? ''}
                onChange={(e) => onChange({ placeholder: e.target.value })}
                placeholder="e.g. Enter a title…"
                className="w-full px-2.5 py-1.5 rounded-lg text-xs"
                style={inputStyle}
              />
            </div>

            {/* Options (radio / select) */}
            {needsOptions(field.type) && (
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Options{' '}
                  <span className="normal-case font-normal">
                    (one per line)
                  </span>
                </p>
                <textarea
                  value={optionsText}
                  onChange={(e) => updateOptions(e.target.value)}
                  rows={4}
                  placeholder={`Option A\nOption B\nOption C`}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs resize-y"
                  style={inputStyle}
                />
              </div>
            )}
          </div>
        )}
      </motion.div>
    );
  }
);
FieldRow.displayName = 'FieldRow';

/* ── Form Fields Section ── */
const FormFieldsSection = memo(() => {
  const [activeModule, setActiveModule] = useState(MODULES[0].id);
  const [configs, setConfigs] = useState<Record<string, FieldConfig[]>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /* load all form configs once */
  useEffect(() => {
    supabase
      .from('form_config')
      .select('*')
      .then(({ data }) => {
        if (!data) return;
        const map: Record<string, FieldConfig[]> = {};
        (data as { module_id: string; fields: FieldConfig[] }[]).forEach(
          (r) => {
            map[r.module_id] = r.fields;
          }
        );
        setConfigs(map);
      });
  }, []);

  const fields = configs[activeModule] ?? defaultFormFields(activeModule);

  const updateField = useCallback(
    (idx: number, patch: Partial<FieldConfig>) => {
      setConfigs((prev) => {
        const base = prev[activeModule] ?? defaultFormFields(activeModule);
        const next = base.map((f, i) => (i === idx ? { ...f, ...patch } : f));
        return { ...prev, [activeModule]: next };
      });
    },
    [activeModule]
  );

  const deleteField = useCallback(
    (idx: number) => {
      setConfigs((prev) => {
        const base = prev[activeModule] ?? defaultFormFields(activeModule);
        return { ...prev, [activeModule]: base.filter((_, i) => i !== idx) };
      });
    },
    [activeModule]
  );

  const moveField = useCallback(
    (idx: number, dir: -1 | 1) => {
      setConfigs((prev) => {
        const base = [
          ...(prev[activeModule] ?? defaultFormFields(activeModule)),
        ];
        const to = idx + dir;
        if (to < 0 || to >= base.length) return prev;
        [base[idx], base[to]] = [base[to], base[idx]];
        return { ...prev, [activeModule]: base };
      });
    },
    [activeModule]
  );

  const addField = () => {
    setConfigs((prev) => {
      const base = prev[activeModule] ?? defaultFormFields(activeModule);
      return { ...prev, [activeModule]: [...base, defaultFieldConfig()] };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    await supabase
      .from('form_config')
      .upsert({ module_id: activeModule, fields }, { onConflict: 'module_id' });
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
          Form Fields
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Configure field layout, types, and options for each module&apos;s
          create/edit form
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

      {/* Column header hint */}
      <div
        className="px-6 pt-3 pb-1 flex gap-2 text-[10px] font-semibold tracking-widest uppercase"
        style={{ color: 'var(--text-muted)' }}
      >
        <span className="w-7 shrink-0" />
        <span className="w-24 shrink-0">Key</span>
        <span className="flex-1">Label</span>
        <span style={{ width: 148 }}>Type</span>
        <span className="w-14" />
      </div>

      {/* Field rows */}
      <div className="px-6 py-3 space-y-2">
        {fields.map((field, idx) => (
          <FieldRow
            key={`${idx}-${field.key}`}
            field={field}
            idx={idx}
            total={fields.length}
            onChange={(patch) => updateField(idx, patch)}
            onDelete={() => deleteField(idx)}
            onMove={(dir) => moveField(idx, dir)}
          />
        ))}

        {fields.length === 0 && (
          <p
            className="text-sm text-center py-6"
            style={{ color: 'var(--text-muted)' }}
          >
            No fields configured. Add one below.
          </p>
        )}

        <button
          type="button"
          onClick={addField}
          className="flex items-center gap-2 w-full justify-center py-2.5 rounded-xl text-xs font-medium mt-1"
          style={{
            backgroundColor: 'var(--glass-bg-raised)',
            color: 'var(--text-muted)',
            border: '1px dashed var(--glass-border)',
          }}
        >
          <FaPlus size={9} /> Add Field
        </button>
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
              [activeModule]: defaultFormFields(activeModule),
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
              <FaCheck size={11} /> Saved
            </>
          ) : (
            <>
              <FaSave size={11} /> {saving ? 'Saving…' : 'Save Changes'}
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
});
FormFieldsSection.displayName = 'FormFieldsSection';

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
              const Icon = s.icon;
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
                    <Icon size={12} />
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
                            <FaCheck size={10} color="#fff" />
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
                <FormFieldsSection />
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
