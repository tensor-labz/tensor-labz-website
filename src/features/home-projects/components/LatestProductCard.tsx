import React, { memo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../shared/components/ui/Card';
import type { ProjectItem } from '../../../shared/types/project';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import { EASE_EXPO } from '../../../lib/motion';

type LatestProductCardProps = Pick<
  ProjectItem,
  'id' | 'slug' | 'title' | 'imageURL' | 'description'
>;

const LatestProductCard: React.FC<LatestProductCardProps> = memo((project) => {
  const navigate = useNavigate();

  return (
    <Card
      animation={{
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: EASE_EXPO },
      }}
      className="group relative flex flex-col w-full rounded-xl shadow-md
        overflow-hidden cursor-pointer transition-all duration-300
        bg-surface border border-rim hover:border-accent/40
        hover:shadow-[0_8px_32px_-8px_rgba(56,189,248,0.15)]"
      onClick={() => navigate(`/project/${project.slug}`)}
    >
      {/* Image */}
      <div className="w-full aspect-video relative overflow-hidden">
        <img
          src={project.imageURL}
          alt={project.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Engineering grid overlay on image */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Arrow badge on hover */}
        <motion.div
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-accent/90 flex items-center justify-center
            opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
        >
          <ReactIcon name="FiArrowRight" size={14} className="text-white" />
        </motion.div>

        {/* Technical label top-left */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[8px] font-mono tracking-widest uppercase text-accent/90 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded border border-accent/20">
            ◈ View Project
          </span>
        </div>
      </div>

      {/* Title strip */}
      <div className="px-3 py-2.5 flex items-center justify-between gap-2">
        <h5 className="text-sm font-semibold font-display text-fg truncate leading-snug">
          {project.title}
        </h5>
        <ReactIcon
          name="FiArrowRight"
          size={14}
          className="text-muted shrink-0 transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5"
        />
      </div>
    </Card>
  );
});

LatestProductCard.displayName = 'LatestProductCard';
export default LatestProductCard;
