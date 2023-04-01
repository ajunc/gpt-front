<template>
    <div class="perCenter-container">
        <h3 class="recharge-title">充值</h3>
        <div class="group-desc">
            如果你想获取更多与ChatGPT聊天的次数，请扫码添加客服人员充值。
        </div>
        <div class="group-list-contain">
            <div class="recharge-item" v-for="(item, index) in rechargeList" :key="index">
                <div class="recharge-price">{{ item.price }}</div>
                <div>
                    <div>字数：{{ item.words }}</div>
                    <div class="or-contain">
                        <el-divider content-position="left">或者</el-divider>
                    </div>
                    <div>图片数：{{ item.pics }}</div>
                </div>
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
            rechargeList:[
                {
                    price: '￥3.9',
                    words: 3000,
                    pics: 3000
                },
                {
                    price: '￥6.9',
                    words: 6000,
                    pics: 6000
                },
                {
                    price: '￥9.9',
                    words: 9000,
                    pics: 9000
                }
            ]
        };
      },
      computed: {
        ...mapGetters([
            'isLogin',
            'userInfo'
        ]),
    },
      methods: {
        
      }
    }
  </script>
  <style scoped>
  .perCenter-container{
    width: 800px;
    margin: 40px auto;
    background-color: #fff;
    padding: 20px 20px 160px;
  }
    .group-desc{
        text-align: center;
    }
    .recharge-title{
        text-align: center;
        margin-bottom: 15px;
    }
    .group-list-contain{
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
    }
    .recharge-price{
        font-size: 24px;
        color: #04AA7C;
    }
    .or-contain{
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .recharge-item{
        width: 160px;
        padding: 30px;
        border-radius: 6px;
        box-shadow: rgb(136 136 136) 0px 0px 10px -2px;
    }
  </style>