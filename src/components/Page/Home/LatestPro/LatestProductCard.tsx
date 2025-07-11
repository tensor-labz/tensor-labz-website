import React, { memo } from 'react';
import Card from "../../../../components/resuable/Card";
import projectProps from "../../../../base/type/ProjectProps.d";
import { useNavigate } from 'react-router-dom';


const LatestProductCard: React.FC<projectProps> = memo((project) => {
  const safeid=project.id??0
  const customAnimation = {
    initial: {
      opacity: 0,
      scale: 0.95,
      x: safeid % 2 !== 0 ? 50 : -50
    },
    whileHover: {
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
    },
    whileTap: {
      scale: 0.952
    },
    whileInView: {
      opacity: 1,
      x: 0,
      scale: 1
    },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  };
const navigate=useNavigate()
  return (
    <Card
      animation={customAnimation}
      className={`
        flex flex-col items-center
        bg-white border border-gray-200
        rounded-lg shadow
        ${safeid % 2 !== 0 ? "md:flex-row-reverse self-end" : "md:flex-row self-start"}
        md:max-w-2xl
        hover:bg-blue-50
        dark:border-gray-700
        dark:bg-blue-800
        dark:hover:bg-blue-700
        transform transition-all duration-300
        overflow-hidden
        md:h-32
      `}
      onClick={() => {
        navigate(`/project/${project.slug}`);
      } }
    >
      <div className="w-full md:w-48 ">
        <img
          className="
            md:object-cover object-center
            w-full
            h-[250px]
            md:h-auto
            rounded-t-lg
            md:rounded-none
            md:rounded-s-lg
            transition-transform
            duration-300
            group-hover:scale-105
          "
          src={project?.imageURL}
          alt="Project Illustration"
        />
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="
          mb-2
          xs:text-2xl
          text-xl
          font-bold
          tracking-tight
          text-gray-900
          dark:text-white
          transition-colors
          duration-300
          group-hover:text-blue-600
        ">
          {project.title}
        </h5>
        <p className="
          mb-3
          font-normal
          text-gray-700
          dark:text-gray-400
          transition-colors
          duration-300
          xs:text-base
        ">
       {project.description}
        </p>
      </div>
    </Card>
  );
});

LatestProductCard.displayName = 'LatestProductCard';

export default LatestProductCard;