<template>
    <header class="header-container">
        <div class="logon-container"></div>
        <div class="user-info-container">
            <el-avatar shape="square" :size="32" class="user-img-contain" >
              <img src="../assets/user.jpg" alt="">
            </el-avatar>
            <div class="head-user-info">
              <div class="user-info-wrap">
                <div>Ben</div>
              </div>
              <div class="user-info-wrap logout-btn">
                <div @click="handleLogout">退出登录</div>
              </div>
            </div>
        </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
    data() {
      return {
        
      }
    },
    props: {
      msg: String
    },
    mounted() {
      
    },
    methods: {
      handleLogout() {

      }
    }
  }
  </script>
  
  <style scoped>
  .header-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 10px 27px 10px 17px;
    background: #fff;
    border-bottom: 1px solid rgba(219,224,232,.7);
    z-index: 20;
  }
  .user-img-contain:hover{
      
  }
  .head-user-info{
    position: absolute;
    right: 27px;
    top: 57px;
    display: block;
    box-sizing: border-box;
    color: rgba(0,0,0,.85);
    font-size: 14px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  }
  .user-info-wrap{
    width: 100px;
    padding: 0 10px;
    line-height: 40px;
  }
  .user-info-wrap>div{
    border-bottom: 1px solid #f1f1f1;
    padding: 0 3px;  
  }
  .user-info-wrap:last-child>div{
    border: none;
  }
  .user-info-wrap:last-child>div:hover{
    color: #1890ff;
    cursor: pointer;
  }
  </style>
  