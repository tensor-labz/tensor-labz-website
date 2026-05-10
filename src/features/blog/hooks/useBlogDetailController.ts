import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loadBlogBySlug,
  clearSelectedBlog,
  selectSelectedBlog,
  selectBlogDetailStatus,
} from '../../../store/blogSlice';

export const useBlogDetailController = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const blog = useAppSelector(selectSelectedBlog);
  const status = useAppSelector(selectBlogDetailStatus);

  useEffect(() => {
    if (slug) {
      dispatch(loadBlogBySlug(slug));
    }
    return () => { dispatch(clearSelectedBlog()); };
  }, [slug, dispatch]);

  return {
    blog,
    isLoading: status === 'idle' || status === 'loading',
    notFound: status === 'succeeded' && !blog,
  };
};
