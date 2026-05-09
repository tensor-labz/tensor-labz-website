import { memo, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable, {
  createTheme,
  type TableColumn,
} from 'react-data-table-component';
import { FaPlus } from 'react-icons/fa';
import { FiSearch, FiX } from 'react-icons/fi';
import { MODULES } from '../config/modules';
import { supabase } from '../../../lib/supabase';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchRecords,
  selectModuleRecords,
  selectModuleStatus,
  type AdminRecord,
} from '../../../store/adminSlice';
import type { TableColumnConfig } from '../../../shared/types/tableConfig';

/* ── Theme — uses CSS vars so it follows light/dark toggle ── */
createTheme(
  'adminTheme',
  {
    text: { primary: 'var(--text-primary)', secondary: 'var(--text-muted)' },
    background: { default: 'transparent' },
    divider: { default: 'var(--glass-border)' },
    highlightOnHover: {
      default: 'var(--glass-bg-raised)',
      text: 'var(--text-primary)',
    },
    sortFocus: { default: 'var(--accent)' },
  },
  'dark'
);

const DEFAULT_PAGE_SIZE = 20;

/* ── Custom styles applied on top of the theme ── */
const customStyles = {
  headRow: {
    style: {
      backgroundColor: 'var(--glass-bg-raised)',
      borderBottom: '1px solid var(--glass-border)',
      minHeight: '44px',
    },
  },
  headCells: {
    style: {
      fontSize: '0.7rem',
      fontWeight: 700,
      color: 'var(--text-muted)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.06em',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
  cells: {
    style: {
      fontSize: '0.875rem',
      color: 'var(--text-primary)',
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
  rows: {
    style: {
      borderBottom: '1px solid var(--glass-border)',
      cursor: 'pointer',
      transition: 'background-color 0.15s',
    },
  },
  pagination: {
    style: {
      backgroundColor: 'transparent',
      borderTop: '1px solid var(--glass-border)',
      color: 'var(--text-muted)',
      fontSize: '0.8rem',
    },
    pageButtonsStyle: {
      color: 'var(--text-muted)',
      fill: 'var(--text-muted)',
      '&:hover:not(:disabled)': { backgroundColor: 'var(--glass-bg-raised)' },
      '&:focus': { outline: 'none' },
    },
  },
};

/* ── Field helpers ──────────────────────────────────────────────────────
 * Postgres stores column names in lowercase regardless of how they were
 * defined (e.g. "imageURL" becomes "imageurl").  Always try the exact key
 * first so we don't hide intentional casing, then fall back to lowercase.
 * ── */
const rowVal = (row: AdminRecord, key: string): unknown =>
  row[key] !== undefined
    ? row[key]
    : row[key.toLowerCase()];

/** Resolve any image-field value to a displayable URL string.
 *  Handles: full URL string · relative S3 key · JSON array (takes first). */
const resolveImg = (val: unknown): string => {
  if (!val) return '';
  const src = Array.isArray(val) ? String(val[0] ?? '') : String(val);
  if (!src) return '';
  if (src.startsWith('http')) return src;
  // relative S3 key — prepend CDN base if configured
  const cdn = import.meta.env.VITE_CDN_URL as string | undefined;
  return cdn ? `${cdn}/${src}` : src;
};

/* ── Image thumbnail cell ── */
const ImageCell = ({ src }: { src: string }) =>
  src ? (
    <img
      src={src}
      alt=""
      className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = 'none';
      }}
    />
  ) : (
    <div
      className="w-10 h-10 rounded-lg flex-shrink-0"
      style={{ backgroundColor: 'var(--glass-bg-raised)' }}
    />
  );


/* ── Truncated text cell for long descriptions ── */
const TextCell = ({ value }: { value: string }) => (
  <span
    className="text-xs"
    style={{
      color: 'var(--text-muted)',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    }}
  >
    {value}
  </span>
);

/* ── Loading skeleton ── */
const TableSkeleton = () => (
  <div className="animate-pulse space-y-px">
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="h-14 w-full"
        style={{ backgroundColor: 'var(--glass-bg-raised)', opacity: 1 - i * 0.12 }}
      />
    ))}
  </div>
);

/* ── CrudTable ── */
interface CrudTableProps {
  moduleId: string;
}

