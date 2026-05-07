import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loadAboutData,
  selectAboutData,
  selectAboutStatus,
} from '../../../store/aboutSlice';

export const useAboutController = () => {
  const dispatch = useAppDispatch();
  const aboutData = useAppSelector(selectAboutData);
  const status = useAppSelector(selectAboutStatus);

  useEffect(() => {
    if (status === 'idle') dispatch(loadAboutData());
  }, [dispatch, status]);

  return {
    aboutData,
    isLoading: status === 'idle' || status === 'loading',
  };
};
