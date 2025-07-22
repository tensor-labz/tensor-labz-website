import React, { useState, useEffect,memo,useMemo } from "react";
import { Link } from "react-router-dom";
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
}

type GetSupportButtonProps = {
  title:string
}

const GetSupportButton: React.FC<GetSupportButtonProps> = memo(({title}:GetSupportButtonProps) => {
  const message: string = useMemo(() => encodeURIComponent(`Hello, I need assistance with the project: ${title}.`), [title])
  return (
      <Link
              to={`https://wa.me/+94705359369?text=${
                message}`}
              className={`group relative inline-flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300  bg-white  hover:bg-blue-50  backdrop-blur-sm border text-blue-900 hover:text-blue-700 border-white/20 hover:border-white"
              }`}
            >
              <FiMessageCircle className="text-xl" />
              <span className="font-medium">Get Support</span>
              <FiArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
            </Link>
  )
})
const ProjectHero: React.FC<ResponsiveBackgroundHeaderProps> = ({
  title,
  tags = [],
  className = "",
  is_top = false,
  serviceName,
  description,
}) => {

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



  // Dynamic text colors
  const textColor = "text-white";


  return (
    <header
      className={`relative ${textColor} py-11 px-4 md:px-8 overflow-hidden ${className}`}
      style={fadeInStyles}
    >
      {/* Background */}
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
            className="absolute inset-0 md:bg-gradient-to-t bg-gradient-to-b from-blue-900/60 via-blue-700/40 to-transparent"
          />
        </div>


      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10 mt-6">
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
              className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3"
              style={contentFadeInStyles}
            >
              {title}
              {is_top && (
                 <FaCrown
    className="inline-block text-xl md:text-2xl text-white drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]"
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
                  className={`px-3 py-1 rounded-full text-sm bg-white/90 text-sky-900`}
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
            <GetSupportButton title={ title} />
            {/* Quick Contact Icons */}
            <div className="flex items-center gap-2">
            <Link  to='/contact-us'>

              <div
                className={`p-2 rounded-full transition-all duration-300 cursor-pointer   bg-white  hover:bg-blue-50  backdrop-blur-sm border text-blue-900 hover:text-blue-700 border-white/20 hover:border-white`}
                title="Live Chat Support"
              >
                <FcOnlineSupport className="text-2xl" />
              </div>
</Link>
              <a href='tel:+94705951199'
                className={"p-2 rounded-full cursor-pointer transition-all duration-300  bg-white  hover:bg-blue-50  backdrop-blur-sm border text-blue-900 hover:text-blue-700 border-white/20 hover:border-white"}
                title="Call Us"
              >
                <FiPhone className="text-xl" />
              </a>
</div>

            {/* Support Text */}
            <p className="text-sm text-white  text-center lg:text-right md:block hidden">
              24/7 Customer Support

            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(ProjectHero);