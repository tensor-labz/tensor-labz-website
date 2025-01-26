import React, { memo } from 'react';
import { motion, Variants } from "framer-motion";
import servicesData from "../../../../data/service_data";
import { ServiceCardProps } from "../../../../base/type/ServiceProps.d";
import Section from "../../../resuable/Section";
import ServiceCard from "./ServiceCard";

const ServiceSection: React.FC = memo(() => {
  // Container animation variants for rolling scroll effect
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
  
  // Card animation variants (bottom to top with rolling effect)
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,  // Start from bottom
      rotateX: 90, // Initial rotation for rolling effect
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,   // Animate to original position
      rotateX: 0, // Rotate back to original position
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Section title="What We Offer" subtitle="Innovative solutions tailored to your digital transformation needs.">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {servicesData
          .filter((serv: ServiceCardProps) => serv.home === true)
          .map((serv: ServiceCardProps, index: number) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="w-full"
            >
              <ServiceCard {...serv} />
            </motion.div>
          ))
        }
      </motion.div>
    </Section>
  );
});

ServiceSection.displayName = "ServiceSection";
export default ServiceSection;