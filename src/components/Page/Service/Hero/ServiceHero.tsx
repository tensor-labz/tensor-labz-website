import { FC,memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRootContext } from '../../../../contexts/RootContext';
import { useServiceDataContext } from "../../../../contexts/Api/ServiceApiContext";
import { useServiceContext } from "../../../../contexts/ServiceContext";


const ServiceHero: FC =memo( () => {
  const { Data } = useRootContext()
  const { service_data } = useServiceDataContext();
  const { activeTab } = useServiceContext();
  const selctedservice = useMemo(() => {
    return service_data?.find((se: any) => se.slug === activeTab.slug) ?? { service_name: Data.insight.hero.title, description: Data.insight.hero.description };
  }, [service_data, activeTab.slug]);
  return (
    <div className="relative w-full h-32 sm:h-40 md:h-60">
      {/* Background for small screens (Image) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 "
      >
        <img
          src={Data.insight.hero.hero_bg.sm}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </motion.div>


      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-blue-900 px-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl md:text-5xl font-bold text-center mb-4"
        >
          {selctedservice?.service_name}
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm md:text-lg text-center max-w-2xl md:block hidden"
        >
          {selctedservice?.description}
        </motion.p>
      </div>
    </div>
  );
});
ServiceHero.displayName = "ServiceHero"; // For better debugging in React DevTools
export default ServiceHero;
