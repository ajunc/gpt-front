<template>
  <div class="index-container">
    <div class="chartContainer">
      <div class="box">
        <!-- <div class="title">ChatGPT AI</div> -->
        <div class="ulView" id="ulView" ref="mianscroll">
          <div v-for="(item,index) in chartList" :key="index" class="chart-wrap">
            <div :class="item.role == 'user' ? `chart-item chat-item-user` : 'chart-item'">
              <span v-if="item.role == 'system'" class="u-logo">
                <img class="gpt-logo" src="../assets/logo.png" alt="">
              </span>
              <span v-else-if="item.role == 'user'" class="u-logo">
                  <img class="user-logo" src="../assets/user.webp" alt="">
              </span>
              <div class="conten-container">
                <img :src="item.image_url" alt="" v-if="item.result_type == 2" width="300px">
                <!-- <div v-highlight v-html="item.output"></div> -->
                <vue-markdown v-highlight :source="item.output"></vue-markdown>
              </div>
            </div>
          </div>
          <div class="loading-tip" v-show="isLoading">Loading...</div>
        </div>
        <div class="inputBox">
            <div class="sendContainer">
                <input v-model="inputMsg" class="inputMsg" placeholder="" type="text"  @keyup.enter="handleSend" />
                <div class="send" id="btn" @click="handleSend">
                    <img src="../../public/send_grey.png" alt="" class="send-icon">
                </div>
            </div>
        </div>
      </div>
    </div>

    <Login ref="loginRef" />
    <Register ref="registerRef" />
    
  </div>
</template>

