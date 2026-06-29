import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, AlertTriangle } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import { getUsers } from '../../services/userService';
import { deleteDocument } from '../../firebase/firestore';
import toast from 'react-hot-toast';

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsersList();
  }, []);

  async function fetchUsersList() {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Gagal mengambil daftar pengguna');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const openDeleteConfirm = (user) => {
    if (user.role === 'admin') {
      toast.error('Tidak dapat menghapus pengguna administrator');
      return;
    }
    setCurrentUser(user);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!currentUser || currentUser.role === 'admin') return;

    try {
      await deleteDocument('users', currentUser.id);
      toast.success('Akun pengguna berhasil dihapus');
      setDeleteConfirmOpen(false);
      fetchUsersList();
    } catch (error) {
      toast.error('Gagal menghapus pengguna');
      console.error(error);
    }
  };

  const columns = [
    {
      header: 'Nama Lengkap',
      key: 'name',
      render: (row) => (
        <div className="font-semibold text-on-surface truncate max-w-[200px]" title={row.name}>
          {row.name}
        </div>
      ),
    },
    {
      header: 'Alamat Email',
      key: 'email',
      render: (row) => (
        <span className="text-body-md text-on-surface-variant font-medium">
          {row.email}
        </span>
      ),
    },
    {
      header: 'Peran / Role',
      key: 'role',
      render: (row) => {
        const isAdmin = row.role === 'admin';
        return (
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
              isAdmin
                ? 'bg-[#D4AF37]/15 text-[#8a7224] border border-[#D4AF37]/25'
                : 'bg-primary/10 text-primary border border-primary/20'
            }`}
          >
            {isAdmin ? <Shield size={12} /> : <ShieldAlert size={12} />}
            <span>{row.role || 'user'}</span>
          </span>
        );
      },
    },
    {
      header: 'Tanggal Registrasi',
      key: 'createdAt',
      render: (row) => {
        if (!row.createdAt) return <span className="text-on-surface-variant/60">-</span>;
        // Firebase timestamp or string
        const date = row.createdAt.seconds
          ? new Date(row.createdAt.seconds * 1000)
          : new Date(row.createdAt);
        return (
          <span className="text-body-md text-on-surface-variant">
            {date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div>
        <p className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">
          Manajemen Keamanan
        </p>
        <h3 className="font-heading font-bold text-xl text-[#00450D]">
          Akun Pengguna Terdaftar
        </h3>
        <p className="text-sm text-on-surface-variant mt-1.5">
          Berikut adalah daftar seluruh akun warga desa dan pengguna umum terdaftar. Anda dapat meninjau peran atau menghapus akun non-admin jika diperlukan.
        </p>
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="flex h-[40vh] items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#00450D] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={users}
          searchPlaceholder="Cari pengguna berdasarkan nama..."
          searchKey="name"
          onDelete={openDeleteConfirm}
          isDeleteDisabled={(row) => row.role === 'admin'}
          deleteLabel="Hapus Akun"
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg shadow-2xl max-w-sm w-full p-6 border border-outline-variant/30 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-error/15 text-error rounded-full flex items-center justify-center mx-auto mb-4 border border-error/25">
              <AlertTriangle size={24} />
            </div>
            <h4 className="font-heading font-bold text-lg text-on-surface mb-2">
              Hapus Akun Pengguna?
            </h4>
            <p className="text-body-md text-on-surface-variant mb-6">
              Apakah Anda yakin ingin menghapus akun pengguna <span className="font-bold text-on-surface">"{currentUser?.name}"</span>? Akun ini tidak akan dapat login lagi.
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
