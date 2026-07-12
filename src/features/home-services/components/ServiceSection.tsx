import React, { memo } from 'react';
import { motion } from 'motion/react';
import Section from '../../../shared/components/ui/Section';
import ServiceCard from './ServiceCard';
import { useHomeServicesController } from '../hooks/useHomeServicesController';
import { useSiteSettings } from '../../../shared/hooks/useSiteSettings';
import { staggerContainer, staggerItem, VIEWPORT } from '../../../lib/motion';

const ServiceSection: React.FC = memo(() => {
  const { services, isLoading } = useHomeServicesController();
  const { get } = useSiteSettings();

  return (
    <Section className="flex min-h-dvh flex-col justify-center px-0 md:px-14">
      <div className="mb-4 mt-6 px-4 text-center">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          {get('services.label')}
        </p>
        <h2 className="font-display text-xl font-semibold text-fg sm:text-4xl sm:font-bold">
          {get('services.title')}
        </h2>
        <p className="text-base text-muted sm:text-lg">
          {get('services.description')}
        </p>
      </div>

      <motion.div
        variants={staggerContainer(0.2, 0.3)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-0 lg:grid-cols-3"
      >
        {!isLoading &&
          services.map((serv, index) => (
            <motion.div key={index} variants={staggerItem} className="w-full">
              <ServiceCard {...serv} />
            </motion.div>
          ))}
      </motion.div>
    </Section>
  );
});

ServiceSection.displayName = 'ServiceSection';
export default ServiceSection;
