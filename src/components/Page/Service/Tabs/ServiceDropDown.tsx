import { memo, useState, FC, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useServiceContext } from "../../../../contexts/ServiceContext";
import { IoFilterSharp } from "react-icons/io5";
import { useServiceDataContext } from "../../../../contexts/Api/ServiceApiContext";
import { ServiceCardProps } from "../../../../base/type/ServiceProps.d";

const ServiceDropDown: FC = memo(() => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const { activeTab, setActiveTab } = useServiceContext();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { service_data, isLoading } = useServiceDataContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToggle(false);
      }
    };
    if (toggle) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggle]);

  const options = isLoading ? [] : service_data?.map((service: ServiceCardProps) => ({
    title: service?.service_name,
    slug: service?.slug,
  }));

  const dropdownVariants = {
    hidden: { opacity: 0, y: -16, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.15 } },
  };

  return (
    <div className="relative md:hidden flex items-center justify-end w-full" ref={dropdownRef}>
      <div className="relative">
        <motion.button
          onClick={() => setToggle(!toggle)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--accent)', borderColor: 'var(--border)' }}
          className="flex items-center justify-center w-10 h-10 rounded-full border"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          aria-label="Filter services"
        >
          <IoFilterSharp className={`transition-transform duration-300 ${toggle ? 'rotate-180' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {showTooltip && !toggle && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-6 right-0 px-3 py-1 bg-slate-800 text-white text-xs rounded whitespace-nowrap z-50"
            >
              Filter Services
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {toggle && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            className="absolute top-12 right-0 z-20 w-64 rounded-lg shadow-xl overflow-hidden border"
          >
            <div className="max-h-60 overflow-y-auto py-1">
              <div
                className="px-4 py-2 text-[10px] font-semibold tracking-widest uppercase border-b"
                style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}
              >
                Select Service
              </div>
              {options.map((option: any, index: number) => (
                <motion.button
                  key={option.slug}
                  custom={index}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: index * 0.04 } }}
                  onClick={() => { setActiveTab(option); setToggle(false); }}
                  style={activeTab?.slug === option.slug
                    ? { color: 'var(--accent)', backgroundColor: 'var(--accent-soft)' }
                    : { color: 'var(--text-muted)' }
                  }
                  className="w-full text-left px-4 py-3 flex items-center text-sm
                    hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)] transition-colors"
                  whileHover={{ x: 4 }}
                >
                  {activeTab?.slug === option.slug && (
                    <motion.span
                      className="w-1 h-4 rounded-full mr-2 shrink-0"
                      style={{ backgroundColor: 'var(--accent)' }}
                      layoutId="mobileActiveIndicator"
                    />
                  )}
                  {option.title}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default ServiceDropDown;