const CrudTable = memo(({ moduleId }: CrudTableProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const mod = MODULES.find((m) => m.id === moduleId);
  const rows = useAppSelector(selectModuleRecords(moduleId));
  const status = useAppSelector(selectModuleStatus(moduleId));
  const loading = status === 'idle' || status === 'loading';

  const [search, setSearch] = useState('');
  const [colConfig, setColConfig] = useState<TableColumnConfig[] | null>(null);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  /* Fetch rows via Redux */
  useEffect(() => {
    setSearch('');
    if (status === 'idle') dispatch(fetchRecords(moduleId));
  }, [moduleId, status, dispatch]);

  /* Fetch column + pagination config from Supabase */
  useEffect(() => {
    setColConfig(null);
    supabase
      .from('table_config')
      .select('*')
      .eq('module_id', moduleId)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.columns) setColConfig(data.columns as TableColumnConfig[]);
        if (data?.page_size) setPageSize(data.page_size as number);
      });
  }, [moduleId]);

  /* Keys of fields typed 'image' or 'images' in the static module config.
   * Used to render image thumbnails even for non-primary image columns. */
  const imageTypeKeys = useMemo(() => {
    if (!mod) return new Set<string>();
    return new Set(
      mod.fields
        .filter((f) => f.type === 'image' || f.type === 'images')
        .map((f) => f.key.toLowerCase())
    );
  }, [mod]);

  /* Build DataTable column definitions */
  const columns = useMemo<TableColumn<AdminRecord>[]>(() => {
    if (!mod) return [];
    const cols: TableColumn<AdminRecord>[] = [];

    /* Primary image — always first, uses rowVal for case-insensitive lookup */
    if (mod.imageField) {
      cols.push({
        id: '__image',
        name: '',
        width: '68px',
        sortable: false,
        cell: (row) => (
          <ImageCell src={resolveImg(rowVal(row, mod.imageField!))} />
        ),
      });
    }

    /* imageField key (lowercase) — skip it in content columns to avoid duplicate */
    const primaryImgKey = mod.imageField?.toLowerCase() ?? '';

    if (colConfig) {
      /* Supabase-driven columns */
      [...colConfig]
        .filter((c) => c.visible !== false)
        .filter((c) => c.field.toLowerCase() !== primaryImgKey) // skip primary image
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .forEach((c) => {
          const isImg = imageTypeKeys.has(c.field.toLowerCase());
          const isDesc = c.field.toLowerCase() === mod.descriptionField?.toLowerCase();

          if (isImg) {
            /* Extra image field — render thumbnail */
            cols.push({
              id: c.field,
              name: c.title,
              width: c.width ?? '68px',
              sortable: false,
              cell: (row) => (
                <ImageCell src={resolveImg(rowVal(row, c.field))} />
              ),
            });
          } else {
            cols.push({
              id: c.field,
              name: c.title,
              selector: (row) => String(rowVal(row, c.field) ?? ''),
              sortable: c.sortable ?? true,
              wrap: true,
              ...(c.width ? { width: c.width } : { grow: isDesc ? 2 : 1 }),
              ...(c.align === 'center' && { center: true }),
              ...(c.align === 'right' && { right: true }),
              ...(isDesc && {
                cell: (row) => (
                  <TextCell value={String(rowVal(row, c.field) ?? '')} />
                ),
              }),
            });
          }
        });
    } else {
      /* Static fallback — title + tableColumns + description */
      cols.push({
        id: mod.titleField,
        name: 'Title',
        selector: (row) => String(rowVal(row, mod.titleField) ?? ''),
        sortable: true,
        grow: 1,
        wrap: true,
      });

      /* Extra columns declared in ModuleConfig.tableColumns */
      (mod.tableColumns ?? []).forEach((key) => {
        const fieldDef = mod.fields.find((f) => f.key === key);
        cols.push({
          id: key,
          name: fieldDef?.label ?? key,
          selector: (row) => String(rowVal(row, key) ?? ''),
          sortable: true,
          wrap: true,
          grow: 1,
        });
      });

      if (mod.descriptionField) {
        cols.push({
          id: mod.descriptionField,
          name: 'Description',
          selector: (row) => String(rowVal(row, mod.descriptionField!) ?? ''),
          sortable: false,
          grow: 2,
          cell: (row) => (
            <TextCell value={String(rowVal(row, mod.descriptionField!) ?? '')} />
          ),
        });
      }
    }

    return cols;
  }, [mod, colConfig, moduleId, imageTypeKeys]);

  /* Default sort: first sortable non-image column */
  const defaultSortField = useMemo(() => {
    const sortable = columns.find(
      (c) => c.id !== '__image' && c.id !== '__edit' && c.sortable !== false
    );
    return sortable?.id as string | undefined;
  }, [columns]);

  /* Client-side search across all string-valued fields */
  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some((v) => String(v ?? '').toLowerCase().includes(q))
    );
  }, [rows, search]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2
            className="text-xl font-bold"
            style={{
              color: 'var(--text-primary)',
              fontFamily: '"Syne", sans-serif',
            }}
          >
            {mod?.label ?? moduleId}
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {loading ? '—' : `${filtered.length} record${filtered.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <button
          onClick={() => navigate(`/admin/${moduleId}/new`)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          <FaPlus size={11} /> Add New
        </button>
      </div>

      {/* Search bar */}
      <div
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl mb-4"
        style={{
          backgroundColor: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          maxWidth: 380,
        }}
      >
        <FiSearch
          size={14}
          style={{ color: 'var(--text-muted)', flexShrink: 0 }}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${mod?.label ?? moduleId}…`}
          className="flex-1 text-sm bg-transparent outline-none"
          style={{ color: 'var(--text-primary)' }}
        />
        {search && (
          <button onClick={() => setSearch('')} className="flex-shrink-0">
            <FiX size={13} style={{ color: 'var(--text-muted)' }} />
          </button>
        )}
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          border: '1px solid var(--glass-border)',
          backgroundColor: 'var(--glass-bg)',
        }}
      >
        {loading ? (
          <TableSkeleton />
        ) : (
          <DataTable<AdminRecord>
            columns={columns}
            data={filtered}
            theme="adminTheme"
            customStyles={customStyles}
            pagination
            paginationPerPage={pageSize}
            paginationRowsPerPageOptions={[10, 20, 50, 100]}
            defaultSortFieldId={defaultSortField}
            defaultSortAsc
            highlightOnHover
            pointerOnHover
            onRowClicked={(row) => navigate(`/admin/${moduleId}/${row.id}`)}
            noDataComponent={
              <div
                className="py-16 text-sm text-center w-full"
                style={{ color: 'var(--text-muted)' }}
              >
                {search ? `No results for "${search}"` : 'No records yet.'}
              </div>
            }
          />
        )}
      </div>
    </div>
  );
});

CrudTable.displayName = 'CrudTable';
export default CrudTable;
