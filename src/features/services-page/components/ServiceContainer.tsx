import { memo } from 'react';
import { motion } from 'motion/react';
import Pagination from './Pagination';
import ProjectCard from './ProjectCard';
import ServiceEmpty from './ServiceEmpty';
import ServiceLoading from './ServiceLoading';
import { useServicesPageController } from '../hooks/useServicesPageController';
import data from '../../../data/data';

function ServiceContainer() {
  const { filteredProjects, totalItems, isLoading, itemsPerPage } =
    useServicesPageController();

  if (isLoading) return <ServiceLoading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <h2
          className="text-xl font-bold"
          style={{
            color: 'var(--text-primary)',
            fontFamily: '"Syne", sans-serif',
          }}
        >
          {data?.insight?.title ?? 'Our Services'}
        </h2>
        <div
          className="flex-1 h-px"
          style={{ backgroundColor: 'var(--border)' }}
        />
        {totalItems > 0 && (
          <span
            className="text-xs font-medium px-2.5 py-1 rounded"
            style={{
              backgroundColor: 'var(--accent-soft)',
              color: 'var(--accent)',
            }}
          >
            {totalItems} projects
          </span>
        )}
      </motion.div>

      {filteredProjects.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((pro, index) => (
            <ProjectCard
              key={index}
              title={pro.title}
              description={pro.description}
              imageURL={pro.imageURL}
              services={pro.tags}
              id={index}
              slug={pro.slug}
              isTop={pro.is_top}
            />
          ))}
        </div>
      ) : (
        <ServiceEmpty />
      )}

      <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} />
    </div>
  );
}

export default memo(ServiceContainer);
