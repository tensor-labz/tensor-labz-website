import threedprintings from '../assets/images/Page/Home/Services/3dprinings.jpg';
import cadModel from '../assets/images/Page/Home/Services/CAD.webp';
import iot from '../assets/images/Page/Home/Services/IOT.jpg';
import pcb from '../assets/images/Page/Home/Services/PCB.png';
import { ServiceCardProps } from '../base/type/ServiceProps.d';
const servicesData:Array<ServiceCardProps> = [
{
        id: 1,
        icon: threedprintings,
        service_name: "3D Printing",
        slug: "3d-printing",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id felis auctor, ultricies purus in, tincidunt nunc. Nulla facilisi. Nullam nec nunc nec nunc.",
        show_in_home:"Yes"
    },
    {
        id: 2,
        icon: cadModel,
        service_name: "CAD Modeling",
        slug: "cad-modeling",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id felis auctor, ultricies purus in, tincidunt nunc. Nulla facilisi. Nullam nec nunc nec nunc.",
        show_in_home:"Yes"
    },
    {
        id: 3,
        icon: iot,
        service_name: "Internet of Things",
        slug: "internet-of-things",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id felis auctor, ultricies purus in, tincidunt nunc. Nulla facilisi. Nullam nec nunc nec nunc.",
        show_in_home:"Yes"
    },
    {
        id: 4,
        icon: pcb,
        service_name: "PCB Design",
        slug: "pcb-design",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id felis auctor, ultricies purus in, tincidunt nunc. Nulla facilisi. Nullam nec nunc nec nunc.",
        show_in_home:"Yes"
    },
    ];
export default servicesData;