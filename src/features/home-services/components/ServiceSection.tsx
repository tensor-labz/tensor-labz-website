import React, { memo } from 'react';
import { motion, Variants } from 'motion/react';
import Section from '../../../shared/components/ui/Section';
import ServiceCard from './ServiceCard';
import { useHomeServicesController } from '../hooks/useHomeServicesController';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 90, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const ServiceSection: React.FC = memo(() => {
  const { services, isLoading } = useHomeServicesController();

  return (
    <Section className="md:px-14 px-0">
      <div className="px-4 text-center mb-4 mt-6">
        <h1
          className="sm:text-4xl text-xl sm:font-bold font-semibold"
          style={{
            color: 'var(--text-primary)',
            fontFamily: '"Syne", sans-serif',
          }}
        >
          What We Offer
        </h1>
        <h3
          className="sm:text-lg text-base"
          style={{ color: 'var(--text-muted)' }}
        >
          Innovative solutions tailored to your digital transformation needs.
        </h3>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:px-0 px-2 mx-6"
      >
        {!isLoading &&
          services.map((serv, index) => (
            <motion.div key={index} variants={cardVariants} className="w-full">
              <ServiceCard {...serv} />
            </motion.div>
          ))}
      </motion.div>
    </Section>
  );
});

ServiceSection.displayName = 'ServiceSection';
export default ServiceSection;
