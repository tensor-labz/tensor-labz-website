import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Page from '../components/resuable/Page';
import ContentPage from '../shared/components/ui/ContentPage';
import ServiceFilterDrawer from '../features/services-page/components/ServiceFilterDrawer';
import ServiceEmpty from '../features/services-page/components/ServiceEmpty';
import ServiceLoading from '../features/services-page/components/ServiceLoading';
import { useServicesPageController } from '../features/services-page/hooks/useServicesPageController';
import { useSiteSettings } from '../shared/hooks/useSiteSettings';

const Services = memo(() => {
  const {
    services,
    filteredProjects,
    totalItems,
    isLoading,
    itemsPerPage,
    currentPage,
    activeSlug,
    setPage,
  } = useServicesPageController();
  const { get } = useSiteSettings();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const updateQuery = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set('q', value);
        else next.delete('q');
        next.delete('page');
        return next;
      },
      { replace: true }
    );
  };

  const selected = services.find((s) => s.slug === activeSlug);
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const items = filteredProjects.map((pro, index) => ({
    id: pro.slug || index,
    link: `/project/${pro.slug}`,
    title: pro.title,
    description: pro.description,
    imgUrl: pro.imageURL,
    tags: pro.tags,
    reverse: index % 2 !== 0,
  }));

  return (
    <Page HeadProps={{ title: 'Services' }}>
      <ContentPage
        eyebrow={get('services.hero_label')}
        title={selected?.service_name ?? get('services.title')}
        description={selected?.description ?? get('services.description')}
        search={{
          value: query,
          onChange: (e) => updateQuery(e.target.value),
          onClear: () => updateQuery(''),
          placeholder: 'Search projects…',
        }}
        items={items}
        isLoading={isLoading}
        isEmpty={filteredProjects.length === 0}
        loadingState={<ServiceLoading />}
        emptyState={<ServiceEmpty />}
        page={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
        sidebar={<ServiceFilterDrawer />}
      />
    </Page>
  );
});

Services.displayName = 'Services';
export default Services;
