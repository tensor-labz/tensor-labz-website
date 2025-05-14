import { memo } from 'react';
import Pagination from './Pagination';
import ProjectCard from './ProjectCard';
import { useProjectDataContext } from '../../../../contexts/Api/ProjectDataContext';
import { extractGoogleDriveFileId } from './../../../../base/hooks/google';



function ServiceContainer() {
    const {project_data}=useProjectDataContext()
    return (
        <div className='mt-6 mb-12'>
            <h1 className="text-2xl font-semibold text-gray-800">Our Services</h1>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Project Card */}
                {
                    project_data?.map((pro:any, index:number) => (
                        <ProjectCard
                            key={index}
                            title={pro.title}
                            description={pro.description}
                            imageURL={`https://drive.google.com/thumbnail?id=${extractGoogleDriveFileId(pro?.imageURL)}`}
                            services={pro?.tags?.split(',')?.map((tag:string) => tag.trim())}
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
