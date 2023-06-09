/*
* 路由对象模块
* */
import Vue from 'vue'
import VueRouter from 'vue-router'

/*引入pages*/
const Register = ()=>import('../views/Register');
const AdministerPay = ()=>import('../views/AdministerPay');
const Index = ()=>import('../views/index');
const PersonalCenter = ()=>import('../views/PersonalCenter');
const PackageRecharge = ()=>import('../views/PackageRecharge');

//申明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path:'/',
      component: Index,
      meta: {}
    },
    {
      path:'/register',
      component: Register,
      meta: {
        // showFooter: true
      }
    },
    {
      path:'/administer_pay',
      component: AdministerPay,
      meta: {}
    },
    {
      path:'/personal_center',
      component: PersonalCenter,
      meta: {}
    },
    {
      path:'/package_recharge',
      component: PackageRecharge,
      meta: {}
    },
    {
      path: '/',
      redirect: '/' //系统默认页
    }
  ]
})