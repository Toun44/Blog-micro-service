import { useState, useEffect } from 'react'
import { getCategories } from '../api/categories'

const EMPTY = { title: '', content: '', author: '', status: 'DRAFT', categoryIds: [] }

export default function ArticleForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(initial || EMPTY)
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {})
  }, [])

  useEffect(() => {
    setForm(initial || EMPTY)
  }, [initial])

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const toggleCategory = (id) => {
    setForm(f => ({
      ...f,
      categoryIds: f.categoryIds.includes(id)
        ? f.categoryIds.filter(c => c !== id)
        : [...f.categoryIds, id]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await onSubmit(form)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form className="article-form" onSubmit={handleSubmit}>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-group">
        <label>Titre *</label>
        <input
          type="text"
          value={form.title}
          onChange={set('title')}
          placeholder="Titre de l'article"
          required
        />
      </div>

      <div className="form-group">
        <label>Contenu *</label>
        <textarea
          value={form.content}
          onChange={set('content')}
          placeholder="Contenu de l'article…"
          rows={10}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Auteur</label>
          <input
            type="text"
            value={form.author}
            onChange={set('author')}
            placeholder="Nom de l'auteur"
          />
        </div>

        <div className="form-group">
          <label>Statut</label>
          <select value={form.status} onChange={set('status')}>
            <option value="DRAFT">Brouillon</option>
            <option value="PUBLISHED">Publié</option>
            <option value="ARCHIVED">Archivé</option>
          </select>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="form-group">
          <label>Catégories</label>
          <div className="checkbox-group">
            {categories.map(cat => (
              <label key={cat.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.categoryIds.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Annuler
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </form>
  )
}
