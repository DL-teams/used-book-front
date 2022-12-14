import http from './public'
// 商品列表
export const getAllGoods = (params) => {
  return http.fetchGet('/users/all-goods', params)
}
// 获取购物车列表
export const getCartList = (params) => {
  return http.fetchPost('/users/shopping', params)
}
// 加入购物车
export const addCart = (params) => {
  return http.fetchPost('/users/shopping-add', params)
}
// 删除购物车
export const delCart = (params) => {
  return http.fetchPost('/member/delCart', params)
}
// 删除购物车勾选商品
export const delCartChecked = (params) => {
  return http.fetchPost('/users/shopping-delete', params)
}
// 编辑购物车
export const cartEdit = (params) => {
  return http.fetchPost('/users/shopping-update', params)
}
// 全选
export const editCheckAll = (params) => {
  return http.fetchPost('/member/editCheckAll', params)
}
// 删除整条购物车
export const cartDel = (params) => {
  return http.fetchPost('/users/shopping-remove', params)
}
// 获取用户地址
export const addressList = (params) => {
  return http.fetchGet('/users/address', params)
}
// 通过id获取地址
export const getAddress = (params) => {
  return http.fetchPost('/users/address', params)
}
// 修改收货地址
export const addressUpdate = (params) => {
  return http.fetchPost('/users/address-update', params)
}
// 添加收货地址
export const addressAdd = (params) => {
  return http.fetchPost('/users/address-add', params)
}
// 删除收货地址
export const addressDel = (params) => {
  return http.fetchPost('/users/address-remove', params)
}
// 生成订单
export const submitOrder = (params) => {
  return http.fetchPost('/oms/order-add', params)
}
// 支付
export const payMent = (params) => {
  return http.fetchPost('/member/payOrder', params)
}
// 获取用户订单
export const orderList = (params) => {
  return http.fetchGet('/oms/order-list', params)
}
// 获取单个订单详情
export const getOrderDet = (params) => {
  return http.fetchGet('/oms/order-detail', params)
}
// 取消订单
export const cancelOrder = (params) => {
  return http.fetchPost('/member/cancelOrder', params)
}
// 商品详情
export const productDet = (params) => {
  return http.fetchGet('/users/product-detail', params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchGet('/oms/order-delete', params)
}
// 商品列表
export const getSearch = (params) => {
  return http.fetchGet('/goods/search', params)
}
// 快速搜索
export const getQuickSearch = (params) => {
  return http.fetchGet('/goods/quickSearch', params)
}
// 添加售卖二手商品
export const addProduct = (params) => {
  return http.fetchPost('/bms/product-add', params)
}
// 出售商品列表
export const sellProductList = (params) => {
  return http.fetchGet('/bms/product-list', params)
}
// 删除出售商品
export const deleteProduct = (params) => {
  return http.fetchPost('/bms/product-delete', params)
}
