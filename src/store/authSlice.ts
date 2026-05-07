import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import type { RootState } from '../app/store';

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthState {
  user: AuthUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  initialized: boolean; // true after first onAuthStateChanged fires
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
  initialized: false,
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const { uid, email: userEmail, displayName } = credential.user;
    return { uid, email: userEmail, displayName };
  }
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await firebaseSignOut(auth);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.status = action.payload ? 'succeeded' : 'idle';
      state.initialized = true;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Sign in failed';
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthInitialized = (state: RootState) => state.auth.initialized;
export const selectIsAuthenticated = (state: RootState) => state.auth.user !== null;
