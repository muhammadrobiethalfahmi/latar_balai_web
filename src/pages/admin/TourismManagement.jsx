import React, { useState, useEffect } from 'react';
import { Plus, X, AlertTriangle } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import {
  getTourismPlaces,
  addTourismPlace,
  updateTourismPlace,
  deleteTourismPlace,
} from '../../services/tourismService';
import toast from 'react-hot-toast';

export default function TourismManagement() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [currentSpot, setCurrentSpot] = useState(null);

  // Form State
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    image: '',
  });

  useEffect(() => {
    fetchTourismList();
  }, []);

  async function fetchTourismList() {
    setLoading(true);
    try {
      const data = await getTourismPlaces();
      setSpots(data);
    } catch (error) {
      toast.error('Gagal mengambil destinasi wisata');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const openAddModal = () => {
    setCurrentSpot(null);
    setForm({
      title: '',
      description: '',
      location: '',
      image: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (spot) => {
    setCurrentSpot(spot);
    setForm({
      title: spot.title || '',
      description: spot.description || '',
      location: spot.location || '',
      image: spot.image || '',
    });
    setModalOpen(true);
  };

  const openDeleteConfirm = (spot) => {
    setCurrentSpot(spot);
    setDeleteConfirmOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.location) {
      toast.error('Judul dan Lokasi wajib diisi');
      return;
    }

    try {
      const payload = {
        title: form.title,
        description: form.description,
        location: form.location,
        image: form.image,
      };

      if (currentSpot) {
        // Edit Mode
        await updateTourismPlace(currentSpot.id, payload);
        toast.success('Destinasi wisata diperbarui');
      } else {
        // Add Mode
        await addTourismPlace(payload);
        toast.success('Destinasi wisata ditambahkan');
      }

      setModalOpen(false);
      fetchTourismList();
    } catch (error) {
      toast.error('Gagal menyimpan destinasi');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!currentSpot) return;
    try {
      await deleteTourismPlace(currentSpot.id);
      toast.success('Destinasi wisata dihapus');
      setDeleteConfirmOpen(false);
      fetchTourismList();
    } catch (error) {
      toast.error('Gagal menghapus destinasi');
      console.error(error);
    }
  };

  const columns = [
    {
      header: 'Gambar',
      key: 'image',
      render: (row) => (
        <img
          src={row.image || 'https://via.placeholder.com/150?text=Wisata'}
          alt={row.title}
          className="w-20 h-12 object-cover rounded-md border border-outline-variant/30 bg-surface-container-lowest"
        />
      ),
    },
    {
      header: 'Nama Destinasi',
      key: 'title',
      render: (row) => (
        <div className="font-semibold text-on-surface truncate max-w-[200px]" title={row.title}>
          {row.title}
        </div>
      ),
    },
    {
      header: 'Lokasi Wisata',
      key: 'location',
      render: (row) => (
        <span className="text-body-md text-on-surface-variant font-medium">
          {row.location}
        </span>
      ),
    },
    {
      header: 'Deskripsi Singkat',
      key: 'description',
      render: (row) => (
        <p className="text-xs text-on-surface-variant truncate max-w-[250px]" title={row.description}>
          {row.description || '-'}
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
            Destinasi Wisata Desa Mulyoarjo
          </h3>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-[#00450D] text-white hover:bg-primary-container text-body-md font-bold px-5 py-2.5 rounded-default shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <Plus size={18} />
          <span>Tambah Destinasi</span>
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
          data={spots}
          searchPlaceholder="Cari destinasi wisata..."
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
                {currentSpot ? 'Perbarui Destinasi Wisata' : 'Tambah Destinasi Wisata Baru'}
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
                  Nama Destinasi <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: Sumber Mata Air Balai Mulyo"
                  className="w-full px-3 py-2.5 border border-outline/30 rounded-default text-body-md bg-surface focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Lokasi Destinasi <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: Dusun Krajan RT 02 / RW 04"
                  className="w-full px-3 py-2.5 border border-outline/30 rounded-default text-body-md bg-surface focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  URL Gambar Destinasi
                </label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/gambar-wisata.jpg"
                  className="w-full px-3 py-2.5 border border-outline/30 rounded-default text-body-md bg-surface focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Deskripsi Destinasi
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Deskripsikan atraksi utama, harga tiket masuk, jam operasional, dan info penting wisata..."
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
              Hapus Destinasi?
            </h4>
            <p className="text-body-md text-on-surface-variant mb-6">
              Apakah Anda yakin ingin menghapus destinasi wisata <span className="font-bold text-on-surface">"{currentSpot?.title}"</span>? Tindakan ini tidak dapat dibatalkan.
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
