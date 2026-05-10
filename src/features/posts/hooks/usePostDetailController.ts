import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loadPostBySlug,
  clearSelectedPost,
  selectSelectedPost,
  selectPostDetailStatus,
} from '../../../store/postSlice';

export const usePostDetailController = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectSelectedPost);
  const status = useAppSelector(selectPostDetailStatus);

  useEffect(() => {
    if (slug) {
      dispatch(loadPostBySlug(slug));
    }
    return () => {
      dispatch(clearSelectedPost());
    };
  }, [slug, dispatch]);

  return {
    post,
    isLoading: status === 'idle' || status === 'loading',
    notFound: status === 'succeeded' && !post,
  };
};
