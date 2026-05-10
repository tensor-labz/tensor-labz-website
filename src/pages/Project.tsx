import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import DOMPurify from 'dompurify';
import ProjectHero from '../features/project-detail/components/ProjectHero';
import ProjectPageLoading from '../features/project-detail/components/ProjectPageLoading';
import ProjectNotFound from '../features/project-detail/components/ProjectNotFound';
import { useProjectDetailController } from '../features/project-detail/hooks/useProjectDetailController';
import HeaderHelmet from '../base/Head';

const ProjectPage = () => {
  const { project, isLoading } = useProjectDetailController();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sampleImages = project?.extraImages ?? [];

  const nextImage = () => {
    if (sampleImages.length > 0)
      setCurrentImageIndex((p) => (p === sampleImages.length - 1 ? 0 : p + 1));
  };
  const prevImage = () => {
    if (sampleImages.length > 0)
      setCurrentImageIndex((p) => (p === 0 ? sampleImages.length - 1 : p - 1));
  };

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project?.slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project?.slug]);

  if (isLoading) return <ProjectPageLoading />;
  if (!project) return <ProjectNotFound />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'transparent' }}>
      <HeaderHelmet title={project.title} />

      <ProjectHero
        title={project.title}
        description={project.description}
        tags={project.tags}
        is_top={project.is_top}
        serviceName={project.service}
      />

      <main className="max-w-6xl mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {project.imageURL && (
              <motion.div
                className="rounded-xl overflow-hidden shadow-lg mb-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={project.imageURL}
                  alt={project.title}
                  className="w-full h-auto"
                />
              </motion.div>
            )}

            {project.content ? (
              <motion.div
                className="project-content max-w-none mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(project.content),
                }}
              />
            ) : (
              <motion.p
                className="max-w-none mb-10 text-xl"
                className="text-fg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {project.description ?? 'No description available.'}
              </motion.p>
            )}

            {project.vedio_demo && (
              <motion.div
                className="rounded-xl overflow-hidden shadow-lg mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h2
                  className="text-2xl font-bold mb-4"
                  className="text-fg"
                >
                  Demo
                </h2>
                <iframe
                  src={project.vedio_demo}
                  title="YouTube Demo"
                  className="w-full h-64 md:h-96 rounded-lg"
                  allowFullScreen
                />
              </motion.div>
            )}
          </div>

          {/* Sidebar gallery */}
          <div className="lg:col-span-1">
            {/* Desktop */}
            <div className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2
                  className="text-2xl font-bold mb-4"
                  className="text-fg"
                >
                  Project Gallery
                </h2>
                {sampleImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {sampleImages.map((image, index) => (
                      <motion.div
                        key={index}
                        className="rounded-lg overflow-hidden shadow-md"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={image}
                          alt={`Project image ${index + 1}`}
                          className="w-full h-auto"
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">
                    No gallery images available.
                  </p>
                )}
              </motion.div>
            </div>

            {/* Mobile slider */}
            <div className="md:hidden">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2
                  className="text-2xl font-bold mb-4"
                  className="text-fg"
                >
                  Project Gallery
                </h2>
                {sampleImages.length > 0 ? (
                  <div className="relative">
                    <motion.div
                      key={currentImageIndex}
                      className="rounded-lg overflow-hidden shadow-md"
                      initial={{ opacity: 0.5, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0.5, x: -60 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={sampleImages[currentImageIndex]}
                        alt={`Project image ${currentImageIndex + 1}`}
                        className="w-full h-auto"
                      />
                    </motion.div>

                    {sampleImages.length > 1 && (
                      <div className="flex justify-between items-center mt-4">
                        <button
                          onClick={prevImage}
                          className="rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-colors text-white"
                          style={{ backgroundColor: 'var(--accent)' }}
                          aria-label="Previous image"
                        >
                          ←
                        </button>
                        <span
                          className="font-medium text-sm"
                          className="text-muted"
                        >
                          {currentImageIndex + 1} / {sampleImages.length}
                        </span>
                        <button
                          onClick={nextImage}
                          className="rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-colors text-white"
                          style={{ backgroundColor: 'var(--accent)' }}
                          aria-label="Next image"
                        >
                          →
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-muted">
                    No gallery images available.
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectPage;
