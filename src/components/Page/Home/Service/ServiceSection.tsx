import servicesData from "../../../../data/service_data";
import { ServiceCardProps } from "../../../../base/type/ServiceProps.d";
import Section from "../../../resuable/Section";
import ServiceCard from "./ServiceCard";


export default function ServiceSection() {
  return (
    <Section className="container py-4">
    {/* Review Section Header */}
    <h1 className={`h3 pb-8`}>Services</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {servicesData.map((serv:ServiceCardProps,i:number) => (<ServiceCard key={i} {...serv} />))}
      </div>
  </Section>
  )
}
