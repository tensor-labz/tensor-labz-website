/**
 * create-firebase-admin.mjs — create (or find) a Firebase Auth admin user.
 *
 * Creates the user if absent, then prints a password-reset link the admin can
 * use to set their password (no password is handled/stored by this script).
 *
 * Run:
 *   node --env-file=.env scripts/create-firebase-admin.mjs <email>
 *   # e.g. node --env-file=.env scripts/create-firebase-admin.mjs admin@tensorlabz.com
 *
 * Requires: GOOGLE_APPLICATION_CREDENTIALS or the admin SDK JSON at repo root.
 */
import { readFileSync } from 'node:fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const email = process.argv[2];
if (!email) {
  console.error('Usage: node scripts/create-firebase-admin.mjs <email>');
  process.exit(1);
}

const KEY_PATH =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ??
  './tensor-labz-website-firebase-adminsdk-fbsvc-e6d67a02f0.json';
initializeApp({ credential: cert(JSON.parse(readFileSync(KEY_PATH, 'utf8'))) });
const auth = getAuth();

async function run() {
  let user;
  try {
    user = await auth.getUserByEmail(email);
    console.log(`User already exists: ${user.uid}`);
  } catch {
    user = await auth.createUser({ email, emailVerified: true });
    console.log(`✓ Created Firebase user: ${user.uid} (${email})`);
  }

  const link = await auth.generatePasswordResetLink(email);
  console.log('\nSet the password with this link:\n');
  console.log(link);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
