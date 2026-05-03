import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loadServices,
  selectHomeServices,
  selectServicesStatus,
} from '../../../store/servicesSlice';

export const useHomeServicesController = () => {
  const dispatch = useAppDispatch();
  const services = useAppSelector(selectHomeServices);
  const status = useAppSelector(selectServicesStatus);

  useEffect(() => {
    if (status === 'idle') dispatch(loadServices());
  }, [dispatch, status]);

  return {
    services,
    isLoading: status === 'idle' || status === 'loading',
  };
};
