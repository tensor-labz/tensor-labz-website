import {
    FaHome, FaInfo,
    //FaPhone
} from "react-icons/fa";
//import { FaGear } from "react-icons/fa6";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";
const navData=[
    {
        nav:"Home",
        to:"/",
        icon:<FaHome/>
    },
    {
        nav:"Insigts",
        to:"/services/all",
        // icon:<FaGear/>
        icon:<FaScrewdriverWrench />
    },
    {
        nav:"About Us",
        to:"/about-us",
        icon:<FaInfo/>
    },
    {
        nav:"Contact Us",
        to:"contact-us",
        icon: <MdOutlineSupportAgent size={ 25} />
        // icon:<FaPhone/>
    }
]
export default navData