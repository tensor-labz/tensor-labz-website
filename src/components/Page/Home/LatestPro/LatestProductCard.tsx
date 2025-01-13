import Card from "../../../../components/resuable/Card";
import g from "../../../../assets/images/Page/Home/Hero/3d_printer.svg"
type Product={
    title?:string,
    description?:string,
    rating?:number,
    image?:string,
    index:number
}
export default function LatestProductCard({index}:Product) {
  return (
    <Card className={`flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow ${index%2!==0?"md:flex-row-reverse self-end":"md:flex-row self-start"} md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`}>
<img className="object-cover w-full rounded-t-lg h-[450px] md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={g} alt=""/>
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>

    </Card>
  )
}
