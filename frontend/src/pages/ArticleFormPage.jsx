import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getArticle, createArticle, updateArticle } from '../api/articles'
import ArticleForm from '../components/ArticleForm'

export default function ArticleFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [initial, setInitial] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isEdit) return
    getArticle(id)
      .then(article => {
        setInitial({
          title: article.title,
          content: article.content,
          author: article.author || '',
          status: article.status,
          categoryIds: []
        })
      })
      .catch(err => setError(err.message))
      .finally(() => setFetching(false))
  }, [id, isEdit])

  const handleSubmit = async (form) => {
    setLoading(true)
    try {
      if (isEdit) {
        await updateArticle(id, form)
        navigate(`/articles/${id}`)
      } else {
        const created = await createArticle(form)
        navigate(`/articles/${created.id}`)
      }
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return <div className="spinner-container"><div className="spinner" /></div>

  return (
    <div className="page">
      <div className="page-header">
        <h1>{isEdit ? 'Modifier l\'article' : 'Nouvel article'}</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <ArticleForm
          initial={initial}
          onSubmit={handleSubmit}
          onCancel={() => navigate(isEdit ? `/articles/${id}` : '/articles')}
          loading={loading}
        />
      </div>
    </div>
  )
}
