import { memo, useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {
  MODULES,
  getModuleFields,
  type FieldConfig,
  type SubFieldConfig,
  type SubRecordConfig,
} from '../config/modules';
import CoverTypeSelect from '../../../shared/components/ui/CoverTypeSelect';
import SocialPlatformSelect from '../../../shared/components/ui/SocialPlatformSelect';
import Breadcrumbs from '../../../shared/components/ui/Breadcrumbs';
import { supabase } from '../../../lib/supabase';
import { auth } from '../../../lib/firebase';
import { isFirestoreModule } from '../../../services/firebase/registry';
import { uploadImage, moduleFolder } from '../../../lib/imageUpload';
import { uploadAvatar } from '../../../lib/supabaseStorage';
import { detectCoverType, toYouTubeEmbed } from '../../../services/postService';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchRecord,
  createRecord,
  updateRecord,
  deleteRecord,
  clearCurrentRecord,
  selectCurrentRecord,
  selectCurrentRecordStatus,
  selectCurrentRecordError,
} from '../../../store/adminSlice';
import {
  updateCurrentUserProfile,
  sendPasswordReset,
  selectCurrentUid,
} from '../../../store/authSlice';

/* ── helpers ── */
function defaultForType(type: FieldConfig['type']): unknown {
  if (
    type === 'images' ||
    type === 'multiinput' ||
    type === 'structuredlist' ||
    type === 'subrecords'
  )
    return [];
  if (type === 'toggle' || type === 'checkbox') return false;
  if (type === 'number') return 0;
  if (type === 'resetpassword') return null;
  return '';
}

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
        <ReactIcon name="FaTrash" size={18} style={{ color: '#ef4444' }} />
      </div>
      <h3
        className="text-lg font-bold text-center mb-2"
        style={{
          color: 'var(--text-primary)',
          fontFamily: '"Syne", sans-serif',
        }}
      >
        Delete record?
      </h3>
      <p
        className="text-sm text-center mb-6"
        style={{ color: 'var(--text-muted)' }}
      >
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

