
import logo from "../assets/images/logo.png";
import aboutussmbg from "../assets/images/Page/About/bg.jpg";
import navData from "./nav_data";
const data: any = {

  layout:{
        logo,
        navData,

    },
    Home: {
        hero: {
            hero_bg: "",
            slider_delay: 5000,
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
            hero_bg: "",
            title: "Insights",
            description: "Stay updated with our latest insights and articles.",
        },
        title: "Insights",
        description: "Stay updated with our latest insights and articles.",
    },
    aboutus: {
        title: "Transforming Visions into Digital Realities",
        content:"We are a passionate team of innovators dedicated to crafting cutting-edge digital solutions that drive business growth and technological advancement.",
        bg: {
            lg: "https://tensoragri.s3.us-east-1.amazonaws.com/pageBackground/bg.mp4",
        md:aboutussmbg
        }
    }
}
export default data;