import { memo, useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { FaPlus, FaImage } from 'react-icons/fa';
import { FiSearch, FiX } from 'react-icons/fi';
import { HiArrowsUpDown } from 'react-icons/hi2';
import { MODULES } from '../config/modules';
import { supabase } from '../../../lib/supabase';

type SortKey = 'id-asc' | 'id-desc' | 'title-asc' | 'title-desc';

const SORT_LABELS: Record<SortKey, string> = {
  'id-asc':    'Oldest first',
  'id-desc':   'Newest first',
  'title-asc': 'Title A → Z',
  'title-desc':'Title Z → A',
};

const rowVariants = {
  hidden:  { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.25, delay: i * 0.04, ease: 'easeOut' },
  }),
  exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
};

const AdminDataTable = memo(() => {
  const navigate   = useNavigate();
  const { module: moduleId = 'hero' } = useParams();

  const mod = MODULES.find((m) => m.id === moduleId);

  const [rows,    setRows]    = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [sort,    setSort]    = useState<SortKey>('id-asc');

  /* ── fetch ── */
  useEffect(() => {
    setLoading(true);
    setSearch('');
    supabase
      .from(moduleId)
      .select('*')
      .order('id')
      .then(({ data, error }) => {
        if (!error && data) setRows(data as Record<string, unknown>[]);
      })
      .finally(() => setLoading(false));
  }, [moduleId]);

  /* ── filter + sort (client-side) ── */
  const filtered = useMemo(() => {
    if (!mod) return [];
    let result = [...rows];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((row) => {
        const title = String(row[mod.titleField] ?? '').toLowerCase();
        const desc  = mod.descriptionField
          ? String(row[mod.descriptionField] ?? '').toLowerCase()
          : '';
        return title.includes(q) || desc.includes(q);
      });
    }

    result.sort((a, b) => {
      if (sort === 'id-asc')    return Number(a.id) - Number(b.id);
      if (sort === 'id-desc')   return Number(b.id) - Number(a.id);
      const ta = String(a[mod.titleField] ?? '');
      const tb = String(b[mod.titleField] ?? '');
      return sort === 'title-asc' ? ta.localeCompare(tb) : tb.localeCompare(ta);
    });

    return result;
  }, [rows, search, sort, mod]);

  if (!mod) return (
    <div className="flex items-center justify-center h-64">
      <p style={{ color: 'var(--text-muted)' }}>Module not found.</p>
    </div>
  );

  const countLabel = loading
    ? 'Loading…'
    : search.trim()
      ? `${filtered.length} of ${rows.length} records`
      : `${rows.length} ${rows.length === 1 ? 'record' : 'records'}`;

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold"
            style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}
          >
            {mod.label}
          </h2>
          <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {countLabel}
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate(`/admin/${moduleId}/new`)}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          <FaPlus size={11} />
          <span className="hidden xs:inline">New</span>
          <span className="xs:hidden">New</span>
        </motion.button>
      </div>

      {/* ── Toolbar: search + sort ── */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">

        {/* Search */}
        <div className="relative flex-1">
          <FiSearch
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${mod.label.toLowerCase()}…`}
            className="w-full pl-9 pr-9 py-2 rounded-lg text-sm outline-none"
            style={{
              backgroundColor: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            >
              <FiX size={13} />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative flex items-center gap-2 shrink-0">
          <HiArrowsUpDown size={14} style={{ color: 'var(--text-muted)' }} className="shrink-0" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="text-sm py-2 pl-2 pr-7 rounded-lg outline-none appearance-none cursor-pointer"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--glass-border)',
              color: '#111',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23888'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 8px center',
            }}
          >
            {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
              <option key={k} value={k}>{SORT_LABELS[k]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Table card ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
      >
        {/* Column headers */}
        <div
          className="grid gap-3 px-4 sm:px-5 py-3 text-xs font-semibold tracking-widest uppercase"
          style={{
            gridTemplateColumns: mod.imageField
              ? '48px 1fr'
              : '1fr',
            color: 'var(--text-muted)',
            borderBottom: '1px solid var(--glass-border)',
            backgroundColor: 'var(--glass-bg-subtle)',
          }}
        >
          {mod.imageField && <span>Image</span>}
          <div className={`grid gap-3 ${mod.descriptionField ? 'grid-cols-[1fr_1fr]' : ''}`}>
            <span>{mod.titleField === 'social_media' ? 'Platform' : 'Title'}</span>
            {mod.descriptionField && (
              <span className="hidden sm:block">Description</span>
            )}
          </div>
        </div>

        {/* Body */}
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            {search.trim() ? (
              <>
                <FiSearch size={28} style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  No results for <strong>"{search}"</strong>
                </p>
                <button
                  className="text-xs underline"
                  style={{ color: 'var(--accent)' }}
                  onClick={() => setSearch('')}
                >
                  Clear search
                </button>
              </>
            ) : (
              <>
                <FaImage size={28} style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
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
              </>
            )}
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {filtered.map((row, i) => {
              const imgSrc = mod.imageField ? String(row[mod.imageField] ?? '') : '';
              const title  = String(row[mod.titleField] ?? '—');
              const desc   = mod.descriptionField
                ? String(row[mod.descriptionField] ?? '')
                : '';
              const id = String(row.id ?? i);

              return (
                <motion.div
                  key={id}
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="grid gap-3 px-4 sm:px-5 py-3 sm:py-4 items-center cursor-pointer group"
                  style={{
                    gridTemplateColumns: mod.imageField ? '48px 1fr' : '1fr',
                    borderBottom: i < filtered.length - 1
                      ? '1px solid var(--glass-border-subtle)'
                      : 'none',
                  }}
                  onClick={() => navigate(`/admin/${moduleId}/${id}`)}
                  whileHover={{ backgroundColor: 'var(--glass-bg-hover)' }}
                >
                  {/* Image */}
                  {mod.imageField && (
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: 'var(--glass-bg-raised)' }}
                    >
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <FaImage size={15} style={{ color: 'var(--text-muted)', opacity: 0.4 }} />
                      )}
                    </div>
                  )}

                  {/* Title + description */}
                  <div className={`min-w-0 grid gap-3 ${mod.descriptionField ? 'grid-cols-1 sm:grid-cols-[1fr_1fr]' : ''}`}>
                    <div className="min-w-0">
                      <p
                        className="font-semibold text-sm truncate group-hover:underline"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {title}
                      </p>
                      {/* Mobile: show desc below title */}
                      {desc && mod.descriptionField && (
                        <p className="text-xs truncate mt-0.5 sm:hidden" style={{ color: 'var(--text-muted)' }}>
                          {desc}
                        </p>
                      )}
                    </div>
                    {mod.descriptionField && (
                      <div className="min-w-0 hidden sm:block">
                        <p className="text-sm truncate" style={{ color: 'var(--text-muted)' }}>
                          {desc || '—'}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
});

AdminDataTable.displayName = 'AdminDataTable';
export default AdminDataTable;
