import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

/**
 * Get all documents from a collection with optional query constraints
 */
export async function getDocuments(collectionName, constraints = []) {
  const ref = collection(db, collectionName);
  const q = constraints.length > 0 ? query(ref, ...constraints) : ref;
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/**
 * Get a single document by ID
 */
export async function getDocument(collectionName, docId) {
  const docRef = doc(db, collectionName, docId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

/**
 * Add a new document (auto-generated ID)
 */
export async function addDocument(collectionName, data) {
  const ref = collection(db, collectionName);
  const docRef = await addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Set a document with a specific ID (creates or overwrites)
 */
export async function setDocument(collectionName, docId, data, merge = true) {
  const docRef = doc(db, collectionName, docId);
  await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge });
  return docId;
}

/**
 * Update specific fields in a document
 */
export async function updateDocument(collectionName, docId, data) {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
}

/**
 * Delete a document
 */
export async function deleteDocument(collectionName, docId) {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

// Re-export query helpers for convenience
export { where, orderBy, limit, serverTimestamp };
