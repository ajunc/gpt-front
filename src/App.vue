<template>
  <div id="app">
    <div class="layout-wrap">
      <HeaderComp @handleLoginShow="handleLoginShow"  @handleRegistShow="handleRegistShow"/>
      <!-- <LeftBar /> -->
      <div class="right-content-contain">
        <router-view></router-view>
      </div>

      <Login :isLoginShow="isLoginShow" @handleLoginHide="handleLoginHide"/>
      <Register :isRegistShow="isRegistShow" @handleRegistHide="handleRegistHide"/>
    </div>
  </div>
</template>

<script>
// import LeftBar from "./components/LeftBar.vue"
import HeaderComp from "./components/Header.vue"
import Login from './components/Login.vue'
import Register from './components/Register.vue'
export default {
  name: 'App',
  data(){
    return {
      isLoginShow: false,
      isRegistShow: false
    }
  },
  components: {
    // LeftBar,
    HeaderComp,
    Login,
    Register
  },
  mounted(){},
  methods: {
    handleLoginShow() {
      this.isLoginShow = true
    },
    handleLoginHide() {
      this.isLoginShow = false
    },
    handleRegistShow() {
      this.isRegistShow = true
    },
    handleRegistHide() {
      this.isRegistShow = false
    }
  }
}
</script>

<style>
.layout-wrap{
  display: flex;
}
.right-content-contain{
  margin-top: 61px;
  /* margin-left: 298px; */
  flex-grow: 1;
}
</style>
