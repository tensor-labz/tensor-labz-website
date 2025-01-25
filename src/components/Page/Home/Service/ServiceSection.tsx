import React, { memo } from 'react';
import { motion, Variants } from "framer-motion";
import servicesData from "../../../../data/service_data";
import { ServiceCardProps } from "../../../../base/type/ServiceProps.d";
import Section from "../../../resuable/Section";
import ServiceCard from "./ServiceCard";

const ServiceSection: React.FC = memo(() => {
  // Container animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  // Card animation variants (bottom to top)
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,  // Start from bottom
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0,   // Animate to original position
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Section id="service_section" className="container py-16">
      <div className='block relative mb-8'>
        <h1 className="h text-3xl md:text-4xl py-2 md:text-justify text-center">
          What we Offer
        </h1>
        <p className='text-gray-500 md:text-justify text-center'>
          Innovative solutions tailored to your digital transformation needs.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {servicesData
          .filter((serv: ServiceCardProps) => serv.home === true)
          .map((serv: ServiceCardProps, index: number) => (
            <motion.div key={index} variants={cardVariants}>
              <ServiceCard {...serv} />
            </motion.div>
          ))
        }
      </motion.div>
    </Section>
  );
});
ServiceSection.displayName="ServiceSection"
export default ServiceSection;