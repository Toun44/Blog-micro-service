import { useState, useEffect } from 'react'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/categories'

const EMPTY_FORM = { name: '', description: '' }

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      setCategories(await getCategories())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const startEdit = (cat) => {
    setEditing(cat.id)
    setForm({ name: cat.name, description: cat.description || '' })
    setError(null)
  }

  const cancelEdit = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      if (editing) {
        await updateCategory(editing, form)
      } else {
        await createCategory(form)
      }
      cancelEdit()
      load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette catégorie ?')) return
    try {
      await deleteCategory(id)
      setCategories(c => c.filter(x => x.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Catégories</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <h2>{editing ? 'Modifier la catégorie' : 'Nouvelle catégorie'}</h2>
        <form className="category-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nom *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Nom de la catégorie"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Description optionnelle"
              />
            </div>
          </div>
          <div className="form-actions">
            {editing && (
              <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                Annuler
              </button>
            )}
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Enregistrement…' : (editing ? 'Mettre à jour' : 'Ajouter')}
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h2>Liste ({categories.length})</h2>
        {loading ? (
          <div className="spinner-container"><div className="spinner" /></div>
        ) : categories.length === 0 ? (
          <p className="empty-state">Aucune catégorie.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id} className={editing === cat.id ? 'row-editing' : ''}>
                  <td><strong>{cat.name}</strong></td>
                  <td className="text-muted">{cat.description || '—'}</td>
                  <td>
                    <div className="card-actions">
                      <button className="btn btn-sm btn-primary" onClick={() => startEdit(cat)}>
                        Modifier
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.id)}>
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
