import React, { memo, Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import {
  FaLightbulb,
  FaRocket,
  FaQuoteLeft,
  FaChevronDown,
} from 'react-icons/fa';
import Page from '../components/resuable/Page';
import { useAboutController } from '../features/about/hooks/useAboutController';
import { useCompanyInfo } from '../shared/hooks/useCompanyInfo';
import MediaGallery from '../features/about/components/MediaGallery';
import data from '../data/data';

const HeroParticles = lazy(
  () => import('../features/about/components/HeroParticles')
);

/* ── Scroll-triggered fade-up ── */
const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ── Shared primitives ── */
const Label = ({ children }: { children: React.ReactNode }) => (
  <span
    className="text-[10px] font-semibold tracking-[0.35em] uppercase block mb-4"
    style={{ color: 'var(--accent)' }}
  >
    {children}
  </span>
);

const Rule = ({ center = false }: { center?: boolean }) => (
  <motion.div
    initial={{ width: 0 }}
    whileInView={{ width: '3rem' }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className={`h-1 rounded-full mb-6 ${center ? 'mx-auto' : ''}`}
    style={{ backgroundColor: 'var(--accent)' }}
  />
);

const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-2xl p-8 ${className}`}
    style={{
      backgroundColor: 'var(--glass-bg-raised)',
      border: '1px solid var(--glass-border)',
      backdropFilter: 'blur(12px)',
    }}
  >
    {children}
  </div>
);

const SkeletonCard = () => (
  <Card>
    <div
      className="h-3 rounded w-1/2 mb-4 animate-pulse"
      style={{ backgroundColor: 'var(--glass-border)' }}
    />
    <div
      className="h-2 rounded w-full mb-2 animate-pulse"
      style={{ backgroundColor: 'var(--glass-border)' }}
    />
    <div
      className="h-2 rounded w-3/4 animate-pulse"
      style={{ backgroundColor: 'var(--glass-border)' }}
    />
  </Card>
);

/* ── Page ── */
const AboutUs: React.FC = memo(() => {
  const { aboutData, isLoading } = useAboutController();
  const info = useCompanyInfo();

  const companyName = info.name || data?.aboutus?.title || 'About Us';
  const description =
    info.description ||
    'Empowering creators and problem-solvers through research, innovation, and practical application.';
  const whoWeAre = info.who_we_are || data?.aboutus?.content || '';

  return (
    <Page HeadProps={{ title: 'About Us' }}>
      {/* ══════════════════════════════════════════════════
          HERO  — Three.js particle constellation background
      ══════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center justify-center px-6 lg:px-16 text-center overflow-hidden"
        style={{ paddingTop: 'calc(57px + 4rem)', paddingBottom: '4rem' }}
      >
        {/* Particle background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <HeroParticles />
          </Suspense>
        </div>

        {/* Radial fade so particles don't fight the text */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 50% 50%, transparent 0%, var(--bg) 80%)',
          }}
        />

        {/* Content */}
        <div className="relative z-[2] max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            <Label>Who We Are</Label>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            style={{
              color: 'var(--text-primary)',
              fontFamily: '"Syne", sans-serif',
            }}
          >
            {companyName}
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ delay: 0.45, duration: 0.5, ease: 'easeOut' }}
            className="h-1 rounded-full mx-auto mb-8"
            style={{ backgroundColor: 'var(--accent)' }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            {description}
          </motion.p>

          {/* Compact Vision & Mission cards */}
          {(info.vision || info.mission) && (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
              {info.vision && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55, duration: 0.6 }}
                  className="rounded-2xl p-5"
                  style={{
                    backgroundColor: 'var(--glass-bg-raised)',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaLightbulb size={11} style={{ color: 'var(--accent)' }} />
                    <span
                      className="text-[9px] font-semibold tracking-[0.3em] uppercase"
                      style={{ color: 'var(--accent)' }}
                    >
                      Vision
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed line-clamp-3"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {info.vision}
                  </p>
                </motion.div>
              )}
              {info.mission && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65, duration: 0.6 }}
                  className="rounded-2xl p-5"
                  style={{
                    backgroundColor: 'var(--glass-bg-raised)',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaRocket size={11} style={{ color: 'var(--accent)' }} />
                    <span
                      className="text-[9px] font-semibold tracking-[0.3em] uppercase"
                      style={{ color: 'var(--accent)' }}
                    >
                      Mission
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed line-clamp-3"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {info.mission}
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span
            className="text-[9px] font-medium tracking-[0.3em] uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <FaChevronDown size={11} style={{ color: 'var(--accent)' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHO WE ARE
      ══════════════════════════════════════════════════ */}
      {whoWeAre && (
        <section className="px-6 lg:px-16 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...inView(0)}>
              <Label>Our Story</Label>
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight mb-2"
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: '"Syne", sans-serif',
                }}
              >
                Building a Better Tomorrow
              </h2>
              <Rule />
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                {whoWeAre}
              </p>
            </motion.div>

            <motion.div {...inView(0.15)}>
              <Card>
                <FaQuoteLeft
                  size={32}
                  style={{
                    color: 'var(--accent)',
                    opacity: 0.45,
                    marginBottom: '1.5rem',
                  }}
                />
                <p
                  className="text-lg md:text-xl leading-relaxed font-medium italic mb-6"
                  style={{ color: 'var(--text-primary)' }}
                >
                  &ldquo;
                  {info.tagline ||
                    'Creating Sustainable Impact Through Technology'}
                  &rdquo;
                </p>
                <div
                  className="h-px mb-4"
                  style={{ backgroundColor: 'var(--glass-border)' }}
                />
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: 'var(--accent)' }}
                >
                  {companyName}
                </span>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          MEDIA GALLERY  — video / image player
      ══════════════════════════════════════════════════ */}
      <section className="px-6 lg:px-16 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <motion.div {...inView(0)} className="text-center mb-12">
            <Label>In Focus</Label>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{
                color: 'var(--text-primary)',
                fontFamily: '"Syne", sans-serif',
              }}
            >
              Our Work &amp; Story
            </h2>
            <Rule center />
          </motion.div>

          <motion.div {...inView(0.1)} className="max-w-4xl mx-auto">
            <MediaGallery />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          KEY FACTS  — aboutData grid
      ══════════════════════════════════════════════════ */}
      {(isLoading || aboutData.length > 0) && (
        <section className="px-6 lg:px-16 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto">
            <motion.div {...inView(0)} className="text-center mb-12">
              <Label>Key Facts</Label>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: '"Syne", sans-serif',
                }}
              >
                By the Numbers
              </h2>
              <Rule center />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : aboutData.map((section, i) => (
                    <motion.div key={`about-${i}`} {...inView(0.05 * i)}>
                      <Card>
                        <h3
                          className="text-lg font-semibold mb-3 break-words"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {String(section.components ?? '')}
                        </h3>
                        <p
                          className="text-sm leading-relaxed break-words hyphens-auto"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {String(section.value ?? '')}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
            </div>
          </div>
        </section>
      )}
    </Page>
  );
});

AboutUs.displayName = 'AboutUs';
export default AboutUs;
