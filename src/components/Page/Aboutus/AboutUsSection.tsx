import { memo } from "react";

interface AboutUsSectionProps {
  title: string;
  description: string;
}

const AboutUsSectionItem = memo(({ title, description }: AboutUsSectionProps) => (
  <div
    className="p-6 rounded-xl shadow-lg w-full backdrop-blur-sm"
    style={{
      backgroundColor: 'rgba(255,255,255,0.10)',
      border: '1px solid rgba(255,255,255,0.15)',
    }}
  >
    <h3 className="text-xl font-semibold mb-3 break-words text-white">{title}</h3>
    <p className="text-white/75 leading-relaxed w-full break-words hyphens-auto text-sm">{description}</p>
  </div>
));

AboutUsSectionItem.displayName = 'AboutUsSectionItem';
export default AboutUsSectionItem;
