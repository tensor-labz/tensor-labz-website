import { memo, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Page from "../components/resuable/Page";
import ServiceProvider from "../contexts/ServiceContext";
import ServiceHero from "../components/Page/Service/Hero/ServiceHero";
import TabBar from "../components/Page/Service/Tabs/TabBar";
import ServiceDropDown from "../components/Page/Service/Tabs/ServiceDropDown";
import ServiceContainer from "../components/Page/Service/Services/ServiceContainer";

const Services = memo(() => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      background: "linear-gradient(to top right, #66ccff 0%, #ffffff 25%)",
      transition: { duration: 0.8, ease: "easeInOut" },
    });
  }, [controls]);

  return (
    <Page HeadProps={{ title: "Services" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        className="min-h-screen flex flex-col items-center"
      >
        <ServiceProvider>
          {/* Grouping Hero & Tabs for Consistency */}
          <div className="w-full">
            <ServiceHero />
            <TabBar />
            <ServiceDropDown/>
          </div>
          <ServiceContainer/>
        </ServiceProvider>
      </motion.div>
    </Page>
  );
});

export default Services;
