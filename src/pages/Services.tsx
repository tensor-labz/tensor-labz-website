import { memo, useEffect } from "react";
import { motion, useAnimation } from "motion/react";
import Page from "../components/resuable/Page";
import ServiceHero from "../components/Page/Service/Hero/ServiceHero";
import TabBar from "../components/Page/Service/Tabs/TabBar";
import ServiceDropDown from "../components/Page/Service/Tabs/ServiceDropDown";
import ServiceContainer from "../components/Page/Service/Services/ServiceContainer";
// import { useProjectDataContext } from "../contexts/Api/ProjectDataContext";
// import ProjectPageLoading from "../components/Page/Project/ProjectPageLoading"

const Services = memo(() => {
  // const {isLoading}=useProjectDataContext()
  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      opacity: 1,
      backgroundColor: '#092B4A',
      transition: { duration: 0.6, ease: 'easeOut' },
    });
  }, []);


  return(
    <Page HeadProps={{ title: "Services" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        className="min-h-screen flex flex-col items-center bg-[#092B4A]"
      >
          {/* Grouping Hero & Tabs for Consistency */}
          <div className="w-full">
            <ServiceHero />
            <TabBar />
            <ServiceDropDown/>
          </div>
          <ServiceContainer/>
      </motion.div>
    </Page>
  );
});

export default Services;
