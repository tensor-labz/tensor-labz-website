// Legacy Google Sheets client — kept for reference during migration.
// All services now use src/lib/supabase.ts directly.

export async function fetchSheet<T>(
  sheetName: string,
  signal?: AbortSignal
): Promise<T[]> {
  const BASE_URL = import.meta.env.VITE_SHEET_URL as string;
  if (!BASE_URL) throw new Error('VITE_SHEET_URL is not defined');
  const response = await fetch(`${BASE_URL}${sheetName}`, { signal });
  if (!response.ok)
    throw new Error(`HTTP ${response.status} fetching ${sheetName}`);
  const result = await response.json();
  if (!Array.isArray(result?.data))
    throw new Error(`Unexpected response format from ${sheetName}`);
  return result.data as T[];
}
