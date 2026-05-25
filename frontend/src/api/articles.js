import client from './client'

export const getArticles = (params) =>
  client.get('/articles', { params }).then(r => r.data)

export const getArticle = (id) =>
  client.get(`/articles/${id}`).then(r => r.data)

export const createArticle = (data) =>
  client.post('/articles', data).then(r => r.data)

export const updateArticle = (id, data) =>
  client.put(`/articles/${id}`, data).then(r => r.data)

export const deleteArticle = (id) =>
  client.delete(`/articles/${id}`)
