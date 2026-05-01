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
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="min-h-screen flex flex-col items-center"
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        <div className="w-full">
          <ServiceHero />
          <TabBar />
          <ServiceDropDown />
        </div>
        <ServiceContainer />
      </motion.div>
    </Page>
  );
});

export default Services;
