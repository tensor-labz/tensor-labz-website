export function extractGoogleDriveFileId(url: string): string | null {
  const filePattern = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const openPattern = /[?&]id=([a-zA-Z0-9_-]+)/;
  const docsPattern = /\/d\/([a-zA-Z0-9_-]+)/;

  return (
    url.match(filePattern)?.[1] ??
    url.match(openPattern)?.[1] ??
    url.match(docsPattern)?.[1] ??
    null
  );
}
