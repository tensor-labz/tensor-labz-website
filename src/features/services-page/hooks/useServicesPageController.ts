import { useEffect, useMemo } from 'react';
import {
  useLocation,
  useParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loadServices,
  selectServices,
  selectServicesStatus,
} from '../../../store/servicesSlice';
import {
  loadProjects,
  selectAllProjects,
  selectProjectsStatus,
  selectActiveSlug,
  setActiveServiceSlug,
} from '../../../store/projectsSlice';

const ITEMS_PER_PAGE = 6;

export const useServicesPageController = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim().toLowerCase();

  const services = useAppSelector(selectServices);
  const servicesStatus = useAppSelector(selectServicesStatus);
  const allProjects = useAppSelector(selectAllProjects);
  const projectsStatus = useAppSelector(selectProjectsStatus);
  const reduxSlug = useAppSelector(selectActiveSlug);

  // The URL param is the source of truth for the active service. Using it
  // directly means the correct list renders immediately on navigation,
  // direct entry, refresh, and back/forward — no dependency on stale store state.
  const activeSlug = slug || 'all';

  useEffect(() => {
    if (servicesStatus === 'idle') dispatch(loadServices());
  }, [dispatch, servicesStatus]);

  useEffect(() => {
    if (projectsStatus === 'idle') dispatch(loadProjects());
  }, [dispatch, projectsStatus]);

  // Keep the store in sync with the URL so components that read it directly
  // (e.g. ServiceHero) stay consistent with the route.
  useEffect(() => {
    if (activeSlug !== reduxSlug) dispatch(setActiveServiceSlug(activeSlug));
  }, [activeSlug, reduxSlug, dispatch]);

  const currentPage = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const p = parseInt(params.get('page') ?? '1', 10);
    return isNaN(p) || p < 1 ? 1 : p;
  }, [location.search]);

  const { filteredProjects, totalItems } = useMemo(() => {
    let result = allProjects;
    if (activeSlug && activeSlug !== 'all') {
      result = result.filter((p) => p.service === activeSlug);
    }
    if (query) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          (p.description ?? '').toLowerCase().includes(query) ||
          (Array.isArray(p.tags) ? p.tags : []).some((t) =>
            t.toLowerCase().includes(query)
          )
      );
    }
    const totalItems = result.length;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return {
      filteredProjects: result.slice(start, start + ITEMS_PER_PAGE),
      totalItems,
    };
  }, [allProjects, activeSlug, currentPage, query]);

  const isLoading =
    servicesStatus === 'idle' ||
    servicesStatus === 'loading' ||
    projectsStatus === 'idle' ||
    projectsStatus === 'loading';

  // Switching the service navigates (URL = source of truth) and resets to page 1.
  // "all" maps to the bare /services route (no redundant /services/all).
  const setActiveSlug = (newSlug: string) =>
    navigate(newSlug === 'all' ? '/services' : `/services/${newSlug}`);

  return {
    services,
    filteredProjects,
    totalItems,
    isLoading,
    activeSlug,
    currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
    setActiveSlug,
  };
};
