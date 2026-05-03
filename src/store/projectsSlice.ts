import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchProjects } from '../services/projectsService';
import type { ProjectItem } from '../shared/types/project';
import type { RootState } from '../app/store';

interface ProjectsState {
  items: ProjectItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  activeServiceSlug: string;
  currentPage: number;
}

const initialState: ProjectsState = {
  items: [],
  status: 'idle',
  error: null,
  activeServiceSlug: 'all',
  currentPage: 1,
};

export const loadProjects = createAsyncThunk(
  'projects/load',
  (_: void, { signal }) => fetchProjects(signal)
);

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setActiveServiceSlug(state, action: PayloadAction<string>) {
      state.activeServiceSlug = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProjects.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load projects';
      });
  },
});

export const { setActiveServiceSlug, setCurrentPage } = projectsSlice.actions;
export default projectsSlice.reducer;

export const selectAllProjects = (state: RootState) => state.projects.items;
export const selectProjectsStatus = (state: RootState) => state.projects.status;
export const selectActiveSlug = (state: RootState) =>
  state.projects.activeServiceSlug;
export const selectCurrentPage = (state: RootState) =>
  state.projects.currentPage;
export const selectTopProjects = (state: RootState) =>
  state.projects.items.filter((p) => p.is_top);
export const selectProjectBySlug =
  (slug: string) =>
  (state: RootState): ProjectItem | null =>
    state.projects.items.find((p) => p.slug === slug) ?? null;
