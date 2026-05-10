import ReactIcon from '../shared/components/ui/ReactIcon';
const navData = [
  {
    nav: 'Home',
    to: '/',
    icon: <ReactIcon name="FaHome" size={16} />,
  },
  {
    nav: 'insights',
    to: '/services/all',
    icon: <ReactIcon name="FaScrewdriverWrench" size={16} />,
  },
  {
    nav: 'About Us',
    to: '/about-us',
    icon: <ReactIcon name="FaInfo" size={16} />,
  },
  {
    nav: 'Contact Us',
    to: '/contact-us',
    icon: <ReactIcon name="MdOutlineSupportAgent" size={25} />,
  },
];
export default navData;
