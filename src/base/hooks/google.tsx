/**
 * Extracts the file ID from a Google Drive URL
 *
 * Supports the following URL formats:
 * - https://drive.google.com/file/d/{fileId}/view
 * - https://drive.google.com/open?id={fileId}
 * - https://docs.google.com/document/d/{fileId}/edit
 * - And other variations of Google Drive URLs
 *
 * @param url - The Google Drive URL
 * @returns The extracted file ID or null if not found
 */
export function extractGoogleDriveFileId(url: string): string | null {
    // For URLs like https://drive.google.com/file/d/{fileId}/view
    const filePattern = /\/file\/d\/([a-zA-Z0-9_-]+)/;

    // For URLs like https://drive.google.com/open?id={fileId}
    const openPattern = /[\?&]id=([a-zA-Z0-9_-]+)/;

    // For URLs like https://docs.google.com/document/d/{fileId}/edit
    const docsPattern = /\/d\/([a-zA-Z0-9_-]+)/;

    // Try each pattern in order
    const fileMatch = url.match(filePattern);
    if (fileMatch && fileMatch[1]) {
      return fileMatch[1];
    }

    const openMatch = url.match(openPattern);
    if (openMatch && openMatch[1]) {
      return openMatch[1];
    }

    const docsMatch = url.match(docsPattern);
    if (docsMatch && docsMatch[1]) {
      return docsMatch[1];
    }

    return null;
  }