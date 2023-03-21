<template>
  <div class="hello">
    <div class="chartContainer">
            <div class="box">
                <div class="title">ChartGPT AI</div>
                <div class="ulView" id="ulView">
                      <div v-for="(item,index) in chartList" :key="index" class="chart-item">
                        <span v-if="item.role == 'system'" class="u-logo">
                          <span class="gpt-logo">G</span>
                        </span>
                        <span v-else-if="item.role == 'user'" class="u-logo">
                          <span class="user-logo">U</span>
                        </span>
                        <div class="conten-container">
                          <img :src="item.image_url" alt="" v-if="item.result_type == 2" width="100px">
                          <div>
                            {{item.output}}
                          </div>
                        </div>
                      </div>
                      <div v-show="isLoading">Loading...</div>
                </div>
                <div class="inputBox">
                  <div>
                    <input v-model="inputMsg" class="inputMsg" placeholder="你想说什么..." type="text" />
                    <div class="send" id="btn" @click="handleSend">发送</div>
                  </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import {targetWsPort} from '../../proxy'
export default {
  name: 'HelloWorld',
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
  props: {
    msg: String
  },
  mounted() {
    let that = this
    this.user_account = Math.floor(Math.random() * 10000000000)
    this.conversation_id = Math.floor(Math.random() * 10000000000)
    // this.ws = this.CreateWebSocket(`ws://47.254.45.52:3000`)
    this.ws = this.CreateWebSocket(targetWsPort)
    this.ws.onopen = () => {
        // this.addMsg(2, '你好，我是人工智能ChatGPT,一个由OpenAI训练的大型语言模型！')
        this.addMsg(2, {
          status: '',
          output: '你好，我是人工智能ChatGPT,一个由OpenAI训练的大型语言模型！',
          result_type: 1,
          image_url: ''
      })
    }
    this.ws.onmessage = evt => {
        // 这是服务端返回的数据
        console.log('evt.data-------', evt.data)
        console.log('evt.data-------', typeof evt.data)
        that.inputMsg = ''
        that.isLoading = false
        that.addMsg(2, evt && evt.data && JSON.parse(evt.data));
    }
  },
  methods: {
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
    },

    CreateWebSocket: (() => {
        return (urlValue) => {
            if (window.WebSocket) return new WebSocket(urlValue);
            // if (window.MozWebSocket) return new MozWebSocket(urlValue);
            return false;
        }
    })(),

    handleSend: function() {
      if(this.isLoading) {
        return
      }
        this.isLoading = true
        this.ws.send(`${this.inputMsg}&user_account${this.user_account}&conversation_id${this.conversation_id}`);
        this.addMsg(1, {
          status: '',
          output: this.inputMsg,
          result_type: 1,
          image_url: ''
        })
    }
  }
}
</script>

<style scoped>
.title{
  margin-bottom: 30px;
}
.icon{
  width: 30px;
  height: 30px;
}
.chart-item{
  display: flex;
  line-height: 1;
  border-bottom: 1px solid #ccc;
  width: 600px;
  text-align: left;
  margin: 00px auto;
  padding: 8px;
}
.u-logo{
  margin-right: 15px;
}
.gpt-logo{
  display: inline-block;
  width: 30px;
  height: 30px;
  color: #fff;
  background: green;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
}
.user-logo{
  display: inline-block;
  width: 30px;
  height: 30px;
  background: gray;
  color: #fff;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
}
.ulView{
  height: 500px;
  overflow-y: scroll;
}
.inputBox{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
}
.inputMsg{
  width: 300px;
  display: inline-block;
  height: 40px;
  box-sizing: border-box;
  border: 2px solid #c4c7ce;
  border-right: 0;
  border-radius: 10px 0 0 10px;
  vertical-align: top;
}
.send{
    display: inline-block;
    width: 112px;
    height: 40px;
    border-left: 0;
    padding: 0;
    line-height: 41px;
    font-size: 17px;
    font-weight: 400;
    font-family: Arial;
    letter-spacing: 1px;
    background: #4e6ef2;
    color: #fff;
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 0 10px 10px 0;
    letter-spacing: normal;
}
</style>
