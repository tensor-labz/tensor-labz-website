import React, { memo } from 'react';
import { motion } from 'motion/react';
import type { ServiceCardProps } from '../../../shared/types/service';
import Card from '../../../shared/components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { setActiveServiceSlug } from '../../../store/projectsSlice';
import { scaleIn, EASE_EXPO } from '../../../lib/motion';

/* Engineering corner bracket — matches HolographicFrame language */
const Bracket = memo(({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const edge = {
    tl: 'top-2 left-2 border-t border-l',
    tr: 'top-2 right-2 border-t border-r',
    bl: 'bottom-2 left-2 border-b border-l',
    br: 'bottom-2 right-2 border-b border-r',
  }[pos];
  return (
    <div
      className={`pointer-events-none absolute z-10 h-3 w-3 border-accent/40 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:border-accent/80 ${edge}`}
    />
  );
});
Bracket.displayName = 'Bracket';

const ServiceCard: React.FC<ServiceCardProps> = memo(
  ({ service_name, description, icon, slug }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
      <Card
        className="group relative flex min-h-[200px] cursor-pointer flex-row justify-between gap-x-6 overflow-hidden rounded-xl border border-rim bg-surface px-3 py-3 shadow-sm transition-all duration-300 hover:scale-[1.005] hover:border-accent/40 hover:shadow-lg sm:min-h-[250px] sm:flex-col sm:gap-x-0 sm:p-6"
        animation={{
          initial: { opacity: 0, y: 50 },
          whileHover: {
            scale: 1.02,
            transition: { type: 'spring', stiffness: 300, damping: 12 },
          },
          whileInView: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: EASE_EXPO },
          },
        }}
        onClick={() => {
          dispatch(setActiveServiceSlug(slug));
          navigate(`/services/${slug}`);
        }}
      >
        {/* Engineering corner brackets */}
        <Bracket pos="tl" />
        <Bracket pos="tr" />
        <Bracket pos="bl" />
        <Bracket pos="br" />

        {/* Subtle engineering grid on card surface */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Icon */}
        <motion.div
          className="relative z-10 flex w-2/5 items-center justify-center sm:mb-1 sm:w-full"
          variants={scaleIn()}
          initial="hidden"
          whileInView="visible"
        >
          <img
            src={icon}
            alt={`${service_name} Service Icon`}
            className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20 md:h-28 md:w-28"
          />
        </motion.div>

        {/* Details */}
        <div className="relative z-10 flex w-3/5 flex-col justify-center px-2 text-center sm:w-full">
          <p className="mb-1 hidden font-mono text-[9px] uppercase tracking-[0.2em] text-accent/70 sm:block">
            ◈ Service
          </p>
          <h3 className="mb-1 text-lg font-bold text-fg sm:text-xl md:text-2xl">
            {service_name}
          </h3>
          {/* Mobile inline description */}
          <p className="block text-sm text-muted sm:hidden">{description}</p>
        </div>

        {/* Hover reveal — dark overlay so text is always readable */}
        <div className="absolute bottom-0 left-0 z-20 hidden h-0 w-full flex-col justify-center overflow-hidden border-t border-accent/30 bg-slate-900/95 px-4 py-3 transition-all duration-500 ease-in-out group-hover:h-[48%] sm:flex sm:px-5">
          <p className="mb-1.5 translate-y-2 font-mono text-[9px] uppercase tracking-widest text-accent opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
            {'// Description'}
          </p>
          <p className="translate-y-3 text-xs leading-relaxed text-slate-200 opacity-0 transition-all delay-75 duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 sm:text-sm">
            {description}
          </p>
        </div>
      </Card>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';
export default ServiceCard;
