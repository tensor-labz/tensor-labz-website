import React, { useState } from 'react';
import ProjectModal from './ProjectModel';


export default function ProjectCard({ image, title, description, technologies, demo,setIsModalOpen,setselectedProject }) {
 

  const project = {
    image,
    title,
    description,
    technologies,
    demo,
  };

  return (
    <>
      {/* Card */}
      <div className="shadow-md hover:shadow-2xl rounded-lg overflow-hidden transform transition duration-300 flex flex-col">
        <img
          src={image}
          alt={title}
          className="w-full object-cover aspect-[4/2]"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description.slice(0, 100)}...</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => {
                setselectedProject(project)
                setIsModalOpen(true)}}
          >
            Explore More
          </button>
        </div>
      </div>

    </>
  );
}
