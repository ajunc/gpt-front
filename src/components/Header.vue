  <template>
    <div>
      <header class="header-container">
        <div class="logon-container" @click="toIndex">
          <img src="../assets/logo.png" alt="">
          <span class="logo-title"> ChatGPT 智能AI机器人</span>
        </div>

        <div class="u-info-container">
          <div class="u-name-wrap" v-if="isLogin">
            <div class="u-name-contain" @mouseover="handleUMouseover" @mouseleave="handleUMouseleave">
              <img src="../assets/user.webp" alt="">
              <span>{{userInfo.uName}}</span>
            </div>
            <!-- <div class="row-line">|</div>
            <el-button @click="handleLogout" type="text">退出登录</el-button> -->

            <div :class="isShowUDropInfo" @mouseover="handleUMouseover" @mouseleave="handleUMouseleave">
              <div class="u-submenu-item" @click="toPersonCenter">个人中心</div>
              <div class="u-submenu-item" @click="handleLogout">退出登录</div>
            </div>
          </div>

          <div v-if="!isLogin">
            <el-button @click="handleShowLogin" type="text">登录</el-button>
            |
            <el-button @click="toRegister" type="text">注册</el-button>
          </div>
        </div>
      </header>
      <Login ref="loginRef" />
      <Register ref="registerRef" />
    </div>
  </template>
  
  <script>
  import Login from './Login.vue'
  import Register from './Register.vue'
  import { logout } from "../api"
  import { mapGetters, mapState } from 'vuex'
  export default {
    name: 'Header',
    data() {
      return {
        isShowUDropInfo: `u-submenu-container`
      }
    },
    props: {
      
    },
    created() {},
    watch: {
        
    },
    components:{
      Login,
      Register
    },
    computed: {
      ...mapGetters([
        'isLogin',
        'userInfo'
      ]),
    },
    methods: {
      toPersonCenter() {
        this.$router.push({
          path: '/personal_center'
        })
      },
      handleUMouseover() {
        this.isShowUDropInfo = `u-submenu-container shwo-u-submenu`
      },
      handleUMouseleave() {
        this.isShowUDropInfo = `u-submenu-container`
      },
      toIndex() {
        this.$router.push('/')
      },
      handleShowLogin() {
        this.$refs.loginRef.handleLoginShow()
      },
      toRegister() {
        this.$refs.registerRef.handleRegistShow()
      },
      handleLogout() {
        logout().then( res => {
          if(res.status == "OK") {
            this.$message({
              message: '已退出登陆！',
              type: 'success'
            });

            this.$store.dispatch("InitAndAddChatList", [])
            
            this.$store.dispatch("HandleIslogin", false)
            this.$store.dispatch("HandleUserInfo", {
              uName: '',
              uId: '',
              remaining_words: '',
              remaining_images:  ''
            })
            
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
  .shwo-u-submenu{
    display: block !important;
  }
  ::v-deep .el-button--text{
    margin-left: 0 !important;
    color: rgba(0,0,0,.84);
  }
  .logon-container:hover {
    cursor: pointer;
  }
  .logon-container{
    display: flex;
    align-items: center;
    .logo-title{
      color: #04AA7C;
      font-weight: 600;
      font-size: 12px;
      margin-left: 10px;
    }
    img {
      height: 28px;
    }
  }
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
    height: 61px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 27px 0 17px;
    background: #fff;
    border-bottom: 1px solid rgba(219,224,232,.7);
    z-index: 20;
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
  .u-info-container{
    .u-name-contain{
      padding: 5px 0;
      display: flex;
      align-items: center;
      span{
        color: #04AA7C;
      }
    }
  }
  .u-name-wrap {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 15px;
  }
  .u-submenu-container{
    display: none;
    position: absolute;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%);
    background: #fff;
    border: 1px solid #eaecf0;
    top: 40px;
    left: -4px;
    border-radius: 7px;
  }
  .u-submenu-item{
    border-bottom: 1px solid rgba(135,138,172,.3);
    color: rgba(0,0,0,.85);
    display: block;
    margin-top: -1px;
    max-width: 112px;
    overflow-x: hidden;
    padding: 0 15px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 40px;
    line-height: 40px;
  }
  .u-submenu-item:hover {
    color: #04AA7C !important;
    cursor: pointer;
  }
  .row-line{
    margin: 0 10px;
  }
  .u-name-wrap img {
    width: 36px;
  }
  .u-name-wrap span{
    font-size: 14px;
    margin-left: 5px;
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
  