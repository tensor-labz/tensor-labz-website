import ServiceSection from "../components/Page/Home/Service/ServiceSection";
import HeroSection from "../components/Page/Home/Hero/HeroSection";
import Page from "../components/resuable/Page";
// import ReveiwSection from "../components/Page/Home/Reveiws/ReveiwSection";
import LatestProductSection from "../components/Page/Home/LatestPro/LatestProductSection";
import { useAppContext } from "../contexts/Api/AppContext";

export default function Home() {
  const { data } = useAppContext()
  console.log("Home data", data);
  return (
    <Page HeadProps={{title:"Home"}}>
       <HeroSection />
       <ServiceSection />
       <LatestProductSection/>
       {/* <ReveiwSection /> */}

    </Page>
  )
}
