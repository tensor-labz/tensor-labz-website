import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { FaPlus, FaImage } from 'react-icons/fa';
import { MODULES } from '../config/modules';
import { supabase } from '../../../lib/supabase';

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.05, ease: 'easeOut' },
  }),
};

const AdminDataTable = memo(() => {
  const navigate = useNavigate();
  const { module: moduleId = 'hero' } = useParams();

  const mod = MODULES.find((m) => m.id === moduleId);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    supabase
      .from(moduleId)
      .select('*')
      .order('id')
      .then(({ data, error }) => {
        if (!error && data) setRows(data as Record<string, unknown>[]);
      })
      .finally(() => setLoading(false));
  }, [moduleId]);

  if (!mod) {
    return (
      <div className="flex items-center justify-center h-64">
        <p style={{ color: 'var(--text-muted)' }}>Module not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}
          >
            {mod.label}
          </h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {loading ? 'Loading…' : `${rows.length} ${rows.length === 1 ? 'record' : 'records'}`}
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate(`/admin/${moduleId}/new`)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          <FaPlus size={12} />
          New
        </motion.button>
      </div>

      {/* Table card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        {/* Column headers */}
        <div
          className="grid grid-cols-[64px_1fr_1fr] gap-4 px-5 py-3 text-xs font-semibold tracking-widest uppercase"
          style={{
            color: 'var(--text-muted)',
            borderBottom: '1px solid var(--glass-border)',
            backgroundColor: 'var(--glass-bg-subtle)',
          }}
        >
          <span>Image</span>
          <span>Title</span>
          <span className="hidden sm:block">Description</span>
        </div>

        {/* Rows */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading…</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <FaImage size={32} style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              No records yet.{' '}
              <button
                className="underline"
                style={{ color: 'var(--accent)' }}
                onClick={() => navigate(`/admin/${moduleId}/new`)}
              >
                Create one
              </button>
            </p>
          </div>
        ) : (
          rows.map((row, i) => {
            const imgSrc = mod.imageField ? String(row[mod.imageField] ?? '') : '';
            const title = String(row[mod.titleField] ?? '—');
            const desc = mod.descriptionField ? String(row[mod.descriptionField] ?? '') : '';
            const id = String(row.id ?? i);

            return (
              <motion.div
                key={id}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-[64px_1fr_1fr] gap-4 px-5 py-4 items-center cursor-pointer transition-colors group"
                style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--glass-border-subtle)' : 'none' }}
                onClick={() => navigate(`/admin/${moduleId}/${id}`)}
                whileHover={{ backgroundColor: 'var(--glass-bg-hover)' }}
              >
                {/* Col 1 — Image */}
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: 'var(--glass-bg-raised)' }}>
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={title}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <FaImage size={18} style={{ color: 'var(--text-muted)', opacity: 0.4 }} />
                  )}
                </div>

                {/* Col 2 — Title */}
                <div className="min-w-0">
                  <p
                    className="font-semibold text-sm truncate group-hover:underline"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {title}
                  </p>
                </div>

                {/* Col 3 — Description */}
                <div className="min-w-0 hidden sm:block">
                  <p className="text-sm truncate" style={{ color: 'var(--text-muted)' }}>
                    {desc || '—'}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
});

AdminDataTable.displayName = 'AdminDataTable';
export default AdminDataTable;
