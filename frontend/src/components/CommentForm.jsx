import { useState } from 'react'

export default function CommentForm({ articleId, onSubmit }) {
  const [form, setForm] = useState({ author: '', content: '', articleId })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await onSubmit(form)
      setForm({ author: '', content: '', articleId })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h3>Ajouter un commentaire</h3>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-row">
        <div className="form-group">
          <label>Auteur *</label>
          <input
            type="text"
            value={form.author}
            onChange={set('author')}
            placeholder="Votre nom"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Commentaire *</label>
        <textarea
          value={form.content}
          onChange={set('content')}
          placeholder="Votre commentaire…"
          rows={4}
          required
          minLength={3}
          maxLength={1000}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Envoi…' : 'Publier'}
      </button>
    </form>
  )
}
