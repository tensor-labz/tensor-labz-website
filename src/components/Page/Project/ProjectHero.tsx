import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDeviceContext } from "../../../contexts/DeviceContext";
import { useRootContext } from "../../../contexts/RootContext";
import { useServiceDataContext } from "../../../contexts/Api/ServiceApiContext";
import { FaCrown } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

interface ResponsiveBackgroundHeaderProps {
  title: string;
  tags: string[];
  className?: string;
  is_top?: boolean;
  serviceName?: string;
  bgType?: "light" | "dark"; // ✅ ADD: control content color
}

const ProjectHero: React.FC<ResponsiveBackgroundHeaderProps> = ({
  title,
  tags = [],
  className = "",
  is_top = false,
  serviceName,
  bgType = "dark", // ✅ default to dark bg
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

  const isLargeDevice = device === "lg" || device === "xl" || device === "2xl";

  // ✅ Dynamic text colors
  const textColor = bgType === "light" ? "text-gray-900" : "text-white";
  const tagColor = bgType === "light" ? "bg-black/70 text-white" : "bg-white/70 text-gray-800";

  return (
    <header
      className={`relative ${textColor} py-20 px-4 md:px-8 overflow-hidden ${className}`}
      style={fadeInStyles}
    >
      {/* ✅ Background */}
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
                : "bg-gradient-to-r from-blue-900/60 via-blue-700/40 to-transparent"
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

      {/* ✅ Content */}
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

        <Link
          to="/contact-us"
          className={`inline-flex items-center gap-2 px-5 py-3 ${
            bgType === "light"
              ? "bg-black/80 text-white hover:bg-black"
              : "bg-white/80 text-sky-700 hover:text-sky-900 hover:bg-white"
          } rounded-full text-sm font-medium transition`}
          style={contentFadeInStyles}
        >
          Enquire More <FiArrowRight />
        </Link>
      </div>
    </header>
  );
};

export default React.memo(ProjectHero);
