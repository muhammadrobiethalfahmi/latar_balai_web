import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from './config';

/**
 * Sign in with email and password
 */
export async function loginWithEmail(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Register a new user with email, password, and display name
 */
export async function registerWithEmail(email, password, displayName) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  // Update user profile with display name
  await updateProfile(userCredential.user, { displayName });
  return userCredential.user;
}

/**
 * Sign out the current user
 */
export async function logoutUser() {
  await signOut(auth);
}

/**
 * Send a password reset email
 */
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Subscribe to auth state changes
 * Returns an unsubscribe function
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
