import React, { memo } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import Section from '../../../shared/components/ui/Section';
import HeroImageSlider from './HeroImageSlider';
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
import data from '../../../data/data';
import { FaRobot, FaCube, FaBolt } from 'react-icons/fa';

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] },
  }),
};

const HeroSection: React.FC = memo(() => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Kick off hero slides load + auto-advance
  useHeroController();

  const projects = useAppSelector(selectAllProjects);
  const projectsStatus = useAppSelector(selectProjectsStatus);
  const services = useAppSelector(selectServices);
  const servicesStatus = useAppSelector(selectServicesStatus);

  const stats = [
    {
      value: `${projects.length}+`,
      label: 'Projects',
      icon: FaCube,
      loading: projectsStatus === 'idle' || projectsStatus === 'loading',
    },
    {
      value: `${services.length}+`,
      label: 'Services',
      icon: FaRobot,
      loading: servicesStatus === 'idle' || servicesStatus === 'loading',
    },
    {
      value: `${new Date().getFullYear() - 2023}+`,
      label: 'Years',
      icon: FaBolt,
      loading: false,
    },
  ];

  return (
    <Section
      ref={ref}
      className="relative min-h-screen flex items-center
        pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-36 lg:pb-24 px-6 md:px-8 lg:px-12"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 60% 40%, transparent 0%, var(--bg-base) 70%)',
        }}
      />

      <div
        className="relative z-10 max-w-7xl mx-auto w-full
        flex flex-col items-center gap-6
        lg:flex-row lg:items-stretch lg:gap-x-12"
      >
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full relative z-10 order-1 lg:order-2 lg:w-6/12 h-[220px] sm:h-[300px] lg:h-full"
        >
          <div
            className="absolute inset-0 rounded-2xl blur-3xl opacity-20 scale-90 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            }}
          />
          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full h-full relative rounded-2xl overflow-hidden"
          >
            <HeroImageSlider />
          </motion.div>
        </motion.div>

        {/* TEXT */}
        <div
          className="w-full flex flex-col order-2 lg:order-1 lg:w-6/12
            items-center text-center lg:items-start lg:text-left"
        >
          <motion.span
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: 'var(--accent)' }}
          >
            Mechatronics & Engineering
          </motion.span>

          <motion.h1
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight mb-2"
            style={{
              color: 'var(--text-primary)',
              fontFamily: '"Syne", sans-serif',
            }}
          >
            {data?.Home?.hero?.title?.map((line: string, i: number) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '3.5rem' } : { width: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
            className="h-1 rounded-full mb-6 mx-auto lg:mx-0"
            style={{ backgroundColor: 'var(--accent)' }}
          />

          <motion.div
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="mb-8 w-full"
          >
            <HeroKeyPoint />
          </motion.div>

          <motion.div
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex justify-center lg:justify-start gap-8 md:gap-10"
          >
            {stats.map(({ value, label, icon: Icon, loading }) =>
              loading ? (
                <div key={label} className="flex items-center gap-2">
                  <motion.div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: 'var(--accent)' }}
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              ) : (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon
                    className="text-xl shrink-0"
                    style={{ color: 'var(--accent)' }}
                  />
                  <div>
                    <div
                      className="text-xl font-bold leading-none"
                      style={{
                        color: 'var(--text-primary)',
                        fontFamily: '"Syne", sans-serif',
                      }}
                    >
                      {value}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {label}
                    </div>
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
