import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useProjectDataContext } from '../contexts/Api/ProjectDataContext';
import ProjectHero from '../components/Page/Project/ProjectHero';
import ProjectLoadingPlaceholder from '../components/Page/Project/ProjectPageLoading';
import ProjectNotFound from '../components/Page/Project/ProjectNotFound';
import HeaderHelmet from "../base/Head";

const ProjectPage = () => {
  const { slug } = useParams();
  const { rawProjects, isLoading } = useProjectDataContext();
  const projectdata = rawProjects?.find((data: any) => data.slug === slug);

  // State for image slider on mobile
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get sample images array safely
  const sampleImages = projectdata?.sample_images || [];

  // Handle next image - with safety check
  const nextImage = () => {
    if (sampleImages.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === sampleImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // Handle previous image - with safety check
  const prevImage = () => {
    if (sampleImages.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? sampleImages.length - 1 : prevIndex - 1
      );
    }
  };

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [slug, projectdata]);

  // Scroll to top on mount and when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return <ProjectLoadingPlaceholder />;
  }

  if (!projectdata) {
    return <ProjectNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderHelmet title={projectdata.title} />

      {/* Header with animation */}
      <ProjectHero
        title={projectdata.title}
        description={projectdata?.description}
        tags={projectdata.tags}
        is_top={projectdata.is_top}
        serviceName={projectdata.service}
      />

      <main className="max-w-6xl mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Main project image */}
            {projectdata.imageURL && (
              <motion.div
                className="rounded-xl overflow-hidden shadow-lg mb-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={projectdata.imageURL}
                  alt={projectdata?.title}
                  className="w-full h-auto"
                />
              </motion.div>
            )}

            {/* Content */}
            {projectdata?.content ? (
              <motion.div
                className="project-content max-w-none mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                dangerouslySetInnerHTML={{ __html: projectdata.content || '' }}
              />
            ) : (
              <motion.p
                className="max-w-none mb-10 text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {projectdata?.description || 'No description available.'}
              </motion.p>
            )}

            {/* YouTube Demo */}
            {projectdata.vedio_demo && (
              <motion.div
                className="rounded-xl overflow-hidden shadow-lg mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Demo</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={projectdata.vedio_demo}
                    title="YouTube Demo"
                    className="w-full h-64 md:h-96 rounded-lg"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Desktop Gallery */}
            <div className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
                {sampleImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {sampleImages.map((image: string, index: number) => (
                      <motion.div
                        key={index}
                        className="rounded-lg overflow-hidden shadow-md"
                        whileHover={{ scale: 1.05 }}
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
                  <p className="text-gray-500">No gallery images available.</p>
                )}
              </motion.div>
            </div>

            {/* Mobile Gallery Slider */}
            <div className="md:hidden">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
                {sampleImages.length > 0 ? (
                  <div className="relative">
                    <motion.div
                      className="rounded-lg overflow-hidden shadow-md"
                      key={currentImageIndex}
                      initial={{ opacity: 0.5, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0.5, x: -100 }}
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
                          className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors"
                          aria-label="Previous image"
                        >
                          ←
                        </button>
                        <span className="text-gray-600 font-medium">
                          {currentImageIndex + 1} / {sampleImages.length}
                        </span>
                        <button
                          onClick={nextImage}
                          className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors"
                          aria-label="Next image"
                        >
                          →
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">No gallery images available.</p>
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