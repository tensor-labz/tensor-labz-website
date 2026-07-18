import React, { memo, useEffect, useState, useMemo } from 'react';
import { StyleSheetManager } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DataTable, {
  createTheme,
  type TableColumn,
} from 'react-data-table-component';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import { MODULES, getModuleFields } from '../config/modules';
import { getConfig } from '../../../services/firebase/configRepo';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchRecords,
  fetchRelationOptions,
  selectModuleRecords,
  selectModuleStatus,
  selectAllRelationOptions,
  type AdminRecord,
} from '../../../store/adminSlice';
import type { TableColumnConfig } from '../../../shared/types/tableConfig';
import { useDevice } from '../../../shared/hooks/useDevice';

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

/* Prevent react-data-table-component's styled-components from forwarding
 * non-HTML props (grow, center, right, wrap) to the DOM */
const DTC_INTERNAL_PROPS = new Set([
  'grow',
  'center',
  'right',
  'wrap',
  'dense',
  'pointer',
]);
const shouldForwardDtcProp = (prop: string) => !DTC_INTERNAL_PROPS.has(prop);

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
      fontSize: '0.75rem',
      minHeight: '40px',
      paddingTop: '0',
      paddingBottom: '0',
    },
    pageButtonsStyle: {
      height: '28px',
      width: '28px',
      padding: '0',
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
  row[key] !== undefined ? row[key] : row[key.toLowerCase()];

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
      className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = 'none';
      }}
    />
  ) : (
    <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-glass-raised" />
  );

/* ── Truncated text cell for long descriptions ── */
const TextCell = ({ value }: { value: string }) => (
  <span className="line-clamp-2 text-xs text-muted">{value}</span>
);

/* ── Loading skeleton ── */
const TableSkeleton = () => (
  <div className="animate-pulse space-y-px">
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="h-14 w-full bg-glass-raised"
        style={{ opacity: 1 - i * 0.12 }}
      />
    ))}
  </div>
);

/* ── Mobile card list — used on xs screens instead of DataTable ── */
const MobileCardList = ({
  rows,
  moduleId,
  loading,
  search,
}: {
  rows: AdminRecord[];
  moduleId: string;
  loading: boolean;
  search: string;
}) => {
  const navigate = useNavigate();
  const mod = MODULES.find((m) => m.id === moduleId);

  if (loading) return <TableSkeleton />;

  if (!rows.length) {
    return (
      <div className="py-14 text-center text-sm text-muted">
        {search ? `No results for "${search}"` : 'No records yet.'}
      </div>
    );
  }

  return (
    <div>
      {rows.map((row, i) => {
        const title = String(rowVal(row, mod?.titleField ?? 'id') ?? '');
        const desc = mod?.descriptionField
          ? String(rowVal(row, mod.descriptionField) ?? '')
          : '';
        const imgSrc = mod?.imageField
          ? resolveImg(rowVal(row, mod.imageField))
          : '';

        return (
          <div
            key={row.id as number}
            onClick={() => navigate(`/admin/${moduleId}/${row.id}`)}
            className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors ${i > 0 ? 'border-t border-glass-rim' : ''}`}
          >
            {imgSrc && (
              <img
                src={imgSrc}
                alt=""
                className="h-10 w-10 shrink-0 rounded-lg object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-fg">
                {title || `#${row.id}`}
              </p>
              {desc && (
                <p className="mt-0.5 truncate text-xs text-muted">{desc}</p>
              )}
            </div>
            <ReactIcon
              name="FiChevronRight"
              size={15}
              className="shrink-0 text-muted"
            />
          </div>
        );
      })}
    </div>
  );
};

/* ── CrudTable ── */
interface CrudTableProps {
  moduleId: string;
}

