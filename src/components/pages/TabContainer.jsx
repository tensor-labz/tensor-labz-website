import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTabContext } from '../context/TabContext';
import ServiceCard from './ServiceCard';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModel';
import usePagination from '../../hooks/usePagination';

const ITEMS_PER_PAGE = 9;

const TabContainer = () => {
  const { selectedProjects } = useTabContext();
  const [selectedProject,setSelectedProject]=useState(null)
  const{currentPage,totalPages,paginatedItems,goToFirst,goToLast,goToPage,goToNext,goToPrev}=usePagination(selectedProjects,ITEMS_PER_PAGE)
  const [isModalOpen, setIsModalOpen] = useState(false);


 

if (selectedProjects.length<1)
    return (
<motion.div className="container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delayChildren: 0.2 }}>
            <h1>No Projects</h1>

</motion.div>
    )
  return (
    <div className="container mx-auto py-12">
      {/* Grid Container */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delayChildren: 0.2 }}
      >
        {paginatedItems?.map((project, index) => (
          <motion.div
            key={project.id || index}
            className="shadow-lg rounded-lg overflow-hidden bg-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <ProjectCard setIsModalOpen={setIsModalOpen} key={index} setselectedProject={setSelectedProject} {...project} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <motion.div
        className="flex flex-wrap justify-center items-center mt-8 space-x-2 lg:justify-end"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* First Button */}
        <button
          className={`flex items-center text-blue-500 hover:text-blue-700 text-sm ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={goToFirst}
          disabled={currentPage === 1}
          aria-label="First Page"
        >
          <FaAngleDoubleLeft className="mr-2" />
        </button>

        {/* Previous Button */}
        <button
          className={`flex items-center text-blue-500 hover:text-blue-700 text-sm ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={goToPrev}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          <FaAngleLeft className="mr-2" />
        
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'text-blue-500 hover:text-blue-700 hover:bg-gray-200'
            }`}
            onClick={goToPage(index+1)}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          className={`flex items-center text-blue-500 hover:text-blue-700 text-sm ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={goToNext}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          
          <FaAngleRight className="ml-2" />
        </button>

        {/* Last Button */}
        <button
          className={`flex items-center text-blue-500 hover:text-blue-700 text-sm ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={goToLast}
          disabled={currentPage === totalPages}
          aria-label="Last Page"
        >
        
          <FaAngleDoubleRight className="ml-2" />
        </button>
      </motion.div>
       {/* Modal */}
       <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </div>
  );
};

export default memo(TabContainer);
