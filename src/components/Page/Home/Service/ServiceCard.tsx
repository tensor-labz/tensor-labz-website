import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ServiceCardProps } from "../../../../base/type/ServiceProps.d";
import Card from "../../../../components/resuable/Card";
import { useNavigate } from 'react-router-dom';
import { useServiceContext } from '../../../../contexts/ServiceContext';

const ServiceCard: React.FC<ServiceCardProps> = memo(({ service_name, description, icon,slug }) => {
  const navigate = useNavigate();
  const {setActiveTab } = useServiceContext();
  return (
    <Card
      className="group relative flex sm:flex-col flex-row justify-between rounded-lg
      overflow-hidden p-3 sm:p-6 bg-gradient-to-br from-blue-50 via-white
      shadow-sm shadow-blue-100 to-blue-100 transition-all duration-300
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
      onClick={() => {
setActiveTab({title:service_name, slug:slug})
        navigate(`/services/${slug}`)
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
          alt={`${service_name} Service Icon`}
          className="md:w-28 md:h-28 sm:w-16 sm:h-16 w-full h-full object-cover  sm:object-contain object-center
          transition-transform"
        />
      </motion.div>

      {/* Service Details */}
      <div className="sm:w-full w-3/5 text-center">
        <h3 className="md:text-2xl sm:text-lg text-base sm:font-semibold font-bold text-blue-900 sm:mb-3 mb-1">
          {service_name}
        </h3>

        <p className="text-slate-600 md:text-base sm:text-sm text-sm line-clamp-3">
          {description?.length > 150 ? `${description?.slice(0, 150)}...` : description}
        </p>
      </div>
    </Card>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;