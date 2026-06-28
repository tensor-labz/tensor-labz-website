import React, { memo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import ReactIcon from '../ui/ReactIcon';
import { EASE_EXPO } from '../../../lib/motion';

interface SearchControl {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
}

interface ContentHeaderProps {
  /** Small line above the title — a label (services) or a breadcrumb (project). */
  eyebrow?: React.ReactNode;
  title: string;
  /** Inline element next to the title, e.g. a crown badge. */
  titleAdornment?: React.ReactNode;
  description?: string;
  /** Chip row under the title. */
  tags?: string[];
  /** Right-aligned action cluster (e.g. support / contact buttons). */
  actions?: React.ReactNode;
  /** Optional search bar rendered under the header content. */
  search?: SearchControl;
  /** Center the eyebrow, title, and tags (list pages); default is left-aligned. */
  centered?: boolean;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: -32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_EXPO },
  },
};

const itemVariants = (delay: number) => ({
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: EASE_EXPO },
  },
});

/**
 * Shared page header used by both the services and project pages — same design
 * and structure, varying only by the props each page supplies.
 */
const ContentHeader: React.FC<ContentHeaderProps> = ({
  eyebrow,
  title,
  titleAdornment,
  description,
  tags = [],
  actions,
  search,
  centered = false,
  className = '',
}) => {
  const headerRef = useRef<HTMLElement>(null);

  // Publish the sticky header's height so the filter drawer can start below it.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setVar = () =>
      document.documentElement.style.setProperty(
        '--page-header-h',
        `${el.offsetHeight}px`
      );
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty('--page-header-h');
    };
  }, []);

  return (
    <motion.header
      ref={headerRef}
      className={`sticky top-0 z-30 bg-canvas text-white pt-20 pb-4 md:pt-20 md:pb-5 px-4 md:px-8 overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-900/50 to-slate-950/70" />
      </motion.div>

      {/* Colorful glow blobs — give the frosted-glass elements something to blur */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 left-[12%] w-72 h-72 rounded-full bg-sky-500/30 blur-3xl" />
        <div className="absolute -top-8 right-[16%] w-80 h-80 rounded-full bg-violet-500/25 blur-3xl" />
        <div className="absolute bottom-[-4rem] left-1/2 -translate-x-1/2 w-[36rem] h-44 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      {/* Engineering grid overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div
        className={`max-w-6xl mx-auto relative z-10 ${centered ? 'text-center' : ''}`}
      >
        {eyebrow && (
          <motion.div
            className="mb-2 text-[11px] md:text-xs font-mono tracking-[0.2em] uppercase text-accent"
            variants={itemVariants(0.1)}
            initial="hidden"
            animate="visible"
          >
            {eyebrow}
          </motion.div>
        )}

        <div
          className={`flex flex-col lg:flex-row lg:items-start ${
            centered ? 'lg:justify-center' : 'lg:justify-between'
          }`}
        >
          <div className={centered ? '' : 'flex-1 lg:pr-8'}>
            <motion.h1
              className={`text-xl md:text-2xl font-bold mb-2 flex items-center gap-3 text-white font-display ${
                centered ? 'justify-center' : ''
              }`}
              variants={itemVariants(0.1)}
              initial="hidden"
              animate="visible"
            >
              {title}
              {titleAdornment}
            </motion.h1>

            {tags.length > 0 && (
              <motion.div
                className={`flex flex-wrap gap-2 mb-6 ${centered ? 'justify-center' : ''}`}
                variants={itemVariants(0.2)}
                initial="hidden"
                animate="visible"
              >
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-sm text-white border border-white/20 bg-white/10"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </motion.div>
            )}
          </div>

          {actions && (
            <motion.div
              className="flex flex-col items-center lg:items-end gap-3 mt-4 lg:mt-0"
              variants={itemVariants(0.3)}
              initial="hidden"
              animate="visible"
            >
              {actions}
            </motion.div>
          )}
        </div>

        {description && (
          <motion.p
            className="text-sm opacity-70 text-center w-full leading-relaxed text-white mt-1"
            variants={itemVariants(0.4)}
            initial="hidden"
            animate="visible"
          >
            {description}
          </motion.p>
        )}

        {search && (
          <motion.div
            className="relative max-w-lg mx-auto mt-5"
            variants={itemVariants(0.5)}
            initial="hidden"
            animate="visible"
          >
            <ReactIcon
              name="FiSearch"
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/45 pointer-events-none"
            />
            <input
              type="text"
              value={search.value}
              onChange={search.onChange}
              placeholder={search.placeholder ?? 'Search…'}
              className="w-full pl-11 pr-10 py-3 rounded-xl border-0 bg-white/[0.07] text-white text-sm
                ring-1 ring-inset ring-white/20 backdrop-blur-xl
                placeholder:text-white/45 placeholder:font-mono shadow-lg shadow-black/20
                focus:outline-none focus:bg-white/[0.12] focus:ring-white/35 transition-all duration-200"
            />
            {search.value && (
              <button
                type="button"
                onClick={search.onClear}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
              >
                <ReactIcon name="FiX" size={14} />
              </button>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default memo(ContentHeader);
