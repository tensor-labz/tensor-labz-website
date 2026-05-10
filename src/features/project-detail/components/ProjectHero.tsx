import React, { memo, useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectServices } from '../../../store/servicesSlice';
import ReactIcon from '../../../shared/components/ui/ReactIcon';

import { EASE_EXPO } from '../../../lib/motion';

interface ProjectHeroProps {
  title: string;
  tags?: string[];
  className?: string;
  is_top?: boolean;
  serviceName?: string;
  description?: string;
}

const GetSupportButton: React.FC<{ title: string }> = memo(({ title }) => {
  const message = useMemo(
    () => encodeURIComponent(`Hello, I need assistance with the project: ${title}.`),
    [title]
  );
  return (
    <Link
      to={`https://wa.me/+94705359369?text=${message}`}
      className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full
        transition-all duration-300 backdrop-blur-sm border
        bg-white/10 hover:bg-white/20 text-white border-white/25 hover:border-white/50"
    >
      <ReactIcon name="FiMessageCircle" size={20} />
      <span className="font-medium">Get Support</span>
      <ReactIcon name="FiArrowRight" size={18} className="transition-transform group-hover:translate-x-1" />
    </Link>
  );
});
GetSupportButton.displayName = 'GetSupportButton';

const ProjectHero: React.FC<ProjectHeroProps> = ({
  title,
  tags = [],
  className = '',
  is_top = false,
  serviceName,
  description,
}) => {
  const services = useAppSelector(selectServices);

  const serviceMatch = serviceName
    ? services.find((s) => s.slug === serviceName)
    : null;

  const containerVariants = {
    hidden: { opacity: 0, y: -32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
  };

  const itemVariants = (delay: number) => ({
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE_EXPO } },
  });

  return (
    <motion.header
      className={`relative text-white md:py-11 py-16 px-4 md:px-8 overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-900/50 to-slate-950/70" />
      </motion.div>

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
      <div className="max-w-6xl mx-auto relative z-10 mt-6">
        {serviceName && (
          <motion.div
            className="mb-2 text-sm md:text-base opacity-80"
            variants={itemVariants(0.1)}
            initial="hidden"
            animate="visible"
          >
            <Link
              to={`/services/${serviceName}`}
              className="hover:underline font-medium text-sky-300"
            >
              {serviceMatch?.service_name ?? serviceName}
            </Link>
            <span className="mx-2 opacity-50">›</span>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 lg:pr-8">
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3 text-white font-display"
              variants={itemVariants(0.1)}
              initial="hidden"
              animate="visible"
            >
              {title}
              {is_top && (
                <ReactIcon name="FaCrown" size={20} className="inline-block text-amber-400 drop-shadow" />
              )}
            </motion.h1>

            <motion.div
              className="flex flex-wrap gap-2 mb-6"
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
          </div>

          <motion.div
            className="flex flex-col items-center lg:items-end gap-3 mt-4 lg:mt-0"
            variants={itemVariants(0.3)}
            initial="hidden"
            animate="visible"
          >
            <GetSupportButton title={title} />
            <div className="flex items-center gap-2">
              <Link to="/contact-us">
                <div className="p-2 rounded-full transition-all duration-300 cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white">
                  <ReactIcon name="FcOnlineSupport" size={24} />
                </div>
              </Link>
              <a
                href="tel:+94770484739"
                className="p-2 rounded-full cursor-pointer transition-all duration-300 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white"
              >
                <ReactIcon name="FiPhone" size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {description && (
          <motion.p
            className="text-base md:text-lg opacity-80 text-center w-full leading-relaxed text-white mt-2"
            variants={itemVariants(0.4)}
            initial="hidden"
            animate="visible"
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.header>
  );
};

export default memo(ProjectHero);
