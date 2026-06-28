import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectServices } from '../../../store/servicesSlice';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import PageHeader from '../../../shared/components/layout/PageHeader';

interface ProjectHeroProps {
  title: string;
  tags?: string[];
  className?: string;
  is_top?: boolean;
  serviceName?: string;
  description?: string;
}

const GetSupportButton: React.FC<{ title: string }> = memo(({ title }) => {
  const message = useMemo(
    () =>
      encodeURIComponent(
        `Hello, I need assistance with the project: ${title}.`
      ),
    [title]
  );
  return (
    <Link
      to={`https://wa.me/+94705359369?text=${message}`}
      className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full
        transition-all duration-300 backdrop-blur-sm border
        bg-white/10 hover:bg-white/20 text-white border-white/25 hover:border-white/50"
    >
      <ReactIcon name="FiMessageCircle" size={20} />
      <span className="font-medium">Get Support</span>
      <ReactIcon
        name="FiArrowRight"
        size={18}
        className="transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
});
GetSupportButton.displayName = 'GetSupportButton';

const ProjectHero: React.FC<ProjectHeroProps> = ({
  title,
  tags = [],
  className = '',
  is_top = false,
  serviceName,
  description,
}) => {
  const services = useAppSelector(selectServices);

  const serviceMatch = serviceName
    ? services.find((s) => s.slug === serviceName)
    : null;

  return (
    <PageHeader
      className={className}
      title={title}
      description={description}
      tags={tags}
      eyebrow={
        serviceName && (
          <>
            <Link
              to={`/services/${serviceName}`}
              className="hover:underline font-medium text-sky-300"
            >
              {serviceMatch?.service_name ?? serviceName}
            </Link>
            <span className="mx-2 opacity-50">›</span>
          </>
        )
      }
      titleAdornment={
        is_top && (
          <ReactIcon
            name="FaCrown"
            size={20}
            className="inline-block text-amber-400 drop-shadow"
          />
        )
      }
      actions={
        <>
          <GetSupportButton title={title} />
          <div className="flex items-center gap-2">
            <Link to="/contact-us">
              <div className="p-2 rounded-full transition-all duration-300 cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white">
                <ReactIcon name="FcOnlineSupport" size={24} />
              </div>
            </Link>
            <a
              href="tel:+94770484739"
              className="p-2 rounded-full cursor-pointer transition-all duration-300 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white"
            >
              <ReactIcon name="FiPhone" size={20} />
            </a>
          </div>
        </>
      }
    />
  );
};

export default memo(ProjectHero);
