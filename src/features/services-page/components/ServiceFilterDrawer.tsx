import { memo, useState, FC } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import { useTheme } from '../../../shared/hooks/useTheme';
import { useServicesPageController } from '../hooks/useServicesPageController';

/**
 * Service filter (desktop + mobile): a small handle floating on the left edge of
 * the viewport that stays put while scrolling. Clicking it slides a left drawer
 * in; selecting a service navigates and closes the drawer.
 */
const ServiceFilterDrawer: FC = memo(() => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const { services, activeSlug, setActiveSlug, isLoading } =
    useServicesPageController();

  const options = isLoading
    ? []
    : [
        { title: 'All', slug: 'all' },
        ...services.map((s) => ({ title: s.service_name, slug: s.slug })),
      ];

  const select = (slug: string) => {
    setActiveSlug(slug);
    setOpen(false);
  };

  return (
    <>
      {/* Floating left-edge handle */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open service filter"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border)',
          color: 'var(--accent)',
        }}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center
          w-9 h-14 rounded-r-xl border border-l-0 shadow-lg"
      >
        <motion.span
          className="flex"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ReactIcon name="RiArrowRightDoubleLine" size={18} />
        </motion.span>
      </motion.button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99]"
              />
              <motion.div
                key="panel"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                style={{
                  backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
                  borderColor: 'var(--border)',
                }}
                className="fixed top-0 left-0 h-full w-72 border-r z-[100] flex flex-col shadow-2xl"
              >
                <div
                  className="flex items-center justify-end px-6 py-4 border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpen(false)}
                    aria-label="Close filter"
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-2xl transition-colors"
                  >
                    <ReactIcon name="RiCloseLine" size={22} />
                  </motion.button>
                </div>

                <nav className="flex flex-col mt-2 overflow-y-auto">
                  {options.map((option, i) => {
                    const isActive = option.slug === activeSlug;
                    return (
                      <motion.button
                        key={option.slug}
                        type="button"
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 + 0.08, duration: 0.3 }}
                        onClick={() => select(option.slug)}
                        style={
                          isActive
                            ? {
                                color: 'var(--accent)',
                                backgroundColor: 'var(--accent-soft)',
                              }
                            : { color: 'var(--text-muted)' }
                        }
                        className="w-full text-left px-6 py-4 text-xs font-semibold tracking-widest uppercase
                          border-b flex items-center gap-3 transition-colors
                          hover:text-[var(--text-primary)] hover:bg-[var(--bg-raised)]"
                      >
                        <span
                          className="w-1 h-4 rounded-full shrink-0"
                          style={{
                            backgroundColor: isActive
                              ? 'var(--accent)'
                              : 'transparent',
                          }}
                        />
                        {option.title}
                      </motion.button>
                    );
                  })}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
});

ServiceFilterDrawer.displayName = 'ServiceFilterDrawer';
export default ServiceFilterDrawer;
