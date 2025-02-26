import { memo, FC } from "react";
import { motion } from "framer-motion";
import { useServiceContext } from "../../../../contexts/ServiceContext";

const TabBar: FC = memo(() => {
  const { activeTab, setActiveTab } = useServiceContext();

  const tabs = [
    { title: "Web Development", slug: "web-dev" },
    { title: "Mobile Apps", slug: "mobile-apps" },
    { title: "UI/UX Design", slug: "design" },
    { title: "Cloud Services", slug: "cloud" },
    { title: "Consulting", slug: "consulting" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-lg hidden md:block shadow-md overflow-x-auto"
    >
      <div className="flex space-x-1 p-1 min-w-full">
        {tabs.map((tab) => {
          const isActive = activeTab?.slug === tab?.slug;
          return (
            <motion.button
              key={tab.slug}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap flex-shrink-0
                ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab?.title}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"
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
