import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import { MODULES } from '../config/modules';
import { getConfig } from '../../../services/firebase/configRepo';
import {
  DEFAULT_PAGE_COMPONENTS,
  type PageComponentConfig,
} from '../../../shared/types/pageConfig';
import CrudTable from './CrudTable';

/* ── Component registry — add new page component types here ── */
const REGISTRY: Record<string, React.ComponentType<{ moduleId: string }>> = {
  table: CrudTable,
};

/* ── AdminModulePage ── */
const AdminModulePage = memo(({ moduleId }: { moduleId: string }) => {
  const navigate = useNavigate();
  const mod = MODULES.find((m) => m.id === moduleId);
  const [components, setComponents] = useState<PageComponentConfig[]>(
    DEFAULT_PAGE_COMPONENTS
  );

  useEffect(() => {
    setComponents(DEFAULT_PAGE_COMPONENTS);
    getConfig<{ components?: PageComponentConfig[] }>(
      'page_config',
      moduleId
    ).then((data) => {
      if (data?.components) setComponents(data.components);
    });
  }, [moduleId]);

  return (
    <div className="flex h-full flex-col">
      {/* Page header — never scrolls away */}
      <div
        className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4"
        style={{ borderBottom: '1px solid var(--glass-border)' }}
      >
        <h2
          className="truncate text-base font-bold sm:text-xl"
          style={{
            color: 'var(--text-primary)',
            fontFamily: '"Syne", sans-serif',
          }}
        >
          {mod?.label ?? moduleId}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => navigate(`/admin/${moduleId}/form-config`)}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium sm:px-3.5 sm:py-2.5 sm:text-sm"
            style={{
              backgroundColor: 'var(--glass-bg-raised)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-muted)',
            }}
            title="Configure form fields"
          >
            <ReactIcon name="FaCog" size={12} />
            <span className="hidden sm:inline">Form Builder</span>
          </button>
          <button
            onClick={() => navigate(`/admin/${moduleId}/new`)}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold sm:px-4 sm:py-2.5 sm:text-sm"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            <ReactIcon name="FaPlus" size={10} /> <span>Add New</span>
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {[...components]
          .filter((c) => c.visible !== false)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((c) => {
            const Component = REGISTRY[c.type];
            if (!Component) return null;
            return <Component key={c.type} moduleId={moduleId} />;
          })}
      </div>
    </div>
  );
});

AdminModulePage.displayName = 'AdminModulePage';
export default AdminModulePage;
