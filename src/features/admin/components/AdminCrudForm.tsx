import { memo, useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { FaArrowLeft, FaTrash, FaSave, FaEye, FaEyeSlash, FaCloudUploadAlt, FaLink, FaImage, FaTimes } from 'react-icons/fa';
import { MODULES, FieldConfig } from '../config/modules';
import { supabase } from '../../../lib/supabase';


/* ── Delete confirm modal ── */
const DeleteModal = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center px-4"
    style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
    onClick={onCancel}
  >
    <motion.div
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.92, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="rounded-2xl p-8 max-w-sm w-full"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--glass-border)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto"
        style={{ backgroundColor: 'rgba(239,68,68,0.12)' }}
      >
        <FaTrash size={18} style={{ color: '#ef4444' }} />
      </div>
      <h3
        className="text-lg font-bold text-center mb-2"
        style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}
      >
        Delete record?
      </h3>
      <p className="text-sm text-center mb-6" style={{ color: 'var(--text-muted)' }}>
        This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-lg text-sm font-medium border"
          style={{
            color: 'var(--text-muted)',
            borderColor: 'var(--glass-border)',
            backgroundColor: 'var(--glass-bg)',
          }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: '#ef4444', color: '#fff' }}
        >
          Delete
        </button>
      </div>
    </motion.div>
  </motion.div>
);

/* ── Image field: Upload or S3/URL tabs ── */
const ImageField = ({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (val: unknown) => void;
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string>(String(value ?? ''));
  const [fileName, setFileName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const inputStyle = {
    backgroundColor: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    color: 'var(--text-primary)',
    outline: 'none',
  };

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFileName(file.name);
    onChange(url); // TODO: replace with actual S3/Storage upload result
  }, [onChange]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleUrlChange = (url: string) => {
    setPreview(url);
    onChange(url);
  };

  const clearImage = () => {
    setPreview('');
    setFileName('');
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const tabBtn = (label: string, tab: 'upload' | 'url', icon: React.ReactNode) => (
    <button
      type="button"
      onClick={() => setMode(tab)}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
      style={
        mode === tab
          ? { backgroundColor: 'var(--accent)', color: '#fff' }
          : { backgroundColor: 'var(--glass-bg-raised)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }
      }
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="space-y-3">
      {/* Tab switcher */}
      <div className="flex items-center gap-2">
        {tabBtn('Upload File', 'upload', <FaCloudUploadAlt size={11} />)}
        {tabBtn('S3 / URL', 'url', <FaLink size={10} />)}
      </div>

      {/* Upload mode */}
      {mode === 'upload' && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="relative w-full rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
          style={{
            minHeight: 120,
            border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--glass-border-strong)'}`,
            backgroundColor: dragging ? 'var(--accent-soft)' : 'var(--glass-bg-raised)',
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
          <FaCloudUploadAlt size={22} style={{ color: dragging ? 'var(--accent)' : 'var(--text-muted)' }} />
          <div className="text-center px-4">
            <p className="text-sm font-medium" style={{ color: dragging ? 'var(--accent)' : 'var(--text-primary)' }}>
              {dragging ? 'Drop image here' : 'Drag & drop or click to browse'}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              PNG, JPG, WebP, GIF — max 10 MB
            </p>
          </div>
          {fileName && (
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}
            >
              {fileName}
            </span>
          )}
        </div>
      )}

      {/* URL mode */}
      {mode === 'url' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FaLink size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              type="url"
              value={preview}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://s3.amazonaws.com/bucket/image.jpg"
              className="flex-1 px-3 py-2.5 rounded-lg text-sm"
              style={inputStyle}
            />
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Paste an S3, CloudFront, Firebase Storage, or any public image URL.
          </p>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative rounded-xl overflow-hidden" style={{ height: 140, backgroundColor: 'var(--glass-bg-raised)' }}>
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget.parentElement!.style.display = 'none'); }}
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff' }}
            title="Remove image"
          >
            <FaTimes size={11} />
          </button>
          <div
            className="absolute bottom-0 left-0 right-0 px-3 py-1.5 text-xs truncate"
            style={{ backgroundColor: 'rgba(0,0,0,0.45)', color: 'rgba(255,255,255,0.85)' }}
          >
            {fileName || preview}
          </div>
        </div>
      )}

      {/* Empty state icon when no preview */}
      {!preview && (
        <div
          className="flex items-center justify-center rounded-xl"
          style={{ height: 60, backgroundColor: 'var(--glass-bg-subtle)', border: '1px solid var(--glass-border-subtle)' }}
        >
          <FaImage size={20} style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
        </div>
      )}
    </div>
  );
};

