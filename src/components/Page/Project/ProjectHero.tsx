import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDeviceContext } from '../../../contexts/DeviceContext';
import { useRootContext } from '../../../contexts/RootContext';
import { useServiceDataContext } from '../../../contexts/Api/ServiceApiContext';

interface ResponsiveBackgroundHeaderProps {
  title: string;
  tags: string[];
  className?: string;
  is_top?: boolean;
  serviceName?: string;
}

const ProjectHero: React.FC<ResponsiveBackgroundHeaderProps> = ({
  title,
  tags = [],
  className = "",
  is_top = false,
  serviceName,
}) => {
  const device = useDeviceContext();
  const { Data } = useRootContext();
  const [isVisible, setIsVisible] = useState(false);
  const { service_data} = useServiceDataContext();
  // Animation effect on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation styles using standard CSS transitions instead of framer-motion
  const fadeInStyles = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(-50px)',
    transition: 'opacity 0.6s ease, transform 0.6s ease'
  };

  const contentFadeInStyles = {
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.8s ease 0.2s'
  };

  const tagsFadeInStyles = {
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.8s ease 0.4s'
  };

  const isLargeDevice = device === "lg" || device === "xl" || device === "2xl";

  return (
    <header
      className={`relative text-white py-16 px-4 md:px-8 overflow-hidden ${className}`}
      style={fadeInStyles}
    >
      {/* Background media based on device size */}
      {isLargeDevice ? (
        // Video background for large devices
        <div className="absolute inset-0 z-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={Data?.project?.hero?.bg?.lg} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay for better text visibility */}
          <div className={`absolute inset-0 ${is_top ? 'bg-gradient-to-r from-gray-900 to-yellow-900 opacity-70' : 'bg-gradient-to-r from-gray-300 to-indigo-400 opacity-80'}`} />
        </div>
      ) : (
        // Image background for smaller devices
        <div
          style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={Data?.project?.hero?.bg?.sm}
            alt="Hero Background"
            className={`w-full h-full object-cover ${is_top ? 'brightness-90' : 'brightness-75'}`}
          />
          {is_top && <div className="absolute inset-0 bg-gradient-to-b from-yellow-900 to-transparent opacity-30" />}
        </div>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        {serviceName && (
          <div
            className="mb-2 text-sm md:text-base opacity-90"
            style={contentFadeInStyles}
          >
            <Link to={`/services/${serviceName}`} className="hover:underline">
              {service_data?.find((service: any) => service.slug === serviceName)?.service_name}
            </Link>
            <span className="mx-2">›</span>
          </div>
        )}

        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={contentFadeInStyles}
        >
          {title}
        </h1>

        <div
          className="flex flex-wrap gap-3"
          style={tagsFadeInStyles}
        >
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm ${is_top ? 'bg-yellow-500 bg-opacity-20 text-yellow-100' : 'bg-white text-sky-600'}`}
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(ProjectHero);