import ServiceSection from "../components/Page/Home/Service/ServiceSection";
import HeroSection from "../components/Page/Home/Hero/HeroSection";
import Page from "../components/resuable/Page";
import ReveiwSection from "../components/Page/Home/Reveiws/ReveiwSection";

export default function Home() {
  return (
    <Page HeadProps={{title:"Home"}}>
       <HeroSection />
       <ServiceSection />
       <ReveiwSection />
      
    </Page>
  )
}