/* ── Multi-image field ── */
const MultiImageField = ({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (val: string[]) => void;
}) => {
  const [addMode, setAddMode] = useState<'upload' | 'url' | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const images: string[] = Array.isArray(value)
    ? (value as string[]).filter(Boolean)
    : typeof value === 'string' && value
    ? value.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const addImages = (newUrls: string[]) => {
    onChange([...images, ...newUrls.filter(Boolean)]);
  };

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .map((f) => URL.createObjectURL(f));
    addImages(urls);
    setAddMode(null);
  };

  const handleUrlAdd = () => {
    const trimmed = urlInput.trim();
    if (trimmed) {
      addImages([trimmed]);
      setUrlInput('');
    }
    setAddMode(null);
  };

  return (
    <div className="space-y-3">
      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative rounded-xl overflow-hidden"
              style={{ aspectRatio: '1', backgroundColor: 'var(--glass-bg-raised)' }}
            >
              <img
                src={src}
                alt={`image-${idx}`}
                className="w-full h-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.3'; }}
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center shadow"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff' }}
              >
                <FaTimes size={9} />
              </button>
              <div
                className="absolute bottom-0 left-0 right-0 px-1.5 py-0.5 text-xs truncate"
                style={{ backgroundColor: 'rgba(0,0,0,0.45)', color: 'rgba(255,255,255,0.8)', fontSize: 9 }}
              >
                {idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add more controls */}
      {addMode === null && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAddMode('upload')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{ backgroundColor: 'var(--glass-bg-raised)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}
          >
            <FaCloudUploadAlt size={11} />
            Upload
          </button>
          <button
            type="button"
            onClick={() => setAddMode('url')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{ backgroundColor: 'var(--glass-bg-raised)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}
          >
            <FaLink size={10} />
            Add URL
          </button>
          {images.length === 0 && (
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>No images yet</span>
          )}
        </div>
      )}

      {/* Upload drop zone */}
      {addMode === 'upload' && (
        <div className="space-y-2">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => inputRef.current?.click()}
            className="relative w-full rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
            style={{
              minHeight: 100,
              border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--glass-border-strong)'}`,
              backgroundColor: dragging ? 'var(--accent-soft)' : 'var(--glass-bg-raised)',
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <FaCloudUploadAlt size={20} style={{ color: dragging ? 'var(--accent)' : 'var(--text-muted)' }} />
            <p className="text-xs font-medium" style={{ color: dragging ? 'var(--accent)' : 'var(--text-primary)' }}>
              {dragging ? 'Drop images here' : 'Drag & drop or click — select multiple'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAddMode(null)}
            className="text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* URL input */}
      {addMode === 'url' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FaLink size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleUrlAdd(); } }}
              placeholder="https://..."
              className="flex-1 px-3 py-2 rounded-lg text-sm"
              style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)', outline: 'none' }}
              autoFocus
            />
            <button
              type="button"
              onClick={handleUrlAdd}
              className="px-3 py-2 rounded-lg text-xs font-semibold"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => { setUrlInput(''); setAddMode(null); }}
              className="text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              Cancel
            </button>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Press Enter or click Add. Repeat to add more URLs.
          </p>
        </div>
      )}

      {images.length > 0 && addMode === null && (
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {images.length} image{images.length > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};

/* ── Individual field renderer ── */
const Field = ({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: unknown;
  onChange: (val: unknown) => void;
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const str = String(value ?? '');

  const inputStyle = {
    backgroundColor: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    color: 'var(--text-primary)',
    outline: 'none',
  };

  if (field.type === 'image') {
    return <ImageField value={value} onChange={onChange} />;
  }

  if (field.type === 'images') {
    return <MultiImageField value={value} onChange={(val) => onChange(val)} />;
  }

  if (field.type === 'toggle') {
    const checked = value === true || value === 'true' || value === '1';
    return (
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
          {field.label}
        </span>
        <button
          type="button"
          onClick={() => onChange(!checked)}
          className="relative w-11 h-6 rounded-full transition-colors duration-200"
          style={{ backgroundColor: checked ? 'var(--accent)' : 'var(--glass-bg-raised)' }}
          role="switch"
          aria-checked={checked}
        >
          <motion.span
            animate={{ x: checked ? 22 : 2 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
          />
        </button>
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        value={str}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={3}
        className="w-full px-3 py-2.5 rounded-lg text-sm resize-none"
        style={inputStyle}
      />
    );
  }

  if (field.type === 'richtext') {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>HTML content</span>
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="flex items-center gap-1 text-xs"
            style={{ color: 'var(--accent)' }}
          >
            {showPreview ? <FaEyeSlash size={11} /> : <FaEye size={11} />}
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
        {showPreview ? (
          <div
            className="w-full min-h-[120px] px-3 py-2.5 rounded-lg text-sm prose prose-sm max-w-none"
            style={{ ...inputStyle, border: '1px solid var(--glass-border)' }}
            dangerouslySetInnerHTML={{ __html: str }}
          />
        ) : (
          <textarea
            value={str}
            onChange={(e) => onChange(e.target.value)}
            placeholder="<p>HTML content...</p>"
            rows={6}
            className="w-full px-3 py-2.5 rounded-lg text-sm resize-y font-mono"
            style={inputStyle}
          />
        )}
      </div>
    );
  }

  if (field.type === 'url') {
    return (
      <input
        type="url"
        value={str}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder ?? 'https://...'}
        className="w-full px-3 py-2.5 rounded-lg text-sm"
        style={inputStyle}
      />
    );
  }

  return (
    <input
      type="text"
      value={str}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      className="w-full px-3 py-2.5 rounded-lg text-sm"
      style={inputStyle}
    />
  );
};

/* ── Main CRUD form ── */
const AdminCrudForm = memo(() => {
  const navigate = useNavigate();
  const { module: moduleId = 'hero', id } = useParams();
  const isNew = id === 'new';

  const mod = MODULES.find((m) => m.id === moduleId);
  const emptyValues = mod?.fields.reduce<Record<string, unknown>>((acc, f) => {
    acc[f.key] = f.type === 'images' ? [] : '';
    return acc;
  }, {}) ?? {};

  const [values, setValues] = useState<Record<string, unknown>>(emptyValues);
  const [showDelete, setShowDelete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew || !mod) return;
    supabase
      .from(moduleId)
      .select('*')
      .eq('id', id!)
      .single()
      .then(({ data, error }) => {
        if (error) { setLoadError(error.message); return; }
        if (data) {
          const filled = mod.fields.reduce<Record<string, unknown>>((acc, f) => {
            const raw = (data as Record<string, unknown>)[f.key];
            acc[f.key] = raw !== undefined && raw !== null ? raw : (f.type === 'images' ? [] : '');
            return acc;
          }, {});
          setValues(filled);
        }
      });
  }, [moduleId, id, isNew, mod]);

  const handleChange = (key: string, val: unknown) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = isNew ? values : { ...values, id };
    const { error } = await supabase.from(moduleId).upsert(payload as Record<string, unknown>);
    setSaving(false);
    if (!error) navigate(`/admin/${moduleId}`);
  };

  const handleDelete = async () => {
    await supabase.from(moduleId).delete().eq('id', id!);
    navigate(`/admin/${moduleId}`);
  };

  if (!mod) return null;
  if (loadError) return (
    <div className="p-6 text-sm" style={{ color: '#ef4444' }}>Failed to load record: {loadError}</div>
  );

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(`/admin/${moduleId}`)}
            className="w-9 h-9 flex items-center justify-center rounded-lg"
            style={{
              backgroundColor: 'var(--glass-bg-raised)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-muted)',
            }}
          >
            <FaArrowLeft size={13} />
          </motion.button>
          <div>
            <h2
              className="text-xl font-bold"
              style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}
            >
              {isNew ? `New ${mod.label}` : `Edit ${mod.label}`}
            </h2>
            {!isNew && (
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                ID: {id}
              </p>
            )}
          </div>
        </div>

        {/* Form card */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSave}
          className="rounded-2xl p-6"
          style={{
            backgroundColor: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {mod.fields.map((field) => (
              <div
                key={field.key}
                className={field.span === 'full' || field.type === 'toggle' ? 'sm:col-span-2' : ''}
              >
                {field.type !== 'toggle' && (
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {field.label}
                    {field.required && (
                      <span className="ml-1" style={{ color: 'var(--accent)' }}>*</span>
                    )}
                  </label>
                )}
                <Field
                  field={field}
                  value={values[field.key]}
                  onChange={(val) => handleChange(field.key, val)}
                />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-8 pt-6"
            style={{ borderTop: '1px solid var(--glass-border)' }}>
            {!isNew ? (
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowDelete(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  color: '#ef4444',
                }}
              >
                <FaTrash size={12} />
                Delete
              </motion.button>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(`/admin/${moduleId}`)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium"
                style={{
                  color: 'var(--text-muted)',
                  backgroundColor: 'var(--glass-bg-raised)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                <FaSave size={12} />
                {saving ? 'Saving…' : 'Save'}
              </motion.button>
            </div>
          </div>
        </motion.form>
      </div>

      {/* Delete modal */}
      <AnimatePresence>
        {showDelete && (
          <DeleteModal
            onConfirm={handleDelete}
            onCancel={() => setShowDelete(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
});

AdminCrudForm.displayName = 'AdminCrudForm';
export default AdminCrudForm;
