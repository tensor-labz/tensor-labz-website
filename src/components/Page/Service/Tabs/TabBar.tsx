import { memo, FC } from "react";
import { motion } from "framer-motion";
import { useServiceContext } from "../../../../contexts/ServiceContext";
import { useServiceDataContext } from "../../../../contexts/Api/ServiceApiContext";
import { ServiceCardProps } from "../../../../base/type/ServiceProps.d";

const TabBar: FC = memo(() => {
  const { activeTab, setActiveTab } = useServiceContext();
  const { service_data } = useServiceDataContext();

  // Ensure service_data is an array and map properly
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
      className="bg-white rounded-lg hidden md:block overflow-x-auto"
    >
      <div className="flex space-x-1 p-1 min-w-full relative">
        {tabs.map((tab) => {
          const isActive = activeTab?.slug === tab?.slug;

          return (
            <motion.button
              key={tab.slug || tab.title}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 text-base font-medium rounded-md transition-all whitespace-nowrap flex-shrink-0
                ${isActive ? "bg-[#092B4A] text-white" : "text-[#092B4A] hover:bg-gray-100"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.title}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#092B4A]"
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
