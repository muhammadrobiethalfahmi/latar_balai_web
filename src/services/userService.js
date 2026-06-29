import { getDocuments } from '../firebase/firestore';

const COLLECTION_NAME = 'users';

export async function getUsers() {
  return await getDocuments(COLLECTION_NAME);
}
