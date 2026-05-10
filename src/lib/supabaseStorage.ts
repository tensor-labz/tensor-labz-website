import { supabase } from './supabase';

const AVATAR_BUCKET = 'avatars';

export async function uploadAvatar(file: File, userId: string): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${userId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteAvatar(publicUrl: string): Promise<void> {
  const bucket = `${AVATAR_BUCKET}/`;
  const idx = publicUrl.indexOf(bucket);
  if (idx === -1) return;
  const path = publicUrl.slice(idx + bucket.length);
  await supabase.storage.from(AVATAR_BUCKET).remove([path]);
}
