import React, { memo } from 'react';
import Section from "../components/resuable/Section";
import Page from "../components/resuable/Page";
import bg from "../assets/vedio/Aboutus/bg.mp4";

interface AboutUsSectionProps {
  title: string;
  description: string;
}

const AboutUsSectionItem = memo(({ title, description }: AboutUsSectionProps) => (
  <div className="bg-blue-900/30 backdrop-blur-sm p-6 rounded-xl">
    <h3 className="text-2xl font-semibold text-blue-50 mb-3">{title}</h3>
    <p className="text-blue-100">{description}</p>
  </div>
));

const AboutUs: React.FC = memo(() => {
  const sectionData = [
    {
      title: "Mission",
      description: "Empowering businesses through innovative technology and strategic digital transformation."
    },
    {
      title: "Vision", 
      description: "To be the leading digital partner that turns complex challenges into seamless technological solutions."
    },
    {
      title: "Values",
      description: "Innovation, integrity, collaboration, and continuous learning drive everything we do."
    }
  ];

  return (
    <Page HeadProps={{title:"About Us"}}>
      <div className="relative h-screen w-full overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute z-0 w-full h-full object-cover brightness-50"
        >
          <source src={bg} type="video/mp4" />
        </video>

        <Section className="relative z-10 flex items-center justify-center h-full">
          <div className="max-w-4xl mx-auto text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-50">
              Transforming Visions into Digital Realities
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100 leading-relaxed">
              We are a passionate team of innovators dedicated to crafting cutting-edge digital solutions that drive business growth and technological advancement.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
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

AboutUs.displayName = 'AboutUs';
export default AboutUs;