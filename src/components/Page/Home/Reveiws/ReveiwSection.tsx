import Section from "../../../../components/resuable/Section";
import ReveiwSlider from "./ReveiwSlider";



export default function ReveiwSection() {


 


  return (
    <Section className="container py-4">
      {/* Review Section Header */}
      <h1 className={`h3 pb-8`}>Reviews</h1>
      <ReveiwSlider/>
    </Section>
  );
}
