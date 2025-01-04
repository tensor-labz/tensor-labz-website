import ServiceSection from "../components/Page/Home/ServiceSection";
import HeroSection from "../components/Page/Home/Hero/HeroSection";
import Page from "../components/resuable/Page";

export default function Home() {
  return (
    <Page>
       <HeroSection />
       <ServiceSection />
    </Page>
  )
}
