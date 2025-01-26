import { FaHome, FaInfo, FaPhone } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

const navData=[
    {
        nav:"Home",
        to:"#",
        icon:<FaHome/>
    },
    {
        nav:"Insigts",
        to:"#",
        icon:<FaGear/>
    },
    {
        nav:"About Us",
        to:"/about-us",
        icon:<FaInfo/>
    },
    {
        nav:"Contact Us",
        to:"contact-us",
        icon:<FaPhone/>
    }
]
export default navData