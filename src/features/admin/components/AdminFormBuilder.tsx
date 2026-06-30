import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import { MODULES, type FieldConfig } from '../config/modules';
import Breadcrumbs from '../../../shared/components/ui/Breadcrumbs';
import { getConfig, setConfig } from '../../../services/firebase/configRepo';

/* ── Types ── */

type FieldType = FieldConfig['type'];

interface FieldDraft {
  key: string;
  label: string;
  type: FieldType;
  placeholder: string;
  required: boolean;
  span: 'full' | 'half';
  options: string; // comma-separated for radio / select
}

/* ── Constants ── */

const TYPES: { value: FieldType; label: string; icon: React.ReactNode }[] = [
  { value: 'text', label: 'Text', icon: <ReactIcon name="FaFont" size={11} /> },
  {
    value: 'textarea',
    label: 'Textarea',
    icon: <ReactIcon name="FaAlignLeft" size={11} />,
  },
  {
    value: 'richtext',
    label: 'Rich Text',
    icon: <ReactIcon name="FaCode" size={11} />,
  },
  { value: 'url', label: 'URL', icon: <ReactIcon name="FaLink" size={11} /> },
  {
    value: 'image',
    label: 'Image',
    icon: <ReactIcon name="FaImage" size={11} />,
  },
  {
    value: 'images',
    label: 'Multi-Image',
    icon: <ReactIcon name="FaImages" size={11} />,
  },
  {
    value: 'toggle',
    label: 'Toggle',
    icon: <ReactIcon name="FaToggleOn" size={11} />,
  },
  {
    value: 'checkbox',
    label: 'Checkbox',
    icon: <ReactIcon name="FaCheckSquare" size={11} />,
  },
  { value: 'tags', label: 'Tags', icon: <ReactIcon name="FaTags" size={11} /> },
  {
    value: 'multiinput',
    label: 'Multi-Input',
    icon: <ReactIcon name="FaList" size={11} />,
  },
  {
    value: 'radio',
    label: 'Radio',
    icon: <ReactIcon name="FaDotCircle" size={11} />,
  },
  {
    value: 'select',
    label: 'Select',
    icon: <ReactIcon name="FaCaretDown" size={11} />,
  },
];

const typeIcon = (t: FieldType) => TYPES.find((x) => x.value === t)?.icon;
const typeLabel = (t: FieldType) =>
  TYPES.find((x) => x.value === t)?.label ?? t;

/* ── Draft helpers ── */

const emptyDraft = (): FieldDraft => ({
  key: '',
  label: '',
  type: 'text',
  placeholder: '',
  required: false,
  span: 'half',
  options: '',
});

const draftFromField = (f: FieldConfig): FieldDraft => ({
  key: f.key,
  label: f.label,
  type: f.type,
  placeholder: f.placeholder ?? '',
  required: f.required ?? false,
  span: f.span ?? 'half',
  options: (f.options ?? []).join(', '),
});

const draftToField = (d: FieldDraft): FieldConfig => ({
  key: d.key.trim(),
  label: d.label.trim(),
  type: d.type,
  ...(d.placeholder.trim() && { placeholder: d.placeholder.trim() }),
  ...(d.required && { required: true }),
  span: d.span,
  ...((d.type === 'radio' || d.type === 'select') && {
    options: d.options
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  }),
});

/* ── Shared styles ── */

const inputCls = 'w-full px-3 py-2 rounded-lg text-sm';
const inputSty = {
  backgroundColor: 'var(--input-bg)',
  border: '1px solid var(--input-border)',
  color: 'var(--text-primary)',
  outline: 'none',
} as const;

/* ── FieldEditPanel ── */