/* ── Image field ── */
export const ImageField = ({
  value,
  onChange,
  folder,
  storageBackend = 's3',
  userId,
}: {
  value: unknown;
  onChange: (v: unknown) => void;
  folder: string;
  storageBackend?: 's3' | 'supabase';
  userId?: string | null;
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState(String(value ?? ''));
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const originalValueRef = useRef<string>(String(value ?? ''));

  useEffect(() => {
    if (!uploading) setPreview(String(value ?? ''));
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const inputStyle = {
    backgroundColor: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    color: 'var(--text-primary)',
    outline: 'none',
  };

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) return;
      const originalValue = String(value ?? '');
      originalValueRef.current = originalValue;
      const localUrl = URL.createObjectURL(file);
      setUploading(true);
      setProgress(0);
      setUploadError(null);
      setFileName(file.name);
      setPreview(localUrl);
      try {
        let publicUrl: string;
        if (storageBackend === 'supabase') {
          const uid = userId ?? auth.currentUser?.uid ?? 'unknown';
          publicUrl = await uploadAvatar(file, uid);
        } else {
          ({ publicUrl } = await uploadImage(
            file,
            folder,
            originalValue,
            (pct) => setProgress(pct)
          ));
        }
        setPreview(publicUrl);
        onChange(publicUrl);
      } catch (err) {
        setPreview(originalValueRef.current);
        setUploadError(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setUploading(false);
        setProgress(0);
      }
    },
    [onChange, folder, value, storageBackend, userId]
  );

  /* Render the appropriate preview element based on detected media type */
  const renderPreview = (url: string) => {
    const type = detectCoverType(url);
    if (type === 'youtube') {
      return (
        <iframe
          src={toYouTubeEmbed(url)}
          title="preview"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    if (type === 'drive_video') {
      return (
        <iframe
          src={url}
          title="preview"
          className="w-full h-full"
          allow="autoplay"
          allowFullScreen
        />
      );
    }
    if (type === 'video') {
      return (
        <video
          src={url}
          controls
          className="w-full h-full object-contain bg-black"
        />
      );
    }
    /* image / drive_image */
    return (
      <img
        src={url}
        alt="preview"
        className="w-full h-full object-cover"
        onError={() => {
          if (!uploading) setPreview('');
        }}
      />
    );
  };

  return (
    <div className="space-y-3">
      {/* ── Input mode dropdown — hidden for Supabase Storage fields ── */}
      {storageBackend !== 'supabase' && (
        <div className="flex items-center gap-2">
          <label
            className="text-xs font-medium shrink-0"
            style={{ color: 'var(--text-muted)' }}
          >
            Input via
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as 'upload' | 'url')}
            className="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium appearance-none cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--input-border)',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          >
            <option value="upload">S3 Upload (file)</option>
            <option value="url">
              Direct URL (YouTube / video / Drive / image)
            </option>
          </select>
        </div>
      )}

      {/* ── Preview card ── */}
      {preview && (
        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={{
            aspectRatio: '16/9',
            maxHeight: 200,
            backgroundColor: 'var(--glass-bg-raised)',
          }}
        >
          {renderPreview(preview)}

          {/* Upload progress overlay */}
          {uploading && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            >
              <p className="text-sm font-semibold" style={{ color: '#fff' }}>
                {progress}%
              </p>
              <div
                className="rounded-full overflow-hidden"
                style={{
                  width: '60%',
                  height: 6,
                  backgroundColor: 'rgba(255,255,255,0.25)',
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: 'var(--accent)',
                    transition: 'width 0.15s ease',
                  }}
                />
              </div>
            </div>
          )}

          {/* Remove button */}
          {!uploading && (
            <>
              <button
                type="button"
                onClick={() => {
                  setPreview('');
                  setFileName('');
                  onChange('');
                  if (inputRef.current) inputRef.current.value = '';
                }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff' }}
              >
                <ReactIcon name="FaTimes" size={11} />
              </button>
              {fileName && (
                <div
                  className="absolute bottom-0 left-0 right-0 px-3 py-1.5 text-xs truncate"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.45)',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  {fileName}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Upload mode controls */}
      {mode === 'upload' && !uploading && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          {/* Full-height drop zone when no image; compact when image exists */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const f = e.dataTransfer.files[0];
              if (f) handleFile(f);
            }}
            onClick={() => inputRef.current?.click()}
            className="relative w-full rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
            style={{
              minHeight: preview ? 64 : 120,
              border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--glass-border-strong)'}`,
              backgroundColor: dragging
                ? 'var(--accent-soft)'
                : 'var(--glass-bg-raised)',
            }}
          >
            {preview ? (
              /* Compact replace hint */
              <p
                className="text-xs font-medium"
                style={{
                  color: dragging ? 'var(--accent)' : 'var(--text-muted)',
                }}
              >
                {dragging
                  ? 'Drop to replace'
                  : 'Drop or click to replace image'}
              </p>
            ) : (
              /* Full drop zone */
              <>
                <ReactIcon
                  name="FaCloudUploadAlt"
                  size={22}
                  style={{
                    color: dragging ? 'var(--accent)' : 'var(--text-muted)',
                  }}
                />
                <div className="text-center px-4">
                  <p
                    className="text-sm font-medium"
                    style={{
                      color: dragging ? 'var(--accent)' : 'var(--text-primary)',
                    }}
                  >
                    {dragging
                      ? 'Drop image here'
                      : 'Drag & drop or click to browse'}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    PNG, JPG, WebP — max 10 MB
                  </p>
                </div>
                {fileName && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: 'var(--glass-bg)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--glass-border)',
                    }}
                  >
                    {fileName}
                  </span>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* URL mode — S3/Lambda fields only */}
      {storageBackend !== 'supabase' && mode === 'url' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ReactIcon
              name="FaLink"
              size={12}
              style={{ color: 'var(--text-muted)', flexShrink: 0 }}
            />
            <input
              type="url"
              value={preview}
              onChange={(e) => {
                setPreview(e.target.value);
                onChange(e.target.value);
              }}
              placeholder="https://youtube.com/... · drive.google.com/... · s3.amazonaws.com/..."
              className="flex-1 px-3 py-2.5 rounded-lg text-sm"
              style={inputStyle}
            />
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Accepts image URLs, YouTube links, direct video URLs, or Google
            Drive links.
          </p>
        </div>
      )}

      {/* Empty state placeholder */}
      {!preview && (
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            height: 60,
            backgroundColor: 'var(--glass-bg-subtle)',
            border: '1px solid var(--glass-border-subtle)',
          }}
        >
          <ReactIcon
            name="FaImage"
            size={20}
            style={{ color: 'var(--text-muted)', opacity: 0.3 }}
          />
        </div>
      )}

      {uploadError && (
        <p className="text-xs" style={{ color: '#ef4444' }}>
          {uploadError}
        </p>
      )}
    </div>
  );
};

/* ── Multi-image field ── */
interface PendingImage {
  id: string;
  localUrl: string;
  name: string;
  progress: number;
  error?: string;
}

const MultiImageField = ({
  value,
  onChange,
  folder,
}: {
  value: unknown;
  onChange: (v: string[]) => void;
  folder: string;
}) => {
  const [addMode, setAddMode] = useState<'upload' | 'url' | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [dragging, setDragging] = useState(false);
  const [pending, setPending] = useState<PendingImage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const images: string[] = Array.isArray(value)
    ? (value as string[]).filter(Boolean)
    : typeof value === 'string' && value
      ? value
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (!valid.length) return;
    setAddMode(null);

    // Create pending entries with local object URLs immediately
    const newPending: PendingImage[] = valid.map((f) => ({
      id: `${Date.now()}-${Math.random()}`,
      localUrl: URL.createObjectURL(f),
      name: f.name,
      progress: 0,
    }));
    setPending((prev) => [...prev, ...newPending]);

    // Upload each file concurrently with per-file progress
    newPending.forEach((entry, i) => {
      const file = valid[i];
      uploadImage(file, folder, undefined, (pct) => {
        setPending((prev) =>
          prev.map((p) => (p.id === entry.id ? { ...p, progress: pct } : p))
        );
      })
        .then(({ publicUrl }) => {
          // Remove from pending, add to committed images
          setPending((prev) => prev.filter((p) => p.id !== entry.id));
          onChange([...images, publicUrl]);
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : 'Upload failed';
          setPending((prev) =>
            prev.map((p) => (p.id === entry.id ? { ...p, error: msg } : p))
          );
        });
    });
  };

  const dismissPending = (id: string) =>
    setPending((prev) => prev.filter((p) => p.id !== id));

  const hasItems = images.length > 0 || pending.length > 0;

  return (
    <div className="space-y-3">
      {/* Combined grid: committed images + in-flight pending */}
      {hasItems && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {/* Committed images */}
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative rounded-xl overflow-hidden"
              style={{
                aspectRatio: '1',
                backgroundColor: 'var(--glass-bg-raised)',
              }}
            >
              <img
                src={src}
                alt={`${idx}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = '0.3';
                }}
              />
              <button
                type="button"
                onClick={() => onChange(images.filter((_, i) => i !== idx))}
                className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff' }}
              >
                <ReactIcon name="FaTimes" size={9} />
              </button>
            </div>
          ))}

          {/* Pending (in-flight) images */}
          {pending.map((p) => (
            <div
              key={p.id}
              className="relative rounded-xl overflow-hidden"
              style={{
                aspectRatio: '1',
                backgroundColor: 'var(--glass-bg-raised)',
              }}
            >
              <img
                src={p.localUrl}
                alt={p.name}
                className="w-full h-full object-cover"
              />

              {/* Overlay: uploading state */}
              {!p.error && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
                >
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: '#fff' }}
                  >
                    {p.progress}%
                  </p>
                  {/* Progress bar at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: 4,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    }}
                  >
                    <div
                      style={{
                        width: `${p.progress}%`,
                        height: '100%',
                        backgroundColor: 'var(--accent)',
                        transition: 'width 0.15s ease',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Error overlay */}
              {p.error && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center p-1"
                  style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
                >
                  <p
                    className="text-xs text-center leading-tight mb-1"
                    style={{ color: '#fca5a5' }}
                  >
                    {p.error}
                  </p>
                  <button
                    type="button"
                    onClick={() => dismissPending(p.id)}
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(239,68,68,0.7)',
                      color: '#fff',
                    }}
                  >
                    <ReactIcon name="FaTimes" size={8} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {addMode === null && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAddMode('upload')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{
              backgroundColor: 'var(--glass-bg-raised)',
              color: 'var(--text-muted)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <ReactIcon name="FaCloudUploadAlt" size={11} /> Upload
          </button>
          <button
            type="button"
            onClick={() => setAddMode('url')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{
              backgroundColor: 'var(--glass-bg-raised)',
              color: 'var(--text-muted)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <ReactIcon name="FaLink" size={10} /> Add URL
          </button>
          {!hasItems && (
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              No images yet
            </span>
          )}
        </div>
      )}

      {addMode === 'upload' && (
        <div className="space-y-2">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
            onClick={() => inputRef.current?.click()}
            className="rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer"
            style={{
              minHeight: 90,
              border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--glass-border-strong)'}`,
              backgroundColor: 'var(--glass-bg-raised)',
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
            <ReactIcon
              name="FaCloudUploadAlt"
              size={18}
              style={{ color: 'var(--text-muted)' }}
            />
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Drop or click — multiple
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

      {addMode === 'url' && (
        <div className="flex items-center gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (urlInput.trim()) {
                  onChange([...images, urlInput.trim()]);
                  setUrlInput('');
                }
                setAddMode(null);
              }
            }}
            placeholder="https://..."
            autoFocus
            className="flex-1 px-3 py-2 rounded-lg text-sm"
            style={{
              backgroundColor: 'var(--input-bg)',
              border: '1px solid var(--input-border)',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          />
          <button
            type="button"
            onClick={() => {
              if (urlInput.trim()) {
                onChange([...images, urlInput.trim()]);
                setUrlInput('');
              }
              setAddMode(null);
            }}
            className="px-3 py-2 rounded-lg text-xs font-semibold"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setUrlInput('');
              setAddMode(null);
            }}
            className="text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

/* ── Multi-input (array of text inputs) ── */
const MultiInputField = ({
  value,
  onChange,
  placeholder,
}: {
  value: unknown;
  onChange: (v: string[]) => void;
  placeholder?: string;
}) => {
  const items: string[] = Array.isArray(value) ? (value as string[]) : [];

  const update = (idx: number, val: string) =>
    onChange(items.map((v, i) => (i === idx ? val : v)));
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const add = () => onChange([...items, '']);

  const inputStyle = {
    backgroundColor: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    color: 'var(--text-primary)',
    outline: 'none',
  };

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => update(idx, e.target.value)}
            placeholder={placeholder ?? `Item ${idx + 1}`}
            className="flex-1 px-3 py-2 rounded-lg text-sm"
            style={inputStyle}
          />
          <button
            type="button"
            onClick={() => remove(idx)}
            className="w-7 h-7 flex items-center justify-center rounded-lg shrink-0"
            style={{
              backgroundColor: 'rgba(239,68,68,0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239,68,68,0.2)',
            }}
          >
            <ReactIcon name="FaTimes" size={10} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
        style={{
          backgroundColor: 'var(--glass-bg-raised)',
          color: 'var(--text-muted)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <ReactIcon name="FaPlus" size={9} /> Add item
      </button>
    </div>
  );
};

/* ── Structured list field — array of objects ── */
const StructuredListField = ({
  value,
  onChange,
  subFields,
}: {
  value: unknown;
  onChange: (v: Record<string, string>[]) => void;
  subFields: SubFieldConfig[];
}) => {
  const rows: Record<string, string>[] = Array.isArray(value)
    ? (value as Record<string, string>[])
    : [];

  const update = (idx: number, key: string, val: string) =>
    onChange(rows.map((row, i) => (i === idx ? { ...row, [key]: val } : row)));

  const remove = (idx: number) => onChange(rows.filter((_, i) => i !== idx));

  const add = () => {
    const blank: Record<string, string> = {};
    subFields.forEach((f) => {
      blank[f.key] =
        f.type === 'radio' && f.options?.length ? f.options[0] : '';
    });
    onChange([...rows, blank]);
  };

  const inputStyle = {
    backgroundColor: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    color: 'var(--text-primary)',
    outline: 'none',
  };

  return (
    <div className="space-y-3">
      {rows.map((row, idx) => (
        <div
          key={idx}
          className="flex flex-wrap gap-2 items-start p-3 rounded-lg"
          style={{
            backgroundColor: 'var(--glass-bg-raised)',
            border: '1px solid var(--glass-border)',
          }}
        >
          {subFields.map((sf) => (
            <div key={sf.key} className="flex-1 min-w-[140px]">
              <label
                className="block text-[10px] font-medium mb-1"
                style={{ color: 'var(--text-muted)' }}
              >
                {sf.label}
              </label>
              {sf.type === 'radio' && sf.options ? (
                <div className="flex flex-wrap gap-2">
                  {sf.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-1 text-xs cursor-pointer"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <input
                        type="radio"
                        name={`sl-${idx}-${sf.key}`}
                        value={opt}
                        checked={row[sf.key] === opt}
                        onChange={() => update(idx, sf.key, opt)}
                        className="accent-[var(--accent)]"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type={sf.type === 'url' ? 'url' : 'text'}
                  value={row[sf.key] ?? ''}
                  onChange={(e) => update(idx, sf.key, e.target.value)}
                  placeholder={sf.placeholder ?? sf.label}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={inputStyle}
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => remove(idx)}
            className="mt-5 w-7 h-7 flex items-center justify-center rounded-lg shrink-0"
            style={{
              backgroundColor: 'rgba(239,68,68,0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239,68,68,0.2)',
            }}
          >
            <ReactIcon name="FaTimes" size={10} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
        style={{
          backgroundColor: 'var(--glass-bg-raised)',
          color: 'var(--text-muted)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <ReactIcon name="FaPlus" size={9} /> Add row
      </button>
    </div>
  );
};

/* ── Sub-records field — inline editor for a FK-related table ── */
type SubRow = Record<string, string | number | boolean | undefined> & {
  id?: number;
  _deleted?: boolean;
};

const SubRecordsField = ({
  parentId,
  config,
  value,
  onChange,
  skipFetch,
}: {
  parentId: number | string | null;
  config: SubRecordConfig;
  value: SubRow[];
  onChange: (rows: SubRow[]) => void;
  skipFetch?: boolean;
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Firestore-backed modules carry subrecords inline (already in `value`);
    // never fetch them from a Supabase child table.
    if (!parentId || loaded || skipFetch) return;
    supabase
      .from(config.table)
      .select('*')
      .eq(config.foreignKey, parentId)
      .then(({ data }) => {
        if (data) onChange(data as SubRow[]);
        setLoaded(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId]);

  const update = (idx: number, key: string, val: string) =>
    onChange(value.map((row, i) => (i === idx ? { ...row, [key]: val } : row)));

  const remove = (idx: number) =>
    onChange(
      value.map((row, i) => (i === idx ? { ...row, _deleted: true } : row))
    );

  const add = () => {
    const blank: SubRow = {};
    config.subFields.forEach((f) => {
      if (f.type === 'radio' && f.options?.length) blank[f.key] = f.options[0];
      else if (f.type === 'covertype') blank[f.key] = 'image';
      else if (f.type === 'socialplatform') blank[f.key] = 'linkedin';
      else blank[f.key] = '';
    });
    onChange([...value, blank]);
  };

  const visible = value.filter((r) => !r._deleted);

  const inputStyle = {
    backgroundColor: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    color: 'var(--text-primary)',
    outline: 'none',
  };

  return (
    <div className="space-y-3">
      {visible.map((row, visIdx) => {
        const realIdx = value.indexOf(row);
        return (
          <div
            key={row.id ?? visIdx}
            className="flex flex-wrap gap-2 items-start p-3 rounded-lg"
            style={{
              backgroundColor: 'var(--glass-bg-raised)',
              border: '1px solid var(--glass-border)',
            }}
          >
            {config.subFields.map((sf) => (
              <div key={sf.key} className="flex-1 min-w-[140px]">
                <label
                  className="block text-[10px] font-medium mb-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {sf.label}
                </label>
                {sf.type === 'covertype' ? (
                  <CoverTypeSelect
                    value={String(row[sf.key] ?? 'image')}
                    onChange={(v) => update(realIdx, sf.key, v)}
                  />
                ) : sf.type === 'socialplatform' ? (
                  <SocialPlatformSelect
                    value={String(row[sf.key] ?? 'linkedin')}
                    onChange={(v) => update(realIdx, sf.key, v)}
                  />
                ) : sf.type === 'radio' && sf.options ? (
                  <div className="flex flex-wrap gap-2">
                    {sf.options.map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-1 text-xs cursor-pointer"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <input
                          type="radio"
                          name={`sr-${realIdx}-${sf.key}`}
                          value={opt}
                          checked={row[sf.key] === opt}
                          onChange={() => update(realIdx, sf.key, opt)}
                          className="accent-[var(--accent)]"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    type={sf.type === 'url' ? 'url' : 'text'}
                    value={String(row[sf.key] ?? '')}
                    onChange={(e) => update(realIdx, sf.key, e.target.value)}
                    placeholder={sf.placeholder ?? sf.label}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={inputStyle}
                  />
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => remove(realIdx)}
              className="mt-5 w-7 h-7 flex items-center justify-center rounded-lg shrink-0"
              style={{
                backgroundColor: 'rgba(239,68,68,0.1)',
                color: '#ef4444',
                border: '1px solid rgba(239,68,68,0.2)',
              }}
            >
              <ReactIcon name="FaTimes" size={10} />
            </button>
          </div>
        );
      })}
      {!parentId && (
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Save the post first — then you can add related records here.
        </p>
      )}
      {parentId && (
        <button
          type="button"
          onClick={add}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
          style={{
            backgroundColor: 'var(--glass-bg-raised)',
            color: 'var(--text-muted)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <ReactIcon name="FaPlus" size={9} /> Add row
        </button>
      )}
    </div>
  );
};

/* ── Static select (options array) ── */
const selectStyle = {
  backgroundColor: 'var(--bg-surface)',
  border: '1px solid var(--input-border)',
  color: 'var(--text-primary)',
  outline: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23aaa'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  paddingRight: '2rem',
};

const StaticSelect = ({
  opts,
  value,
  onChange,
}: {
  opts: string[];
  value: string;
  onChange: (v: unknown) => void;
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-3 py-2.5 rounded-lg text-sm appearance-none cursor-pointer"
    style={selectStyle}
  >
    <option value="">— select —</option>
    {opts.map((o) => (
      <option key={o} value={o}>
        {o}
      </option>
    ))}
  </select>
);

/* ── Relation select (options fetched from Supabase) ── */
const RelationSelect = ({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: unknown;
  onChange: (v: unknown) => void;
}) => {
  const { relation } = field;
  const [opts, setOpts] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    if (!relation) return;
    const vf = relation.valueField ?? 'id';
    supabase
      .from(relation.table)
      .select('*')
      .order(vf)
      .then(({ data }) => {
        if (!data) return;
        setOpts(
          data.map((row) => ({
            value: String(row[vf] ?? ''),
            label: String(row[relation.labelField] ?? row[vf] ?? ''),
          }))
        );
      });
  }, [relation]);

  return (
    <select
      value={String(value ?? '')}
      onChange={(e) => {
        const raw = e.target.value;
        onChange(raw === '' ? null : isNaN(Number(raw)) ? raw : Number(raw));
      }}
      className="w-full px-3 py-2.5 rounded-lg text-sm appearance-none cursor-pointer"
      style={selectStyle}
    >
      <option value="">— select —</option>
      {opts.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};

/* ── Combined cover media field (type dropdown + url/upload) ── */
const CoverMediaField = ({
  urlValue,
  typeValue,
  onChangeMultiple,
  folder,
}: {
  urlValue: unknown;
  typeValue: unknown;
  onChangeMultiple: (changes: Record<string, unknown>) => void;
  folder: string;
}) => {
  const currentType = (typeValue as string) || 'image';
  const isUploadType = currentType === 'image';

  const inputStyle = {
    backgroundColor: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    color: 'var(--text-primary)',
    outline: 'none',
  };

  return (
    <div className="space-y-3">
      {/* Type dropdown */}
      <div className="flex items-center gap-2">
        <label
          className="text-xs font-medium shrink-0"
          style={{ color: 'var(--text-muted)' }}
        >
          Type
        </label>
        <CoverTypeSelect
          value={currentType}
          onChange={(v) =>
            onChangeMultiple({ cover_image_type: v, cover_image: '' })
          }
        />
      </div>

      {/* S3 uploader for image type */}
      {isUploadType && (
        <ImageField
          value={urlValue}
          onChange={(v) => onChangeMultiple({ cover_image: v })}
          folder={folder}
        />
      )}

      {/* URL input for all non-image types */}
      {!isUploadType && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ReactIcon
              name="FaLink"
              size={12}
              style={{ color: 'var(--text-muted)', flexShrink: 0 }}
            />
            <input
              type="url"
              value={String(urlValue ?? '')}
              onChange={(e) =>
                onChangeMultiple({ cover_image: e.target.value })
              }
              placeholder={
                currentType === 'youtube'
                  ? 'https://youtube.com/watch?v=... or youtu.be/...'
                  : currentType === 'drive_video'
                    ? 'https://drive.google.com/file/d/FILE_ID/preview'
                    : currentType === 'drive_image'
                      ? 'https://drive.google.com/uc?id=FILE_ID'
                      : 'https://example.com/video.mp4'
              }
              className="flex-1 px-3 py-2.5 rounded-lg text-sm"
              style={inputStyle}
            />
          </div>
          {/* Live preview */}
          {String(urlValue ?? '') && (
            <div
              className="rounded-xl overflow-hidden"
              style={{
                aspectRatio: '16/9',
                maxHeight: 220,
                backgroundColor: 'var(--glass-bg-raised)',
              }}
            >
              {(() => {
                const url = String(urlValue ?? '');
                const type = detectCoverType(url);
                if (type === 'youtube')
                  return (
                    <iframe
                      src={toYouTubeEmbed(url)}
                      title="preview"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  );
                if (type === 'drive_video')
                  return (
                    <iframe
                      src={url}
                      title="preview"
                      className="w-full h-full"
                      allow="autoplay"
                      allowFullScreen
                    />
                  );
                if (type === 'video')
                  return (
                    <video
                      src={url}
                      controls
                      className="w-full h-full object-contain bg-black"
                    />
                  );
                return (
                  <img
                    src={url}
                    alt="preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Individual field renderer ── */
const Field = ({
  field,
  value,
  onChange,
  onChangeMultiple,
  typeValue,
  folder,
  parentId,
  userId,
  skipSubFetch,
}: {
  field: FieldConfig;
  value: unknown;
  onChange: (v: unknown) => void;
  onChangeMultiple?: (changes: Record<string, unknown>) => void;
  typeValue?: unknown;
  folder: string;
  parentId?: number | string | null;
  userId?: string | null;
  skipSubFetch?: boolean;
}) => {
  const str = String(value ?? '');

  const inputStyle = {
    backgroundColor: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    color: 'var(--text-primary)',
    outline: 'none',
  };

  if (field.type === 'image')
    return (
      <ImageField
        value={value}
        onChange={onChange}
        folder={folder}
        storageBackend={field.storage === 'supabase' ? 'supabase' : 's3'}
        userId={userId}
      />
    );
  if (field.type === 'images')
    return (
      <MultiImageField
        value={value}
        onChange={(v) => onChange(v)}
        folder={folder}
      />
    );
  if (field.type === 'multiinput')
    return (
      <MultiInputField
        value={value}
        onChange={(v) => onChange(v)}
        placeholder={field.placeholder}
      />
    );

  if (field.type === 'structuredlist')
    return (
      <StructuredListField
        value={value}
        onChange={(v) => onChange(v)}
        subFields={field.subFields ?? []}
      />
    );

  if (field.type === 'subrecords' && field.subRecordConfig)
    return (
      <SubRecordsField
        parentId={parentId ?? null}
        config={field.subRecordConfig}
        value={Array.isArray(value) ? (value as SubRow[]) : []}
        onChange={(v) => onChange(v)}
        skipFetch={skipSubFetch}
      />
    );

  if (field.type === 'toggle' || field.type === 'checkbox') {
    const checked =
      value === true || value === 'true' || value === '1' || value === 1;
    if (field.type === 'toggle') {
      return (
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
            {field.label}
          </span>
          <button
            type="button"
            onClick={() => onChange(!checked)}
            className="relative w-11 h-6 rounded-full transition-colors duration-200"
            style={{
              backgroundColor: checked
                ? 'var(--accent)'
                : 'var(--glass-bg-raised)',
            }}
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
    return (
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 rounded accent-[var(--accent)]"
        />
        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
          {field.label}
        </span>
      </label>
    );
  }

  if (field.type === 'radio') {
    const opts = field.options ?? [];
    return (
      <div className="space-y-2">
        {opts.map((opt) => (
          <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="radio"
              name={`radio-${field.key}`}
              value={opt}
              checked={str === opt}
              onChange={() => onChange(opt)}
              className="accent-[var(--accent)]"
            />
            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
              {opt}
            </span>
          </label>
        ))}
        {opts.length === 0 && (
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            No options configured.
          </p>
        )}
      </div>
    );
  }

  if (field.type === 'select') {
    return field.relation ? (
      <RelationSelect field={field} value={value} onChange={onChange} />
    ) : (
      <StaticSelect
        opts={field.options ?? []}
        value={str}
        onChange={onChange}
      />
    );
  }

  if (field.type === 'tags') {
    return (
      <input
        type="text"
        value={str}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder ?? 'tag1, tag2, tag3'}
        className="w-full px-3 py-2.5 rounded-lg text-sm"
        style={inputStyle}
      />
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
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid var(--input-border)' }}
      >
        <ReactQuill
          theme="snow"
          value={str}
          onChange={(html) => onChange(html)}
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'blockquote', 'code-block'],
              ['clean'],
            ],
          }}
          style={{ backgroundColor: '#fff', color: '#111' }}
        />
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

  if (field.type === 'number') {
    return (
      <input
        type="number"
        value={value === '' || value === undefined ? '' : String(value)}
        onChange={(e) =>
          onChange(e.target.value === '' ? 0 : Number(e.target.value))
        }
        placeholder={field.placeholder ?? '0'}
        min={0}
        className="w-full px-3 py-2.5 rounded-lg text-sm"
        style={inputStyle}
      />
    );
  }

  if (field.type === 'covermedia' && onChangeMultiple)
    return (
      <CoverMediaField
        urlValue={value}
        typeValue={typeValue}
        onChangeMultiple={onChangeMultiple}
        folder={folder}
      />
    );

  if (field.type === 'date')
    return (
      <input
        type="date"
        value={str}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg text-sm"
        style={inputStyle}
      />
    );

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
Field.displayName = 'Field';

/* ── Loading skeleton ── */
const FormSkeleton = () => (
  <div className="space-y-5 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="rounded-xl h-12"
        style={{ backgroundColor: 'var(--glass-bg-raised)' }}
      />
    ))}
  </div>
);

/* ── Main CRUD form ── */
const AdminCrudForm = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { module: moduleId = 'hero', id } = useParams();
  const isNew = id === 'new';

  const mod = MODULES.find((m) => m.id === moduleId);
  const tableId = mod?.table;
  // Firestore-backed modules embed subrecords (no Supabase child-table sync).
  const firestoreBacked = isFirestoreModule(tableId ?? moduleId);
  const currentUid = useAppSelector(selectCurrentUid);

  // Handles both integer ids ("3") and UUID ids ("some-uuid-string")
  const parsedId: number | string | null =
    id && id !== 'new' ? (isNaN(Number(id)) ? id : Number(id)) : null;

  /* ── Redux state ── */
  const currentRecord = useAppSelector(selectCurrentRecord(moduleId));
  const recordStatus = useAppSelector(selectCurrentRecordStatus(moduleId));
  const loadError = useAppSelector(selectCurrentRecordError(moduleId));

  /* ── Local UI state ── */
  const [formFields, setFormFields] = useState<FieldConfig[] | null>(null);
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [showDelete, setShowDelete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [resetSending, setResetSending] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // All fields across all tabs (used for value init, save payload, syncSubRecords)
  const allFields = useMemo<FieldConfig[]>(() => {
    if (mod?.tabs?.length) return getModuleFields(mod);
    return formFields ?? [];
  }, [mod, formFields]);

  // Fields visible in the current view (tab-aware)
  const activeFields = useMemo<FieldConfig[]>(() => {
    if (mod?.tabs?.length) return mod.tabs[activeTab]?.fields ?? [];
    return formFields ?? [];
  }, [mod, activeTab, formFields]);

  /* Step 1 — load form field config from static module definition */
  useEffect(() => {
    setFormFields(mod?.fields ?? []);
    setActiveTab(0);
  }, [moduleId, mod]);

  /* Step 2 — fetch existing record via Redux (edit mode only) */
  useEffect(() => {
    if (!isNew && parsedId != null) {
      dispatch(fetchRecord({ moduleId, id: parsedId, tableId }));
    }
    return () => {
      dispatch(clearCurrentRecord(moduleId));
    };
  }, [moduleId, id, isNew, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Step 3 — init form values once config + record are both ready */
  useEffect(() => {
    if (!formFields && !mod?.tabs) return;
    if (!isNew && recordStatus !== 'succeeded') return;
    const data = isNew ? {} : (currentRecord ?? {});
    // Supabase returns all column names lowercased; build a lowercase lookup map
    // so camelCase field keys like 'imageURL' still find 'imageurl' in the record.
    const lowerData = Object.fromEntries(
      Object.entries(data as Record<string, unknown>).map(([k, v]) => [
        k.toLowerCase(),
        v,
      ])
    );
    setValues(
      allFields.reduce<Record<string, unknown>>((acc, f) => {
        const raw = lowerData[f.key.toLowerCase()];
        acc[f.key] =
          raw !== undefined && raw !== null ? raw : defaultForType(f.type);
        if (f.type === 'covermedia') {
          const typeRaw = lowerData['cover_image_type'];
          acc['cover_image_type'] =
            typeRaw !== undefined && typeRaw !== null ? typeRaw : 'image';
        }
        return acc;
      }, {})
    );
  }, [allFields, currentRecord, isNew, recordStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (key: string, val: unknown) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const syncSubRecords = async (parentId: number | string) => {
    const subFields = allFields.filter(
      (f) => f.type === 'subrecords' && f.subRecordConfig
    );
    for (const field of subFields) {
      const cfg = field.subRecordConfig!;
      const rows = (
        Array.isArray(values[field.key]) ? values[field.key] : []
      ) as SubRow[];

      const toDelete = rows
        .filter((r) => r._deleted && r.id)
        .map((r) => r.id as number);
      const toUpsert = rows
        .filter((r) => !r._deleted)
        .map((r) => {
          const { id, _deleted, ...rest } = r; // eslint-disable-line @typescript-eslint/no-unused-vars
          return { ...(id ? { id } : {}), ...rest, [cfg.foreignKey]: parentId };
        });

      if (toDelete.length)
        await supabase.from(cfg.table).delete().in('id', toDelete);
      if (toUpsert.length) await supabase.from(cfg.table).upsert(toUpsert);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    // Strip action fields from the main payload. Subrecords are stripped only
    // for Supabase modules (synced separately); Firestore modules embed them.
    const subRecordKeys = new Set(
      allFields
        .filter(
          (f) =>
            (f.type === 'subrecords' && !firestoreBacked) ||
            f.type === 'resetpassword'
        )
        .map((f) => f.key)
    );
    const mainValues = Object.fromEntries(
      Object.entries(values).filter(([k]) => !subRecordKeys.has(k))
    );

    try {
      let parentId: number | string;
      if (isNew) {
        const result = await dispatch(
          createRecord({ moduleId, data: mainValues, tableId })
        ).unwrap();
        parentId = result.record.id;
      } else {
        await dispatch(
          updateRecord({ moduleId, id: parsedId!, data: mainValues, tableId })
        ).unwrap();
        parentId = parsedId!;
      }
      if (!firestoreBacked) await syncSubRecords(parentId as number | string);

      // If editing the currently logged-in user's own profile, sync auth metadata
      if (moduleId === 'users' && String(parsedId) === currentUid) {
        const patch: { full_name?: string; avatar_url?: string } = {};
        if (mainValues.name) patch.full_name = mainValues.name as string;
        if (mainValues.avatar_url)
          patch.avatar_url = mainValues.avatar_url as string;
        if (Object.keys(patch).length) {
          dispatch(updateCurrentUserProfile(patch));
        }
      }

      navigate(`/admin/${moduleId}`);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Save failed');
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const imageKeys = allFields
      .filter((f) => f.type === 'image' || f.type === 'images')
      .flatMap((f) => {
        const v = values[f.key];
        if (!v) return [];
        return Array.isArray(v) ? (v as string[]) : [String(v)];
      })
      .filter(Boolean);
    await dispatch(
      deleteRecord({ moduleId, id: parsedId!, imageKeys, tableId })
    ).unwrap();
    navigate(`/admin/${moduleId}`);
  };

  if (!mod) return null;
  if (loadError)
    return (
      <div className="p-6 text-sm" style={{ color: '#ef4444' }}>
        Failed to load: {loadError}
      </div>
    );

  const isLoading =
    (formFields === null && !mod?.tabs) ||
    (!isNew && recordStatus === 'loading');

  return (
    <>
      {/* form wraps both header and body so type="submit" in header works */}
      <form onSubmit={handleSave} className="h-full flex flex-col">
        {/* ── Sticky page header ── */}
        <div
          className="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4"
          style={{ borderBottom: '1px solid var(--glass-border)' }}
        >
          <Breadcrumbs
            items={[
              {
                label: mod.label,
                onClick: () => navigate(`/admin/${moduleId}`),
              },
              { label: isNew ? 'New' : `#${id}` },
            ]}
          />

          {/* Right: actions */}
          <div className="flex items-center gap-2 shrink-0">
            {!isNew && (
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowDelete(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium"
                style={{
                  backgroundColor: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  color: '#ef4444',
                }}
              >
                <ReactIcon name="FaTrash" size={12} />
                <span className="hidden sm:inline">Delete</span>
              </motion.button>
            )}
            <button
              type="button"
              onClick={() => navigate(`/admin/${moduleId}`)}
              className="px-3 py-2 rounded-lg text-xs sm:text-sm font-medium"
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
              className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold disabled:opacity-60"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              <ReactIcon name="FaSave" size={12} />
              <span>{saving ? 'Saving…' : 'Save'}</span>
            </motion.button>
          </div>
        </div>

        {/* ── Scrollable form body ── */}
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
          <div className="p-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
              }}
            >
              {/* ── Tab bar (tabbed modules only) ── */}
              {mod.tabs && (
                <div
                  className="flex gap-1 mb-5 p-1 rounded-xl"
                  style={{ backgroundColor: 'var(--glass-bg-raised)' }}
                >
                  {mod.tabs.map((tab, i) => (
                    <button
                      key={tab.label}
                      type="button"
                      onClick={() => setActiveTab(i)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold flex-1 justify-center transition-colors"
                      style={
                        activeTab === i
                          ? { backgroundColor: 'var(--accent)', color: '#fff' }
                          : { color: 'var(--text-muted)' }
                      }
                    >
                      {tab.icon && <ReactIcon name={tab.icon} size={11} />}
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}

              {isLoading ? (
                <FormSkeleton />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {activeFields.map((field) => (
                    <div
                      key={field.key}
                      className={
                        field.span === 'full' ||
                        field.type === 'toggle' ||
                        field.type === 'checkbox' ||
                        field.type === 'resetpassword'
                          ? 'sm:col-span-2'
                          : ''
                      }
                    >
                      {field.type === 'resetpassword' ? (
                        /* ── Password reset action ── */
                        <div
                          className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl"
                          style={{
                            backgroundColor: 'var(--glass-bg-raised)',
                            border: '1px solid var(--glass-border)',
                          }}
                        >
                          <div>
                            <p
                              className="text-xs font-semibold"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {field.label}
                            </p>
                            <p
                              className="text-xs mt-0.5"
                              style={{ color: 'var(--text-muted)' }}
                            >
                              {resetSent
                                ? `Reset link sent to ${String(values.email ?? '')}`
                                : `Send a reset link to ${String(values.email ?? '')}`}
                            </p>
                          </div>
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            disabled={
                              resetSending ||
                              resetSent ||
                              !values.email ||
                              isNew
                            }
                            onClick={async () => {
                              const email = String(values.email ?? '');
                              if (!email) return;
                              setResetSending(true);
                              try {
                                await dispatch(
                                  sendPasswordReset(email)
                                ).unwrap();
                                setResetSent(true);
                              } finally {
                                setResetSending(false);
                              }
                            }}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold shrink-0"
                            style={{
                              backgroundColor: resetSent
                                ? 'transparent'
                                : 'var(--accent)',
                              color: resetSent ? 'var(--text-muted)' : '#fff',
                              border: resetSent
                                ? '1px solid var(--glass-border)'
                                : 'none',
                              opacity: resetSending || isNew ? 0.5 : 1,
                            }}
                          >
                            <ReactIcon
                              name={resetSent ? 'FaCheck' : 'FaKey'}
                              size={11}
                            />
                            {resetSent
                              ? 'Sent'
                              : resetSending
                                ? 'Sending…'
                                : 'Send reset email'}
                          </motion.button>
                        </div>
                      ) : (
                        <>
                          {field.type !== 'toggle' &&
                            field.type !== 'checkbox' && (
                              <label
                                className="block text-xs font-semibold mb-1.5"
                                style={{ color: 'var(--text-muted)' }}
                              >
                                {field.label}
                                {field.required && (
                                  <span
                                    className="ml-1"
                                    style={{ color: 'var(--accent)' }}
                                  >
                                    *
                                  </span>
                                )}
                              </label>
                            )}
                          <Field
                            field={field}
                            value={values[field.key]}
                            folder={moduleFolder(
                              moduleId,
                              String(values.slug ?? '')
                            )}
                            onChange={(val) => handleChange(field.key, val)}
                            onChangeMultiple={(changes) =>
                              setValues((prev) => ({ ...prev, ...changes }))
                            }
                            typeValue={
                              field.type === 'covermedia'
                                ? values['cover_image_type']
                                : undefined
                            }
                            parentId={isNew ? null : parsedId}
                            userId={String(parsedId ?? currentUid ?? '')}
                            skipSubFetch={firestoreBacked}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {saveError && (
                <p className="mt-4 text-sm" style={{ color: '#ef4444' }}>
                  {saveError}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </form>

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
