export default function CommentList({ comments, onDelete }) {
  if (!comments.length) {
    return <p className="empty-state">Aucun commentaire pour l'instant.</p>
  }

  return (
    <ul className="comment-list">
      {comments.map(c => {
        const date = c.createdAt
          ? new Date(c.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
          : ''
        return (
          <li key={c.id} className="comment-item">
            <div className="comment-meta">
              <strong>{c.author}</strong>
              <span className="comment-date">{date}</span>
              <button className="btn btn-xs btn-danger" onClick={() => onDelete(c.id)}>
                Supprimer
              </button>
            </div>
            <p className="comment-content">{c.content}</p>
          </li>
        )
      })}
    </ul>
  )
}
