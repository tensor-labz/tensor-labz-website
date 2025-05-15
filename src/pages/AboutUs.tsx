import React, { memo } from "react";
import Section from "../components/resuable/Section";
import Page from "../components/resuable/Page";

import { useAppContext } from "../contexts/Api/AppContext";
import { useRootContext } from "../contexts/RootContext";

interface AboutUsSectionProps {
  title: string;
  description: string;
}

const AboutUsSectionItem = memo(({ title, description }: AboutUsSectionProps) => (
  <div className="bg-white/80 p-6 rounded-xl border border-gray-300 shadow-lg">
    <h3 className="text-2xl font-semibold text-blue-900 mb-3">{title}</h3>
    <p className="text-gray-800 leading-relaxed">{description}</p>
  </div>
));

const AboutUs: React.FC = memo(() => {
  const { data } = useAppContext()
  const {Data}=useRootContext()
  const sectionData = [
    {
      title: "Mission",
      description:data?.mission || "Mission statement not available.",
    },
    {
      title: "Vision",
      description: data?.vision || "Vision statement not available.",
    },
    {
      title: "Values",
      description: data?.values || "Values statement not available.",
    },
  ];

  return (
    <Page HeadProps={{ title: "About Us" }}>
      <div className="relative min-h-screen h-[1000px] sm:h-screen w-full">
        {/* Background Video/Image Container */}
        <div className="absolute inset-0 z-0">
          {/* Video for larger screens (>=768px) */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hidden md:block absolute w-full h-full object-cover brightness-100"
          >
            <source src={Data?.aboutus?.bg?.lg} type="video/mp4" />
          </video>

          {/* Background image for smaller screens (<768px) */}
          <img
            src={Data?.aboutus?.bg?.md}
            alt="Background"
            className="md:hidden w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <Section className="relative z-10 flex items-center justify-center h-full">
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-200/50 via-white/80 to-blue-200/50 z-0" />
          <div className="relative max-w-4xl mx-auto text-center px-6 sm:mt-0 mt-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-900 shadow-sm">
              {data?.aboutus_title?? "About Us"}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-800 leading-relaxed">
            {data?.aboutus_desc?? "About us description not available."}
            </p>

            {/* Section Items */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
              {sectionData.map((section, index) => (
                <AboutUsSectionItem
                  key={index}
                  title={section.title}
                  description={section.description}
                />
              ))}
            </div>
          </div>
        </Section>
      </div>
    </Page>
  );
});

AboutUs.displayName = "AboutUs";
export default AboutUs;