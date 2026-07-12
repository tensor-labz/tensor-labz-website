import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  type EntityState,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { supabase } from '../lib/supabase';
import { FIRESTORE_REPOS } from '../services/firebase/registry';
import type { RootState } from '../app/store';

/* ── Types ─────────────────────────────────────────────────────────────── */

export type AdminRecord = Record<string, unknown> & { id: number | string };

type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface CurrentState {
  data: AdminRecord | null;
  status: LoadStatus;
  error: string | null;
}

interface ModuleState extends EntityState<AdminRecord, number | string> {
  status: LoadStatus;
  error: string | null;
  current: CurrentState;
}

interface AdminState {
  modules: Record<string, ModuleState>;
  counts: Record<string, number>;
  countsStatus: LoadStatus;
  relationOptions: Record<string, Array<Record<string, unknown>>>;
}

/* ── Entity adapter ─────────────────────────────────────────────────────── */

const recordAdapter = createEntityAdapter<AdminRecord, number | string>({
  selectId: (entity) => entity.id,
});

const initialModuleState = (): ModuleState => ({
  ...recordAdapter.getInitialState(),
  status: 'idle',
  error: null,
  current: { data: null, status: 'idle', error: null },
});

/* ── Thunks ─────────────────────────────────────────────────────────────── */

export const fetchRecords = createAsyncThunk(
  'admin/fetchRecords',
  async ({ moduleId, tableId }: { moduleId: string; tableId?: string }) => {
    const tid = tableId ?? moduleId;
    const repo = FIRESTORE_REPOS[tid];
    if (repo) {
      const records = await repo.list();
      return { moduleId, records: records as unknown as AdminRecord[] };
    }
    const { data, error } = await supabase.from(tid).select('*').order('id');
    if (error) throw new Error(error.message);
    return { moduleId, records: (data ?? []) as AdminRecord[] };
  }
);

export const fetchRecord = createAsyncThunk(
  'admin/fetchRecord',
  async ({
    moduleId,
    id,
    tableId,
  }: {
    moduleId: string;
    id: number | string;
    tableId?: string;
  }) => {
    if (!id || (typeof id === 'number' && isNaN(id)))
      throw new Error('Invalid record id');
    const tid = tableId ?? moduleId;
    const repo = FIRESTORE_REPOS[tid];
    if (repo) {
      const record = await repo.get(String(id));
      if (!record) throw new Error('Record not found');
      return { moduleId, record: record as unknown as AdminRecord };
    }
    const { data, error } = await supabase
      .from(tid)
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return { moduleId, record: data as AdminRecord };
  }
);

export const createRecord = createAsyncThunk(
  'admin/createRecord',
  async (
    {
      moduleId,
      data,
      tableId,
    }: {
      moduleId: string;
      data: Record<string, unknown>;
      tableId?: string;
    },
    { getState }
  ) => {
    const tid = tableId ?? moduleId;
    const repo = FIRESTORE_REPOS[tid];
    if (repo) {
      const by = (getState() as RootState).auth.user?.email ?? 'admin';
      const record = await repo.create(data, by);
      return { moduleId, record: record as unknown as AdminRecord };
    }
    const { data: result, error } = await supabase
      .from(tid)
      .insert(data)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { moduleId, record: result as AdminRecord };
  }
);

export const updateRecord = createAsyncThunk(
  'admin/updateRecord',
  async (
    {
      moduleId,
      id,
      data,
      tableId,
    }: {
      moduleId: string;
      id: number | string;
      data: Record<string, unknown>;
      tableId?: string;
    },
    { getState }
  ) => {
    const tid = tableId ?? moduleId;
    const repo = FIRESTORE_REPOS[tid];
    if (repo) {
      const by = (getState() as RootState).auth.user?.email ?? 'admin';
      const record = await repo.update(String(id), data, by);
      return { moduleId, record: record as unknown as AdminRecord };
    }
    const { data: result, error } = await supabase
      .from(tid)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { moduleId, record: result as AdminRecord };
  }
);

