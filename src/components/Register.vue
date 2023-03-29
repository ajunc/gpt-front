<template>
    <div>
        <el-dialog
            title="注册"
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
              <el-input v-model="ruleForm.user_account" autocomplete="off" placeholder="手机号或邮箱"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="user_name">
              <el-input v-model="ruleForm.user_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passwd">
              <el-input type="password" v-model="ruleForm.passwd" autocomplete="off" show-password clearable placeholder="8位数字和字母组合"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password clearable placeholder="8位数字和字母组合"></el-input>
            </el-form-item>
            <el-form-item class="btn-container">
              <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">提交</el-button>
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
  </template>
  
<script>
import { signUp } from "../api"
export default {
    name: 'Login',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.passwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        dialogVisible: false,
        loading: false,
        ruleForm: {
          passwd: '',
          checkPass: '',
          user_name: '',
          user_account: ''
        },
        rules: {
          user_account: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          passwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    props: {
      isRegistShow: Boolean
    },
    created() {},
    watch: {
      isRegistShow(newVal, oldVal) {
        this.dialogVisible = newVal
      },
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            signUp(this.ruleForm).then( res => {
              if(res.status == "OK") {
                this.$message({
                  message: '恭喜你，账号注册成功！',
                  type: 'success'
                });

                this.$store.dispatch("HandleIslogin", true)
                this.$store.dispatch("HandleUserInfo", {
                  uName: res.user_name,
                  uId: res.user_account,
                  remaining_words: res.remaining.remaining_words,
                  remaining_images:  res.remaining.remaining_words
                })

                this.$emit('handleRegistHide')

              } else {
                this.$message.error(res.description || "注册失败，请稍后再试~");
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
        this.$emit('handleRegistHide')
      },
      handleClose() {
        this.$emit('handleRegistHide')
      }
    }
  }
  </script>
  
  <style scoped lang="scss">

  </style>
  