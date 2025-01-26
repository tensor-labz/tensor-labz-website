import React from 'react';
import Section from "../components/resuable/Section";
import Page from "../components/resuable/Page";

export default function AboutUs() {
  return (
    <Page HeadProps={{title:"About Us"}}>
      <div className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute z-0 w-full h-full object-cover brightness-50"
        >
          <source src="/path/to/professional-background.mp4" type="video/mp4" />
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
              <div className="bg-blue-900/30 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-blue-50 mb-3">Mission</h3>
                <p className="text-blue-100">
                  Empowering businesses through innovative technology and strategic digital transformation.
                </p>
              </div>
              <div className="bg-blue-900/30 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-blue-50 mb-3">Vision</h3>
                <p className="text-blue-100">
                  To be the leading digital partner that turns complex challenges into seamless technological solutions.
                </p>
              </div>
              <div className="bg-blue-900/30 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-blue-50 mb-3">Values</h3>
                <p className="text-blue-100">
                  Innovation, integrity, collaboration, and continuous learning drive everything we do.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </Page>
  );
}