const CrudTable = memo(({ moduleId }: CrudTableProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const device = useDevice();
  const isMobile = device === 'xs';

  const mod = MODULES.find((m) => m.id === moduleId);

  /* Memoize selector instances — prevents a new createSelector from being
   * created on every render, which triggers the "different result" warning */
  const selectRows = useMemo(() => selectModuleRecords(moduleId), [moduleId]);
  const selectStatus = useMemo(() => selectModuleStatus(moduleId), [moduleId]);
  const rows = useAppSelector(selectRows);
  const status = useAppSelector(selectStatus);
  const loading = status === 'idle' || status === 'loading';

  const [search, setSearch] = useState('');
  const [colConfig, setColConfig] = useState<TableColumnConfig[] | null>(null);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // All relation options from Redux store (keyed by table name)
  const allRelationOptions = useAppSelector(selectAllRelationOptions);

  // Maps fieldKey → { idString → displayLabel } — derived from Redux store
  const relationMaps = useMemo<Record<string, Record<string, string>>>(() => {
    if (!mod) return {};
    const maps: Record<string, Record<string, string>> = {};
    getModuleFields(mod)
      .filter((f) => f.type === 'select' && f.relation)
      .forEach((f) => {
        const rel = f.relation!;
        const vf = rel.valueField ?? 'id';
        const rows = allRelationOptions[rel.table];
        if (!rows) return;
        const map: Record<string, string> = {};
        rows.forEach((row) => {
          map[String(row[vf] ?? '')] = String(
            row[rel.labelField] ?? row[vf] ?? ''
          );
        });
        maps[f.key] = map;
      });
    return maps;
  }, [mod, allRelationOptions]);

  /* Fetch rows via Redux */
  useEffect(() => {
    setSearch('');
    if (status === 'idle')
      dispatch(fetchRecords({ moduleId, tableId: mod?.table }));
  }, [moduleId, status, dispatch]);

  /* Dispatch fetchRelationOptions for any select+relation fields */
  useEffect(() => {
    if (!mod) return;
    getModuleFields(mod)
      .filter((f) => f.type === 'select' && f.relation)
      .forEach((f) => {
        const rel = f.relation!;
        dispatch(
          fetchRelationOptions({
            table: rel.table,
            labelField: rel.labelField,
            valueField: rel.valueField,
          })
        );
      });
  }, [moduleId, mod, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Fetch column + pagination config from Firestore */
  useEffect(() => {
    setColConfig(null);
    getConfig<{ columns?: TableColumnConfig[]; page_size?: number }>(
      'table_config',
      moduleId
    ).then((data) => {
      if (data?.columns) setColConfig(data.columns);
      if (data?.page_size) setPageSize(data.page_size);
    });
  }, [moduleId]);

  /* Keys of fields typed 'image' or 'images' in the static module config.
   * Used to render image thumbnails even for non-primary image columns. */
  const imageTypeKeys = useMemo(() => {
    if (!mod) return new Set<string>();
    return new Set(
      getModuleFields(mod)
        .filter((f) => f.type === 'image' || f.type === 'images')
        .map((f) => f.key.toLowerCase())
    );
  }, [mod]);

  /* Resolve a stored value via a relation map (if available) */
  const resolveRelation = (
    relMap: Record<string, string> | undefined,
    val: unknown
  ): string => {
    const raw = String(val ?? '');
    return relMap ? (relMap[raw] ?? raw) : raw;
  };

  /* Resolve a link template by replacing ${fieldName} tokens with row values */
  const resolveLink = (template: string, row: AdminRecord): string =>
    template.replace(/\$\{(\w+)\}/g, (_, key) =>
      String(rowVal(row, key) ?? '')
    );

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
          const isDesc =
            c.field.toLowerCase() === mod.descriptionField?.toLowerCase();
          const relMap = relationMaps[c.field];
          const fieldDef = getModuleFields(mod).find((f) => f.key === c.field);
          const isUrlField = c.type === 'url' || fieldDef?.type === 'url';

          if (isUrlField) {
            cols.push({
              id: c.field,
              name: c.title,
              width: c.width ?? '56px',
              sortable: false,
              center: true,
              cell: (row) => {
                const url = String(rowVal(row, c.field) ?? '');
                if (!url) return null;
                return (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-glass-rim bg-glass-raised text-fg transition-colors"
                  >
                    <ReactIcon name="FiExternalLink" size={14} />
                  </a>
                );
              },
            });
          } else if (isImg) {
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
            let cellRenderer:
              ((row: AdminRecord) => React.ReactNode) | undefined;
            if (c.link) {
              cellRenderer = (row) => {
                const label = resolveRelation(relMap, rowVal(row, c.field));
                const href = resolveLink(c.link!, row);
                if (!label) return null;
                return (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(href);
                    }}
                    style={{
                      color: 'inherit',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      font: 'inherit',
                      textAlign: 'left',
                    }}
                  >
                    {label}
                  </button>
                );
              };
            } else if (isDesc) {
              cellRenderer = (row) => (
                <TextCell
                  value={resolveRelation(relMap, rowVal(row, c.field))}
                />
              );
            }
            cols.push({
              id: c.field,
              name: c.title,
              selector: (row) => resolveRelation(relMap, rowVal(row, c.field)),
              sortable: c.sortable ?? true,
              wrap: true,
              ...(c.width ? { width: c.width } : { grow: isDesc ? 2 : 1 }),
              ...(c.align === 'center' && { center: true }),
              ...(c.align === 'right' && { right: true }),
              ...(cellRenderer && { cell: cellRenderer }),
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
        const fieldDef = getModuleFields(mod).find((f) => f.key === key);
        const relMap = relationMaps[key];
        const rel = fieldDef?.relation;
        const isUrl = fieldDef?.type === 'url';

        if (isUrl) {
          cols.push({
            id: key,
            name: fieldDef?.label ?? key,
            width: '56px',
            sortable: false,
            center: true,
            cell: (row) => {
              const url = String(rowVal(row, key) ?? '');
              if (!url) return null;
              return (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-glass-rim bg-glass-raised text-fg transition-colors"
                >
                  <ReactIcon name="FiExternalLink" size={14} />
                </a>
              );
            },
          });
        } else {
          const col: TableColumn<AdminRecord> = {
            id: key,
            name: fieldDef?.label ?? key,
            selector: (row) => resolveRelation(relMap, rowVal(row, key)),
            sortable: true,
            wrap: true,
            grow: 1,
          };
          if (rel) {
            col.cell = (row) => {
              const rawId = String(rowVal(row, key) ?? '');
              const label = relMap ? (relMap[rawId] ?? rawId) : rawId;
              if (!rawId) return null;
              return (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/${rel.table}/${rawId}`);
                  }}
                  style={{
                    color: 'inherit',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    font: 'inherit',
                    textAlign: 'left',
                  }}
                >
                  {label}
                </button>
              );
            };
          }
          cols.push(col);
        }
      });

      if (mod.descriptionField) {
        cols.push({
          id: mod.descriptionField,
          name: 'Description',
          selector: (row) => String(rowVal(row, mod.descriptionField!) ?? ''),
          sortable: false,
          grow: 2,
          cell: (row) => (
            <TextCell
              value={String(rowVal(row, mod.descriptionField!) ?? '')}
            />
          ),
        });
      }
    }

    return cols;
  }, [mod, colConfig, moduleId, imageTypeKeys, relationMaps]);

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
      Object.values(row).some((v) =>
        String(v ?? '')
          .toLowerCase()
          .includes(q)
      )
    );
  }, [rows, search]);

  return (
    <div className="flex h-full flex-col px-4 pt-3 sm:px-5 sm:pt-4">
      {/* Search + record count row — stays pinned above the table */}
      <div className="mb-4 flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex w-full items-center gap-2.5 rounded-xl border border-glass-rim bg-glass-bg px-3.5 py-2.5 sm:max-w-[380px]">
          <ReactIcon
            name="FiSearch"
            size={14}
            className="shrink-0 text-muted"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${mod?.label ?? moduleId}…`}
            className="flex-1 bg-transparent text-sm text-fg outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="flex-shrink-0">
              <ReactIcon name="FiX" size={13} className="text-muted" />
            </button>
          )}
        </div>
        <p className="shrink-0 text-xs text-muted">
          {loading
            ? '—'
            : `${filtered.length} record${filtered.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Table card — fills remaining height; row area scrolls, header+pagination fixed */}
      <div
        className={`no-scrollbar min-h-0 flex-1 overflow-y-hidden rounded-2xl border border-glass-rim bg-glass-bg ${isMobile ? 'overflow-x-hidden' : 'overflow-x-auto'}`}
      >
        {isMobile ? (
          /* ── Mobile: card list scrolls inside this container ── */
          <MobileCardList
            rows={filtered}
            moduleId={moduleId}
            loading={loading}
            search={search}
          />
        ) : (
          /* ── Desktop/tablet: DataTable manages its own vertical scroll ── */
          <div
            className="dt-layout"
            style={{ minWidth: '580px', height: '100%' }}
          >
            {loading ? (
              <TableSkeleton />
            ) : (
              <StyleSheetManager shouldForwardProp={shouldForwardDtcProp}>
                <DataTable<AdminRecord>
                  className="dt-fill"
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
                  onRowClicked={(row) =>
                    navigate(`/admin/${moduleId}/${row.id}`)
                  }
                  noDataComponent={
                    <div className="w-full py-16 text-center text-sm text-muted">
                      {search
                        ? `No results for "${search}"`
                        : 'No records yet.'}
                    </div>
                  }
                />
              </StyleSheetManager>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

CrudTable.displayName = 'CrudTable';
export default CrudTable;
