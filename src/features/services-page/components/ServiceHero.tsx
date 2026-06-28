import { FC, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppSelector } from '../../../app/hooks';
import { selectServices } from '../../../store/servicesSlice';
import { selectActiveSlug } from '../../../store/projectsSlice';
import { useSiteSettings } from '../../../shared/hooks/useSiteSettings';
import { EASE_EXPO } from '../../../lib/motion';

const ServiceHero: FC = memo(() => {
  const services = useAppSelector(selectServices);
  const activeSlug = useAppSelector(selectActiveSlug);
  const { get } = useSiteSettings();

  const selectedService = useMemo(() => {
    return (
      services.find((s) => s.slug === activeSlug) ?? {
        service_name: get('services.title'),
        description: get('services.description'),
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services, activeSlug]);

  return (
    <div className="w-full pt-24 pb-4 px-4 text-center">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-[10px] font-semibold tracking-[0.3em] uppercase block mb-2 text-accent"
      >
        {get('services.hero_label')}
      </motion.span>

      <AnimatePresence mode="wait">
        <motion.h2
          key={activeSlug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: EASE_EXPO }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-fg font-display"
        >
          {(selectedService as { service_name: string }).service_name}
        </motion.h2>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={`desc-${activeSlug}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-sm max-w-2xl mx-auto text-muted"
        >
          {(selectedService as { description: string }).description}
        </motion.p>
      </AnimatePresence>
    </div>
  );
});

ServiceHero.displayName = 'ServiceHero';
export default ServiceHero;
