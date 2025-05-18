import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight,FiEye } from 'react-icons/fi';
import { AiTwotoneCrown } from "react-icons/ai";
// Define the type for project data
interface ProjectCardProps {
  id: string | number;
  title: string;
  imageURL: string;
  description: string;
  services: string[];
  slug: string;
  isTop?: boolean;
  onExplore?: () => void;
}

// Create the component
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  imageURL,
  description,
  services,
  slug,
  isTop = false,
  onExplore
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  const imageVariants = {
    hover: { scale: 1.05, transition: { duration: 0.5 } },
    initial: { scale: 1, transition: { duration: 0.5 } }
  };

  const serviceTagVariants = {
    initial: { opacity: 0, x: -5 },
    animate: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.05 * index, duration: 0.3 }
    })
  };

  // Handle the explore button click
  const handleExplore = () => {
    if (onExplore) {
      onExplore();
    } else {
      // Redirect to the project detail page
      navigate(`/project/${slug}`);
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden w-full h-full flex flex-col"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layoutId={`project-card-${slug}`}
    >
      {/* Image container with overlay on hover */}
      <div className="relative overflow-hidden aspect-video">
        <motion.img
          src={imageURL}
          alt={title}
          className="w-full h-full object-cover"
          variants={imageVariants}
          animate={isHovered ? "hover" : "initial"}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 w-full">
            <motion.button
              onClick={handleExplore}
              className="px-4 py-2 bg-white text-gray-900 rounded-full font-medium text-sm flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiEye className="text-blue-600" />
              <span>Quick View</span>
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                animate={{ x: isHovered ? 3 : 0 }}
                transition={{ repeat: isHovered ? Infinity : 0, repeatType: "reverse", duration: 0.6 }}
              >
                <FiArrowRight className="h-4 w-4 text-blue-600" />
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative">
        {isTop && (
          <motion.div
            className="absolute top-4 right-4 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-medium py-1 px-2 rounded-full shadow-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >

            <AiTwotoneCrown className="h-3 w-3" />
            <span>Premium</span>
          </motion.div>
        )}

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1 pr-16">{title}</h3>

        {/* Service tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <AnimatePresence>
            {services.slice(0, 3).map((service, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                variants={serviceTagVariants}
                initial="initial"
                animate="animate"
                custom={index}
              >
                {service}
              </motion.span>
            ))}
            {services.length > 3 && (
              <motion.span
                variants={serviceTagVariants}
                initial="initial"
                animate="animate"
                custom={3}
                className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                +{services.length - 3} more
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-10 line-clamp-2 flex-grow">{description}</p>

        {/* Explore button - corner icon that expands on hover */}
        <motion.div
          className="absolute bottom-4 left-4"
          initial="initial"
          whileHover="expanded"
        >
          <motion.div
            className="flex items-center overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md text-white"
            variants={{
              initial: { width: 40 },
              expanded: { width: 160 }
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <motion.button
              onClick={handleExplore}
              className="h-10 w-10 flex items-center relative justify-center rounded-full"
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowRight className="h-5 w-5" />
            </motion.button>

            <motion.span
              className="whitespace-nowrap pr-4 pl-1 font-medium mx-auto"
              variants={{
                initial: { opacity: 0, x: -20 },
                expanded: { opacity: 1, x: 0 }
              }}
              transition={{ delay: 0.1 }}
            >
              Explore Project
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Add custom comparison function to optimize re-renders
const arePropsEqual = (prevProps: ProjectCardProps, nextProps: ProjectCardProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.title === nextProps.title &&
    prevProps.imageURL === nextProps.imageURL &&
    prevProps.description === nextProps.description &&
    prevProps.services.length === nextProps.services.length &&
    prevProps.services.every((service, index) => service === nextProps.services[index]) &&
    prevProps.isTop === nextProps.isTop &&
    prevProps.onExplore === nextProps.onExplore
  );
};

// Export the memoized component
export default memo(ProjectCard, arePropsEqual);