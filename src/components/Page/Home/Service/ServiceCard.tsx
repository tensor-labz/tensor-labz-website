import React, { memo } from 'react';
import { motion } from 'motion/react';
import { ServiceCardProps } from '../../../../base/type/ServiceProps.d';
import Card from '../../../../components/resuable/Card';
import { useNavigate } from 'react-router-dom';
import { useServiceContext } from '../../../../contexts/ServiceContext';

const ServiceCard: React.FC<ServiceCardProps> = memo(
  ({ service_name, description, icon, slug }) => {
    const navigate = useNavigate();
    const { setActiveTab } = useServiceContext();

    return (
      <Card
        className="group relative flex sm:flex-col flex-row justify-between
        rounded-xl overflow-hidden px-3 py-3 sm:p-6
        shadow-sm hover:shadow-lg transition-all duration-300
        hover:scale-[1.005] sm:gap-x-0 gap-x-6
        min-h-[200px] sm:min-h-[250px]"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
        }}
        animation={{
          initial: { opacity: 0, y: 50 },
          whileHover: {
            scale: 1.02,
            transition: { type: 'spring', stiffness: 300, damping: 12 },
          },
          whileInView: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
          },
        }}
        onClick={() => {
          setActiveTab({ title: service_name, slug: slug });
          navigate(`/services/${slug}`);
        }}
      >
        {/* Decorative accent */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl z-0"
          style={{ backgroundColor: 'var(--accent-soft)' }}
        />

        {/* Icon */}
        <motion.div
          className="relative sm:w-full w-2/5 flex justify-center items-center sm:mb-1 z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={icon}
            alt={`${service_name} Service Icon`}
            className="md:w-28 md:h-28 sm:w-20 sm:h-20 w-full h-full object-contain object-center transition-transform"
          />
        </motion.div>

        {/* Details */}
        <div className="relative sm:w-full w-3/5 flex flex-col justify-center text-center px-2 z-10">
          <h3
            className="md:text-2xl sm:text-xl text-lg font-bold mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            {service_name}
          </h3>
          <p
            className="text-sm sm:text-base sm:hidden block"
            style={{ color: 'var(--text-muted)' }}
          >
            {description}
          </p>
        </div>

        {/* Hover reveal overlay */}
        <motion.div
          className="hidden absolute bottom-0 left-0 w-full px-4 py-3 sm:px-6
          sm:flex items-center justify-center text-center overflow-hidden
          h-0 group-hover:h-[45%] transition-all duration-500 ease-in-out z-20"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <motion.p
            className="text-white text-sm sm:text-base leading-relaxed
            opacity-0 group-hover:opacity-100
            translate-y-4 group-hover:translate-y-0
            transition-all duration-500 ease-in-out"
          >
            {description}
          </motion.p>
        </motion.div>
      </Card>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';
export default ServiceCard;
