import { ServiceCardProps } from "../../../../base/type/ServiceProps.d";
import Card from "../../../../components/resuable/Card";



export default function ServiceCard({title,text,icon}:ServiceCardProps) {
  return (
<Card className="group relative flex flex-col justify-between rounded-lg gap-x-6 overflow-hidden">
  {/* Animated Border */}
  <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-blue-400 group-hover:animate-border-shine pointer-events-none"></div>

  {/* Service Image */}
  <div className="w-full overflow-hidden">
    <img src={icon} alt="Service" className="md:w-28 h-14 w-14 mx-auto md:h-28 object-cover" />
  </div>
  {/* Service Details */}
  <div className="w-full p-2 ">
    <h3 className="md:text-2xl text-center text-lg font-semibold text-blue-900">{title}</h3>
    <p className="text-slate-400 md:text-base text-sm">
      {text.slice(0, 150)}
      {text.length > 150 && "..."}
    </p>
    </div>    
  </Card>
  )
}
