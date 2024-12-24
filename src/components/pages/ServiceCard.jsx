import React from "react"
import { Link } from 'react-router-dom';

export default function ServiceCard({ icon, title, description,slug }) {


  return (
      <Link to={`/services/${slug}`}>
      <div className="shadow-md hover:shadow-2xl rounded-lg overflow-hidden transform transition duration-300 flex flex-col">
        <div>
        <img
          src={icon}
          alt={title}
          className="md:w-1/3 w-1/2 mx-auto md:ml-2 object-cover aspect-auto md:aspect-square"
        />
        </div>
        
        <div className="p-4 md:text-justify text-center">
          <h3 className="md:text-xl text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-lg md:text-sm">{description.slice(0, 150)}...</p>
        </div>
      </div>
      </Link>
  );
}
