<template>
  <div id="app">
    <div class="layout-wrap">
      <HeaderComp @loginStatusChange="loginStatusChange" @handleShow="handleShow" :isLogin="isLogin" />
      <LeftBar />
      <div class="right-content-contain">
        <router-view></router-view>
      </div>

      <Login @loginStatusChange="loginStatusChange" :isShow="isShow"/>
    </div>
  </div>
</template>

<script>
import LeftBar from "./components/LeftBar.vue"
import HeaderComp from "./components/Header.vue"
import {isLoginFn} from "./utils/login"
import Login from './components/Login.vue'
export default {
  name: 'App',
  data(){
    return {
      isLogin: false,
      isShow: false,
    }
  },
  components: {
    LeftBar,
    HeaderComp,
    Login
  },
  mounted(){
    if(isLoginFn()) {
      this.isLogin = true
    }
  },
  methods: {
    handleShow() {
      this.isShow = true
    },
    loginStatusChange() {
      isLoginFn() ? (this.isLogin = true) : (this.isLogin = false)
    }
  }
}
</script>

<style>
.layout-wrap{
  display: flex;
}
.right-content-contain{
  margin-top: 56px;
  margin-left: 298px;
  flex-grow: 1;
}
</style>
