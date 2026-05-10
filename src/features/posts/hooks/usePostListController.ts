import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loadPosts,
  selectPostList,
  selectPostListStatus,
} from '../../../store/postSlice';

export const usePostListController = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPostList);
  const status = useAppSelector(selectPostListStatus);

  useEffect(() => {
    if (status === 'idle') dispatch(loadPosts());
  }, [status, dispatch]);

  return {
    posts,
    isLoading: status === 'idle' || status === 'loading',
  };
};
