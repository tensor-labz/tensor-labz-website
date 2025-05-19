import { memo } from 'react';
import Pagination from './Pagination';
import ProjectCard from './ProjectCard';
import { useProjectDataContext } from '../../../../contexts/Api/ProjectDataContext';
import { useRootContext } from '../../../../contexts/RootContext';



function ServiceContainer() {
    const { Data} = useRootContext()
    const { projectData } = useProjectDataContext()
    return (
        <div className='mt-4 mb-6 mx-6'>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{ Data.insight.title}</h1>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Project Card */}
                {
                    projectData?.map((pro: any, index: number) => (
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
                }
            </div>
            <Pagination totalItems={projectData?.length??0} itemsPerPage={10} />
        </div>
    );
}

export default memo(ServiceContainer);
