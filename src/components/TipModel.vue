<template>
    <div>
        <div class="mask" v-if="tipModelVisible">
          <div class="model-main">
            <div class="model-title">提示</div>
            <div class="model-content">
              {{ tip }}
            </div>
            <div class="btn-contain">
              <el-button size="small" type="info" plain @click="handleShowTipHide">残忍拒绝</el-button>
              <el-button size="small" type="success" @click="toPackageRecharge" v-if="Login">去充值</el-button>
              <el-button size="small" type="success" @click="handleShowLogin" v-if="!Login">去登录</el-button>
            </div>
          </div>
        </div>
        <Login ref="loginRef" />
    </div>
  </template>
  
<script>
import Login from './Login.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'TipModel',
    data() {
      return {
        tipModelVisible: false
      }
    },
    props: {
      tip: String
    },
    components: {
      Login
    },
    computed: {
        ...mapGetters([
            'isLogin'
        ]),
    },
    methods: {
      toPackageRecharge() {
        this.$router.push({
          path: '/package_recharge'
        })
      },
      handleShowLogin() {
        this.handleShowTipHide()
        this.$refs.loginRef.handleLoginShow()
      },
      handleShowTipModel() {
        this.tipModelVisible = true
      },
      handleShowTipHide() {
        this.tipModelVisible = false
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  ::v-deep .el-button--success{
    margin-left: 28px;
  }
  ::v-deep .el-button{
    border-radius: 7px;
    border-color: #f1f1f1;
    width: 82px;
  }
  .mask {
      background: rgba(42,42,42,.3);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .model-main{
        width: 310px;
        background: linear-gradient(0deg,#fff,#d6f7e3);
        border-radius: 10px;
        z-index: 10000;
        transition: all .25s linear;
        position: relative;
        .model-title{
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 700;
          color: #131313;
          text-align: center;
          margin-top: 30px;
        }
        .model-content{
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #6b6b6b;
          line-height: 1.5;
          padding: 0 20px;
          text-align: center;
          margin-top: 20px;
        }
        .btn-contain{
          text-align: center;
          padding: 25px 35px;
        }
      }
  }
  </style>
  