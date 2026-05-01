import { FC, memo, useMemo } from 'react';
import { motion } from 'motion/react';
import { useRootContext } from '../../../../contexts/RootContext';
import { useServiceDataContext } from "../../../../contexts/Api/ServiceApiContext";
import { useServiceContext } from "../../../../contexts/ServiceContext";

const ServiceHero: FC = memo(() => {
  const { Data } = useRootContext();
  const { service_data } = useServiceDataContext();
  const { activeTab } = useServiceContext();

  const selectedService = useMemo(() => {
    return service_data?.find((se: any) => se.slug === activeTab.slug)
      ?? { service_name: Data.insight.hero.title, description: Data.insight.hero.description };
  }, [service_data, activeTab.slug]);

  return (
    <div className="relative w-full h-48 sm:h-56 md:h-72 pt-20 overflow-hidden">
      {/* Background image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <img
          src={Data.insight.hero.hero_bg.sm}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability on image */}
        <div className="absolute inset-0 bg-slate-950/55" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl md:text-5xl font-bold text-center text-white mb-3"
          style={{ fontFamily: '"Syne", sans-serif' }}
        >
          {selectedService?.service_name}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm md:text-base text-center max-w-2xl md:block hidden text-white/70"
        >
          {selectedService?.description}
        </motion.p>
      </div>
    </div>
  );
});

ServiceHero.displayName = "ServiceHero";
export default ServiceHero;
