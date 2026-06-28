import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ReactIcon from '../../../shared/components/ui/ReactIcon';

interface ProjectCardProps {
  id: string | number;
  title: string;
  imageURL: string;
  description: string;
  services?: string[];
  slug: string;
  isTop?: boolean;
  onExplore?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  imageURL,
  description,
  services = [],
  slug,
  isTop = false,
  onExplore,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleExplore = () => {
    if (onExplore) {
      onExplore();
    } else {
      navigate(`/project/${slug}`);
    }
  };

  return (
    <motion.div
      className="rounded-2xl shadow-lg overflow-hidden w-full h-full flex flex-col bg-surface border border-glass-rim"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layoutId={`project-card-${slug}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <motion.img
          src={imageURL}
          alt={title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
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
              className="px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 bg-surface text-fg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ReactIcon name="FiEye" size={16} className="text-accent" />
              <span>Quick View</span>
              <ReactIcon
                name="FiArrowRight"
                size={16}
                className="text-accent"
              />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="p-4 flex flex-col flex-grow relative">
        {isTop && (
          <motion.div
            className="absolute top-3 right-3 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-[10px] font-medium py-0.5 px-2 rounded-full shadow-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ReactIcon name="AiTwotoneCrown" size={12} />
            <span>Premium</span>
          </motion.div>
        )}

        <h3 className="text-base md:text-lg font-bold font-display mb-1.5 line-clamp-1 pr-14 text-fg">
          {title}
        </h3>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <AnimatePresence>
            {services.slice(0, 3).map((service, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 text-xs font-medium rounded-full bg-glass-raised text-accent"
                initial={{ opacity: 0, x: -5 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.05 * index },
                }}
              >
                {service}
              </motion.span>
            ))}
            {services.length > 3 && (
              <motion.span
                className="px-3 py-1 text-xs font-medium rounded-full bg-raised text-muted"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
              >
                +{services.length - 3} more
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <p className="mb-9 line-clamp-2 flex-grow text-xs text-muted">
          {description}
        </p>

        {/* Explore button */}
        <motion.div
          className="absolute bottom-3 left-3 cursor-pointer"
          initial="initial"
          whileHover="expanded"
          onClick={handleExplore}
        >
          <motion.div
            className="flex items-center overflow-hidden rounded-full shadow-md text-white bg-gradient-to-r from-accent to-sky-900"
            variants={{ initial: { width: 36 }, expanded: { width: 150 } }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <motion.button
              className="h-9 w-9 flex items-center relative justify-center rounded-full"
              whileTap={{ scale: 0.9 }}
            >
              <ReactIcon name="FiArrowRight" size={18} />
            </motion.button>
            <motion.span
              className="whitespace-nowrap pr-4 pl-1 font-medium mx-auto"
              variants={{
                initial: { opacity: 0, x: -20 },
                expanded: { opacity: 1, x: 0 },
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

const arePropsEqual = (prev: ProjectCardProps, next: ProjectCardProps) =>
  prev.id === next.id &&
  prev.title === next.title &&
  prev.imageURL === next.imageURL &&
  prev.description === next.description &&
  (prev.services?.length ?? 0) === (next.services?.length ?? 0) &&
  (prev.services ?? []).every((s, i) => s === (next.services ?? [])[i]) &&
  prev.isTop === next.isTop &&
  prev.onExplore === next.onExplore;

export default memo(ProjectCard, arePropsEqual);
