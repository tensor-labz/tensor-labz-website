import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectModal({ isOpen, onClose, project }) {
  if (!isOpen) return null;

  const { image, title, description, demo, technologies } = project;

  return (
    <motion.div
      className="fixed  inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg overflow-auto max-h-[90vh] w-full max-w-3xl relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Main Image */}
        <img
          src={image}
          alt={title}
          className="w-full object-cover aspect-[4/2]"
        />

        {/* Modal Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>

          {/* Technologies */}
          {technologies && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Technologies:</h3>
              <ul className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <li
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-sm rounded-full"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Embedded YouTube Video */}
          <div className="relative group">
            <iframe
              src={demo}
              className="w-full aspect-video mb-4 rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title="Project Demo"
            ></iframe>

            {/* Share Button (visible on hover) */}
            <button
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white px-3 py-1 rounded hidden group-hover:block"
              onClick={() => navigator.clipboard.writeText(demo)}
            >
              Share
            </button>

            {/* "Go to YouTube" button */}
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Watch on YouTube
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
