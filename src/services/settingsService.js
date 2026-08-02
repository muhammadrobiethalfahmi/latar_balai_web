import {
  getDocument,
  setDocument,
} from "../firebase/firestore";

const COLLECTION_NAME = "settings";
const DOCUMENT_ID = "website";

export async function getSettings() {
  return await getDocument(
    COLLECTION_NAME,
    DOCUMENT_ID
  );
}

export async function saveSettings(data) {
  return await setDocument(
    COLLECTION_NAME,
    DOCUMENT_ID,
    {
      ...data,
      updatedAt: new Date(),
    }
  );
}