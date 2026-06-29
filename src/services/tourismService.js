import { getDocuments, addDocument, updateDocument, deleteDocument } from '../firebase/firestore';

const COLLECTION_NAME = 'tourism';

export async function getTourismPlaces() {
  return await getDocuments(COLLECTION_NAME);
}

export async function addTourismPlace(data) {
  return await addDocument(COLLECTION_NAME, data);
}

export async function updateTourismPlace(id, data) {
  return await updateDocument(COLLECTION_NAME, id, data);
}

export async function deleteTourismPlace(id) {
  return await deleteDocument(COLLECTION_NAME, id);
}
