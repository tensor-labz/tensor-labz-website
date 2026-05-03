import { FaHome, FaInfo } from 'react-icons/fa';
import { FaScrewdriverWrench } from 'react-icons/fa6';
import { MdOutlineSupportAgent } from 'react-icons/md';
const navData = [
  {
    nav: 'Home',
    to: '/',
    icon: <FaHome />,
  },
  {
    nav: 'insights',
    to: '/services/all',
    icon: <FaScrewdriverWrench />,
  },
  {
    nav: 'About Us',
    to: '/about-us',
    icon: <FaInfo />,
  },
  {
    nav: 'Contact Us',
    to: '/contact-us',
    icon: <MdOutlineSupportAgent size={25} />,
  },
];
export default navData;
