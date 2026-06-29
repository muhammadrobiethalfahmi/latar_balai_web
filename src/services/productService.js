import { getDocuments, addDocument, updateDocument, deleteDocument } from '../firebase/firestore';

const COLLECTION_NAME = 'products';

export async function getProducts() {
  return await getDocuments(COLLECTION_NAME);
}

export async function addProduct(data) {
  return await addDocument(COLLECTION_NAME, data);
}

export async function updateProduct(id, data) {
  return await updateDocument(COLLECTION_NAME, id, data);
}

export async function deleteProduct(id) {
  return await deleteDocument(COLLECTION_NAME, id);
}
