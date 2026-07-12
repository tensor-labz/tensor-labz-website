import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loadPostById,
  clearSelectedPost,
  selectSelectedPost,
  selectPostDetailStatus,
} from '../../../store/postSlice';

export const usePostDetailController = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectSelectedPost);
  const status = useAppSelector(selectPostDetailStatus);

  useEffect(() => {
    if (id) {
      dispatch(loadPostById(id));
    }
    return () => {
      dispatch(clearSelectedPost());
    };
  }, [id, dispatch]);

  return {
    post,
    isLoading: status === 'idle' || status === 'loading',
    notFound: status === 'succeeded' && !post,
  };
};
