import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

/** Firestore database handle. Used by the Firebase-backed repos. */
export const db = getFirestore(firebaseApp);

/** Firebase Auth handle. Source of truth for admin authentication. */
export const auth = getAuth(firebaseApp);

// Analytics only loads in the browser, and only when a measurementId is set and
// the environment supports it (e.g. not in SSR / unsupported browsers).
export let analytics: Analytics | null = null;
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
  isSupported()
    .then((supported) => {
      if (supported) analytics = getAnalytics(firebaseApp);
    })
    .catch(() => {
      /* analytics unavailable — non-fatal */
    });
}
