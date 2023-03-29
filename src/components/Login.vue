<template>
    <div>
        <el-dialog
            title="登陆"
            :closeOnClickModal="false"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            append-to-body
            width="30%"
        >
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                size="medium"
            >
                <el-form-item label="用户名" prop="user_account">
                    <el-input v-model="ruleForm.user_account" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passwd">
                    <el-input type="password" v-model="ruleForm.passwd" autocomplete="off" show-password clearable></el-input>
                </el-form-item>
                <el-form-item class="btn-container">
                    <el-button  type="text" @click="submitForm('ruleForm')" :loading="loading">提交</el-button>
                    <el-button type="text" @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
  </template>
  
<script>
import { login } from "../api"
export default {
    name: 'Login',
    data() {
      return {
        dialogVisible: false,
        loading: false,
        ruleForm: {
          passwd: '',
          user_account: ''
        },
        rules: {
          user_account: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          passwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        }
      }
    },
    props: {
      isLoginShow: Boolean
    },
    created() {},
    watch: {
      isLoginShow(newVal, oldVal) {
        this.dialogVisible = newVal
      },
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            login(this.ruleForm).then( res => {
              if(res.status == "OK") {
                this.$message({
                  message: '登陆成功！',
                  type: 'success'
                });

                this.$store.dispatch("HandleIslogin", true)
                this.$store.dispatch("HandleUserInfo", {
                  uName: res.user_name,
                  uId: res.user_account,
                  remaining_words: res.remaining.remaining_words,
                  remaining_images:  res.remaining.remaining_words
                })
                
                this.$refs[formName].resetFields();
                this.$emit('handleLoginHide')
                
              } else {
                this.$message.error(res.description || "登陆失败，请稍后再试~");
              }
              this.loading = false
            }).catch( error => {
              console.log(error)
              this.loading = false
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$emit('handleLoginHide')
      },
      handleClose() {
        this.$emit('handleLoginHide')
      }
    }
  }
  </script>
  
  <style scoped lang="scss">

  </style>
  