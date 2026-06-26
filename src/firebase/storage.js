import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from './config';

/**
 * Upload a file to Firebase Storage
 * @param {string} path - Storage path (e.g. 'images/products/photo.jpg')
 * @param {File} file - The file to upload
 * @returns {string} Download URL of the uploaded file
 */
export async function uploadFile(path, file) {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}

/**
 * Get the download URL of a file in Storage
 * @param {string} path - Storage path
 * @returns {string} Download URL
 */
export async function getFileURL(path) {
  const storageRef = ref(storage, path);
  return await getDownloadURL(storageRef);
}

/**
 * Delete a file from Storage
 * @param {string} path - Storage path
 */
export async function deleteFile(path) {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}
