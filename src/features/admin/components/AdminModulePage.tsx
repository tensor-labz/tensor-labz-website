import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCog, FaPlus } from 'react-icons/fa';
import { MODULES } from '../config/modules';
import { supabase } from '../../../lib/supabase';
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
    supabase
      .from('page_config')
      .select('*')
      .eq('module_id', moduleId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!error && data?.components)
          setComponents(data.components as PageComponentConfig[]);
      });
  }, [moduleId]);

  return (
    <div className="h-full flex flex-col">
      {/* Page header — never scrolls away */}
      <div
        className="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4"
        style={{ borderBottom: '1px solid var(--glass-border)' }}
      >
        <h2
          className="text-base sm:text-xl font-bold truncate"
          style={{
            color: 'var(--text-primary)',
            fontFamily: '"Syne", sans-serif',
          }}
        >
          {mod?.label ?? moduleId}
        </h2>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate(`/admin/${moduleId}/form-config`)}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium"
            style={{
              backgroundColor: 'var(--glass-bg-raised)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-muted)',
            }}
            title="Configure form fields"
          >
            <FaCog size={12} />
            <span className="hidden sm:inline">Form Builder</span>
          </button>
          <button
            onClick={() => navigate(`/admin/${moduleId}/new`)}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            <FaPlus size={10} /> <span>Add New</span>
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
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
