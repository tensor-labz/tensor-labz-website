import { memo } from 'react';
import Pagination from './Pagination';
import ProjectCard from './ProjectCard';
import { useRootContext } from '../../../../contexts/RootContext';
import ServiceEmpty from "../../../../components/Page/Service/ServiceEmpty"
import ServiceLoading from "../../../../components/Page/Service/ServiceLoading"
import { useFilteredProjects } from '../../../../contexts/Api/useFilteredProjects';

function ServiceContainer() {
    const { Data } = useRootContext()
    const { filtered, totalItems, isLoading } = useFilteredProjects();
    if (isLoading) return <ServiceLoading/>
    return (
        <div className='mt-4 mb-6 mx-12 sm:mx-4 lg:mx-8 xl:mx-16'>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{ Data.insight.title}</h1>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Project Card */}
                {
                  filtered?.length?  filtered?.map((pro: any, index: number) => (
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
                 <ServiceEmpty/>
                    )
                }
            </div>
            <Pagination totalItems={totalItems??0} itemsPerPage={6} />
        </div>
    );
}

export default memo(ServiceContainer);
