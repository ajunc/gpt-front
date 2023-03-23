<template>
  <div class="left-bar-container">
    <div class="chat-list-title">对话列表</div>
    <div class="chat-list-container">
      <div class="chat-item">
        <img class="chat-comment" src="../../public/comment.png" alt="">
        <span>当前对话</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftBar',
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
  }
}
</script>

<style scoped>
.left-bar-container{
    box-sizing: border-box;
    position: absolute;
    padding: 10px;
    width: 298px;
    height: 100%;
    background: #000;
    z-index: 10;
    color: #fff;
    padding-top: 56px;
}
.chat-list-title{
  padding: 22px 17px 17px 12px;
  text-align: left;
}
.chat-item{
    display: flex;
    background: #073a2e;
    border-radius: 5px;
    font-size: 14px;
    padding: 8px;
}
.chat-comment{
  width: 17px;
  height: 17px;
  margin-right: 10px;
}
</style>
