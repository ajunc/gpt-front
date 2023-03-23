<template>
  <div id="app">
    <div class="layout-wrap">
      <HeaderComp />
      <LeftBar />
      <div class="right-content-contain">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import LeftBar from "./components/LeftBar.vue"
import HeaderComp from "./components/Header.vue"
export default {
  name: 'App',
  components: {
    LeftBar,
    HeaderComp
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
