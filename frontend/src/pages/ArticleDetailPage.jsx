import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getArticle, deleteArticle } from '../api/articles'
import { getComments, createComment, deleteComment } from '../api/comments'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'

const STATUS_LABELS = { DRAFT: 'Brouillon', PUBLISHED: 'Publié', ARCHIVED: 'Archivé' }

export default function ArticleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([getArticle(id), getComments(id)])
      .then(([art, coms]) => { setArticle(art); setComments(coms) })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!confirm('Supprimer cet article ?')) return
    try {
      await deleteArticle(id)
      navigate('/articles')
    } catch (err) {
      alert(err.message)
    }
  }

  const handleAddComment = async (data) => {
    const comment = await createComment(data)
    setComments(c => [...c, comment])
  }

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Supprimer ce commentaire ?')) return
    try {
      await deleteComment(commentId)
      setComments(c => c.filter(x => x.id !== commentId))
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <div className="spinner-container"><div className="spinner" /></div>
  if (error) return <div className="page"><div className="alert alert-error">{error}</div></div>
  if (!article) return null

  const date = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return (
    <div className="page article-detail">
      <button className="btn btn-secondary btn-back" onClick={() => navigate('/articles')}>
        ← Retour
      </button>

      <article className="card">
        <div className="article-detail-header">
          <span className={`badge badge-${article.status?.toLowerCase()}`}>
            {STATUS_LABELS[article.status]}
          </span>
          <div className="article-detail-actions">
            <button className="btn btn-primary" onClick={() => navigate(`/articles/${id}/edit`)}>
              Modifier
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Supprimer
            </button>
          </div>
        </div>

        <h1 className="article-detail-title">{article.title}</h1>

        <div className="article-detail-meta">
          <span>✍️ {article.author || 'Anonyme'}</span>
          <span>📅 {date}</span>
          {article.categories?.length > 0 && (
            <div className="tag-list">
              {article.categories.map(cat => <span key={cat} className="tag">{cat}</span>)}
            </div>
          )}
        </div>

        <div className="article-detail-body">
          {article.content?.split('\n').map((line, i) => (
            <p key={i}>{line || <br />}</p>
          ))}
        </div>
      </article>

      <section className="comments-section card">
        <h2>Commentaires ({comments.length})</h2>
        <CommentList comments={comments} onDelete={handleDeleteComment} />
        <CommentForm articleId={Number(id)} onSubmit={handleAddComment} />
      </section>
    </div>
  )
}
