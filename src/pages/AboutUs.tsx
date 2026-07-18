import React, { memo, Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import ReactIcon from '../shared/components/ui/ReactIcon';
import Page from '../components/resuable/Page';
import { useAboutController } from '../features/about/hooks/useAboutController';
import { useCompanyInfo } from '../shared/hooks/useCompanyInfo';
import { useSiteSettings } from '../shared/hooks/useSiteSettings';
import MediaGallery from '../features/about/components/MediaGallery';
import { fadeUp, VIEWPORT, EASE_EXPO } from '../lib/motion';

const HeroParticles = lazy(
  () => import('../features/about/components/HeroParticles')
);

/* ── Shared primitives ── */
const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.35em] text-accent">
    {children}
  </span>
);

const Rule = ({ center = false }: { center?: boolean }) => (
  <motion.div
    initial={{ width: 0 }}
    whileInView={{ width: '3rem' }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className={`mb-6 h-1 rounded-full bg-accent ${center ? 'mx-auto' : ''}`}
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
    className={`rounded-2xl border border-glass-rim bg-glass-raised p-8 backdrop-blur-md ${className}`}
  >
    {children}
  </div>
);

const SkeletonCard = () => (
  <Card>
    <div className="mb-4 h-3 w-1/2 animate-pulse rounded bg-glass-rim" />
    <div className="mb-2 h-2 w-full animate-pulse rounded bg-glass-rim" />
    <div className="h-2 w-3/4 animate-pulse rounded bg-glass-rim" />
  </Card>
);

/* ── Page ── */
const AboutUs: React.FC = memo(() => {
  const { aboutData, isLoading } = useAboutController();
  const info = useCompanyInfo();
  const { get } = useSiteSettings();

  const companyName = info.name;
  const description = info.description;
  const whoWeAre = info.who_we_are || '';

  return (
    <Page HeadProps={{ title: 'About Us' }}>
      {/* ══════════════════════════════════════════════════
          HERO  — Three.js particle constellation background
      ══════════════════════════════════════════════════ */}
      <section className="relative flex items-center justify-center overflow-hidden px-6 pb-16 pt-32 text-center lg:px-16 lg:pb-20 lg:pt-36">
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
        <div className="relative z-[2] mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            <Label>{get('about.hero_label')}</Label>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_EXPO }}
            className="mb-6 font-display text-4xl font-bold leading-tight text-fg sm:text-5xl md:text-6xl xl:text-7xl"
          >
            {companyName}
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ delay: 0.45, duration: 0.5, ease: 'easeOut' }}
            className="mx-auto mb-8 h-1 rounded-full bg-accent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto max-w-2xl text-base leading-relaxed text-muted md:text-xl"
          >
            {description}
          </motion.p>

          {/* Domain capability chips */}
          {info.domains && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE_EXPO }}
              className="mt-6 flex flex-wrap justify-center gap-2"
            >
              {info.domains
                .split(',')
                .map((chip) => chip.trim())
                .filter(Boolean)
                .map((chip) => (
                  <span
                    key={chip}
                    className="rounded border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent"
                  >
                    {chip}
                  </span>
                ))}
            </motion.div>
          )}

          {/* Mission / Vision inline preview */}
          {(info.vision || info.mission) && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: EASE_EXPO }}
              className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-2"
            >
              {info.vision && (
                <div className="rounded-xl border border-glass-rim bg-glass-raised px-4 py-3 backdrop-blur-sm">
                  <p className="mb-1 font-mono text-[9px] uppercase tracking-widest text-accent">
                    ◈ Vision
                  </p>
                  <p className="line-clamp-3 text-xs leading-relaxed text-muted">
                    {info.vision}
                  </p>
                </div>
              )}
              {info.mission && (
                <div className="rounded-xl border border-glass-rim bg-glass-raised px-4 py-3 backdrop-blur-sm">
                  <p className="mb-1 font-mono text-[9px] uppercase tracking-widest text-accent">
                    ◈ Mission
                  </p>
                  <p className="line-clamp-3 text-xs leading-relaxed text-muted">
                    {info.mission}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-muted">
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
        <section className="px-6 pb-20 pt-12 lg:px-16 lg:pb-28 lg:pt-16">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mb-12 text-center"
            >
              <Label>{get('about.vision_label')}</Label>
              <h2 className="font-display text-3xl font-bold text-fg md:text-4xl">
                {get('about.vision_title')}
              </h2>
              <Rule center />
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {info.vision && (
                <motion.div
                  variants={fadeUp(0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                >
                  <Card>
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft">
                      <ReactIcon
                        name="FaLightbulb"
                        size={20}
                        className="text-accent"
                      />
                    </div>
                    <h3 className="mb-4 font-display text-xl font-bold text-fg">
                      {get('about.our_vision')}
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
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft">
                      <ReactIcon
                        name="FaRocket"
                        size={20}
                        className="text-accent"
                      />
                    </div>
                    <h3 className="mb-4 font-display text-xl font-bold text-fg">
                      {get('about.our_mission')}
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
        <section className="px-6 py-20 lg:px-16 lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <Label>{get('about.story_label')}</Label>
              <h2 className="mb-2 font-display text-3xl font-bold leading-tight text-fg md:text-4xl">
                {get('about.story_title')}
              </h2>
              <Rule />
              <p className="text-base leading-relaxed text-muted">{whoWeAre}</p>
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
                  className="mb-6 block text-accent opacity-[0.45]"
                />
                <p className="mb-6 text-lg font-medium italic leading-relaxed text-fg md:text-xl">
                  &ldquo;
                  {info.tagline}
                  &rdquo;
                </p>
                <div className="mb-4 h-px border-t border-glass-rim" />
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
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
      <section className="px-6 py-20 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mb-12 text-center"
          >
            <Label>{get('about.media_label')}</Label>
            <h2 className="font-display text-3xl font-bold text-fg md:text-4xl">
              {get('about.media_title')}
            </h2>
            <Rule center />
          </motion.div>

          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mx-auto max-w-4xl"
          >
            <MediaGallery />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          KEY FACTS  — aboutData grid
      ══════════════════════════════════════════════════ */}
      {(isLoading || aboutData.length > 0) && (
        <section className="px-6 py-20 lg:px-16 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mb-12 text-center"
            >
              <Label>{get('about.facts_label')}</Label>
              <h2 className="font-display text-3xl font-bold text-fg md:text-4xl">
                {get('about.facts_title')}
              </h2>
              <Rule center />
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                        <h3 className="mb-3 break-words text-lg font-semibold text-fg">
                          {String(section.components ?? '')}
                        </h3>
                        <p className="hyphens-auto break-words text-sm leading-relaxed text-muted">
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
