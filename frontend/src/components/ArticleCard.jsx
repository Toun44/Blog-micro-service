import { useNavigate } from 'react-router-dom'

const STATUS_LABELS = { DRAFT: 'Brouillon', PUBLISHED: 'Publié', ARCHIVED: 'Archivé' }

export default function ArticleCard({ article, onDelete }) {
  const navigate = useNavigate()

  const excerpt = article.content?.length > 140
    ? article.content.slice(0, 140) + '…'
    : article.content

  const date = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
    : ''

  return (
    <div className="card article-card">
      <div className="card-header">
        <span className={`badge badge-${article.status?.toLowerCase()}`}>
          {STATUS_LABELS[article.status] || article.status}
        </span>
        <span className="article-date">{date}</span>
      </div>

      <h2 className="article-title" onClick={() => navigate(`/articles/${article.id}`)}>
        {article.title}
      </h2>

      <p className="article-excerpt">{excerpt}</p>

      {article.categories?.length > 0 && (
        <div className="tag-list">
          {article.categories.map(cat => (
            <span key={cat} className="tag">{cat}</span>
          ))}
        </div>
      )}

      <div className="card-footer">
        <span className="article-author">✍️ {article.author || 'Anonyme'}</span>
        <div className="card-actions">
          <button className="btn btn-sm btn-secondary" onClick={() => navigate(`/articles/${article.id}`)}>
            Lire
          </button>
          <button className="btn btn-sm btn-primary" onClick={() => navigate(`/articles/${article.id}/edit`)}>
            Modifier
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(article.id)}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}
