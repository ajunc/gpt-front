/*
* 路由对象模块
* */
import Vue from 'vue'
import VueRouter from 'vue-router'

/*引入pages*/
const Register = ()=>import('../views/Register');
const Index = ()=>import('../views/index');

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
        showFooter: true
      }
    },
    {
      path: '/',
      redirect: '/' //系统默认页
    }
  ]
})