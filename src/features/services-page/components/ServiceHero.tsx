import { FC, memo, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectServices } from '../../../store/servicesSlice';
import { selectActiveSlug } from '../../../store/projectsSlice';
import { useSiteSettings } from '../../../shared/hooks/useSiteSettings';
import PageHeader from '../../../shared/components/layout/PageHeader';

const ServiceHero: FC = memo(() => {
  const services = useAppSelector(selectServices);
  const activeSlug = useAppSelector(selectActiveSlug);
  const { get } = useSiteSettings();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const selectedService = useMemo(() => {
    return (
      services.find((s) => s.slug === activeSlug) ?? {
        service_name: get('services.title'),
        description: get('services.description'),
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services, activeSlug]);

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

  return (
    <PageHeader
      centered
      eyebrow={get('services.hero_label')}
      title={(selectedService as { service_name: string }).service_name}
      description={(selectedService as { description: string }).description}
      search={{
        value: query,
        onChange: (e) => updateQuery(e.target.value),
        onClear: () => updateQuery(''),
        placeholder: 'Search projects…',
      }}
    />
  );
});

ServiceHero.displayName = 'ServiceHero';
export default ServiceHero;
