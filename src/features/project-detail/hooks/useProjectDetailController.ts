import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loadProjects,
  selectProjectsStatus,
  selectProjectById,
} from '../../../store/projectsSlice';

export const useProjectDetailController = () => {
  const dispatch = useAppDispatch();
  const { id = '' } = useParams<{ id: string }>();
  const status = useAppSelector(selectProjectsStatus);
  const project = useAppSelector(selectProjectById(id));

  useEffect(() => {
    if (status === 'idle') dispatch(loadProjects());
  }, [dispatch, status]);

  return {
    project,
    id,
    isLoading: status === 'idle' || status === 'loading',
  };
};
