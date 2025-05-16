import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useProjectDataContext } from '../contexts/Api/ProjectDataContext';
import { extractGoogleDriveFileId } from '../base/hooks/google';
import { useRootContext } from '../contexts/RootContext';

const ProjectPage = () => {
  const { slug } = useParams();
  const { project_data, isLoading } = useProjectDataContext();
  const {Data } = useRootContext();
  const projectData = project_data?.find((data:any) => data.slug === slug);

  // State for image slider on mobile
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get sample images array safely
  const sampleImages = projectData?.sample_images;

  // Handle next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === sampleImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? sampleImages.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!projectData) {
    return <div className="min-h-screen flex items-center justify-center">Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with animation */}
      <motion.header
  className="relative text-white py-16 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-indigo-800 bg-blend-overlay bg-cover bg-center"
  style={{ backgroundImage: `url(${Data.project.hero.bg})` }}
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <div className="max-w-6xl mx-auto">
    <motion.h1
      className="text-4xl md:text-5xl font-bold mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      {projectData.title}
    </motion.h1>

    <motion.div
      className="flex flex-wrap gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      {projectData.tags?.map((tag: string, index: number) => (
        <span
          key={index}
          className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm"
        >
          {tag.trim()}
        </span>
      ))}
    </motion.div>
  </div>
</motion.header>


      <main className="max-w-6xl mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Main Image with animation */}
            <motion.div
              className="rounded-xl overflow-hidden shadow-lg mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {projectData.imageURL && (
                <img
                  src={`https://drive.google.com/thumbnail?id=${extractGoogleDriveFileId(projectData.imageURL)}`}
                  alt={projectData?.title}
                  className="w-full h-auto"
                />
              )}
            </motion.div>

            {/* Content */}
            <motion.div
              className="project-content max-w-none mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              dangerouslySetInnerHTML={{ __html: projectData.content || '' }}
            />

            {/* YouTube Demo */}
            {projectData.vedio_demo && (
              <motion.div
                className="rounded-xl overflow-hidden shadow-lg mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Video Demo</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={projectData.vedio_demo}
                    title="YouTube Demo"
                    className="w-full h-64 md:h-96 rounded-lg"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Additional Images - Desktop Grid */}
            <div className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {sampleImages.map((image:string, index:number) => (
                    <motion.div
                      key={index}
                      className="rounded-lg overflow-hidden shadow-md"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={`https://drive.google.com/thumbnail?id=${extractGoogleDriveFileId(image)}`}
                        alt={`Project image ${index + 1}`}
                        className="w-full h-auto"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Additional Images - Mobile Slider */}
            <div className="md:hidden">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
                <div className="relative">
                  {sampleImages.length > 0 && (
                    <motion.div
                      className="rounded-lg overflow-hidden shadow-md"
                      key={currentImageIndex}
                      initial={{ opacity: 0.5, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0.5, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={`https://drive.google.com/thumbnail?id=${extractGoogleDriveFileId(sampleImages[currentImageIndex])}`}
                        alt={`Project image ${currentImageIndex + 1}`}
                        className="w-full h-auto"
                      />
                    </motion.div>
                  )}

                  {/* Navigation Controls */}
                  {sampleImages.length > 1 && (
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={prevImage}
                        className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-blue-700"
                      >
                        &larr;
                      </button>
                      <span className="text-gray-600">
                        {currentImageIndex + 1} / {sampleImages.length}
                      </span>
                      <button
                        onClick={nextImage}
                        className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-blue-700"
                      >
                        &rarr;
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectPage;