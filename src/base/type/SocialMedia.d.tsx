// Define a specific type for social media names
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';
export type SocialType = 'Facebook' | 'Instagram' | 'twitter' | 'linkedIn';

const socialIcon: Record<SocialType, JSX.Element> = {
  Facebook: <FaFacebookF />,
  Instagram: <FaInstagram />,
  twitter: <FaTwitter />,
  linkedIn: <FaLinkedinIn />,
};
export enum SocialMediaType {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Twitter = 'twitter',
  LinkedIn = 'linkedIn',
}
export default socialIcon;
