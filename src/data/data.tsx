
import logo from "../assets/images/logo.png";
import navData from "./nav_data";
import heroBg from "../assets/images/Page/Home/Hero/hero_bg.webp"
import ContactLgBg from "../assets/images/Page/ContactUs/ContactusBgLG.png"
import ContactMdBg from "../assets/images/Page/ContactUs/ContactusBgMd.webp"
import ContactSmBg from "../assets/images/Page/ContactUs/ContactusBgSM.webp"
import TopProductTitle from "../assets/images/Page/Home/TopProduct/topproductbg.jpg";
const data: any = {

  layout:{
        logo,
        navData,

    },
    Home: {
        hero: {
            hero_bg:heroBg,
            slider_delay: 5000,
            title:["Creating Sustainable Impact" ,"Through Technology"]
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
                sm:TopProductTitle
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
        title: "Transforming Visions into Realities",
        content:"We are a passionate team of innovators dedicated to crafting cutting-edge solutions that drive business growth and technological advancement.",
        bg: {
            lg: "https://tensor-labz-store.s3.eu-north-1.amazonaws.com/about-us/aboutusBg.mp4",
        md:"https://tensor-labz-store.s3.eu-north-1.amazonaws.com/about-us/aboutusbgSm.jpg"
        }
    },
    contactus:{
        bg: {
            lg:ContactLgBg,
            md:ContactMdBg,
            sm:ContactSmBg
        },
        quote: "Bridging innovation and technology to transform your business challenges into breakthrough solutions.",
        title:"Contact InnovateTech"
    },
    project: {
        hero: {
            bg: {
                sm:"https://tensor-labz-store.s3.eu-north-1.amazonaws.com/Home/LatestProjectBg.jpg"
            }
        }
    }
}
export default data;