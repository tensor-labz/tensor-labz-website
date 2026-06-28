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
                style={{ top: 'var(--page-header-h, 4rem)' }}
                className="fixed inset-x-0 bottom-0 bg-black/40 backdrop-blur-sm z-[99]"
              />
              <motion.div
                key="panel"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                style={{ top: 'var(--page-header-h, 4rem)' }}
                className="fixed left-0 bottom-0 w-60 z-[100] flex flex-col shadow-2xl text-white
                  bg-slate-950/70 backdrop-blur-2xl
                  border-r border-white/10"
              >
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setOpen(false)}
                  aria-label="Close filter"
                  className="absolute top-3 -right-12 w-10 h-10 rounded-full flex items-center justify-center
                    bg-slate-900 border border-white/15 text-white/80 hover:text-white
                    shadow-lg transition-colors"
                >
                  <ReactIcon name="RiCloseLine" size={20} />
                </motion.button>

                <nav className="flex flex-col pt-2 flex-1 min-h-0 overflow-y-auto">
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
                        className={`w-full text-left px-5 py-3.5 text-[11px] font-semibold tracking-wider uppercase
                          flex items-center gap-2.5 transition-colors ${
                            isActive
                              ? 'text-[var(--accent)] bg-white/[0.06]'
                              : 'text-white/55 hover:text-white hover:bg-white/[0.04]'
                          }`}
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
