<template>
    <div class="perCenter-container">
        <div class="uInfo-wrap">
            <div class="uInfo-left">
                <img src="../assets/user.webp" alt="">
                <span>{{userInfo.uName}}</span>
            </div>
            <div class="vip-contain" @click="toRechargePage">
                <img src="../assets/vip.webp" alt="">
                续费充值
            </div>
        </div>

        <div class="uInfo-count">
            <div class="uInfo-wrap">
                <span>
                    <i class="el-icon-info"></i>
                    可用字数
                </span>
                <span>
                    <strong>{{ userInfo.remaining_words }}</strong>字
                </span>
            </div>
            <div class="uInfo-wrap">
                <span>
                    <i class="el-icon-info"></i>
                    可用图片数
                </span>
                <span>
                    <strong>{{ userInfo.remaining_images }}</strong>图
                </span>
            </div>
        </div>
    </div>
  </template>
  <script>
    import { signUp } from "../api"
    import { mapGetters, mapState } from 'vuex'
    export default {
      data() {
        return {
          
        };
      },
      computed: {
        ...mapGetters([
            'isLogin',
            'userInfo'
        ]),
    },
      methods: {
        toRechargePage() {
            this.$router.push({
                path: '/package_recharge'
            })
        }
      }
    }
  </script>
  <style scoped>
    .perCenter-container {
        color: #515151;
        width: 800px;
        margin: 50px auto 30px;
    }
    .uInfo-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        padding: 15px 20px;
        margin-top: 15px;
    }
    .uInfo-count .uInfo-wrap{
        margin: 0;
    }
    .uInfo-count{
        margin-top: 15px;
        background-color: #fff;
    }
    .uInfo-left img{
        width: 50px;
        height: 50px;
    }
    .uInfo-left span{
        margin-left: 10px;
    }
    .vip-contain img{
        width: 30px;
        margin-right: 4px;
    }
    .vip-contain{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #04AA7C;
    }
    .vip-contain:hover {
        cursor: pointer;
    }
  </style>