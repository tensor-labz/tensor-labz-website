import React, { useState, useEffect, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectServices } from '../../../store/servicesSlice';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import data from '../../../data/data';

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
    () =>
      encodeURIComponent(
        `Hello, I need assistance with the project: ${title}.`
      ),
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fade = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transition: `opacity 0.7s ease ${delay}s`,
  });

  const slideDown = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(-40px)',
    transition: 'opacity 0.6s ease, transform 0.6s ease',
  };

  const serviceMatch = serviceName
    ? services.find((s) => s.slug === serviceName)
    : null;

  return (
    <header
      className={`relative text-white md:py-11 py-16 px-4 md:px-8 overflow-hidden ${className}`}
      style={slideDown}
    >
      {/* Background */}
      <div style={fade()} className="absolute inset-0 z-0">
        <img
          src={data?.project?.hero?.bg?.sm}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-900/50 to-slate-950/70" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10 mt-6">
        {serviceName && (
          <div
            className="mb-2 text-sm md:text-base opacity-80"
            style={fade(0.1)}
          >
            <Link
              to={`/services/${serviceName}`}
              className="hover:underline font-medium text-sky-300"
            >
              {serviceMatch?.service_name ?? serviceName}
            </Link>
            <span className="mx-2 opacity-50">›</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 lg:pr-8">
            <h1
              className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3 text-white font-display"
              style={fade(0.1)}
            >
              {title}
              {is_top && (
                <ReactIcon name="FaCrown" size={20} className="inline-block text-amber-400 drop-shadow" />
              )}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6" style={fade(0.2)}>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm text-white"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>

          <div
            className="flex flex-col items-center lg:items-end gap-3 mt-4 lg:mt-0"
            style={fade(0.3)}
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
          </div>
        </div>

        {description && (
          <p
            className="text-base md:text-lg opacity-80 text-center w-full leading-relaxed text-white mt-2"
            style={fade(0.4)}
          >
            {description}
          </p>
        )}
      </div>
    </header>
  );
};

export default memo(ProjectHero);
