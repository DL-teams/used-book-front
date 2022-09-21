import http from './public'
// 论坛列表
export const forumList = (category) => {
  return http.fetchGet('/users/forums?category=' + category)
}
// 添加
export const addForum = (params) => {
  return http.fetchPost('/users/forums', params)
}
// 修改
export const updateForum = (params) => {
  return http.fetchPost('/users/forums-update?id=' + params.id, params)
}
// 删除论坛
export const delForum = (id) => {
  return http.fetchPost('/users/forums-remove?id=' + id)
}
// 论坛详情
export const forumDetail = (id) => {
  return http.fetchGet('/users/forums-detail?id=' + id)
}
// 添加回复
export const addComment = (params) => {
  return http.fetchPost('/users/comments', params)
}
// 回复列表
export const commentList = (forumId) => {
  return http.fetchGet('/users/comments?forumId=' + forumId)
}
// 删除回复
export const delComment = (id) => {
  return http.fetchPost('/users/comments-remove?id=' + id)
}
// 打卡
export const checkIn = (id) => {
  return http.fetchGet('/users/check-in?userId=' + id)
}
