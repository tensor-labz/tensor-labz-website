import React, { memo } from "react";
import Section from "../components/resuable/Section";
import Page from "../components/resuable/Page";
import { useRootContext } from "../contexts/RootContext";
import AboutUsSectionItem from "../components/Page/Aboutus/AboutUsSection";
import { useAboutusDataContext } from "../contexts/Api/AboutusDataContext";
import Placeholder from "../components/Page/Aboutus/LoadingPlaceHolder";


const AboutUs: React.FC = memo(() => {
  const { aboutus_data ,isLoading} = useAboutusDataContext()
  const {Data}=useRootContext()
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
          <div className="w-11/12 relative  mx-auto text-center p-8 sm:mt-0 mt-8 rounded-2xl shadow-2xl backdrop-blur-sm">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-900 shadow-sm">
              {Data?.aboutus?.title?? "About Us"}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-800 leading-relaxed">
            {Data?.aboutus?.content?? "About us description not available."}
            </p>

            {/* Section Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center ">
              {isLoading ? (Array(3).fill("").map((_, i) => (<Placeholder key={ i} />))):aboutus_data?.map((section:any, index:number) => (
                <AboutUsSectionItem
                  key={index}
                  title={section?.components}
                  description={section?.value}
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