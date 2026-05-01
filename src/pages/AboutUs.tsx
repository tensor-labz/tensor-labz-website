import React, { memo } from "react";
import Section from "../components/resuable/Section";
import Page from "../components/resuable/Page";
import { useRootContext } from "../contexts/RootContext";
import AboutUsSectionItem from "../components/Page/Aboutus/AboutUsSection";
import { useAboutusDataContext } from "../contexts/Api/AboutusDataContext";
import Placeholder from "../components/Page/Aboutus/LoadingPlaceHolder";

const AboutUs: React.FC = memo(() => {
  const { aboutus_data, isLoading } = useAboutusDataContext();
  const { Data } = useRootContext();
  return (
    <Page HeadProps={{ title: "About Us" }}>
      <div className="relative min-h-screen h-[1250px] md:h-[900px] lg:h-screen w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <picture className="absolute inset-0 -z-10">
            <source media="(min-width: 768px)" srcSet={Data?.contactus?.bg?.lg} />
            <source media="(min-width: 480px)" srcSet={Data?.contactus?.bg?.md} />
            <img src={Data?.contactus?.bg?.sm} alt="" className="w-full h-full object-cover" />
          </picture>
        </div>

        {/* Content Section */}
        <Section className="relative z-10 flex items-center justify-center h-full">
          <div className="w-11/12 relative mx-auto text-center p-8 sm:mt-0 lg:mt-8 md:mt-14 rounded-2xl shadow-2xl backdrop-blur-md" style={{ paddingTop: '6rem' }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 md:text-blue-900 text-white shadow-sm leading-relaxed">
              {Data?.aboutus?.title ?? "About Us"}
            </h1>
            <p className="text-lg md:text-xl mb-8 md:text-gray-800 text-slate-100 leading-relaxed">
              {Data?.aboutus?.content ?? "About us description not available."}
            </p>

            {/* Section Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
              {isLoading
                ? Array(3).fill("").map((_, i) => <Placeholder key={i} />)
                : aboutus_data?.map((section: any, index: number) => (
                    <AboutUsSectionItem
                      key={`aboutus-${index}`}
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
