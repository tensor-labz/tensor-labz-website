import { memo, useState, FC, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useServiceContext } from "../../../../contexts/ServiceContext";
import { IoFilterSharp } from "react-icons/io5";
import  servicesData from "../../../../data/service_data";

const ServiceDropDown: FC = memo(() => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const { activeTab, setActiveTab } = useServiceContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);

  const options =servicesData.map((service) => ({title:service.service_name,slug:service.slug}));

  // Animation variants for smoother transitions
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.05, duration: 0.2 }
    })
  };

  // Tooltip animation variants
  const tooltipVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: 5,
      scale: 0.9,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <div className="relative md:hidden flex items-center justify-end w-full" ref={dropdownRef}>
      {/* Filter Button with Animation and Tooltip */}
      <div className="relative">
        <motion.button
          onClick={() => setToggle(!toggle)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-blue-700 "
          whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          aria-label="Filter services"
        >
          <IoFilterSharp className={`transform transition-transform ease-in-out duration-700 ${toggle ? 'rotate-180' : 'rotate-0'}`} />
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !toggle && (
            <motion.div
              variants={tooltipVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute -bottom-5 right-0 px-3 py-1 bg-blue-800 text-white text-xs rounded whitespace-nowrap z-50"
            >
              Filter Services
              <div className="absolute -top-1 right-4 w-2 h-2 bg-blue-800 transform rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated Dropdown Menu with improved transitions */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="absolute top-12 right-0 z-20 w-64 bg-white rounded-lg shadow-lg overflow-hidden"
            style={{
              originX: "top",
              originY: "right",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div className="max-h-60 overflow-y-auto py-1">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                Select Service
              </div>
              {options.map((option, index) => (
                <motion.button
                  key={option.slug}
                  custom={index}
                  variants={itemVariants}
                  onClick={() => {
                    setActiveTab(option);
                    setToggle(false);
                  }}
                  className={`w-full text-left px-4 py-3 flex items-center transition-colors
                    ${activeTab?.slug === option.slug
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'}`}
                  whileHover={{ x: 4 }}
                >
                  {activeTab?.slug === option.slug && (
                    <motion.span
                      className="w-1 h-5 bg-blue-500 rounded-full mr-2"
                      layoutId="activeIndicator"
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