import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('/page/index.vue')
const Login = () => import('/page/Login/login.vue')
const Register = () => import('/page/Login/register.vue')
const Home = () => import('/page/Home/home.vue')
const GoodS = () => import('/page/Goods/goods.vue')
const OfficialGoodS = () => import('/page/Goods/officialgoods.vue')
const goodsDetails = () => import('/page/Goods/goodsDetails.vue')
const OfficialGoodsDetails = () => import('/page/Goods/officialgoodsDetails.vue')
const Cart = () => import('/page/Cart/cart.vue')
const Forum = () => import('/page/Forum/forum.vue')
const ForumDetail = () => import('/page/Forum/detail.vue')
const forumAdd = () => import('/page/Forum/add.vue')
const forumEdit = () => import('/page/Forum/edit.vue')
const order = () => import('/page/Order/order.vue')
const user = () => import('/page/User/user.vue')
const orderList = () => import('/page/User/children/order.vue')
const information = () => import('/page/User/children/information.vue')
const addressList = () => import('/page/User/children/addressList.vue')
const coupon = () => import('/page/User/children/coupon.vue')
const support = () => import('/page/User/children/support.vue')
const checkout = () => import('/page/Checkout/checkout.vue')
const payment = () => import('/page/Order/payment.vue')
const paysuccess = () => import('/page/Order/paysuccess.vue')
const Thanks = () => import('/page/Thanks/thanks.vue')
const Search = () => import('/page/Search/search.vue')
const RefreshSearch = () => import('/page/Refresh/refreshsearch.vue')
const RefreshGoods = () => import('/page/Refresh/refreshgoods.vue')
const RefreshOfficialGoods = () => import('/page/Refresh/refreshofficialgoods.vue')
const orderDetail = () => import('/page/User/children/orderDetail.vue')
const Alipay = () => import('/page/Order/alipay.vue')
const Wechat = () => import('/page/Order/wechat.vue')
const QQpay = () => import('/page/Order/qqpay.vue')
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      name: 'index',
      redirect: '/home',
      children: [
        {path: 'home', component: Home},
        {path: 'goods', component: GoodS},
        {path: 'officialgoods', component: OfficialGoodS},
        {path: 'goodsDetails', name: 'goodsDetails', component: goodsDetails},
        {path: 'officialgoodsDetails', name: 'officialgoodsDetails', component: OfficialGoodsDetails},
        {path: 'thanks', name: 'thanks', component: Thanks},
        {path: '/refreshgoods', name: 'refreshgoods', component: RefreshGoods},
        {path: '/refreshofficialgoods', name: 'refreshofficialgoods', component: RefreshOfficialGoods},
        {path: 'forum', name: 'forum', component: Forum},
        {path: 'forumDetail', name: 'forumDetail', component: ForumDetail},
        {path: 'forumAdd', name: 'forumAdd', component: forumAdd},
        {path: 'forumEdit', name: 'forumEdit', component: forumEdit}
      ]
    },
    {path: '/login', name: 'login', component: Login},
    {path: '/register', name: 'register', component: Register},
    {path: '/cart', name: 'cart', component: Cart},
    {path: '/refreshsearch', name: 'refreshsearch', component: RefreshSearch},
    {
      path: '/order',
      name: 'order',
      component: order,
      children: [
        {path: 'paysuccess', name: 'paysuccess', component: paysuccess},
        {path: 'payment', name: 'payment', component: payment},
        {path: '/search', name: 'search', component: Search},
        {path: 'alipay', name: 'alipay', component: Alipay},
        {path: 'wechat', name: 'wechat', component: Wechat},
        {path: 'qqpay', name: 'qqpay', component: QQpay}
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      redirect: '/user/orderList',
      children: [
        {path: 'orderList', name: '????????????', component: orderList},
        {path: 'orderDetail', name: '????????????', component: orderDetail},
        {path: 'information', name: '????????????', component: information},
        {path: 'addressList', name: '????????????', component: addressList},
        {path: 'coupon', name: '????????????', component: coupon},
        {path: 'support', name: '????????????', component: support}
      ]
    },
    {path: '/checkout', name: 'checkout', component: checkout},
    {path: '*', redirect: '/home'}
  ]
})
