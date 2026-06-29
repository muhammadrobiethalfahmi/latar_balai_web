import React, { useState } from 'react';
import { Edit2, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DataTable({
  columns,
  data = [],
  searchPlaceholder = 'Cari data...',
  searchKey = 'name',
  onEdit,
  onDelete,
  deleteLabel = 'Hapus',
  editLabel = 'Edit',
  isDeleteDisabled = () => false,
  itemsPerPage = 10,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtering
  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;
    const value = item[searchKey];
    if (!value) return false;
    return String(value).toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-surface border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden flex flex-col">
      {/* Table Header Controls */}
      <div className="p-4 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-surface-container-low">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant/60">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-outline/30 rounded-default bg-surface text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors placeholder-on-surface-variant/40"
          />
        </div>
        <div className="text-body-md text-on-surface-variant">
          Menampilkan <span className="font-semibold text-on-surface">{Math.min(filteredData.length, startIndex + 1)}-{Math.min(filteredData.length, startIndex + itemsPerPage)}</span> dari <span className="font-semibold text-on-surface">{filteredData.length}</span> data
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/30 text-label-md font-semibold text-on-surface-variant uppercase tracking-wider">
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 font-bold text-xs">
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-4 text-right font-bold text-xs">
                  Aksi
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20 text-body-md text-on-surface">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr key={row.id || rowIdx} className="hover:bg-surface-container-low transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 align-middle">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 align-middle text-right space-x-2 whitespace-nowrap">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="inline-flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-colors text-xs font-semibold px-3 py-1.5 rounded-default cursor-pointer"
                          title={editLabel}
                        >
                          <Edit2 size={12} />
                          <span>{editLabel}</span>
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          disabled={isDeleteDisabled(row)}
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-default transition-colors ${
                            isDeleteDisabled(row)
                              ? 'bg-outline-variant/20 text-on-surface-variant/40 cursor-not-allowed'
                              : 'bg-error/10 text-error hover:bg-error hover:text-on-error cursor-pointer'
                          }`}
                          title={deleteLabel}
                        >
                          <Trash2 size={12} />
                          <span>{deleteLabel}</span>
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="px-6 py-12 text-center text-on-surface-variant/60"
                >
                  Tidak ada data yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-outline-variant/30 flex items-center justify-between bg-surface-container-low">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-default text-xs font-semibold transition-colors ${
              currentPage === 1
                ? 'text-on-surface-variant/40 cursor-not-allowed'
                : 'text-primary hover:bg-primary/10 cursor-pointer'
            }`}
          >
            <ChevronLeft size={16} />
            <span>Sebelumnya</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-8 h-8 rounded-default text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                  currentPage === page
                    ? 'bg-primary text-on-primary font-bold'
                    : 'text-on-surface hover:bg-surface-container'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-default text-xs font-semibold transition-colors ${
              currentPage === totalPages
                ? 'text-on-surface-variant/40 cursor-not-allowed'
                : 'text-primary hover:bg-primary/10 cursor-pointer'
            }`}
          >
            <span>Selanjutnya</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
