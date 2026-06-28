import { memo } from 'react';
import { motion } from 'motion/react';
import Page from '../components/resuable/Page';
import ServiceHero from '../features/services-page/components/ServiceHero';
import ServiceFilterDrawer from '../features/services-page/components/ServiceFilterDrawer';
import ServiceContainer from '../features/services-page/components/ServiceContainer';
import { fadeIn } from '../lib/motion';

const Services = memo(() => {
  return (
    <Page HeadProps={{ title: 'Services' }}>
      <motion.div
        variants={fadeIn()}
        initial="hidden"
        animate="visible"
        className="min-h-screen flex flex-col"
      >
        <ServiceHero />

        <ServiceFilterDrawer />

        <div className="flex-1">
          <ServiceContainer />
        </div>
      </motion.div>
    </Page>
  );
});

export default Services;
