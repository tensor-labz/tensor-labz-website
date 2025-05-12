import projectProps from "../base/type/ProjectProps.d";
import img from "../assets/images/Page/Home/Hero/cad_modeling.svg"
import ProjectExtraImage from "./project_extraImage";
import servicesData from "./service_data";
import projectContentData from "./project_content_data";
const ProjectData:Array<projectProps>=[
    {
        id: 1,
        title: "CAD Modeling",
        imgURL: img,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id felis auctor, ultricies purus in, tincidunt nunc. Nulla facilisi. Nullam nec nunc nec nunc.",
        service: [1, 2],
        youtube_demo:""
}
]

ProjectData.map((project)=>{
    project.slug = project.title.replace(/\s+/g, '-').toLowerCase()
    project.extraImages = ProjectExtraImage.filter((image) => image.id === project.id).map((image) => image.imageURL)
    project.content = projectContentData.find((content) => content.id === project.id)?.content,
        project.service = servicesData.filter((service) => project.service?.includes(service.id)).map((service) => ({ title:service.service_name,slug:service.slug }))

    return project
})
export default ProjectData;

export const latestProject = [
1
].map((project) => ProjectData.find((data) => data.id === project))