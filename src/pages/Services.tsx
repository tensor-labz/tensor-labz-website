import { memo } from "react";
import { motion } from "motion/react";
import Page from "../components/resuable/Page";
import ServiceHero from "../components/Page/Service/Hero/ServiceHero";
import TabBar from "../components/Page/Service/Tabs/TabBar";
import ServiceDropDown from "../components/Page/Service/Tabs/ServiceDropDown";
import ServiceContainer from "../components/Page/Service/Services/ServiceContainer";

const Services = memo(() => {
  return (
    <Page HeadProps={{ title: "Services" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="min-h-screen flex flex-col"
      >
        {/* Hero */}
        <ServiceHero />

        {/* Filter bar */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-6">
          <TabBar />
          <ServiceDropDown />
        </div>

        {/* Project grid */}
        <div className="flex-1">
          <ServiceContainer />
        </div>
      </motion.div>
    </Page>
  );
});

export default Services;
