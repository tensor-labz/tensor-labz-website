import React, { memo } from "react";
import Section from "../components/resuable/Section";
import Page from "../components/resuable/Page";
import bg from "../assets/vedio/Aboutus/bg.mp4";

interface AboutUsSectionProps {
  title: string;
  description: string;
}

const AboutUsSectionItem = memo(({ title, description }: AboutUsSectionProps) => (
  <div className="bg-white/80 p-6 rounded-xl border border-gray-300 shadow-lg ">
    <h3 className="text-2xl font-semibold text-blue-900 mb-3">{title}</h3>
    <p className="text-gray-800 leading-relaxed">{description}</p>
  </div>
));

const AboutUs: React.FC = memo(() => {
  const sectionData = [
    {
      title: "Mission",
      description: "Empowering businesses through innovative technology and strategic digital transformation.",
    },
    {
      title: "Vision",
      description: "To be the leading digital partner that turns complex challenges into seamless technological solutions.",
    },
    {
      title: "Values",
      description: "Innovation, integrity, collaboration, and continuous learning drive everything we do.",
    },
  ];

  return (
    <Page HeadProps={{ title: "About Us" }}>
      <div className="relative min-h-screen h-[1000px] sm:h-screen w-full">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-full h-full object-cover brightness-100"
        >
          <source src={bg} type="video/mp4" />
        </video>

        {/* Content Section */}
        <Section className="relative z-10 flex items-center justify-center h-full">
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-200/50 via-white/80 to-blue-200/50 z-0" />
          <div className="relative max-w-4xl mx-auto text-center px-6 sm:mt-0 mt-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-900 shadow-sm">
              Transforming Visions into Digital Realities
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-800 leading-relaxed">
              We are a passionate team of innovators dedicated to crafting cutting-edge digital solutions that drive business growth and technological advancement.
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
