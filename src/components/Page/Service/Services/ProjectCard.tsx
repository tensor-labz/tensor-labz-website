import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi'; // Import arrow icon from Feather icons set

// Define the type for project data
interface ProjectCardProps {
  id: string | number;
  title: string;
  imageURL: string;
  description: string;
  services: string[];
  onExplore?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  imageURL,
  description,
  services,
  onExplore
}) => {
  const navigate = useNavigate();

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -8, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  // Handle the explore button click
  const handleExplore = () => {
    if (onExplore) {
      onExplore();
    } else {
      // Redirect to the project detail page
      navigate(`/project/${id}`);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ duration: 0.5 }}
    >
      {/* Image container with overlay on hover */}
      <div className="relative overflow-hidden h-48">
        <motion.img
          src={imageURL}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>

        {/* Service tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {services.map((service, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600"
            >
              {service}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 line-clamp-3">{description}</p>

        {/* Explore button */}
        <motion.button
          onClick={handleExplore}
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors hover:bg-blue-700"
          variants={buttonVariants}
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          Explore Project
          <FiArrowRight className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;