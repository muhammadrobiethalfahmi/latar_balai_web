import {
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../firebase/firestore";

const COLLECTION_NAME = "products";

// ========================================
// GET SEMUA PRODUK
// ========================================
export async function getProducts() {
  return await getDocuments(COLLECTION_NAME);
}

// ========================================
// TAMBAH PRODUK
// ========================================
export async function addProduct(data) {
  return await addDocument(COLLECTION_NAME, data);
}

// ========================================
// UPDATE PRODUK
// ========================================
export async function updateProduct(id, data) {
  return await updateDocument(
    COLLECTION_NAME,
    id,
    data
  );
}

// ========================================
// HAPUS PRODUK
// ========================================
export async function deleteProduct(id) {
  return await deleteDocument(
    COLLECTION_NAME,
    id
  );
}