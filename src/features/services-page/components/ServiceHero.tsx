import { FC, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppSelector } from '../../../app/hooks';
import { selectServices } from '../../../store/servicesSlice';
import { selectActiveSlug } from '../../../store/projectsSlice';
import data from '../../../data/data';
import { EASE_EXPO } from '../../../lib/motion';

const ServiceHero: FC = memo(() => {
  const services = useAppSelector(selectServices);
  const activeSlug = useAppSelector(selectActiveSlug);

  const selectedService = useMemo(() => {
    return (
      services.find((s) => s.slug === activeSlug) ?? {
        service_name: data?.insight?.hero?.title ?? 'Insights',
        description:
          data?.insight?.hero?.description ??
          'Stay updated with our latest insights and articles.',
      }
    );
  }, [services, activeSlug]);

  return (
    <div className="w-full pt-28 pb-12 sm:pt-32 sm:pb-14 px-4 text-center">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-[10px] font-semibold tracking-[0.3em] uppercase block mb-4 text-accent"
      >
        Insights &amp; Services
      </motion.span>

      <AnimatePresence mode="wait">
        <motion.h1
          key={activeSlug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-fg font-display"
        >
          {(selectedService as { service_name: string }).service_name}
        </motion.h1>
      </AnimatePresence>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '3rem' }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
        className="h-1 rounded-full mx-auto mb-5 bg-accent"
      />

      <AnimatePresence mode="wait">
        <motion.p
          key={`desc-${activeSlug}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-sm md:text-base max-w-2xl mx-auto text-muted"
        >
          {(selectedService as { description: string }).description}
        </motion.p>
      </AnimatePresence>
    </div>
  );
});

ServiceHero.displayName = 'ServiceHero';
export default ServiceHero;
