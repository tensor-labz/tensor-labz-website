import { memo } from 'react';

interface AboutUsSectionProps {
  title: string;
  description: string;
}

const AboutUsSectionItem = memo(
  ({ title, description }: AboutUsSectionProps) => (
    <div
      className="p-6 rounded-xl w-full"
      style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <h3
        className="text-lg font-semibold mb-3 break-words"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h3>
      <p
        className="leading-relaxed w-full break-words hyphens-auto text-sm"
        style={{ color: 'var(--text-muted)' }}
      >
        {description}
      </p>
    </div>
  )
);

AboutUsSectionItem.displayName = 'AboutUsSectionItem';
export default AboutUsSectionItem;
