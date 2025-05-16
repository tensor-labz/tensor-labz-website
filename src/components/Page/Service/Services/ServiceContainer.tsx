import { memo } from 'react';
import Pagination from './Pagination';
import ProjectCard from './ProjectCard';
import { useProjectDataContext } from '../../../../contexts/Api/ProjectDataContext';
import { useRootContext } from '../../../../contexts/RootContext';
import { useServiceContext } from '../../../../contexts/ServiceContext';



function ServiceContainer() {
    const { Data} = useRootContext()
    const { project_data } = useProjectDataContext()
    const {activeTab}=useServiceContext()
    return (
        <div className='mt-6 mb-6'>
            <h1 className="text-2xl font-bold text-gray-800">{ Data.insight.title}</h1>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Project Card */}
                {
                    project_data?.filter((pro: any) => {
                        if (!activeTab.slug) {
                            return true;
                        } else {
                            return pro.service == activeTab.slug
                        }

                    })?.map((pro: any, index: number) => (
                        <ProjectCard
                            key={index}
                            title={pro.title}
                            description={pro.description}
                            imageURL={pro?.imageURL}
                            services={pro?.tags}
                            id={index}
                            slug={pro.slug}
                        />
                    ))
                }
            </div>
            <Pagination totalItems={project_data?.length??0} itemsPerPage={10} />
        </div>
    );
}

export default memo(ServiceContainer);
