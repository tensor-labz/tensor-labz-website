import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loadBlogs,
  selectBlogList,
  selectBlogListStatus,
} from '../../../store/blogSlice';

export const useBlogListController = () => {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector(selectBlogList);
  const status = useAppSelector(selectBlogListStatus);

  useEffect(() => {
    if (status === 'idle') dispatch(loadBlogs());
  }, [status, dispatch]);

  return {
    blogs,
    isLoading: status === 'idle' || status === 'loading',
  };
};
