import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loadContactData,
  selectContactData,
  selectContactStatus,
} from '../../../store/contactSlice';

export const useContactController = () => {
  const dispatch = useAppDispatch();
  const contactData = useAppSelector(selectContactData);
  const status = useAppSelector(selectContactStatus);

  useEffect(() => {
    if (status === 'idle') dispatch(loadContactData());
  }, [dispatch, status]);

  return {
    contactData,
    isLoading: status === 'idle' || status === 'loading',
  };
};
