import RatingStarts from "./RatingStarts";
import { Link } from "react-router-dom";
import socialIcon, { SocialType } from "../../../../base/type/SocialMedia.d";
import Card from "../../../../components/resuable/Card";

// Define the type for the review card props
type ReveiwCardProps = {
  name: string;
  reveiw: string;
  rating: number;
  profile: string;
  comment_at: string;
  org: string;
  social: {
    name: SocialType; // The name must match the keys in socialIcon
    link: string;
  }[];
};

export default function ReveiwCard({
  name,
  reveiw,
  rating,
  profile,
  social,
}: ReveiwCardProps) {
  return (
    <Card className="group relative flex justify-between rounded-lg shadow-lg shadow-blue-100 gap-x-6 overflow-hidden">
      {/* Animated Border */}
      <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-blue-400 group-hover:animate-border-shine pointer-events-none"></div>

      {/* Reviewer Profile */}
      <div className="w-2/5">
        <div className="flex flex-col items-center p-2 justify-center">
          <img src={profile} alt={name} className="w-20 h-20 rounded-full mx-auto" />
          <div className="flex gap-2 items-center justify-center mt-2">
            {social.map((socialItem, index) => (
              <Link to={socialItem.link} key={index} className="text-blue-800">
                {socialIcon[socialItem.name]} {/* Use the social name to access the correct icon */}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Review */}
      <div className="w-3/5 p-2">
        <p className="p text-blue-800">
          {reveiw.slice(0, 150)}
          {reveiw.length > 150 && "..."}
        </p>
        {/* Rating Stars from client */}
        <RatingStarts rating={rating} />
        <h4 className="text-right text-base font-semibold italic text-sky-400">
          -{name}-
        </h4>
      </div>
    </Card>
  );
}
