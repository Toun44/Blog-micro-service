import client from './client'

export const getComments = (articleId) =>
  client.get(`/comments/article/${articleId}`).then(r => r.data)

export const createComment = (data) =>
  client.post('/comments', data).then(r => r.data)

export const deleteComment = (id) =>
  client.delete(`/comments/${id}`)
