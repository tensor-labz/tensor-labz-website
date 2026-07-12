import { memo, useState, FC } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import { useServicesPageController } from '../hooks/useServicesPageController';

/**
 * Service filter (desktop + mobile): a small handle floating on the left edge of
 * the viewport that stays put while scrolling. Clicking it slides a left drawer
 * in; selecting a service navigates and closes the drawer.
 */
const ServiceFilterDrawer: FC = memo(() => {
  const [open, setOpen] = useState(false);
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
        className="fixed left-0 top-1/2 z-40 flex h-14 w-9 -translate-y-1/2 items-center justify-center rounded-r-xl border border-l-0 shadow-lg"
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
                style={{ top: 'var(--page-header-h, 4rem)' }}
                className="fixed inset-x-0 bottom-0 z-[99] bg-black/40 backdrop-blur-sm"
              />
              <motion.div
                key="panel"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                style={{ top: 'var(--page-header-h, 4rem)' }}
                className="fixed bottom-0 left-0 z-[100] flex w-60 flex-col border-r border-white/10 bg-slate-950/70 text-white shadow-2xl backdrop-blur-2xl"
              >
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setOpen(false)}
                  aria-label="Close filter"
                  className="absolute -right-12 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-900 text-white/80 shadow-lg transition-colors hover:text-white"
                >
                  <ReactIcon name="RiCloseLine" size={20} />
                </motion.button>

                <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto pt-2">
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
                        className={`flex w-full items-center gap-2.5 px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                          isActive
                            ? 'bg-white/[0.06] text-[var(--accent)]'
                            : 'text-white/55 hover:bg-white/[0.04] hover:text-white'
                        }`}
                      >
                        <span
                          className="h-4 w-1 shrink-0 rounded-full"
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
