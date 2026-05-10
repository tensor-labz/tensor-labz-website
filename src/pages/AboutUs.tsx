import React, { memo, Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import ReactIcon from '../shared/components/ui/ReactIcon';
import Page from '../components/resuable/Page';
import { useAboutController } from '../features/about/hooks/useAboutController';
import { useCompanyInfo } from '../shared/hooks/useCompanyInfo';
import MediaGallery from '../features/about/components/MediaGallery';
import { fadeUp, VIEWPORT, EASE_EXPO } from '../lib/motion';

const HeroParticles = lazy(
  () => import('../features/about/components/HeroParticles')
);

/* ── Shared primitives ── */
const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[10px] font-semibold tracking-[0.35em] uppercase block mb-4 text-accent">
    {children}
  </span>
);

const Rule = ({ center = false }: { center?: boolean }) => (
  <motion.div
    initial={{ width: 0 }}
    whileInView={{ width: '3rem' }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className={`h-1 rounded-full mb-6 bg-accent ${center ? 'mx-auto' : ''}`}
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
    className={`rounded-2xl p-8 bg-glass-raised border border-glass-rim backdrop-blur-md ${className}`}
  >
    {children}
  </div>
);

const SkeletonCard = () => (
  <Card>
    <div className="h-3 rounded w-1/2 mb-4 animate-pulse bg-glass-rim" />
    <div className="h-2 rounded w-full mb-2 animate-pulse bg-glass-rim" />
    <div className="h-2 rounded w-3/4 animate-pulse bg-glass-rim" />
  </Card>
);

/* ── Page ── */
const AboutUs: React.FC = memo(() => {
  const { aboutData, isLoading } = useAboutController();
  const info = useCompanyInfo();

  const companyName = info.name || 'About Us';
  const description =
    info.description ||
    'Empowering creators and problem-solvers through research, innovation, and practical application.';
  const whoWeAre = info.who_we_are || '';

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
              'radial-gradient(ellipse 60% 55% at 50% 50%, transparent 0%, var(--bg-base) 80%)',
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
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_EXPO }}
            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-fg font-display"
          >
            {companyName}
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ delay: 0.45, duration: 0.5, ease: 'easeOut' }}
            className="h-1 rounded-full mx-auto mb-8 bg-accent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base md:text-xl leading-relaxed max-w-2xl mx-auto text-muted"
          >
            {description}
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-muted">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ReactIcon name="FaChevronDown" size={11} className="text-accent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          VISION & MISSION
      ══════════════════════════════════════════════════ */}
      {(info.vision || info.mission) && (
        <section className="px-6 lg:px-16 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="text-center mb-12"
            >
              <Label>What Drives Us</Label>
              <h2 className="text-3xl md:text-4xl font-bold text-fg font-display">
                Vision &amp; Mission
              </h2>
              <Rule center />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {info.vision && (
                <motion.div
                  variants={fadeUp(0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                >
                  <Card>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: 'var(--accent-soft)' }}
                    >
                      <ReactIcon name="FaLightbulb" size={20} className="text-accent" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-fg font-display">
                      Our Vision
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {info.vision}
                    </p>
                  </Card>
                </motion.div>
              )}
              {info.mission && (
                <motion.div
                  variants={fadeUp(0.2)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                >
                  <Card>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: 'var(--accent-soft)' }}
                    >
                      <ReactIcon name="FaRocket" size={20} className="text-accent" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-fg font-display">
                      Our Mission
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {info.mission}
                    </p>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════
          WHO WE ARE
      ══════════════════════════════════════════════════ */}
      {whoWeAre && (
        <section className="px-6 lg:px-16 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <Label>Our Story</Label>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-2 text-fg font-display">
                Building a Better Tomorrow
              </h2>
              <Rule />
              <p className="text-base leading-relaxed text-muted">
                {whoWeAre}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <Card>
                <ReactIcon
                  name="FaQuoteLeft"
                  size={32}
                  className="text-accent mb-6 block"
                  style={{ opacity: 0.45 }}
                />
                <p className="text-lg md:text-xl leading-relaxed font-medium italic mb-6 text-fg">
                  &ldquo;
                  {info.tagline ||
                    'Creating Sustainable Impact Through Technology'}
                  &rdquo;
                </p>
                <div className="h-px mb-4 border-t border-glass-rim" />
                <span className="text-xs font-semibold tracking-widest uppercase text-accent">
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
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="text-center mb-12"
          >
            <Label>In Focus</Label>
            <h2 className="text-3xl md:text-4xl font-bold text-fg font-display">
              Our Work &amp; Story
            </h2>
            <Rule center />
          </motion.div>

          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="max-w-4xl mx-auto"
          >
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
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="text-center mb-12"
            >
              <Label>Key Facts</Label>
              <h2 className="text-3xl md:text-4xl font-bold text-fg font-display">
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
                    <motion.div
                      key={`about-${i}`}
                      variants={fadeUp(0.05 * i)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={VIEWPORT}
                    >
                      <Card>
                        <h3 className="text-lg font-semibold mb-3 break-words text-fg">
                          {String(section.components ?? '')}
                        </h3>
                        <p className="text-sm leading-relaxed break-words hyphens-auto text-muted">
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