export const deleteRecord = createAsyncThunk(
  'admin/deleteRecord',
  async ({
    moduleId,
    id,
    imageKeys,
    tableId,
  }: {
    moduleId: string;
    id: number | string;
    imageKeys?: string[];
    tableId?: string;
  }) => {
    if (imageKeys?.length) {
      const { deleteImages } = await import('../lib/imageUpload');
      await deleteImages(imageKeys).catch(() => {});
    }
    const tid = tableId ?? moduleId;
    const repo = FIRESTORE_REPOS[tid];
    if (repo) {
      await repo.remove(String(id));
      return { moduleId, id };
    }
    const { error } = await supabase.from(tid).delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { moduleId, id };
  }
);

export const fetchRelationOptions = createAsyncThunk(
  'admin/fetchRelationOptions',
  async ({
    table,
    labelField,
    valueField = 'id',
  }: {
    table: string;
    labelField: string;
    valueField?: string;
  }) => {
    const repo = FIRESTORE_REPOS[table];
    if (repo) {
      const records = (await repo.list()) as Array<Record<string, unknown>>;
      return records.map((r) => ({
        [valueField]: r[valueField],
        [labelField]: r[labelField],
      }));
    }
    const { data, error } = await supabase
      .from(table)
      .select(`${valueField}, ${labelField}`)
      .order(labelField);
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as Array<Record<string, unknown>>;
  }
);

export const fetchModuleCounts = createAsyncThunk(
  'admin/fetchModuleCounts',
  async (moduleIds: string[]) => {
    const [mainCounts, featuredCount] = await Promise.all([
      Promise.all(
        moduleIds.map((id) =>
          supabase
            .from(id)
            .select('*', { count: 'exact', head: true })
            .then(({ count }) => ({ id, count: count ?? 0 }))
        )
      ),
      supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('is_top', true)
        .then(({ count }) => count ?? 0),
    ]);

    const result = mainCounts.reduce<Record<string, number>>(
      (acc, { id, count }) => ({ ...acc, [id]: count }),
      {}
    );
    result['projects:featured'] = featuredCount as number;
    return result;
  }
);

/* ── Helpers ────────────────────────────────────────────────────────────── */

const ensureModule = (state: AdminState, moduleId: string) => {
  if (!state.modules[moduleId]) {
    state.modules[moduleId] = initialModuleState();
  }
};

