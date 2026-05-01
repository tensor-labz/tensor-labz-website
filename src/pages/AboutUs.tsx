import React, { memo } from "react";
import { motion } from "motion/react";
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
      <div className="relative min-h-screen w-full">

        {/* Background image with theme-aware overlay */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(min-width: 768px)" srcSet={Data?.contactus?.bg?.lg} />
            <source media="(min-width: 480px)" srcSet={Data?.contactus?.bg?.md} />
            <img src={Data?.contactus?.bg?.sm} alt="" className="w-full h-full object-cover" />
          </picture>
          <div className="absolute inset-0 dark:bg-slate-950/70" />
        </div>

        {/* Content */}
        <Section className="relative z-10 flex items-center justify-center min-h-screen py-32 px-4">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl mx-auto text-center rounded-2xl
              bg-white/5 dark:bg-white/3 backdrop-blur-md
              border border-white/10 p-8 sm:p-12"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight"
              style={{ fontFamily: '"Syne", sans-serif' }}
            >
              {Data?.aboutus?.title ?? "About Us"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base md:text-lg mb-10 text-white/70 leading-relaxed max-w-3xl mx-auto"
            >
              {Data?.aboutus?.content ?? "About us description not available."}
            </motion.p>

            {/* Section items */}
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
          </motion.div>
        </Section>
      </div>
    </Page>
  );
});

AboutUs.displayName = "AboutUs";
export default AboutUs;
