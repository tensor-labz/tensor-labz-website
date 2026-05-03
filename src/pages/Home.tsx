import Page from '../components/resuable/Page';
import HeroSection from '../features/hero/components/HeroSection';
import ServiceSection from '../features/home-services/components/ServiceSection';
import LatestProductSection from '../features/home-projects/components/LatestProductSection';

export default function Home() {
  return (
    <Page HeadProps={{ title: 'Home' }}>
      <HeroSection />
      <ServiceSection />
      <LatestProductSection />
    </Page>
  );
}
