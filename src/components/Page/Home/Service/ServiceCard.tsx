import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ServiceCardProps } from "../../../../base/type/ServiceProps.d";
import Card from "../../../../components/resuable/Card";

const ServiceCard: React.FC<ServiceCardProps> = memo(({ title, text, icon }) => {
  return (
    <Card
      className="group relative flex sm:flex-col flex-row justify-between rounded-lg 
      overflow-hidden p-3 sm:p-6 bg-gradient-to-br from-blue-50 via-white 
      shadow-sm shadow-blue-100 to-blue-50 transition-all duration-300 
      hover:shadow-md hover:scale-[1.02] sm:gap-x-0 gap-x-6"
      animation={{
        initial: { opacity: 0, y: 50 },
        whileHover: {
          scale: 1.02,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 10
          }
        },
        whileInView: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut"
          }
        }
      }}
    >
      {/* Service Icon */}
      <motion.div
        className="sm:w-full w-2/5 flex justify-center items-center sm:mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={icon}
          alt={`${title} Service Icon`}
          className="md:w-28 md:h-28 sm:w-16 sm:h-16 w-full h-full object-cover  sm:object-contain object-center
          transition-transform group-hover:rotate-6"
        />
      </motion.div>

      {/* Service Details */}
      <div className="sm:w-full w-3/5 text-center">
        <h3 className="md:text-2xl sm:text-lg text-base sm:font-semibold font-bold text-blue-900 sm:mb-3 mb-1">
          {title}
        </h3>

        <p className="text-slate-600 md:text-base sm:text-sm text-sm line-clamp-3">
          {text.length > 150 ? `${text.slice(0, 150)}...` : text}
        </p>
      </div>
    </Card>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;