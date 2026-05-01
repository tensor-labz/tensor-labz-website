import { memo, FC } from "react";
import { motion } from "motion/react";
import { useServiceContext } from "../../../../contexts/ServiceContext";
import { useServiceDataContext } from "../../../../contexts/Api/ServiceApiContext";
import { ServiceCardProps } from "../../../../base/type/ServiceProps.d";

const TabBar: FC = memo(() => {
  const { activeTab, setActiveTab } = useServiceContext();
  const { service_data } = useServiceDataContext();

  const tabs = [
    { title: "All", slug: "all" },
    ...(Array.isArray(service_data)
      ? service_data.map((service: ServiceCardProps) => ({
          title: service?.service_name || "Untitled",
          slug: service?.slug || ""
        }))
      : [])
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
      className="rounded-lg hidden md:block overflow-x-auto border"
    >
      <div className="flex space-x-1 p-1 min-w-full relative">
        {tabs.map((tab) => {
          const isActive = activeTab?.slug === tab?.slug;

          return (
            <motion.button
              key={tab.slug || tab.title}
              onClick={() => setActiveTab(tab)}
              style={isActive
                ? { backgroundColor: 'var(--accent)', color: '#fff' }
                : { color: 'var(--text-muted)' }
              }
              className={`relative px-4 py-2 text-sm font-medium rounded transition-all whitespace-nowrap flex-shrink-0
                ${!isActive ? 'hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)]' : ''}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {tab.title}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
});

export default TabBar;
