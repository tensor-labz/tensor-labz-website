import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa"

const contactDetails=[
    {
        type:"mail",
        link:"mailto:tensoragri@gmail.com",
        icon:<FaEnvelope/>,
        title:"Email Us",
        content:"Send us an email and we’ll get back soon.",
        text:"tensoragri@gmail.com"
    },
    {
        type:"whatsapp",
        link:"https://wa.me/+94770484739",
        icon:<FaWhatsapp/>,
        title:"WhatsApp Us",
        content:"Message us on WhatsApp for instant support",
        text:"077 048 4739"
    },
    {
        type:"call",
        link:"tel:+9477 048 4739",
        icon:<FaPhoneAlt/>,
        title:"Call Us",
        content:"Give us a call and let’s discuss your project.",
        text:"077 048 4739"
    }
]
export default contactDetails