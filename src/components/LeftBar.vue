<template>
  <div class="left-bar-container" v-loading="listLoading">
    <div class="chat-new" @click="handleNewChat">
      <span>新建对话</span>
      <i class="el-icon-plus"></i>
    </div>
    <div class="row-line"></div>
    <div class="chat-list-container">
      <div :class="item.conversation_id == conversation_id ? 'chat-item bg-select' : 'chat-item'" v-for="(item,index) in chatListLeft" :key="index" @click="getChatListDetailsFn(item)">
        <img class="chat-comment" src="../../public/comment.png" alt="">
        <span>{{ item.conversation_name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { getChatList, getChatListDetails } from "../api"
export default {
  name: 'LeftBar',
  data() {
    return {
      listLoading: false,
      // chatListData: [],
      current: 0,
      pageSize: 10
    }
  },
  props: {
    msg: String
  },
  created() {
    this.getConversationList()
  },
  computed: {
    ...mapGetters([
      'conversation_id',
      'chatListLeft'
    ]),
  },
  mounted() {},
  methods: {
    handleNewChat() {
      let id = Math.floor(Math.random() * 10000000000)
      this.$store.dispatch("SaveConversationId", id)
      this.$store.dispatch("ClearChatList", {
        role: 'system',
        status: '',
        output: '你好，我是ChatGPT,一个由OpenAI训练的大型语言模型！',
        result_type: 1,
        image_url: ''
      })
    },
    getConversationList() {
      let params = {
        search_word: '',
        page: this.current,
        num_per_page: this.pageSize
      }
      this.listLoading = true
      getChatList(params).then( res => {
        this.listLoading = false
        if(res.status == "OK") {
          // this.chatListData = res.conversation_history
          this.$store.dispatch("InitAndAddChatList", res.conversation_history)
        }
      }).catch( error => {
        console.log(error)
        this.loading = false
      })
    },

    // 点击会话，获取当前会话详细信息
    getChatListDetailsFn(item) {
      this.$store.dispatch("SaveConversationId", item.conversation_id)
      let params = {
        conversation_id: item.conversation_id,
        page: 0,
        num_per_page: 10
      }
      getChatListDetails(params).then( res => {
        if(res.status == "OK") {
          let resData = JSON.parse(JSON.stringify(res.conversation_details))
          resData && resData.forEach((item) => {
            item['output'] = item.content
            if(item.role === "assistant") {
              item.role = "system"
            }
          })
          this.$store.dispatch("ResetChatList", resData)
        }
      }).catch( error => {
        console.log(error)
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.chat-new{
  display: flex;
  justify-content: space-between;
  padding: 10px 6px;
  border-radius: 5px;
}
.chat-new:hover {
  cursor: pointer;
  background-color: #04AA7C;
}
.row-line{
  height: 1px;
  background-color: #686868;
  margin: 6px 0;
}
.left-bar-container{
    font-size: 13px;
    box-sizing: border-box;
    position: absolute;
    padding: 10px;
    width: 298px;
    height: 100%;
    background: #000;
    z-index: 10;
    color: #fff;
    margin-top: 62px;
}
.chat-item{
    display: flex;
    /* background: #073a2e; */
    border-radius: 5px;
    font-size: 14px;
    padding: 8px;
    margin-bottom: 10px;
}
.bg-select{
  background: #073a2e;
}
.chat-item:hover{
  cursor: pointer;
  background: #073a2e; 
}
.chat-comment{
  width: 17px;
  height: 17px;
  margin-right: 10px;
}
</style>
