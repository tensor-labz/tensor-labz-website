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
      className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-rim bg-surface shadow-md transition-all duration-300 hover:border-accent/40 hover:shadow-[0_8px_32px_-8px_rgba(56,189,248,0.15)]"
      onClick={() => navigate(`/project/${project.slug}`)}
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={project.imageURL}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Engineering grid overlay on image */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Arrow badge on hover */}
        <motion.div className="absolute bottom-3 right-3 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-accent/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ReactIcon name="FiArrowRight" size={14} className="text-white" />
        </motion.div>

        {/* Technical label top-left */}
        <div className="absolute left-2 top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded border border-accent/20 bg-black/50 px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-accent/90 backdrop-blur-sm">
            ◈ View Project
          </span>
        </div>
      </div>

      {/* Title strip */}
      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
        <h5 className="truncate font-display text-sm font-semibold leading-snug text-fg">
          {project.title}
        </h5>
        <ReactIcon
          name="FiArrowRight"
          size={14}
          className="shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>
    </Card>
  );
});

LatestProductCard.displayName = 'LatestProductCard';
export default LatestProductCard;
