import Vue from 'vue'
import Router from 'vue-router'
import {
  resolve
} from 'path';
Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/index/home'
    },
    {
      path: '/login',
      // component: resolve => require(['../components/pages/login/Index.vue'],resolve)
      component: () => import('@/components/pages/login/Index.vue'),
    },
    {
      path: '/register',
      component: resolve => require(['../components/pages/login/Register.vue'], resolve)
    },
    {
      path: '/forgorPas',
      component: resolve => require(['../components/pages/login/ForgorPas.vue'], resolve)
    },
    {
      path: '/index',
      component: resolve => require(['../components/Index.vue'], resolve),
      children: [{ //主页
          path: '/index/home',
          component: () => import('@/components/pages/home/home.vue')
        },
        {
          path: '/index/bolg',
          component: () => import('@/components/pages/home/bolg.vue')
        },

        { //产品详情
          path: '/index/productDetail/:id',
          name:'/index/productDetail',
          component: () => import('@/components/pages/home/productDetail.vue')
        },

        { //blog详情
          path: '/index/bolgDetail',
          component: () => import('@/components/pages/home/bolgDetail.vue')
        },
        { //blog 列表
          path: '/index/bolgList',
          component: () => import('@/components/pages/home/bolgList.vue')
        },
        {
          path: '/index/deal',
          component: () => import('@/components/pages/home/deal.vue')
        },
        {
          path: '/index/dealProject',
          component: () => import('@/components/pages/home/dealProject.vue')
        },
      ]
    },
    {
      path: '/myAccount',
      component: resolve => require(['../components/pages/MyAccount/Index.vue'], resolve),
    },
    {
      path: '/myAccount/address/:sign',
      name:'/myAccount/address',
      component: resolve => require(['../components/pages/MyAccount/address.vue'], resolve)
    },
    {
      path: '/myAccount/address2',
      name:'/myAccount/address2',
      component: resolve => require(['../components/pages/MyAccount/address2.vue'], resolve)
    },
    {
      path: '/myAccount/orders',
      name:'/myAccount/orders',
      component: resolve => require(['../components/pages/MyAccount/orders.vue'], resolve)
    },
    {
      path: '/myAccount/orderDetail',
      name:'/myAccount/orderDetail',
      component: () => import('@/components/pages/orderDetail/orderDetail.vue'),
    },

    {
      path: '/myAccount/help',
      name: '/myAccount/help',
      component: resolve => require(['../components/pages/MyAccount/help.vue'], resolve)
    },
    {
      path: '/myAccount/securityset',
      name: '/myAccount/securityset',
      component: resolve => require(['../components/pages/MyAccount/securitySet.vue'], resolve)
    },
    {
      path: '/myAccount/giftcards',
      name: '/myAccount/giftcards',
      component: resolve => require(['../components/pages/MyAccount/giftCards.vue'], resolve)
    },
    {
      path: '/myAccount/customerSupport',
      name: '/myAccount/customerSupport',
      component: resolve => require(['../components/pages/MyAccount/customerSupport.vue'], resolve)
    }, { //分类搜索页面
      path: '/search/:data/:tabId',
      name:'/search',
      component: () => import('@/components/pages/search/search.vue')
    },
    { //分类搜索页面
      path: '/search/:id',
      component: () => import('@/components/pages/search/search.vue')
    },
    {
      path: '/cart',
      component: () => import('@/components/pages/cart/cart.vue')
    },
    // 评论列表
    {
      path:'/commentList',
      component: () => import('@/components/pages/commentList/commentList.vue')
    },
    //支付页面
    {
      path: '/myAccount/payment/:id',
      name:'/myAccount/payment',
      component: () => import('@/components/pages/payOrder/payOrder.vue')
    },
    {
      path: '/transportation',
      name:'/transportation',
      component: () => import('@/components/pages/transportation/transportation.vue')
    },
    //收藏页面
    {
      path: '/myWish',
      component: () => import('@/components/pages/myWish/myWish.vue')
    },
     //支付提示
     {
      path: '/tipsPay',
      component: () => import('@/components/pages/tipsPay/tipsPay.vue')
    },
       //添加评论
       {
        path: '/addComment',
        component: () => import('@/components/pages/addComment/addComment.vue')
      }
    // {
    //   path: '/pas',
    //   component: resolve => require(['../components/pages/Pas.vue'], resolve),
    //   meta: {
    //     requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    //   }
    // },
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    // if (store.state.token) {  // 通过vuex state获取当前的token是否存在
    //     next();
    // }
    // else {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      } // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
    // }
  } else {
    next();
  }
})

export default router;
