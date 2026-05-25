export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i)

  return (
    <div className="pagination">
      <button
        className="btn btn-sm btn-secondary"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        ← Précédent
      </button>

      <div className="pagination-pages">
        {pages.map(p => (
          <button
            key={p}
            className={`btn btn-sm ${p === page ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => onPageChange(p)}
          >
            {p + 1}
          </button>
        ))}
      </div>

      <button
        className="btn btn-sm btn-secondary"
        disabled={page === totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      >
        Suivant →
      </button>
    </div>
  )
}
