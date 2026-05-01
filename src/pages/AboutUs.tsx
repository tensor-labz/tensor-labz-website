import React, { memo, Suspense } from "react";
import { motion } from "motion/react";
import Page from "../components/resuable/Page";
import { useRootContext } from "../contexts/RootContext";
import AboutUsSectionItem from "../components/Page/Aboutus/AboutUsSection";
import { useAboutusDataContext } from "../contexts/Api/AboutusDataContext";
import Placeholder from "../components/Page/Aboutus/LoadingPlaceHolder";
import PageBackground from "../components/three/PageBackground";

const AboutUs: React.FC = memo(() => {
  const { aboutus_data, isLoading } = useAboutusDataContext();
  const { Data } = useRootContext();

  return (
    <Page HeadProps={{ title: "About Us" }}>
      <div
        className="relative min-h-screen w-full"
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        {/* Three.js animated background */}
        <Suspense fallback={null}>
          <PageBackground />
        </Suspense>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen py-32 px-4">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl mx-auto text-center rounded-2xl p-8 sm:p-12"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-4 block"
              style={{ color: 'var(--accent)' }}
            >
              Who We Are
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}
            >
              {Data?.aboutus?.title ?? "About Us"}
            </motion.h1>

            {/* Accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '3rem' }}
              transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
              className="h-1 rounded-full mx-auto mb-8"
              style={{ backgroundColor: 'var(--accent)' }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base md:text-lg mb-12 leading-relaxed max-w-3xl mx-auto"
              style={{ color: 'var(--text-muted)' }}
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
        </div>
      </div>
    </Page>
  );
});

AboutUs.displayName = "AboutUs";
export default AboutUs;