/* ── Slice ──────────────────────────────────────────────────────────────── */

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    modules: {},
    counts: {},
    countsStatus: 'idle',
    relationOptions: {},
  } as AdminState,
  reducers: {
    resetModuleStatus(state, action: PayloadAction<string>) {
      ensureModule(state, action.payload);
      state.modules[action.payload].status = 'idle';
    },
    clearCurrentRecord(state, action: PayloadAction<string>) {
      if (state.modules[action.payload]) {
        state.modules[action.payload].current = {
          data: null,
          status: 'idle',
          error: null,
        };
      }
    },
    resetCountsStatus(state) {
      state.countsStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      /* fetchRecords */
      .addCase(fetchRecords.pending, (state, { meta }) => {
        const mid = meta.arg.moduleId;
        ensureModule(state, mid);
        state.modules[mid].status = 'loading';
        state.modules[mid].error = null;
      })
      .addCase(fetchRecords.fulfilled, (state, { payload }) => {
        ensureModule(state, payload.moduleId);
        recordAdapter.setAll(state.modules[payload.moduleId], payload.records);
        state.modules[payload.moduleId].status = 'succeeded';
      })
      .addCase(fetchRecords.rejected, (state, { meta, error }) => {
        const mid = meta.arg.moduleId;
        state.modules[mid].status = 'failed';
        state.modules[mid].error = error.message ?? 'Fetch failed';
      })

      /* fetchRecord */
      .addCase(fetchRecord.pending, (state, { meta }) => {
        ensureModule(state, meta.arg.moduleId);
        state.modules[meta.arg.moduleId].current.status = 'loading';
        state.modules[meta.arg.moduleId].current.error = null;
      })
      .addCase(fetchRecord.fulfilled, (state, { payload }) => {
        state.modules[payload.moduleId].current.data = payload.record;
        state.modules[payload.moduleId].current.status = 'succeeded';
        recordAdapter.upsertOne(
          state.modules[payload.moduleId],
          payload.record
        );
      })
      .addCase(fetchRecord.rejected, (state, { meta, error }) => {
        state.modules[meta.arg.moduleId].current.status = 'failed';
        state.modules[meta.arg.moduleId].current.error =
          error.message ?? 'Fetch failed';
      })

      /* createRecord */
      .addCase(createRecord.fulfilled, (state, { payload }) => {
        ensureModule(state, payload.moduleId);
        recordAdapter.addOne(state.modules[payload.moduleId], payload.record);
        if (state.counts[payload.moduleId] !== undefined) {
          state.counts[payload.moduleId] += 1;
        }
      })

      /* updateRecord */
      .addCase(updateRecord.fulfilled, (state, { payload }) => {
        ensureModule(state, payload.moduleId);
        recordAdapter.upsertOne(
          state.modules[payload.moduleId],
          payload.record
        );
        if (
          state.modules[payload.moduleId].current.data?.id === payload.record.id
        ) {
          state.modules[payload.moduleId].current.data = payload.record;
        }
      })

      /* deleteRecord */
      .addCase(deleteRecord.fulfilled, (state, { payload }) => {
        ensureModule(state, payload.moduleId);
        recordAdapter.removeOne(state.modules[payload.moduleId], payload.id);
        if (state.modules[payload.moduleId].current.data?.id === payload.id) {
          state.modules[payload.moduleId].current = {
            data: null,
            status: 'idle',
            error: null,
          };
        }
        if (state.counts[payload.moduleId] !== undefined) {
          state.counts[payload.moduleId] = Math.max(
            0,
            state.counts[payload.moduleId] - 1
          );
        }
      })

      /* fetchModuleCounts */
      .addCase(fetchModuleCounts.pending, (state) => {
        state.countsStatus = 'loading';
      })
      .addCase(fetchModuleCounts.fulfilled, (state, { payload }) => {
        state.counts = { ...state.counts, ...payload };
        state.countsStatus = 'succeeded';
      })
      .addCase(fetchModuleCounts.rejected, (state) => {
        state.countsStatus = 'failed';
      })

      /* fetchRelationOptions */
      .addCase(fetchRelationOptions.fulfilled, (state, { meta, payload }) => {
        state.relationOptions[meta.arg.table] = payload;
      });
  },
});

export const { resetModuleStatus, clearCurrentRecord, resetCountsStatus } =
  adminSlice.actions;

/* ── Selectors ──────────────────────────────────────────────────────────── */

const adapterSelectors = recordAdapter.getSelectors();

export const selectModuleRecords = (moduleId: string) =>
  createSelector(
    (state: RootState) => state.admin.modules[moduleId],
    (mod) => (mod ? adapterSelectors.selectAll(mod) : [])
  );

export const selectModuleStatus =
  (moduleId: string) =>
  (state: RootState): LoadStatus =>
    state.admin.modules[moduleId]?.status ?? 'idle';

export const selectModuleError =
  (moduleId: string) =>
  (state: RootState): string | null =>
    state.admin.modules[moduleId]?.error ?? null;

export const selectCurrentRecord =
  (moduleId: string) =>
  (state: RootState): AdminRecord | null =>
    state.admin.modules[moduleId]?.current.data ?? null;

export const selectCurrentRecordStatus =
  (moduleId: string) =>
  (state: RootState): LoadStatus =>
    state.admin.modules[moduleId]?.current.status ?? 'idle';

export const selectCurrentRecordError =
  (moduleId: string) =>
  (state: RootState): string | null =>
    state.admin.modules[moduleId]?.current.error ?? null;

export const selectModuleCounts = (state: RootState) => state.admin.counts;
export const selectCountsStatus = (state: RootState) =>
  state.admin.countsStatus;

export const selectRelationOptions =
  (table: string) =>
  (state: RootState): Array<Record<string, unknown>> =>
    state.admin.relationOptions[table] ?? [];

export const selectAllRelationOptions = (
  state: RootState
): Record<string, Array<Record<string, unknown>>> =>
  state.admin.relationOptions;

export default adminSlice.reducer;
