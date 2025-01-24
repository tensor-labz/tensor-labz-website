import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ServiceCardProps } from "../../../../base/type/ServiceProps.d";
import Card from "../../../../components/resuable/Card";

const ServiceCard: React.FC<ServiceCardProps> = memo(({ title, text, icon }) => {
  return (
    <Card
      className="group relative flex flex-col justify-between rounded-lg gap-x-6 
      overflow-hidden px-6 py-6 bg-gradient-to-br from-blue-50 via-white 
      shadow-sm shadow-blue-100 to-blue-50 transition-all duration-300 
      hover:shadow-md hover:scale-[1.02]"
      animation={{
        whileHover: { 
          scale: 1.02,
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 10 
          }
        }
      }}
    >
      {/* Service Icon */}
      <motion.div 
        className="w-full overflow-hidden flex justify-center items-center mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={icon} 
          alt={`${title} Service Icon`} 
          className="md:w-28 md:h-28 w-16 h-16 object-contain transition-transform group-hover:rotate-6" 
        />
      </motion.div>

      {/* Service Details */}
      <div className="w-full text-center">
        <motion.h3 
          className="md:text-2xl text-lg font-semibold text-blue-900 mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-slate-600 md:text-base text-sm line-clamp-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {text.length > 150 ? `${text.slice(0, 150)}...` : text}
        </motion.p>
      </div>
    </Card>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;