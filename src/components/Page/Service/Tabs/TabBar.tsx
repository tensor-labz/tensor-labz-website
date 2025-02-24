import { memo } from "react";
import { motion } from "framer-motion";

const Tabs = memo(() => {
  const activeTab = { title: "Active Tab", slug: "active" };
  const tabs = new Array(5).fill(null).map((_, index) => ({
    title: `Tab ${index + 1}`,
    slug: `tab${index + 1}`,
  }));

  return (
    <div className="w-full mt-1 md:block hidden">
      <div className="flex w-full overflow-x-auto md:justify-center bg-blue-100 shadow-md rounded-b-lg">
        {tabs.map((tab, index) => {
          const isActive = activeTab?.slug === tab?.slug;
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`py-2 px-6 text-sm font-bold flex-grow md:flex-grow-0 rounded-t-lg relative
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "bg-blue-200 text-blue-900 hover:bg-blue-300"
                }`}
            >
              {tab?.title}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 w-full h-1 bg-blue-700"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
});

export default Tabs;
