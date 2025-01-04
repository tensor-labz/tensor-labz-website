import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import RatingStarts from "./RatingStarts";
import { Link } from "react-router-dom";

type ReveiwCardProps = {
  name: string;
  reveiw: string;
  rating: number;
  profile: string;
  social: {
    name: "Facebook" | "Instagram" | "twitter" | "linkedIn"; // Match the keys of socialIcon
    link: string;
  }[];
};

const socialIcon = {
  Facebook: <FaFacebookF />,
  Instagram: <FaInstagram />,
  twitter: <FaTwitter />,
  linkedIn: <FaLinkedinIn />,
};

export default function ReveiwCard({
  name,
  reveiw,
  rating,
  profile,
  social,
}: ReveiwCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }} // Start off-screen
      whileInView={{ opacity: 1, x: 0 }} // Animate to center
      viewport={{ once: true, amount: 0.1 }} // Trigger animation when 20% of the card is visible
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-between rounded-lg shadow-lg shadow-blue-100 gap-x-6"
    >
      {/* Reviewer Profile */}
      <div className="w-2/5">
        <div className="flex flex-col items-center p-2 justify-center">
          <img src={profile} alt={name} className="w-20 h-20 rounded-full mx-auto" />
          <div className="flex gap-2 items-center justify-center mt-2">
            {social.map((social, index) => (
              <Link
                to={social.link}
                key={index}
                className="text-blue-800"
              >
                {socialIcon[social.name]}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Review */}
      <div className="w-3/5 p-2">
        <p className="p text-blue-800">
          {reveiw.slice(0, 200)}
          {reveiw.length > 200 && "..."}
        </p>
        {/* Rating Stars from client */}
        <RatingStarts rating={rating} />
        <h4 className="text-right text-base font-semibold italic text-sky-400">
          -{name}-
        </h4>
      </div>
    </motion.div>
  );
}
