import Page from "../components/resuable/Page";
import { useEffect } from "react";
import { useAnimation } from 'framer-motion';
import ServiceProvider from "../contexts/ServiceContext";
import ServiceHero from "../components/Page/Service/Hero/ServiceHero";
import TabBar from "../components/Page/Service/Tabs/TabBar";

export default function Services() {
  const controls=useAnimation()
  useEffect(()=>{
    controls.start({
      opacity: 1,
      background: "linear-gradient(to top right, #66ccff 0%, #ffffff 25%)",
      transition: { duration: 0.8, ease: "easeInOut" },
    });

  },[])
  return (
    <Page HeadProps={{title:"Services"}}>
<ServiceProvider>
{/* <ServiceHero/> */}
{/* <TabBar/> */}
</ServiceProvider>
    </Page>
  )
}
