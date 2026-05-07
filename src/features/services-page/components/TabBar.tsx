import { memo, FC } from 'react';
import { motion } from 'motion/react';
import { useServicesPageController } from '../hooks/useServicesPageController';

const TabBar: FC = memo(() => {
  const { services, activeSlug, setActiveSlug } = useServicesPageController();

  const tabs = [
    { title: 'All', slug: 'all' },
    ...services.map((s) => ({ title: s.service_name, slug: s.slug })),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden md:flex items-center gap-2 overflow-x-auto py-1 px-1"
    >
      {tabs.map((tab) => {
        const isActive = activeSlug === tab.slug;
        return (
          <motion.button
            key={tab.slug}
            onClick={() => setActiveSlug(tab.slug)}
            whileTap={{ scale: 0.95 }}
            className="relative px-5 py-2 text-xs font-semibold tracking-wider uppercase
              rounded whitespace-nowrap flex-shrink-0 transition-colors duration-200"
            style={
              isActive
                ? { backgroundColor: 'var(--accent)', color: '#fff' }
                : {
                    backgroundColor: 'var(--glass-bg-raised)',
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
