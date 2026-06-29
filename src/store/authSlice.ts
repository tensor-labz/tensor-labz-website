import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import type { RootState } from '../app/store';

/* ── Types ──────────────────────────────────────────────────────────────── */

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
}

interface AuthState {
  user: AuthUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  initialized: boolean;
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

export function toAuthUser(user: FirebaseUser): AuthUser {
  return {
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    avatarUrl: user.photoURL ?? null,
  };
}

/* ── Thunks ──────────────────────────────────────────────────────────────── */

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return toAuthUser(cred.user);
  }
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await firebaseSignOut(auth);
});

export const sendPasswordReset = createAsyncThunk(
  'auth/sendPasswordReset',
  async (email: string) => {
    await sendPasswordResetEmail(auth, email, {
      url: `${window.location.origin}/admin`,
    });
  }
);

/** Update the currently logged-in user's Firebase profile (displayName / photoURL). */
export const updateCurrentUserProfile = createAsyncThunk(
  'auth/updateCurrentUserProfile',
  async (patch: { full_name?: string; avatar_url?: string }) => {
    const user = auth.currentUser;
    if (!user) throw new Error('Not authenticated');
    await updateProfile(user, {
      ...(patch.full_name !== undefined
        ? { displayName: patch.full_name }
        : {}),
      ...(patch.avatar_url !== undefined
        ? { photoURL: patch.avatar_url }
        : {}),
    });
    return toAuthUser(user);
  }
);

/* ── Slice ───────────────────────────────────────────────────────────────── */

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
  initialized: false,
};

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
      /* signIn */
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload;
      })
      .addCase(signIn.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message ?? 'Sign in failed';
      })

      /* signOut */
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
      })

      /* updateCurrentUserProfile */
      .addCase(updateCurrentUserProfile.fulfilled, (state, { payload }) => {
        if (state.user) state.user = payload;
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;

/* ── Selectors ───────────────────────────────────────────────────────────── */

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthInitialized = (state: RootState) =>
  state.auth.initialized;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.user !== null;
export const selectCurrentUid = (state: RootState) =>
  state.auth.user?.uid ?? null;
