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
      className={`absolute w-3 h-3 border-accent/40 pointer-events-none z-10 transition-all duration-300 group-hover:border-accent/80 group-hover:w-4 group-hover:h-4 ${edge}`}
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
        className="group relative flex sm:flex-col flex-row justify-between
          rounded-xl overflow-hidden px-3 py-3 sm:p-6
          shadow-sm hover:shadow-lg transition-all duration-300
          hover:scale-[1.005] sm:gap-x-0 gap-x-6
          min-h-[200px] sm:min-h-[250px]
          cursor-pointer bg-surface border border-rim
          hover:border-accent/40"
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
          className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Icon */}
        <motion.div
          className="relative sm:w-full w-2/5 flex justify-center items-center sm:mb-1 z-10"
          variants={scaleIn()}
          initial="hidden"
          whileInView="visible"
        >
          <img
            src={icon}
            alt={`${service_name} Service Icon`}
            className="md:w-28 md:h-28 sm:w-20 sm:h-20 w-full h-full object-contain object-center transition-transform group-hover:scale-105 duration-300"
          />
        </motion.div>

        {/* Details */}
        <div className="relative sm:w-full w-3/5 flex flex-col justify-center text-center px-2 z-10">
          <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-accent/70 mb-1 sm:block hidden">
            ◈ Service
          </p>
          <h3 className="md:text-2xl sm:text-xl text-lg font-bold mb-1 text-fg">
            {service_name}
          </h3>
          {/* Mobile inline description */}
          <p className="text-sm sm:hidden block text-muted">
            {description}
          </p>
        </div>

        {/* Hover reveal — dark overlay so text is always readable */}
        <div
          className="hidden absolute bottom-0 left-0 w-full px-4 py-3 sm:px-5
            sm:flex flex-col justify-center overflow-hidden
            h-0 group-hover:h-[48%] transition-all duration-500 ease-in-out z-20
            border-t border-accent/30 bg-slate-900/95"
        >
          <p
            className="text-[9px] font-mono tracking-widest uppercase text-accent
              opacity-0 group-hover:opacity-100
              translate-y-2 group-hover:translate-y-0
              transition-all duration-500 ease-in-out mb-1.5"
          >
            // Description
          </p>
          <p
            className="text-slate-200 text-xs sm:text-sm leading-relaxed
              opacity-0 group-hover:opacity-100
              translate-y-3 group-hover:translate-y-0
              transition-all duration-500 delay-75 ease-in-out"
          >
            {description}
          </p>
        </div>
      </Card>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';
export default ServiceCard;
