import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
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

  const services = useAppSelector(selectServices);
  const servicesStatus = useAppSelector(selectServicesStatus);
  const allProjects = useAppSelector(selectAllProjects);
  const projectsStatus = useAppSelector(selectProjectsStatus);
  const activeSlug = useAppSelector(selectActiveSlug);

  useEffect(() => {
    if (servicesStatus === 'idle') dispatch(loadServices());
  }, [dispatch, servicesStatus]);

  useEffect(() => {
    if (projectsStatus === 'idle') dispatch(loadProjects());
  }, [dispatch, projectsStatus]);

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
    const totalItems = result.length;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return {
      filteredProjects: result.slice(start, start + ITEMS_PER_PAGE),
      totalItems,
    };
  }, [allProjects, activeSlug, currentPage]);

  const isLoading =
    servicesStatus === 'idle' ||
    servicesStatus === 'loading' ||
    projectsStatus === 'idle' ||
    projectsStatus === 'loading';

  const setActiveSlug = (slug: string) => dispatch(setActiveServiceSlug(slug));

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
