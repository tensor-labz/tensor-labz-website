import React, { memo, useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
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

const DEFAULT_PAGE_SIZE = 20;
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

/* ── Lightweight column definition (no third-party table dependency) ── */
interface Column {
  id: string;
  name: string;
  selector?: (row: AdminRecord) => string | number;
  cell?: (row: AdminRecord) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  grow?: number;
  center?: boolean;
  right?: boolean;
}

const alignCls = (c: Column): string =>
  c.center
    ? 'justify-center text-center'
    : c.right
      ? 'justify-end text-right'
      : 'justify-start text-left';

/* ── Field helpers ──────────────────────────────────────────────────────
 * Column names may be stored lowercase; try the exact key first, then
 * fall back to lowercase. ── */
const rowVal = (row: AdminRecord, key: string): unknown =>
  row[key] !== undefined ? row[key] : row[key.toLowerCase()];

/** Resolve any image-field value to a displayable URL string. */
const resolveImg = (val: unknown): string => {
  if (!val) return '';
  const src = Array.isArray(val) ? String(val[0] ?? '') : String(val);
  if (!src) return '';
  if (src.startsWith('http')) return src;
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

/* ── CrudTable ── */
interface CrudTableProps {
  moduleId: string;
}

const CrudTable = memo(({ moduleId }: CrudTableProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const mod = MODULES.find((m) => m.id === moduleId);

  /* Memoize selector instances to keep referential stability */
  const selectRows = useMemo(() => selectModuleRecords(moduleId), [moduleId]);
  const selectStatus = useMemo(() => selectModuleStatus(moduleId), [moduleId]);
  const rows = useAppSelector(selectRows);
  const status = useAppSelector(selectStatus);
  const loading = status === 'idle' || status === 'loading';

  const [search, setSearch] = useState('');
  const [colConfig, setColConfig] = useState<TableColumnConfig[] | null>(null);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sortId, setSortId] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);

  // All relation options from Redux store (keyed by table name)
  const allRelationOptions = useAppSelector(selectAllRelationOptions);

  // Maps fieldKey → { idString → displayLabel }
  const relationMaps = useMemo<Record<string, Record<string, string>>>(() => {
    if (!mod) return {};
    const maps: Record<string, Record<string, string>> = {};
    getModuleFields(mod)
      .filter((f) => f.type === 'select' && f.relation)
      .forEach((f) => {
        const rel = f.relation!;
        const vf = rel.valueField ?? 'id';
        const relRows = allRelationOptions[rel.table];
        if (!relRows) return;
        const map: Record<string, string> = {};
        relRows.forEach((row) => {
          map[String(row[vf] ?? '')] = String(
            row[rel.labelField] ?? row[vf] ?? ''
          );
        });
        maps[f.key] = map;
      });
    return maps;
  }, [mod, allRelationOptions]);

  /* Fetch rows via Redux; reset view state on module change */
  useEffect(() => {
    setSearch('');
    setSortId(null);
    setPage(1);
    if (status === 'idle')
      dispatch(fetchRecords({ moduleId, tableId: mod?.table }));
  }, [moduleId, status, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const imageTypeKeys = useMemo(() => {
    if (!mod) return new Set<string>();
    return new Set(
      getModuleFields(mod)
        .filter((f) => f.type === 'image' || f.type === 'images')
        .map((f) => f.key.toLowerCase())
    );
  }, [mod]);

  const resolveRelation = (
    relMap: Record<string, string> | undefined,
    val: unknown
  ): string => {
    const raw = String(val ?? '');
    return relMap ? (relMap[raw] ?? raw) : raw;
  };

  const resolveLink = (template: string, row: AdminRecord): string =>
    template.replace(/\$\{(\w+)\}/g, (_, key) =>
      String(rowVal(row, key) ?? '')
    );

  /* Build column definitions */
  const columns = useMemo<Column[]>(() => {
    if (!mod) return [];
    const cols: Column[] = [];
    const linkBtn =
      'cursor-pointer border-0 bg-transparent p-0 text-left text-inherit hover:text-accent';

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

    const primaryImgKey = mod.imageField?.toLowerCase() ?? '';

    if (colConfig) {
      [...colConfig]
        .filter((c) => c.visible !== false)
        .filter((c) => c.field.toLowerCase() !== primaryImgKey)
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
                    className={linkBtn}
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
              ...(c.width ? { width: c.width } : { grow: isDesc ? 2 : 1 }),
              ...(c.align === 'center' && { center: true }),
              ...(c.align === 'right' && { right: true }),
              ...(cellRenderer && { cell: cellRenderer }),
            });
          }
        });
    } else {
      cols.push({
        id: mod.titleField,
        name: 'Title',
        selector: (row) => String(rowVal(row, mod.titleField) ?? ''),
        sortable: true,
        grow: 1,
      });

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
          const col: Column = {
            id: key,
            name: fieldDef?.label ?? key,
            selector: (row) => resolveRelation(relMap, rowVal(row, key)),
            sortable: true,
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
                  className={linkBtn}
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
  }, [mod, colConfig, moduleId, imageTypeKeys, relationMaps]); // eslint-disable-line react-hooks/exhaustive-deps

  const cellVal = (row: AdminRecord, col: Column): string | number =>
    col.selector ? col.selector(row) : String(rowVal(row, col.id) ?? '');

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

  /* Active sort — falls back to the first sortable, non-image column */
  const activeSortId =
    sortId ??
    columns.find((c) => c.id !== '__image' && c.sortable !== false)?.id ??
    null;

  const sorted = useMemo(() => {
    if (!activeSortId) return filtered;
    const col = columns.find((c) => c.id === activeSortId);
    if (!col) return filtered;
    return [...filtered].sort((a, b) => {
      const av = cellVal(a, col);
      const bv = cellVal(b, col);
      const cmp =
        typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, activeSortId, sortDir, columns]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  const gridCols = columns
    .map((c) => c.width ?? (c.grow ? `minmax(0,${c.grow}fr)` : 'minmax(0,1fr)'))
    .join(' ');

  const toggleSort = (col: Column) => {
    if (col.sortable === false) return;
    if (activeSortId === col.id)
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortId(col.id);
      setSortDir('asc');
    }
  };

  return (
    <div className="flex h-full flex-col px-4 pt-3 sm:px-5 sm:pt-4">
      {/* ── Search + record count ── */}
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
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder={`Search ${mod?.label ?? moduleId}…`}
            className="flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-muted"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="shrink-0 text-muted transition-colors hover:text-fg"
            >
              <ReactIcon name="FiX" size={13} />
            </button>
          )}
        </div>
        <p className="shrink-0 text-xs text-muted sm:ml-auto">
          {loading
            ? '—'
            : `${sorted.length} record${sorted.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* ── Table card ── */}
      <div className="no-scrollbar min-h-0 flex-1 overflow-auto rounded-2xl border border-glass-rim bg-glass-bg">
        {loading ? (
          <div className="animate-pulse space-y-px p-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-12 w-full rounded bg-glass-raised" />
            ))}
          </div>
        ) : pageRows.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted">
            {search ? `No results for "${search}"` : 'No records yet.'}
          </div>
        ) : (
          <>
            {/* ── Desktop / tablet: grid table ── */}
            <div className="hidden min-w-[560px] md:block">
              {/* Header */}
              <div
                className="sticky top-0 z-10 grid gap-4 border-b border-glass-rim bg-glass-raised px-4 py-3"
                style={{ gridTemplateColumns: gridCols }}
              >
                {columns.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleSort(c)}
                    disabled={c.sortable === false}
                    className={`flex items-center gap-1 text-[0.7rem] font-bold uppercase tracking-[0.06em] text-muted transition-colors ${
                      c.sortable === false ? 'cursor-default' : 'hover:text-fg'
                    } ${alignCls(c)}`}
                  >
                    <span className="truncate">{c.name}</span>
                    {activeSortId === c.id && (
                      <ReactIcon
                        name={
                          sortDir === 'asc' ? 'FiChevronUp' : 'FiChevronDown'
                        }
                        size={12}
                        className="shrink-0 text-accent"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Rows */}
              {pageRows.map((row) => (
                <div
                  key={String(row.id)}
                  onClick={() => navigate(`/admin/${moduleId}/${row.id}`)}
                  className="grid cursor-pointer items-center gap-4 border-b border-glass-rim-subtle px-4 py-2.5 text-sm text-fg transition-colors last:border-b-0 hover:bg-glass-raised"
                  style={{ gridTemplateColumns: gridCols }}
                >
                  {columns.map((c) => (
                    <div
                      key={c.id}
                      className={`flex min-w-0 items-center ${alignCls(c)}`}
                    >
                      {c.cell ? (
                        c.cell(row)
                      ) : (
                        <span className="truncate">
                          {String(cellVal(row, c))}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* ── Mobile: card list ── */}
            <div className="md:hidden">
              {pageRows.map((row) => {
                const title = String(
                  rowVal(row, mod?.titleField ?? 'id') ?? ''
                );
                const desc = mod?.descriptionField
                  ? String(rowVal(row, mod.descriptionField) ?? '')
                  : '';
                const img = mod?.imageField
                  ? resolveImg(rowVal(row, mod.imageField))
                  : '';
                return (
                  <div
                    key={String(row.id)}
                    onClick={() => navigate(`/admin/${moduleId}/${row.id}`)}
                    className="flex cursor-pointer items-center gap-3 border-b border-glass-rim-subtle px-4 py-3 transition-colors last:border-b-0 hover:bg-glass-raised"
                  >
                    {img && (
                      <img
                        src={img}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-lg object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display =
                            'none';
                        }}
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-fg">
                        {title || `#${row.id}`}
                      </p>
                      {desc && (
                        <p className="mt-0.5 line-clamp-2 text-xs text-muted">
                          {desc}
                        </p>
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
          </>
        )}
      </div>

      {/* ── Pagination ── */}
      {!loading && sorted.length > 0 && (
        <div className="mt-3 flex shrink-0 flex-wrap items-center justify-between gap-3 text-xs text-muted">
          <div className="flex items-center gap-2">
            <span>Rows</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="cursor-pointer rounded-lg border border-glass-rim bg-glass-bg px-2 py-1 text-fg outline-none"
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="mr-2">
              {(safePage - 1) * pageSize + 1}–
              {Math.min(safePage * pageSize, sorted.length)} of {sorted.length}
            </span>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-glass-rim text-muted transition-colors hover:text-fg disabled:opacity-40"
            >
              <ReactIcon name="FiChevronLeft" size={14} />
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-glass-rim text-muted transition-colors hover:text-fg disabled:opacity-40"
            >
              <ReactIcon name="FiChevronRight" size={14} />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
});

CrudTable.displayName = 'CrudTable';
export default CrudTable;
