import { FC, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    <div className="w-full pt-28 pb-12 sm:pt-32 sm:pb-14 px-4 text-center">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-[10px] font-semibold tracking-[0.3em] uppercase block mb-4"
        style={{ color: 'var(--accent)' }}
      >
        Insights & Services
      </motion.span>

      <AnimatePresence mode="wait">
        <motion.h1
          key={activeTab.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}
        >
          {selectedService?.service_name}
        </motion.h1>
      </AnimatePresence>

      {/* Accent line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '3rem' }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
        className="h-1 rounded-full mx-auto mb-5"
        style={{ backgroundColor: 'var(--accent)' }}
      />

      <AnimatePresence mode="wait">
        <motion.p
          key={`desc-${activeTab.slug}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-sm md:text-base max-w-2xl mx-auto"
          style={{ color: 'var(--text-muted)' }}
        >
          {selectedService?.description}
        </motion.p>
      </AnimatePresence>
    </div>
  );
});

ServiceHero.displayName = "ServiceHero";
export default ServiceHero;
