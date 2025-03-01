import  { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt,  FaCode } from 'react-icons/fa';

const ProjectPage = () => {
  // Dummy data
  const projectData = {
    title: "Modern E-Commerce Dashboard",
    content: `
      <h3>Overview</h3>
      <p>A comprehensive dashboard solution for e-commerce businesses to track sales, inventory, and customer analytics in real-time.</p>

      <h3>Key Features</h3>
      <ul>
        <li>Real-time sales monitoring with interactive charts</li>
        <li>Inventory management system with low-stock alerts</li>
        <li>Customer behavior analytics and segmentation</li>
        <li>Performance reports with exportable data</li>
        <li>Mobile responsive design for on-the-go monitoring</li>
      </ul>

      <h3>Technologies Used</h3>
      <p>This project was built using React.js, Redux for state management, Chart.js for data visualization, and a Node.js backend with MongoDB.</p>
    `,
    mainImage: "https://www.exin.com/app/uploads/2023/02/Automation-image-for-blog-article.jpg",
    services: [
      "UI/UX Design",
      "Frontend Development",
      "Backend Integration",
      "Data Visualization",
      "Performance Optimization"
    ],
    links: [
      { name: "GitHub", url: "#", icon: <FaGithub /> },
      { name: "Live Demo", url: "#", icon: <FaExternalLinkAlt /> },
      { name: "Source Code", url: "#", icon: <FaCode /> }
    ],
    youtubeDemo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    images: [
      "https://www.exin.com/app/uploads/2023/02/Automation-image-for-blog-article.jpg",
      "https://www.exin.com/app/uploads/2023/02/Automation-image-for-blog-article.jpg",
      "https://www.exin.com/app/uploads/2023/02/Automation-image-for-blog-article.jpg",
      "https://www.exin.com/app/uploads/2023/02/Automation-image-for-blog-article.jpg"
    ]
  };

  // State for image slider on mobile
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === projectData.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? projectData.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with animation */}
      <motion.header
        className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16 px-4 md:px-8"
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
            {projectData.services.map((service, index) => (
              <span
                key={index}
                className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm"
              >
                {service}
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
              <img
                src={projectData.mainImage}
                alt={projectData.title}
                className="w-full h-auto"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              className="prose max-w-none mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              dangerouslySetInnerHTML={{ __html: projectData.content }}
            />

            {/* YouTube Demo */}
            <motion.div
              className="rounded-xl overflow-hidden shadow-lg mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Video Demo</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={projectData.youtubeDemo}
                  title="YouTube Demo"
                  className="w-full h-64 md:h-96 rounded-lg"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Project Links */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 mb-10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Project Links</h2>
              <div className="space-y-4">
                {projectData.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="flex items-center gap-3 text-blue-600 hover:text-blue-800 transition-colors p-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Additional Images - Desktop Grid */}
            <div className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {projectData.images.map((image, index) => (
                    <motion.div
                      key={index}
                      className="rounded-lg overflow-hidden shadow-md"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img src={image} alt={`Project image ${index + 1}`} className="w-full h-auto" />
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
                  <motion.div
                    className="rounded-lg overflow-hidden shadow-md"
                    key={currentImageIndex}
                    initial={{ opacity: 0.5, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0.5, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={projectData.images[currentImageIndex]}
                      alt={`Project image ${currentImageIndex + 1}`}
                      className="w-full h-auto"
                    />
                  </motion.div>

                  {/* Navigation Controls */}
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={prevImage}
                      className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-blue-700"
                    >
                      &larr;
                    </button>
                    <span className="text-gray-600">
                      {currentImageIndex + 1} / {projectData.images.length}
                    </span>
                    <button
                      onClick={nextImage}
                      className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-blue-700"
                    >
                      &rarr;
                    </button>
                  </div>
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