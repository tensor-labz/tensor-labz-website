import ServiceSection from "../components/Page/Home/ServiceSection";
import HeroSection from "../components/Page/Home/Hero/HeroSection";
import Page from "../components/resuable/Page";
import ReveiwSection from "../components/Page/Home/Reveiws/ReveiwSection";

export default function Home() {
  return (
    <Page>
       <HeroSection />
       <ReveiwSection />
       <ServiceSection />
    </Page>
  )
}
