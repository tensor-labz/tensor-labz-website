import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../lib/supabase';
import type { RootState } from '../app/store';
import type { User } from '@supabase/supabase-js';

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

function toAuthUser(user: User): AuthUser {
  return {
    uid: user.id,
    email: user.email ?? null,
    displayName: (user.user_metadata?.full_name as string) ?? null,
    avatarUrl: (user.user_metadata?.avatar_url as string) ?? null,
  };
}

/* ── Thunks ──────────────────────────────────────────────────────────────── */

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return toAuthUser(data.user);
  }
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await supabase.auth.signOut();
});

export const sendPasswordReset = createAsyncThunk(
  'auth/sendPasswordReset',
  async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin`,
    });
    if (error) throw new Error(error.message);
  }
);

/** Update the currently logged-in user's auth metadata + profiles row. */
export const updateCurrentUserProfile = createAsyncThunk(
  'auth/updateCurrentUserProfile',
  async (patch: { full_name?: string; avatar_url?: string }) => {
    const { data: { user }, error } = await supabase.auth.updateUser({ data: patch });
    if (error || !user) throw new Error(error?.message ?? 'Update failed');

    // Mirror into profiles table so other parts of the app stay in sync
    const profilePatch: Record<string, unknown> = {};
    if (patch.full_name !== undefined) profilePatch.name = patch.full_name;
    if (patch.avatar_url !== undefined) profilePatch.avatar_url = patch.avatar_url;
    if (Object.keys(profilePatch).length) {
      await supabase.from('profiles').update(profilePatch).eq('id', user.id);
    }

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

export const selectAuthUser        = (state: RootState) => state.auth.user;
export const selectAuthStatus      = (state: RootState) => state.auth.status;
export const selectAuthError       = (state: RootState) => state.auth.error;
export const selectAuthInitialized = (state: RootState) => state.auth.initialized;
export const selectIsAuthenticated = (state: RootState) => state.auth.user !== null;
export const selectCurrentUid      = (state: RootState) => state.auth.user?.uid ?? null;
