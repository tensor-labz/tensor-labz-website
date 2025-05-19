
import logo from "../assets/images/logo.png";
import aboutussmbg from "../assets/images/Page/About/bg.jpg";
import navData from "./nav_data";
import contectusdesktop from "../assets/images/Page/ContactUs/ContactusBgLG.png";
import contectusmobile from "../assets/images/Page/ContactUs/ContactusBgSM.webp";
import contectustablet from "../assets/images/Page/ContactUs/ContactusBgMd.webp";
import serviceMobileHero from "../assets/images/Page/ContactUs/lg.jpg";
const data: any = {

  layout:{
        logo,
        navData,

    },
    Home: {
        hero: {
            hero_bg: "",
            slider_delay: 5000,
            title:"yerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrru gy"
        },
        services: {
            title: "Our Services",
            description: "We offer a wide range of services to meet your needs.",
        },
        latest_project: {
            title: "Latest Projects",
            hero_content: "Check out our latest projects and see what we can do for you.",
        }


    },
    insight: {
        hero: {
            hero_bg: {
                lg: "https://tensoragri.s3.us-east-1.amazonaws.com/3865720-uhd_3840_2160_25fps.mp4",
                sm:serviceMobileHero
            },
            title: "Insights",
            description: "Stay updated with our latest insights and articles.",
        },
        title: "Our Services",
        description: "Stay updated with our latest insights and articles.",
    },
    aboutus: {
        title: "Transforming Visions into Digital Realities",
        content:"We are a passionate team of innovators dedicated to crafting cutting-edge digital solutions that drive business growth and technological advancement.",
        bg: {
            lg: "https://tensoragri.s3.us-east-1.amazonaws.com/pageBackground/bg.mp4",
        md:aboutussmbg
        }
    },
    contactus:{
        bg: {
            lg: contectusdesktop ,
            md:contectustablet,
            sm:contectusmobile
        },
        quote: "Bridging innovation and technology to transform your business challenges into breakthrough solutions.",
        title:"Contact InnovateTech"
    },
    project: {
        hero: {
            bg: { lg:"https://tensoragri.s3.us-east-1.amazonaws.com/pageBackground/bg.mp4",
                sm:serviceMobileHero
            }
        }
    }
}
export default data;