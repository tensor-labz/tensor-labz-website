import { auth } from './firebase';

const LAMBDA_URL = import.meta.env.VITE_IMAGE_LAMBDA_URL as string;
const CDN_URL = (import.meta.env.VITE_CDN_URL ?? '') as string;
const S3_BUCKET = (import.meta.env.VITE_S3_BUCKET ?? '') as string;
const S3_REGION = (import.meta.env.VITE_S3_REGION ?? '') as string;

/** Derives S3 key from a stored CDN or S3 URL, returns null for external URLs. */
export function keyFromUrl(url: string): string | null {
  if (!url) return null;
  const cdnBase = CDN_URL.endsWith('/') ? CDN_URL : `${CDN_URL}/`;
  if (CDN_URL && url.startsWith(cdnBase)) return url.slice(cdnBase.length);
  const s3Base = `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/`;
  if (url.startsWith(s3Base)) return url.slice(s3Base.length);
  return null;
}

async function getToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  // Firebase ID token — the Lambda must verify Firebase tokens (not Supabase JWT).
  return user.getIdToken();
}

/**
 * Uploads a file to S3 via Lambda presigned URL.
 * If existingUrl is one of our S3/CDN URLs, calls /image/replace to clean up the old object.
 * Returns the publicUrl to store in Supabase.
 *
 * @param onProgress Optional callback receiving upload progress (0–100).
 */
export async function uploadImage(
  file: File,
  folder: string,
  existingUrl?: string,
  onProgress?: (pct: number) => void
): Promise<{ publicUrl: string; key: string }> {
  const token = await getToken();
  const existingKey = existingUrl ? keyFromUrl(existingUrl) : null;

  const endpoint = existingKey ? '/image/replace' : '/image/upload-url';
  const payload = existingKey
    ? {
        oldKey: existingKey,
        filename: file.name,
        contentType: file.type,
        folder,
      }
    : { filename: file.name, contentType: file.type, folder };

  const res = await fetch(`${LAMBDA_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed (${res.status}): ${text}`);
  }

  const { uploadUrl, publicUrl, key } = (await res.json()) as {
    uploadUrl: string;
    publicUrl: string;
    key: string;
  };

  // Use XHR instead of fetch so we can report upload progress via onprogress.
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl);
    xhr.setRequestHeader('Content-Type', file.type);

    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        if (onProgress) onProgress(100);
        resolve();
      } else {
        reject(new Error(`S3 PUT failed (${xhr.status})`));
      }
    };
    xhr.onerror = () => reject(new Error('S3 PUT network error'));
    xhr.send(file);
  });

  return { publicUrl, key };
}

/** Deletes one or more S3 objects by key (or full URL). */
export async function deleteImages(keysOrUrls: string[]): Promise<void> {
  if (!keysOrUrls.length) return;
  const token = await getToken();
  await fetch(`${LAMBDA_URL}/image`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ keys: keysOrUrls }),
  });
}

/**
 * Returns the S3 folder for a given admin module.
 * projects folder includes the slug so images are organised per project.
 */
export function moduleFolder(moduleId: string, slug?: string): string {
  if (moduleId === 'hero') return 'Home/Hero';
  if (moduleId === 'services') return 'Insights';
  if (moduleId === 'projects') return `projects/${slug ?? 'draft'}`;
  return moduleId;
}
