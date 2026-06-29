import React, { useState, useEffect } from 'react';
import { Plus, X, AlertTriangle } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import {
  getArticles,
  addArticle,
  updateArticle,
  deleteArticle,
} from '../../services/educationService';
import toast from 'react-hot-toast';

export default function EducationManagement() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  // Form State
  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
  });

  useEffect(() => {
    fetchArticlesList();
  }, []);

  async function fetchArticlesList() {
    setLoading(true);
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (error) {
      toast.error('Gagal mengambil materi edukasi');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const openAddModal = () => {
    setCurrentArticle(null);
    setForm({
      title: '',
      description: '',
      content: '',
      image: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (article) => {
    setCurrentArticle(article);
    setForm({
      title: article.title || '',
      description: article.description || '',
      content: article.content || '',
      image: article.image || '',
    });
    setModalOpen(true);
  };

  const openDeleteConfirm = (article) => {
    setCurrentArticle(article);
    setDeleteConfirmOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      toast.error('Judul dan Konten wajib diisi');
      return;
    }

    try {
      const payload = {
        title: form.title,
        description: form.description,
        content: form.content,
        image: form.image,
      };

      if (currentArticle) {
        // Edit Mode
        await updateArticle(currentArticle.id, payload);
        toast.success('Materi edukasi diperbarui');
      } else {
        // Add Mode
        await addArticle(payload);
        toast.success('Materi edukasi ditambahkan');
      }

      setModalOpen(false);
      fetchArticlesList();
    } catch (error) {
      toast.error('Gagal menyimpan edukasi');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!currentArticle) return;
    try {
      await deleteArticle(currentArticle.id);
      toast.success('Materi edukasi dihapus');
      setDeleteConfirmOpen(false);
      fetchArticlesList();
    } catch (error) {
      toast.error('Gagal menghapus edukasi');
      console.error(error);
    }
  };

  const columns = [
    {
      header: 'Gambar',
      key: 'image',
      render: (row) => (
        <img
          src={row.image || 'https://via.placeholder.com/150?text=Edukasi'}
          alt={row.title}
          className="w-16 h-12 object-cover rounded-md border border-outline-variant/30 bg-surface-container-lowest"
        />
      ),
    },
    {
      header: 'Judul Artikel',
      key: 'title',
      render: (row) => (
        <div className="font-semibold text-on-surface truncate max-w-[200px]" title={row.title}>
          {row.title}
        </div>
      ),
    },
    {
      header: 'Ringkasan',
      key: 'description',
      render: (row) => (
        <p className="text-xs text-on-surface-variant truncate max-w-[250px]" title={row.description}>
          {row.description || '-'}
        </p>
      ),
    },
    {
      header: 'Konten Lengkap',
      key: 'content',
      render: (row) => (
        <p className="text-xs text-on-surface-variant/80 truncate max-w-[200px]" title={row.content}>
          {row.content || '-'}
        </p>
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
            Materi Edukasi Pertanian & Desa
          </h3>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-[#00450D] text-white hover:bg-primary-container text-body-md font-bold px-5 py-2.5 rounded-default shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <Plus size={18} />
          <span>Tambah Artikel</span>
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
          data={articles}
          searchPlaceholder="Cari judul artikel..."
          searchKey="title"
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
                {currentArticle ? 'Perbarui Artikel Edukasi' : 'Tambah Artikel Edukasi Baru'}
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
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Judul Artikel <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: Cara Menanam Selada Hidroponik Sederhana"
                  className="w-full px-3 py-2.5 border border-outline/30 rounded-default text-body-md bg-surface focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  URL Gambar Artikel
                </label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/gambar-artikel.jpg"
                  className="w-full px-3 py-2.5 border border-outline/30 rounded-default text-body-md bg-surface focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Deskripsi Singkat (Ringkasan)
                </label>
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  placeholder="Ringkasan singkat isi artikel untuk tampilan depan..."
                  className="w-full px-3 py-2.5 border border-outline/30 rounded-default text-body-md bg-surface focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Konten Lengkap <span className="text-error">*</span>
                </label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleInputChange}
                  rows="7"
                  required
                  placeholder="Tulis materi pembelajaran, tutorial langkah-demi-langkah, tips praktis..."
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
              Hapus Artikel?
            </h4>
            <p className="text-body-md text-on-surface-variant mb-6">
              Apakah Anda yakin ingin menghapus materi edukasi <span className="font-bold text-on-surface">"{currentArticle?.title}"</span>? Tindakan ini tidak dapat dibatalkan.
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