const FieldEditPanel = memo(
  ({
    draft,
    onChange,
    onConfirm,
    onCancel,
    isNew,
  }: {
    draft: FieldDraft;
    onChange: (d: FieldDraft) => void;
    onConfirm: () => void;
    onCancel: () => void;
    isNew: boolean;
  }) => {
    const set = <K extends keyof FieldDraft>(k: K, v: FieldDraft[K]) =>
      onChange({ ...draft, [k]: v });

    const isValid =
      draft.key.trim().length > 0 && draft.label.trim().length > 0;

    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.18 }}
        className="overflow-hidden"
      >
        <div
          className="rounded-xl px-4 py-4 mt-2"
          style={{
            backgroundColor: 'var(--bg-raised)',
            border: '1px solid var(--accent)',
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            {/* Label */}
            <div>
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--text-muted)' }}
              >
                Label *
              </label>
              <input
                type="text"
                value={draft.label}
                onChange={(e) => set('label', e.target.value)}
                placeholder="Display label"
                className={inputCls}
                style={inputSty}
                autoFocus
              />
            </div>

            {/* Key */}
            <div>
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--text-muted)' }}
              >
                Key * <span className="font-normal">(Supabase column)</span>
              </label>
              <input
                type="text"
                value={draft.key}
                onChange={(e) =>
                  set('key', e.target.value.replace(/\s+/g, '_'))
                }
                placeholder="column_name"
                className={`${inputCls} font-mono`}
                style={inputSty}
              />
            </div>

            {/* Type */}
            <div>
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--text-muted)' }}
              >
                Type *
              </label>
              <select
                value={draft.type}
                onChange={(e) => set('type', e.target.value as FieldType)}
                className={`${inputCls} appearance-none cursor-pointer`}
                style={{ ...inputSty, backgroundColor: '#fff', color: '#111' }}
              >
                {TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Width */}
            <div>
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--text-muted)' }}
              >
                Column Width
              </label>
              <div className="flex gap-2" style={{ height: 38 }}>
                {(['half', 'full'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set('span', s)}
                    className="flex-1 rounded-lg text-xs font-semibold capitalize"
                    style={
                      draft.span === s
                        ? { backgroundColor: 'var(--accent)', color: '#fff' }
                        : {
                            backgroundColor: 'var(--glass-bg-raised)',
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

            {/* Placeholder */}
            <div>
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--text-muted)' }}
              >
                Placeholder <span className="font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={draft.placeholder}
                onChange={(e) => set('placeholder', e.target.value)}
                placeholder="Hint text…"
                className={inputCls}
                style={inputSty}
              />
            </div>

            {/* Required */}
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={draft.required}
                  onChange={(e) => set('required', e.target.checked)}
                  className="w-4 h-4 accent-[var(--accent)]"
                />
                <span
                  className="text-sm"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Required field
                </span>
              </label>
            </div>

            {/* Choices — radio / select only */}
            {(draft.type === 'radio' || draft.type === 'select') && (
              <div className="col-span-2">
                <label
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Choices <span className="font-normal">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={draft.options}
                  onChange={(e) => set('options', e.target.value)}
                  placeholder="Option A, Option B, Option C"
                  className={inputCls}
                  style={inputSty}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div
            className="flex items-center justify-end gap-2 mt-4 pt-3"
            style={{ borderTop: '1px solid var(--glass-border)' }}
          >
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-2 rounded-lg text-sm"
              style={{
                backgroundColor: 'var(--glass-bg-raised)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-muted)',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={!isValid}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-40"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              <ReactIcon name="FaCheck" size={11} />
              {isNew ? 'Add Field' : 'Update Field'}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }
);

FieldEditPanel.displayName = 'FieldEditPanel';

/* ── AdminFormBuilder ── */

const AdminFormBuilder = memo(() => {
  const { module: moduleId = '' } = useParams();
  const navigate = useNavigate();
  const mod = MODULES.find((m) => m.id === moduleId);

  const [fields, setFields] = useState<FieldConfig[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null); // null=closed  -1=adding new
  const [draft, setDraft] = useState<FieldDraft>(emptyDraft());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /* Load config from Firestore, fall back to static modules definition */
  useEffect(() => {
    setLoading(true);
    setEditIdx(null);
    getConfig<{ fields?: FieldConfig[] }>('form_config', moduleId).then(
      (data) => {
        setFields(data?.fields ?? mod?.fields ?? []);
        setLoading(false);
      }
    );
  }, [moduleId, mod]);

  /* Reorder */
  const move = useCallback((idx: number, dir: -1 | 1) => {
    setFields((prev) => {
      const next = [...prev];
      const other = idx + dir;
      if (other < 0 || other >= next.length) return prev;
      [next[idx], next[other]] = [next[other], next[idx]];
      return next;
    });
  }, []);

  /* Edit existing */
  const startEdit = useCallback(
    (idx: number) => {
      setEditIdx((prev) => (prev === idx ? null : idx));
      setDraft(draftFromField(fields[idx]));
    },
    [fields]
  );

  /* Open "add new" panel */
  const startAdd = useCallback(() => {
    setEditIdx(-1);
    setDraft(emptyDraft());
  }, []);

  const cancelEdit = useCallback(() => setEditIdx(null), []);

  /* Commit draft → field list */
  const confirmEdit = useCallback(() => {
    const field = draftToField(draft);
    if (!field.key || !field.label) return;
    setFields((prev) =>
      editIdx === -1
        ? [...prev, field]
        : prev.map((f, i) => (i === editIdx ? field : f))
    );
    setEditIdx(null);
  }, [draft, editIdx]);

  /* Delete */
  const deleteField = useCallback((idx: number) => {
    setFields((prev) => prev.filter((_, i) => i !== idx));
    setEditIdx(null);
  }, []);

  /* Persist to Firestore */
  const handleSave = async () => {
    setSaving(true);
    await setConfig('form_config', moduleId, { fields });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  /* Restore static module defaults */
  const handleReset = () => {
    setFields(mod?.fields ?? []);
    setEditIdx(null);
  };

  if (!mod) return null;

  return (
    <div className="h-full flex flex-col">
      {/* ── Sticky page header ── */}
      <div
        className="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4"
        style={{ borderBottom: '1px solid var(--glass-border)' }}
      >
        <Breadcrumbs
          items={[
            { label: mod.label, onClick: () => navigate(`/admin/${moduleId}`) },
            { label: 'Form Builder' },
          ]}
        />

        {/* Right: reset + save */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium"
            style={{
              backgroundColor: 'var(--glass-bg-raised)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-muted)',
            }}
          >
            <ReactIcon name="FaUndo" size={10} />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold disabled:opacity-60"
            style={{
              backgroundColor: saved ? '#22c55e' : 'var(--accent)',
              color: '#fff',
            }}
          >
            {saved ? (
              <ReactIcon name="FaCheck" size={12} />
            ) : (
              <ReactIcon name="FaSave" size={12} />
            )}
            <span>{saved ? 'Saved!' : saving ? 'Saving…' : 'Save'}</span>
          </motion.button>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <div className="p-6 max-w-3xl mx-auto">
          {/* ── Field list card ── */}
          <div
            className="rounded-2xl p-5 mb-4"
            style={{
              backgroundColor: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs font-semibold"
                style={{ color: 'var(--text-muted)' }}
              >
                {fields.length} field{fields.length !== 1 ? 's' : ''}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                ↑ ↓ to reorder · pencil to edit · bin to delete
              </span>
            </div>

            {loading ? (
              <div className="space-y-2 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-12 rounded-xl"
                    style={{ backgroundColor: 'var(--glass-bg-raised)' }}
                  />
                ))}
              </div>
            ) : fields.length === 0 ? (
              <p
                className="text-sm text-center py-8"
                style={{ color: 'var(--text-muted)' }}
              >
                No fields yet. Click &ldquo;Add Field&rdquo; below to start.
              </p>
            ) : (
              <div className="space-y-1.5">
                {fields.map((f, idx) => (
                  <div key={`${f.key}-${idx}`}>
                    {/* Field row */}
                    <div
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors"
                      style={{
                        backgroundColor:
                          editIdx === idx
                            ? 'var(--glass-bg-hover)'
                            : 'var(--glass-bg-raised)',
                        border: `1px solid ${editIdx === idx ? 'var(--accent)' : 'var(--glass-border)'}`,
                      }}
                    >
                      {/* Type badge */}
                      <span
                        className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium shrink-0"
                        style={{
                          backgroundColor: 'var(--accent-soft)',
                          color: 'var(--accent)',
                        }}
                      >
                        {typeIcon(f.type)}
                        <span className="hidden sm:inline">
                          {typeLabel(f.type)}
                        </span>
                      </span>

                      {/* Label + key */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-medium truncate"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {f.label}
                        </p>
                        <p
                          className="text-xs font-mono"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {f.key}
                        </p>
                      </div>

                      {/* Badges */}
                      <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                        {f.required && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: 'rgba(239,68,68,0.12)',
                              color: '#ef4444',
                            }}
                          >
                            req
                          </span>
                        )}
                        <span
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: 'var(--glass-bg)',
                            color: 'var(--text-muted)',
                            border: '1px solid var(--glass-border)',
                          }}
                        >
                          {f.span ?? 'half'}
                        </span>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => move(idx, -1)}
                          disabled={idx === 0}
                          className="w-7 h-7 flex items-center justify-center rounded-lg disabled:opacity-25"
                          style={{
                            backgroundColor: 'var(--glass-bg)',
                            color: 'var(--text-muted)',
                          }}
                        >
                          <ReactIcon name="FaChevronUp" size={9} />
                        </button>
                        <button
                          type="button"
                          onClick={() => move(idx, 1)}
                          disabled={idx === fields.length - 1}
                          className="w-7 h-7 flex items-center justify-center rounded-lg disabled:opacity-25"
                          style={{
                            backgroundColor: 'var(--glass-bg)',
                            color: 'var(--text-muted)',
                          }}
                        >
                          <ReactIcon name="FaChevronDown" size={9} />
                        </button>
                        <button
                          type="button"
                          onClick={() => startEdit(idx)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg"
                          style={{
                            backgroundColor:
                              editIdx === idx
                                ? 'var(--accent-soft)'
                                : 'var(--glass-bg)',
                            color:
                              editIdx === idx
                                ? 'var(--accent)'
                                : 'var(--text-muted)',
                          }}
                        >
                          <ReactIcon name="FaEdit" size={10} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteField(idx)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg"
                          style={{
                            backgroundColor: 'rgba(239,68,68,0.1)',
                            color: '#ef4444',
                          }}
                        >
                          <ReactIcon name="FaTrash" size={10} />
                        </button>
                      </div>
                    </div>

                    {/* Inline edit panel for this field */}
                    <AnimatePresence>
                      {editIdx === idx && (
                        <FieldEditPanel
                          draft={draft}
                          onChange={setDraft}
                          onConfirm={confirmEdit}
                          onCancel={cancelEdit}
                          isNew={false}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Add-field panel (when open) ── */}
          <AnimatePresence>
            {editIdx === -1 && (
              <div className="mb-4">
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  NEW FIELD
                </p>
                <FieldEditPanel
                  draft={draft}
                  onChange={setDraft}
                  onConfirm={confirmEdit}
                  onCancel={cancelEdit}
                  isNew
                />
              </div>
            )}
          </AnimatePresence>

          {/* ── Add Field button (hidden while panel is open) ── */}
          {editIdx !== -1 && (
            <button
              type="button"
              onClick={startAdd}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium"
              style={{
                backgroundColor: 'var(--glass-bg-raised)',
                border: '2px dashed var(--glass-border)',
                color: 'var(--text-muted)',
              }}
            >
              <ReactIcon name="FaPlus" size={11} /> Add Field
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

AdminFormBuilder.displayName = 'AdminFormBuilder';
export default AdminFormBuilder;
