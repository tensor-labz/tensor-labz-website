import { memo } from 'react';
import Pagination from './Pagination';
import ProjectCard from './ProjectCard';

interface Props {}

function ServiceContainer(props: Props) {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-800">Our Services</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Project Card */}
                {
                    Array.from({ length: 10 }).map((_, index) => (
                        <ProjectCard
                            key={index}
                            title="Project Title"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque."
                            imageURL="https://media.licdn.com/dms/image/v2/D4D12AQErV5S_buj95w/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1662363673907?e=2147483647&v=beta&t=0u1vNV0sNmfPbJmGXn23IWZDTapb49vqUlisG5PJhDk"
                            services={["Web Development", "Mobile Development", "UI/UX Design"]}
                            id={index}
                        />
                    ))
                }
            </div>
            <Pagination totalItems={100} itemsPerPage={10} />
        </div>
    );
}

export default memo(ServiceContainer);
