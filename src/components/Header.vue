<template>
    <header class="header-container">
        <div class="logon-container"></div>
        <el-menu class="el-menu-demo" :default-active="activeIndex" mode="horizontal">
          <el-submenu index="2">
            <template slot="title">
              <el-avatar shape="square" :size="32" class="user-img-contain">
                <img src="../assets/user.jpg" alt="">
              </el-avatar>
            </template>
            <el-menu-item index="2-1" v-if="isLogin">{{uname}}</el-menu-item>
            <el-menu-item index="2-2" @click="handleLogout" v-if="isLogin">退出登录</el-menu-item>
            <el-menu-item index="2-2" @click="handleShowLogin" v-if="!isLogin">登陆</el-menu-item>
            <el-menu-item index="2-2" @click="toRegister" v-if="!isLogin">注册</el-menu-item>
          </el-submenu>
        </el-menu>
    </header>
  </template>
  
  <script>
  import { logout } from "../api"
  export default {
    name: 'Header',
    data() {
      return {
        uname: ''
      }
    },
    props: {
      isLogin: Boolean
    },
    created() {
      this.getUInfo()
    },
    watch: {
        isLogin(newVal, oldVal) {
            this.getUInfo()
        },
    },
    methods: {
      handleShowLogin() {
        this.$emit('handleShow')
      },
      getUInfo() {
        let unamel = window.localStorage.getItem('uname')
        this.uname = unamel || ''
      },
      toRegister() {
        this.$router.push('/register')
      },
      handleLogout() {
        logout().then( res => {
          if(res.status == "OK") {
            this.$message({
              message: '已退出登陆！',
              type: 'success'
            });
            window.localStorage.removeItem('uname')
            window.localStorage.removeItem('token')
            this.$emit('loginStatusChange')
          } else {
            this.$message.error(res.description || "退出登陆失败，请稍后再试~");
          }
        }).catch( error => {
          console.log(error)
        })
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  ::v-deep .el-menu{
      border: none;
  }
  ::v-deep .el-menu.el-menu--horizontal{
    border: none;
  }
  ::v-deep .el-menu--horizontal>.el-submenu .el-submenu__title{
    height: 32px;
    line-height: 32px;
  }
  ::v-deep .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    border-bottom: none;
  }
  ::v-deep .el-menu--popup-bottom-start{
    min-width: 120px !important;
  }
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
  .show-info{
    display: block !important;
  }
  .head-user-info{
    position: absolute;
    right: 27px;
    top: 57px;
    display: none;
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
  