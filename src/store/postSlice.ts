import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import {
  fetchPublishedPosts,
  fetchPostById,
  type Post,
} from '../services/postService';

interface PostState {
  list: Post[];
  selected: Post | null;
  listStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  detailStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PostState = {
  list: [],
  selected: null,
  listStatus: 'idle',
  detailStatus: 'idle',
};

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  fetchPublishedPosts
);

export const loadPostById = createAsyncThunk(
  'posts/loadPostById',
  (id: string) => fetchPostById(id)
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearSelectedPost(state) {
      state.selected = null;
      state.detailStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.listStatus = 'loading';
      })
      .addCase(loadPosts.fulfilled, (state, { payload }) => {
        state.list = payload;
        state.listStatus = 'succeeded';
      })
      .addCase(loadPosts.rejected, (state) => {
        state.listStatus = 'failed';
      })

      .addCase(loadPostById.pending, (state) => {
        state.detailStatus = 'loading';
      })
      .addCase(loadPostById.fulfilled, (state, { payload }) => {
        state.selected = payload;
        state.detailStatus = 'succeeded';
      })
      .addCase(loadPostById.rejected, (state) => {
        state.detailStatus = 'failed';
      });
  },
});

export const { clearSelectedPost } = postSlice.actions;
export default postSlice.reducer;

/* ── Selectors ── */
const selectPostState = (state: RootState) => state.posts;

export const selectPostList = createSelector(selectPostState, (s) => s.list);
export const selectPostListStatus = createSelector(
  selectPostState,
  (s) => s.listStatus
);
export const selectSelectedPost = createSelector(
  selectPostState,
  (s) => s.selected
);
export const selectPostDetailStatus = createSelector(
  selectPostState,
  (s) => s.detailStatus
);
