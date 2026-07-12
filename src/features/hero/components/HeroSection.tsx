import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import Section from '../../../shared/components/ui/Section';
import HolographicFrame from './HolographicFrame';
import HeroKeyPoint from './HeroKeyPoint';
import { useHeroController } from '../hooks/useHeroController';
import { useAppSelector } from '../../../app/hooks';
import {
  selectAllProjects,
  selectProjectsStatus,
} from '../../../store/projectsSlice';
import {
  selectServices,
  selectServicesStatus,
} from '../../../store/servicesSlice';
import { selectCurrentSlide } from '../../../store/heroSlice';
import { useCompanyInfo } from '../../../shared/hooks/useCompanyInfo';
import { useSiteSettings } from '../../../shared/hooks/useSiteSettings';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import { EASE_EXPO } from '../../../lib/motion';

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.14, ease: EASE_EXPO },
  }),
};

const HeroSection: React.FC = memo(() => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Kick off hero slides load + auto-advance
  useHeroController();

  const slide = useAppSelector(selectCurrentSlide);
  const { tagline } = useCompanyInfo();
  const { get } = useSiteSettings();

  const projects = useAppSelector(selectAllProjects);
  const projectsStatus = useAppSelector(selectProjectsStatus);
  const services = useAppSelector(selectServices);
  const servicesStatus = useAppSelector(selectServicesStatus);

  const stats = [
    {
      value: `${projects.length}+`,
      label: get('hero.stat_projects'),
      icon: 'FaCube',
      loading: projectsStatus === 'idle' || projectsStatus === 'loading',
    },
    {
      value: `${services.length}+`,
      label: get('hero.stat_services'),
      icon: 'FaRobot',
      loading: servicesStatus === 'idle' || servicesStatus === 'loading',
    },
    {
      value: `${new Date().getFullYear() - 2023}+`,
      label: get('hero.stat_years'),
      icon: 'FaBolt',
      loading: false,
    },
  ];

  return (
    <Section
      ref={ref}
      className="relative flex min-h-dvh items-center bg-canvas px-6 pb-10 pt-24 sm:pb-12 sm:pt-24 md:px-8 lg:px-12 lg:pb-16 lg:pt-20"
    >
      {/* radial vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 60% 40%, transparent 0%, var(--bg-base) 70%)',
        }}
      />
      {/* engineering grid — subtle across the hero */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid-dot) 1px, transparent 1px), linear-gradient(90deg, var(--grid-dot) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: 0.6,
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-x-12">
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 order-1 h-[220px] w-full sm:h-[300px] lg:order-2 lg:h-[430px] lg:w-6/12 xl:h-[500px]"
        >
          <div
            className="pointer-events-none absolute inset-0 scale-90 rounded-2xl opacity-20 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            }}
          />
          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative h-full w-full overflow-hidden rounded-2xl"
          >
            <HolographicFrame />
          </motion.div>
        </motion.div>

        {/* TEXT */}
        <div className="order-2 flex w-full flex-col items-center text-center lg:order-1 lg:w-6/12 lg:items-start lg:text-left">
          <motion.h1
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ lineHeight: 1.02 }}
            className="mb-4 text-balance font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl lg:text-5xl xl:text-6xl"
          >
            {tagline}
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '3.5rem' } : { width: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
            className="mx-auto mb-6 h-1 rounded-full bg-accent lg:mx-0"
          />

          <motion.div
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="mb-6 w-full"
          >
            <HeroKeyPoint />
          </motion.div>

          {slide?.cta_label && slide?.cta_link && (
            <motion.div
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="mb-8 flex justify-center lg:justify-start"
            >
              <Link
                to={slide.cta_link}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all"
              >
                {slide.cta_label}
                <ReactIcon name="FiArrowRight" size={15} />
              </Link>
            </motion.div>
          )}

          <motion.div
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex justify-center gap-8 md:gap-10 lg:justify-start"
          >
            {stats.map(({ value, label, icon, loading }) =>
              loading ? (
                <div key={icon} className="flex items-center gap-2">
                  <motion.div
                    className="h-3 w-3 rounded-full bg-accent"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              ) : (
                <div key={icon} className="flex items-center gap-2.5">
                  <ReactIcon
                    name={icon}
                    className="shrink-0 text-xl text-accent"
                  />
                  <div>
                    <div className="font-display text-xl font-bold leading-none text-fg">
                      {value}
                    </div>
                    <div className="mt-0.5 text-xs text-muted">{label}</div>
                  </div>
                </div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </Section>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;
