import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import {
  fetchPublishedBlogs,
  fetchBlogBySlug,
  type Blog,
} from '../services/blogService';

interface BlogState {
  list: Blog[];
  selected: Blog | null;
  listStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  detailStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: BlogState = {
  list: [],
  selected: null,
  listStatus: 'idle',
  detailStatus: 'idle',
};

export const loadBlogs = createAsyncThunk('blog/loadBlogs', fetchPublishedBlogs);

export const loadBlogBySlug = createAsyncThunk(
  'blog/loadBlogBySlug',
  (slug: string) => fetchBlogBySlug(slug)
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearSelectedBlog(state) {
      state.selected = null;
      state.detailStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBlogs.pending, (state) => { state.listStatus = 'loading'; })
      .addCase(loadBlogs.fulfilled, (state, { payload }) => {
        state.list = payload;
        state.listStatus = 'succeeded';
      })
      .addCase(loadBlogs.rejected, (state) => { state.listStatus = 'failed'; })

      .addCase(loadBlogBySlug.pending, (state) => { state.detailStatus = 'loading'; })
      .addCase(loadBlogBySlug.fulfilled, (state, { payload }) => {
        state.selected = payload;
        state.detailStatus = 'succeeded';
      })
      .addCase(loadBlogBySlug.rejected, (state) => { state.detailStatus = 'failed'; });
  },
});

export const { clearSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;

/* ── Selectors ── */
const selectBlogState = (state: RootState) => state.blog;

export const selectBlogList = createSelector(selectBlogState, (s) => s.list);
export const selectBlogListStatus = createSelector(selectBlogState, (s) => s.listStatus);
export const selectSelectedBlog = createSelector(selectBlogState, (s) => s.selected);
export const selectBlogDetailStatus = createSelector(selectBlogState, (s) => s.detailStatus);
