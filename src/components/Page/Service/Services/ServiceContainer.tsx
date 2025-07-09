import { memo } from 'react';
import Pagination from './Pagination';
import ProjectCard from './ProjectCard';
import { useProjectDataContext } from '../../../../contexts/Api/ProjectDataContext';
import { useRootContext } from '../../../../contexts/RootContext';
import { BsRobot } from "react-icons/bs";
import { motion } from 'framer-motion';


function ServiceContainer() {
    const { Data} = useRootContext()
    const { projectData } = useProjectDataContext()
    return (
        <div className='mt-4 mb-6 mx-12 sm:mx-4 lg:mx-8 xl:mx-16'>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{ Data.insight.title}</h1>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Project Card */}
                {
                  projectData?.length?  projectData?.map((pro: any, index: number) => (
                        <ProjectCard
                            key={index}
                            title={pro.title}
                            description={pro.description}
                            imageURL={pro?.imageURL}
                            services={pro?.tags}
                            id={index}
                            slug={pro.slug}
                            isTop={pro.is_top}
                        />
                  ))
              :
              (
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-16 px-8">
                    {/* Animated Background Circle */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <motion.div
                        className="w-64 h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full blur-3xl"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </motion.div>

                    {/* Robot Icon Container */}
                    <motion.div
                      className="relative z-10 mb-8"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <motion.div
                        className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 rounded-2xl shadow-2xl border border-blue-300/30"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
                        }}
                        animate={{
                          rotateY: [0, 360],
                        }}
                        transition={{
                          rotateY: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                          }
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <motion.div
                          animate={{
                            rotateX: [0, 15, -15, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <BsRobot className="text-6xl text-white drop-shadow-lg" />
                        </motion.div>
                      </motion.div>

                      {/* Floating Particles */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-blue-400 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                      className="text-center max-w-md relative z-10"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <motion.h3
                        className="text-2xl font-bold text-blue-900 mb-3"
                        animate={{
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        No Projects Available
                      </motion.h3>

                      <motion.p
                        className="text-blue-600 text-lg mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        We're working on something amazing
                      </motion.p>

                      {/* Coming Soon Badge */}
                      <motion.div
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                        }}
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(59, 130, 246, 0.4)",
                            "0 0 0 10px rgba(59, 130, 246, 0)",
                            "0 0 0 0 rgba(59, 130, 246, 0)"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-white rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        Coming Soon
                      </motion.div>
                    </motion.div>

                    {/* Subtle Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                      <div className="w-full h-full bg-blue-600"
                           style={{
                             backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
                             backgroundSize: '40px 40px'
                           }}
                      />
                    </div>
                  </div>
                    )
                }
            </div>
            <Pagination totalItems={projectData?.length??0} itemsPerPage={10} />
        </div>
    );
}

export default memo(ServiceContainer);
