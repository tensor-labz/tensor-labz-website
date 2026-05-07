import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loadProjects,
  selectTopProjects,
  selectProjectsStatus,
} from '../../../store/projectsSlice';

export const useLatestProjectsController = () => {
  const dispatch = useAppDispatch();
  const topProjects = useAppSelector(selectTopProjects);
  const status = useAppSelector(selectProjectsStatus);

  useEffect(() => {
    if (status === 'idle') dispatch(loadProjects());
  }, [dispatch, status]);

  return {
    topProjects,
    isLoading: status === 'idle' || status === 'loading',
  };
};
