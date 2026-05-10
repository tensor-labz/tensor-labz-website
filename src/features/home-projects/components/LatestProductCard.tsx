import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../shared/components/ui/Card';
import type { ProjectItem } from '../../../shared/types/project';
import ReactIcon from '../../../shared/components/ui/ReactIcon';

type LatestProductCardProps = Pick<
  ProjectItem,
  'id' | 'slug' | 'title' | 'imageURL' | 'description'
>;

const LatestProductCard: React.FC<LatestProductCardProps> = memo((project) => {
  const safeId = project.id ?? 0;
  const navigate = useNavigate();

  const customAnimation = {
    initial: { opacity: 0, scale: 0.95, x: safeId % 2 !== 0 ? 50 : -50 },
    whileInView: { opacity: 1, x: 0, scale: 1 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  };

  return (
    <Card
      animation={customAnimation}
      className="relative flex flex-col md:flex-row w-full md:max-w-2xl rounded-xl shadow-md
        overflow-hidden md:h-[300px] cursor-pointer transition-all duration-300"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
      }}
      onClick={() => navigate(`/project/${project.slug}`)}
    >
      {/* IMAGE */}
      <div className="w-full md:w-full h-[250px] md:h-full relative">
        <img
          src={project.imageURL}
          alt="Project Illustration"
          className="object-cover w-full h-full transition-transform duration-300"
        />

        {/* Overlay on md+ */}
        <div className="hidden md:flex absolute inset-0 flex-col justify-end bg-gradient-to-t from-black/55 to-transparent p-6">
          <h5 className="text-white text-2xl font-bold mb-2">
            {project.title}
          </h5>
          <ReactIcon name="FiArrowRight" size={24} className="text-white" />
        </div>
      </div>

      {/* Mobile content */}
      <div className="flex flex-col p-4 md:hidden">
        <h5
          className="mb-2 text-xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          {project.title}
        </h5>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {project.description}
        </p>
      </div>
    </Card>
  );
});

LatestProductCard.displayName = 'LatestProductCard';
export default LatestProductCard;
