import { memo, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/resuable/Page';
import DetailsPage from '../shared/components/ui/DetailsPage';
import ReactIcon from '../shared/components/ui/ReactIcon';
import MediaGallery, {
  type MediaItem,
} from '../shared/components/ui/MediaGallery';
import ProjectPageLoading from '../features/project-detail/components/ProjectPageLoading';
import ProjectNotFound from '../features/project-detail/components/ProjectNotFound';
import { useProjectDetailController } from '../features/project-detail/hooks/useProjectDetailController';

const ProjectPage = memo(() => {
  const { project, isLoading } = useProjectDetailController();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project?.id]);

  const supportHref = useMemo(
    () =>
      project
        ? `https://wa.me/+94705359369?text=${encodeURIComponent(
            `Hello, I need assistance with the project: ${project.title}.`
          )}`
        : '#',
    [project]
  );

  if (isLoading) return <ProjectPageLoading />;
  if (!project) return <ProjectNotFound />;

  return (
    <Page HeadProps={{ title: project.title }}>
      <DetailsPage
        kicker="◈ PROJECT // TL.SYSTEMS"
        title={project.title}
        titleBadge={
          project.is_top ? (
            <ReactIcon
              name="FaCrown"
              size={20}
              className="text-amber-400 drop-shadow"
            />
          ) : undefined
        }
        description={project.description}
        tags={project.tags}
        back={{ to: '/services', label: 'Back to Services' }}
        cover={
          project.imageURL
            ? { url: project.imageURL, mediaType: 'image' }
            : undefined
        }
        coverLabel="TL.DISPLAY — PROJECT"
        contentHtml={project.content}
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to={supportHref}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/50 transition-all"
            >
              <ReactIcon name="FiMessageCircle" size={16} />
              Get Support
            </Link>
            <Link
              to="/contact-us"
              aria-label="Contact us"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white transition-all"
            >
              <ReactIcon name="FcOnlineSupport" size={20} />
            </Link>
            <a
              href="tel:+94770484739"
              aria-label="Call us"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white transition-all"
            >
              <ReactIcon name="FiPhone" size={18} />
            </a>
          </div>
        }
      >
        <MediaGallery
          title="◈ Project Gallery"
          media={(project.additional_media ?? []).map((m, i) => ({
            id: i,
            type: m.type as MediaItem['type'],
            url: m.url,
          }))}
        />
      </DetailsPage>
    </Page>
  );
});

ProjectPage.displayName = 'ProjectPage';
export default ProjectPage;
