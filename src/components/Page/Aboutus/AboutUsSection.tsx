import { memo } from "react";

interface AboutUsSectionProps {
  title: string;
  description: string;
}

const AboutUsSectionItem = memo(({ title, description }: AboutUsSectionProps) => (
  <div className="bg-white/80 p-6 rounded-xl border border-gray-300 shadow-lg w-full">
    <h3 className="text-2xl font-semibold text-blue-900 mb-3 break-words">{title}</h3>
    <p className="text-gray-800 leading-relaxed w-full break-words hyphens-auto">{description}</p>
  </div>
));

export default AboutUsSectionItem;