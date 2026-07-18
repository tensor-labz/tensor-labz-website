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
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-glass-rim px-4 py-3 sm:px-6 sm:py-4">
        <h2 className="truncate font-display text-base font-bold text-fg sm:text-xl">
          {mod?.label ?? moduleId}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => navigate(`/admin/${moduleId}/form-config`)}
            className="flex items-center gap-1.5 rounded-xl border border-glass-rim bg-glass-raised px-3 py-2 text-xs font-medium text-muted sm:px-3.5 sm:py-2.5 sm:text-sm"
            title="Configure form fields"
          >
            <ReactIcon name="FaCog" size={12} />
            <span className="hidden sm:inline">Form Builder</span>
          </button>
          <button
            onClick={() => navigate(`/admin/${moduleId}/new`)}
            className="flex items-center gap-1.5 rounded-xl bg-accent px-3 py-2 text-xs font-semibold text-white sm:px-4 sm:py-2.5 sm:text-sm"
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
