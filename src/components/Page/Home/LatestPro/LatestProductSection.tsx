import Section from "../../../../components/resuable/Section";
import LatestBanner from "../../../../assets/images/Page/Home/Latestbanner.jpg"
import LatestProductCard from "./LatestProductCard";
import ProjectData from "../../../../data/project_data";

export default function LatestProductSection() {
  return (
    <Section className='min-h-dvh container'>
<h1 className='h3'>Our Top Products</h1>
<div className='flex mt-5 h-full'>
    <div className="w-1/3 h-full">
    <img src={LatestBanner} className='object-cover object-center w-full rounded-md h-full'/>
    </div>
    <div className="w-2/3 flex flex-col gap-5 h-full overflow-hidden">
    {ProjectData.filter(({isTop})=>isTop===true).map(({},index:number)=>(   <LatestProductCard index={index}/>))}
 
       
     </div>

</div>
    </Section>
  )
}