<script>
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import VueMarkdown from 'vue-markdown'
// 引入样式
import "highlight.js/styles/default.css";
import { getUserinfoApi, queryLargeModel } from "../api"
export default {
  name: 'Index',
  data() {
    return {
      chartList: [],
      inputMsg: '',
      isLoading: false,
      user_account: '',
      conversation_id: '',
      ws: ''
    }
  },
  components: {
    VueMarkdown,
    Login,
    Register
  },
  props: {
    msg: String
  },
  created() {
    this.getUserInfo()
  },
  mounted() {
    this.addMsg(2, {
      status: '',
      output: '你好，我是ChatGPT,一个由OpenAI训练的大型语言模型！',
      result_type: 1,
      image_url: ''
    })
    // let that = this
    // this.user_account = Math.floor(Math.random() * 10000000000)
    this.conversation_id = Math.floor(Math.random() * 10000000000)
    // this.ws = this.CreateWebSocket(`ws://47.254.45.52:3000`)
    // this.ws = this.CreateWebSocket(targetWsPort)
    // this.ws.onopen = () => {
    //     // this.addMsg(2, '你好，我是人工智能ChatGPT,一个由OpenAI训练的大型语言模型！')
    //     this.addMsg(2, {
    //       status: '',
    //       output: '你好，我是人工智能ChatGPT,一个由OpenAI训练的大型语言模型！',
    //       result_type: 1,
    //       image_url: ''
    //   })
    // }
    // this.ws.onmessage = evt => {
    //     // 这是服务端返回的数据
    //     console.log('evt.data-------', evt.data)
    //     console.log('evt.data-------', typeof evt.data)
    //     that.inputMsg = ''
    //     that.isLoading = false
    //     let res = evt && evt.data && JSON.parse(evt.data)
    //     that.addMsg(2, res);

    //     if(res.status == "OK" || res.status == "ANONYMOUS_USER") {
    //       this.$store.dispatch("HandleUserInfo", {
    //         remaining_words: res.remaining.remaining_words,
    //         remaining_images: res.remaining.remaining_images
    //       })
    //     } else if(res.status == "INVALID_TOKEN") {
    //       this.getUserInfo()
    //     }
    // }
  },
  methods: {
    getUserInfo: function(){
      getUserinfoApi().then( res => {
        if(res.status == "OK") { //用户已登录
          this.$store.dispatch("HandleIslogin", true)
          this.$store.dispatch("HandleUserInfo", {
            uName: res.user_name,
            uId: res.user_account,
            remaining_words: res.remaining.remaining_words,
            remaining_images:  res.remaining.remaining_words
          })
        } else if(res.status == "ANONYMOUS_USER") { //游客模式
          this.$store.dispatch("HandleIslogin", false)
          this.$store.dispatch("HandleUserInfo", {
            uName: res.user_name,
            uId: res.user_account,
            remaining_words: res.remaining.remaining_words,
            remaining_images:  res.remaining.remaining_words
          })
        } else if (res.status == "INVALID_TOKEN") { //token失效
          this.$store.dispatch("HandleIslogin", false)
        }
      }).catch( error => {
        console.log(error)
        this.loading = false
      })
    },
    addMsg: function(type, obj) {
      if(type == 1) {
        this.chartList.push({
            role: 'user',
            ...obj
        })
      } else {
        this.chartList.push({
            role: 'system',
            ...obj
        })
      }
      this.scrollTOBottom()
    },

    CreateWebSocket: (() => {
      return (urlValue) => {
        if (window.WebSocket) return new WebSocket(urlValue);
        // if (window.MozWebSocket) return new MozWebSocket(urlValue);
        return false;
      }
    })(),

    scrollTOBottom: function() {
      this.$nextTick(() => {
        let scrollEl = this.$refs.mianscroll;
        scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' });
      });
    },

    handleSend: function() {
      if(this.isLoading || !this.inputMsg) {
        return
      }
        this.isLoading = true
        this.addMsg(1, {
          status: '',
          output: this.inputMsg,
          result_type: 1,
          image_url: ''
        })

        let params = `[{"role": "user", "content": "${this.inputMsg}"}]`
        queryLargeModel({
          messages: encodeURI(params),
          conversation_id: this.conversation_id || ''
        }).then( res => {
          this.inputMsg = ""
          let resCp = JSON.parse(JSON.stringify(res))
          // resCp.output = "```" + resCp.output + "```"
          // debugger
          // resCp.output =  marked(resCp.output)
          // debugger
          if(res.status == "OK" || res.status == "ANONYMOUS_USER") { //用户已登录
            this.addMsg(2, resCp);

            this.$store.dispatch("HandleUserInfo", {
              remaining_words: res.remaining.remaining_words,
              remaining_images: res.remaining.remaining_images
            })
          } else if (res.status == "ERROR_ANONYMOUS") { // 匿名用户免费试用已达3次，需要注册
            this.addMsg(2, resCp);

            this.$store.dispatch("HandleUserInfo", {
              remaining_words: res.remaining.remaining_words,
              remaining_images: res.remaining.remaining_images
            })
          } else if (res.status == "ERROR_NO_BALANCE"){  // 登录用户免费试用已达n次，需要充值
            this.addMsg(2, resCp);

            this.$store.dispatch("HandleUserInfo", {
              remaining_words: res.remaining.remaining_words,
              remaining_images: res.remaining.remaining_images
            })
          } else if (res.status == "INVALID_TOKEN") { //token失效
            this.$store.dispatch("HandleIslogin", false)
          } else if (res.status == "ERROR") {
            this.$message.error(res.output || "信息发送失败，请稍后再试~");
          }
          this.loading = false
          this.isLoading = false
        }).catch( error => {
          console.log(error)
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
::v-deep p {
  margin: 0;
}
.index-container{
    display: flex;
}
.conten-container{
    font-size: 14px;
    line-height: 1.3;
    font-family: PingFang SC;
    font-weight: 500;
    color: #3c3c3c;
    word-wrap: break-word;
    padding-top: 7px;
}
.chartContainer{
    width: 100%;
}
.title{
  text-align: center;
  margin: 30px 0;
}
.icon{
  width: 30px;
  height: 30px;
}
.send-icon{
    width: 25px;
}
.sendContainer{
    max-width: 800px;
    min-width: 400px;
    position: relative;
    margin: 0 auto;
}
.chart-wrap{
  /* margin-bottom: 10px; */
}
.chat-item-user{
  background-color: transparent !important;
  margin-bottom: 0px !important;
  box-shadow: none !important;
}
.chart-item{
  display: flex;
  line-height: 1;
  background-color: #fff;
  border-radius: 8px;
  max-width: 800px;
  text-align: left;
  margin: 0px auto 20px;
  box-shadow: 0 16px 20px 0 rgb(174 167 223 / 6%);
  padding: 8px;
}
.u-logo{
  margin-right: 15px;
}
.gpt-logo{
  display: inline-block;
  width: 30px;
}
.user-logo{
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 5px;
}
.ulView{
  box-sizing: border-box;
  height: calc(100vh - 133px);
  overflow-y: scroll;
  padding: 20px 0;
  scroll-behavior: auto;
}
.ulView::-webkit-scrollbar {
  display: none;
}
.loading-tip{
  text-align: center;
}
.inputBox{
  position: fixed;
  bottom: 0;
  /* left: 300px; */
  left: 0;
  right: 0;
  padding: 15px;
  text-align: center;
}
.inputMsg{
    width: 100%;
    background: #fff;
    border: 1px solid #cacaca;
    box-shadow: 0 1px 8px 0 hsla(0,0%,89%,.39);
    border-radius: 5px;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #1a1818;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px 15px;
}
.send{
    position: absolute;
    right: 0;
    top: 10px;
}
.send:hover {
    cursor: pointer;
}
</style>
