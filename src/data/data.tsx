
import logo from "../assets/images/logo.png";
import navData from "./nav_data";
const data: any = {

  layout:{
        logo,
        navData,

    },
    Home: {
        hero: {
            hero_bg: "https://tensor-labz-store.s3.eu-north-1.amazonaws.com/Home/hero_bg.webp",
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
            hero_bg: {
                lg:"https://tensor-labz-store.s3.eu-north-1.amazonaws.com/Home/topProductBanner.mp4",
                sm:"https://tensor-labz-store.s3.eu-north-1.amazonaws.com/Home/LatestProjectBg.jpg"
            }
        }


    },
    insight: {
        hero: {
            hero_bg: {
                lg: "https://tensor-labz-store.s3.eu-north-1.amazonaws.com/Insights/insightBg.mp4",
                sm:"https://tensor-labz-store.s3.eu-north-1.amazonaws.com/Insights/ServicePageSm.jpg"
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
            lg: "https://tensor-labz-store.s3.eu-north-1.amazonaws.com/about-us/aboutusBg.mp4",
        md:"https://tensor-labz-store.s3.eu-north-1.amazonaws.com/about-us/aboutusbgSm.jpg"
        }
    },
    contactus:{
        bg: {
            lg:"https://tensor-labz-store.s3.eu-north-1.amazonaws.com/contact-us/ContactusBgLG.png",
            md:"https://tensor-labz-store.s3.eu-north-1.amazonaws.com/contact-us/ContactusBgMd.webp",
            sm:"https://tensor-labz-store.s3.eu-north-1.amazonaws.com/contact-us/ContactusBgSM.webp"
        },
        quote: "Bridging innovation and technology to transform your business challenges into breakthrough solutions.",
        title:"Contact InnovateTech"
    },
    project: {
        hero: {
            bg: { lg:"https://tensoragri.s3.us-east-1.amazonaws.com/pageBackground/bg.mp4",
                sm:"https://tensor-labz-store.s3.eu-north-1.amazonaws.com/Home/LatestProjectBg.jpg"
            }
        }
    }
}
export default data;