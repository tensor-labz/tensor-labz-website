import threedprintings from '../assets/images/Page/Home/Services/3dprinings.jpg';
import cadModel from '../assets/images/Page/Home/Services/CAD.webp';
import iot from '../assets/images/Page/Home/Services/IOT.jpg';
import pcb from '../assets/images/Page/Home/Services/PCB.png';
import { ServiceCardProps } from '../base/type/ServiceProps.d';
const servicesData:Array<ServiceCardProps> = [
{
        id: 1,
        icon: threedprintings,
        title: "3D Printing",
        slug: "3d-printing",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id felis auctor, ultricies purus in, tincidunt nunc. Nulla facilisi. Nullam nec nunc nec nunc.",
        home:true
    },
    {
        id: 2,
        icon: cadModel,
        title: "CAD Modeling",
        slug: "cad-modeling",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id felis auctor, ultricies purus in, tincidunt nunc. Nulla facilisi. Nullam nec nunc nec nunc.",
        home:true
    },
    {
        id: 3,
        icon: iot,
        title: "Internet of Things",
        slug: "internet-of-things",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id felis auctor, ultricies purus in, tincidunt nunc. Nulla facilisi. Nullam nec nunc nec nunc.",
        home:true
    },
    {
        id: 4,
        icon: pcb,
        title: "PCB Design",
        slug: "pcb-design",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id felis auctor, ultricies purus in, tincidunt nunc. Nulla facilisi. Nullam nec nunc nec nunc.",
        home:true
    },
    ];
export default servicesData;