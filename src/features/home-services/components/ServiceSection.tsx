import React, { memo } from 'react';
import { motion } from 'motion/react';
import Section from '../../../shared/components/ui/Section';
import ServiceCard from './ServiceCard';
import { useHomeServicesController } from '../hooks/useHomeServicesController';
import { staggerContainer, staggerItem, VIEWPORT } from '../../../lib/motion';

const ServiceSection: React.FC = memo(() => {
  const { services, isLoading } = useHomeServicesController();

  return (
    <Section className="md:px-14 px-0">
      <div className="px-4 text-center mb-4 mt-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
          What We Do
        </p>
        <h2
          className="sm:text-4xl text-xl sm:font-bold font-semibold text-fg font-display"
        >
          What We Offer
        </h2>
        <p className="sm:text-lg text-base text-muted">
          Innovative solutions tailored to your digital transformation needs.
        </p>
      </div>

      <motion.div
        variants={staggerContainer(0.2, 0.3)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:px-0 px-4"
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
