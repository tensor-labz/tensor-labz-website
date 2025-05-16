import React, { memo } from 'react';
import { motion, Variants } from "framer-motion";
import { ServiceCardProps } from "../../../../base/type/ServiceProps.d";
import Section from "../../../resuable/Section";
import ServiceCard from "./ServiceCard";
import { useServiceDataContext } from '../../../../contexts/Api/ServiceApiContext';

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
  const { service_data,isLoading } = useServiceDataContext()
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
    <Section className='md:px-14 px-0'>
      <div className='px-4 text-center mb-4 mt-6'>
      <h1 className="sm:text-4xl text-xl sm:font-bold font-semibold text-blue-900">What We Offer</h1>
      <h3 className="sm:text-lg text-base text-gray-500">Innovative solutions tailored to your digital transformation needs.</h3>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:px-0 px-2"
      >
        {!isLoading&&service_data
          ?.filter((serv: ServiceCardProps) => serv?.show_in_home)
          ?.map((serv: ServiceCardProps, index: number) => (
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