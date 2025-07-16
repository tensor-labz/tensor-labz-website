import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDeviceContext } from "../../../contexts/DeviceContext";
import { useRootContext } from "../../../contexts/RootContext";
import { useServiceDataContext } from "../../../contexts/Api/ServiceApiContext";
import { FaCrown } from "react-icons/fa";
import { FiArrowRight, FiMessageCircle, FiPhone } from "react-icons/fi";
import { FcOnlineSupport } from "react-icons/fc";

interface ResponsiveBackgroundHeaderProps {
  title: string;
  tags: string[];
  className?: string;
  is_top?: boolean;
  serviceName?: string;
  description?: string;
  bgType?: "light" | "dark";
}

const ProjectHero: React.FC<ResponsiveBackgroundHeaderProps> = ({
  title,
  tags = [],
  className = "",
  is_top = false,
  serviceName,
  description,
  bgType = "dark",
}) => {
  const device = useDeviceContext();
  const { Data } = useRootContext();
  const { service_data } = useServiceDataContext();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeInStyles = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(-50px)",
    transition: "opacity 0.6s ease, transform 0.6s ease",
  };

  const contentFadeInStyles = {
    opacity: isVisible ? 1 : 0,
    transition: "opacity 0.8s ease 0.2s",
  };

  const tagsFadeInStyles = {
    opacity: isVisible ? 1 : 0,
    transition: "opacity 0.8s ease 0.4s",
  };

  const contactButtonStyles = {
    opacity: isVisible ? 1 : 0,
    transition: "opacity 0.8s ease 0.6s",
  };

  const isLargeDevice = device === "lg" || device === "xl" || device === "2xl";

  // Dynamic text colors
  const textColor = bgType === "light" ? "text-gray-900" : "text-white";
  const tagColor = bgType === "light" ? "bg-black/70 text-white" : "bg-white/70 text-gray-800";

  return (
    <header
      className={`relative ${textColor} py-11 px-4 md:px-8 overflow-hidden ${className}`}
      style={fadeInStyles}
    >
      {/* Background */}
      {isLargeDevice ? (
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
          <div
            className={`absolute inset-0 ${
              bgType === "light"
                ? "bg-gradient-to-r from-white/70 via-white/40 to-transparent"
                : "bg-gradient-to-r from-blue-900/60 via-blue-300/40 to-transparent"
            }`}
          />
        </div>
      ) : (
        <div
          style={{ opacity: isVisible ? 1 : 0, transition: "opacity 1s ease" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={Data?.project?.hero?.bg?.sm}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 ${
              bgType === "light"
                ? "bg-gradient-to-b from-white/70 via-white/40 to-transparent"
                : "bg-gradient-to-b from-blue-900/60 via-blue-700/40 to-transparent"
            }`}
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        {serviceName && (
          <div
            className={`mb-2 text-sm md:text-base opacity-90`}
            style={contentFadeInStyles}
          >
            <Link
              to={`/services/${serviceName}`}
              className="hover:underline font-medium"
            >
              {
                service_data?.find(
                  (service: any) => service.slug === serviceName
                )?.service_name
              }
            </Link>
            <span className="mx-2">›</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          {/* Left Content */}
          <div className="flex-1 lg:pr-8">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3"
              style={contentFadeInStyles}
            >
              {title}
              {is_top && (
                <FaCrown
                  className={`inline-block text-xl md:text-2xl ${
                    bgType === "light" ? "text-yellow-500" : "text-yellow-400"
                  }`}
                />
              )}
            </h1>

            {description && (
              <p
                className="text-lg md:text-xl mb-6 opacity-90 leading-relaxed"
                style={contentFadeInStyles}
              >
                {description}
              </p>
            )}

            <div
              className="flex flex-wrap gap-3 mb-6"
              style={tagsFadeInStyles}
            >
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${tagColor}`}
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Professional Contact Section */}
          <div
            className="flex flex-col items-center lg:items-end space-y-4 mt-6 lg:mt-0"
            style={contactButtonStyles}
          >
            {/* Main Contact Button */}
            <Link
              to={`https://wa.me/+94705359369?text=${encodeURIComponent(
                `Hello, I need assistance with the project: ${title}.`)}`}
              className={`group relative inline-flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                bgType === "light"
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                  : "md:bg-blue-700/10 bg-white md:hover:bg-blue-700/20 hover:bg-white/50  backdrop-blur-sm border text-blue-900 md:border-sky-900/20 md:hover:border-sky-900/40 border-white/20 hover:border-white/40"
              }`}
            >
              <FiMessageCircle className="text-xl" />
              <span className="font-medium">Get Support</span>
              <FiArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Quick Contact Icons */}
            <div className="flex items-center gap-2">
            <Link  to='/contact-us'>

              <div
                className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${
                  bgType === "light"
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    : "bg-white hover:bg-white/60 backdrop-blur-sm border border-sky/20 lg:border-sky-900/20 hover:border-white/40"
                }`}
                title="Live Chat Support"
              >
                <FcOnlineSupport className="text-2xl" />
              </div>
</Link>
              <a href='tel:+94705951199'
                className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${
                  bgType === "light"
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    : "bg-white hover:bg-white/60 backdrop-blur-sm border text-blue-700 border-sky/20 lg:border-sky-900/20 hover:border-white/40"
                }`}
                title="Call Us"
              >
                <FiPhone className="text-xl" />
              </a>
</div>

            {/* Support Text */}
            <p className="text-sm text-black lg:text-sky-900 text-center lg:text-right md:block hidden">
              24/7 Customer Support
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(ProjectHero);