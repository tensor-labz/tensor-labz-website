import { memo, FC } from 'react';
import { motion } from 'motion/react';
import { useServiceContext } from '../../../../contexts/ServiceContext';
import { useServiceDataContext } from '../../../../contexts/Api/ServiceApiContext';
import { ServiceCardProps } from '../../../../base/type/ServiceProps.d';

const TabBar: FC = memo(() => {
  const { activeTab, setActiveTab } = useServiceContext();
  const { service_data } = useServiceDataContext();

  const tabs = [
    { title: 'All', slug: 'all' },
    ...(Array.isArray(service_data)
      ? service_data.map((s: ServiceCardProps) => ({
          title: s?.service_name || 'Untitled',
          slug: s?.slug || '',
        }))
      : []),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden md:flex items-center gap-2 overflow-x-auto py-1 px-1"
    >
      {tabs.map((tab) => {
        const isActive = activeTab?.slug === tab.slug;
        return (
          <motion.button
            key={tab.slug || tab.title}
            onClick={() => setActiveTab(tab)}
            whileTap={{ scale: 0.95 }}
            className="relative px-5 py-2 text-xs font-semibold tracking-wider uppercase
              rounded whitespace-nowrap flex-shrink-0 transition-colors duration-200"
            style={
              isActive
                ? {
                    backgroundColor: 'var(--accent)',
                    color: '#fff',
                  }
                : {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border)',
                  }
            }
          >
            {tab.title}
          </motion.button>
        );
      })}
    </motion.div>
  );
});

export default TabBar;
