import React, { useState, useEffect } from 'react';
import { Plus, X, AlertTriangle } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../services/productService';
import toast from 'react-hot-toast';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Form State
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
  });

  const categories = ['Pertanian', 'Kerajinan', 'Makanan & Minuman', 'Jasa', 'Lainnya'];

  useEffect(() => {
    fetchProductsList();
  }, []);

  async function fetchProductsList() {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      toast.error('Gagal mengambil daftar produk');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const openAddModal = () => {
    setCurrentProduct(null);
    setForm({
      name: '',
      description: '',
      price: '',
      category: categories[0],
      stock: '',
      image: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || categories[0],
      stock: product.stock || '',
      image: product.image || '',
    });
    setModalOpen(true);
  };

  const openDeleteConfirm = (product) => {
    setCurrentProduct(product);
    setDeleteConfirmOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productPrice = Number(form.price);
    const productStock = Number(form.stock);

    if (!form.name || isNaN(productPrice) || isNaN(productStock)) {
      toast.error('Harap isi formulir dengan benar');
      return;
    }

    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: productPrice,
        category: form.category,
        stock: productStock,
        image: form.image,
      };

      if (currentProduct) {
        // Edit Mode
        await updateProduct(currentProduct.id, payload);
        toast.success('Produk berhasil diperbarui');
      } else {
        // Add Mode
        await addProduct(payload);
        toast.success('Produk berhasil ditambahkan');
      }

      setModalOpen(false);
      fetchProductsList();
    } catch (error) {
      toast.error('Gagal menyimpan produk');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!currentProduct) return;
    try {
      await deleteProduct(currentProduct.id);
      toast.success('Produk berhasil dihapus');
      setDeleteConfirmOpen(false);
      fetchProductsList();
    } catch (error) {
      toast.error('Gagal menghapus produk');
      console.error(error);
    }
  };

  // DataTable column definitions
  const columns = [
    {
      header: 'Gambar',
      key: 'image',
      render: (row) => (
        <img
          src={row.image || 'https://via.placeholder.com/80?text=Produk'}
          alt={row.name}
          className="w-12 h-12 object-cover rounded-md border border-outline-variant/30 bg-surface-container-lowest"
        />
      ),
    },
    {
      header: 'Nama Produk',
      key: 'name',
      render: (row) => (
        <div className="font-semibold text-on-surface truncate max-w-[200px]" title={row.name}>
          {row.name}
        </div>
      ),
    },
    {
      header: 'Kategori',
      key: 'category',
      render: (row) => (
        <span className="text-xs uppercase font-medium bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full">
          {row.category || 'Umum'}
        </span>
      ),
    },
    {
      header: 'Harga',
      key: 'price',
      render: (row) => (
        <span className="font-bold text-on-surface">
          Rp {Number(row.price || 0).toLocaleString('id-ID')}
        </span>
      ),
    },
    {
      header: 'Stok',
      key: 'stock',
      render: (row) => (
        <span
          className={`font-semibold ${
            (row.stock || 0) < 5 ? 'text-error font-bold' : 'text-on-surface-variant'
          }`}
        >
          {row.stock || 0}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">
            Manajemen Konten
          </p>
          <h3 className="font-heading font-bold text-xl text-[#00450D]">
            Daftar Produk BUMDes Mulyoarjo
          </h3>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-[#00450D] text-white hover:bg-primary-container text-body-md font-bold px-5 py-2.5 rounded-default shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <Plus size={18} />
          <span>Tambah Produk</span>
        </button>
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="flex h-[40vh] items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#00450D] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={products}
          searchPlaceholder="Cari berdasarkan nama produk..."
          searchKey="name"
          onEdit={openEditModal}
          onDelete={openDeleteConfirm}
        />
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-outline-variant/30 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#00450D] text-white flex items-center justify-between">
              <h4 className="font-heading font-bold text-base">
                {currentProduct ? 'Perbarui Produk BUMDes' : 'Tambah Produk BUMDes Baru'}
              </h4>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Nama Produk <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: Pupuk Organik Kompos Mulyo"
                  className="w-full px-3 py-2.5 border border-outline/30 rounded-default text-body-md bg-surface focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Price & Stock Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Harga (Rp) <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="Contoh: 15000"
                    className="w-full px-3 py-2.5 border border-outline/30 rounded-default text-body-md bg-surface focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Stok <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="Contoh: 50"
                    className="w-full px-3 py-2.5 border border-outline/30 rounded-default text-body-md bg-surface focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Kategori Produk <span className="text-error">*</span>
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-outline/30 rounded-default text-body-md bg-surface focus:outline-none focus:border-primary transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  URL Gambar Produk
                </label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/gambar-produk.jpg"
                  className="w-full px-3 py-2.5 border border-outline/30 rounded-default text-body-md bg-surface focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Deskripsi Produk
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tuliskan spesifikasi, manfaat, dan deskripsi detail produk..."
                  className="w-full px-3 py-2.5 border border-outline/30 rounded-default text-body-md bg-surface focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-end gap-3 bg-surface">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border border-outline/30 rounded-default text-body-md text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#00450D] text-white hover:bg-primary-container font-bold rounded-default shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg shadow-2xl max-w-sm w-full p-6 border border-outline-variant/30 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-error/15 text-error rounded-full flex items-center justify-center mx-auto mb-4 border border-error/25">
              <AlertTriangle size={24} />
            </div>
            <h4 className="font-heading font-bold text-lg text-on-surface mb-2">
              Hapus Produk?
            </h4>
            <p className="text-body-md text-on-surface-variant mb-6">
              Apakah Anda yakin ingin menghapus produk <span className="font-bold text-on-surface">"{currentProduct?.name}"</span>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-4 py-2 border border-outline/30 rounded-default text-xs font-semibold text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-error text-white font-semibold text-xs rounded-default hover:bg-error-container hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Hapus Permanen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
