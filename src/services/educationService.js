import { getDocuments, addDocument, updateDocument, deleteDocument } from '../firebase/firestore';

const COLLECTION_NAME = 'education';

export async function getArticles() {
  return await getDocuments(COLLECTION_NAME);
}

export async function addArticle(data) {
  return await addDocument(COLLECTION_NAME, data);
}

export async function updateArticle(id, data) {
  return await updateDocument(COLLECTION_NAME, id, data);
}

export async function deleteArticle(id) {
  return await deleteDocument(COLLECTION_NAME, id);
}
