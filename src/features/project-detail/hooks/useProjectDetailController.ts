import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loadProjects,
  selectProjectsStatus,
  selectProjectBySlug,
} from '../../../store/projectsSlice';

export const useProjectDetailController = () => {
  const dispatch = useAppDispatch();
  const { slug = '' } = useParams<{ slug: string }>();
  const status = useAppSelector(selectProjectsStatus);
  const project = useAppSelector(selectProjectBySlug(slug));

  useEffect(() => {
    if (status === 'idle') dispatch(loadProjects());
  }, [dispatch, status]);

  return {
    project,
    slug,
    isLoading: status === 'idle' || status === 'loading',
  };
};
