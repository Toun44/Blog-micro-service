import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getArticles, deleteArticle } from '../api/articles'
import ArticleCard from '../components/ArticleCard'
import Pagination from '../components/Pagination'

export default function ArticlesPage() {
  const navigate = useNavigate()
  const [data, setData] = useState({ content: [], totalPages: 0 })
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await getArticles({ page, size: 9, search: query || undefined })
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [page, query])

  useEffect(() => { load() }, [load])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(0)
    setQuery(search)
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cet article ?')) return
    try {
      await deleteArticle(id)
      load()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Articles</h1>
        <button className="btn btn-primary" onClick={() => navigate('/articles/new')}>
          + Nouvel article
        </button>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher par titre ou contenu…"
        />
        <button type="submit" className="btn btn-secondary">Rechercher</button>
        {query && (
          <button type="button" className="btn btn-secondary" onClick={() => { setSearch(''); setQuery(''); setPage(0) }}>
            ✕ Effacer
          </button>
        )}
      </form>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="spinner-container"><div className="spinner" /></div>
      ) : data.content.length === 0 ? (
        <div className="empty-state">
          <p>Aucun article trouvé{query ? ` pour « ${query} »` : ''}.</p>
          <button className="btn btn-primary" onClick={() => navigate('/articles/new')}>
            Créer le premier article
          </button>
        </div>
      ) : (
        <>
          <div className="articles-grid">
            {data.content.map(article => (
              <ArticleCard key={article.id} article={article} onDelete={handleDelete} />
            ))}
          </div>
          <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
