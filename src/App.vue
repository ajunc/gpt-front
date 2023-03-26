<template>
  <div id="app">
    <div class="layout-wrap">
      <HeaderComp @handleShow="handleShow" />
      <LeftBar />
      <div class="right-content-contain">
        <router-view></router-view>
      </div>

      <Login :isShow="isShow" @handleHide="handleHide"/>
    </div>
  </div>
</template>

<script>
import LeftBar from "./components/LeftBar.vue"
import HeaderComp from "./components/Header.vue"
import Login from './components/Login.vue'
export default {
  name: 'App',
  data(){
    return {
      isShow: false,
    }
  },
  components: {
    LeftBar,
    HeaderComp,
    Login
  },
  mounted(){},
  methods: {
    handleShow() {
      this.isShow = true
    },
    handleHide() {
      this.isShow = false
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
