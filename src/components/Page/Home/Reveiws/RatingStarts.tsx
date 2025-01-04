import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function RatingStarts({rating}: {rating: number}) {
    const fullvalue= Math.floor(rating);
    const fullRatings=new Array(fullvalue).fill(<FaStar className="text-yellow-400" />); 
    const halfvalue= rating-fullvalue;
    if(halfvalue>=0.5)fullRatings.push(<FaStarHalfAlt className="text-yellow-400" />);
  return (
    <div className='flex'>
      {fullRatings.map((star, index) => (<span className='text-2xl md:text-xl' key={index}>{star}</span>))}
    </div>
  )
}
