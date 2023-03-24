<template>
    <div>
        <el-dialog
            title="登陆"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                size="mini"
            >
                <el-form-item label="用户名" prop="user_account">
                    <el-input v-model.number="ruleForm.user_account"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passwd">
                    <el-input type="password" v-model="ruleForm.passwd" autocomplete="off"></el-input>
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
      isShow: Boolean
    },
    created() {},
    watch: {
        isShow(newVal, oldVal) {
            if(newVal) {
                this.dialogVisible = true
            } else {
                this.dialogVisible = false
            }
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
                window.localStorage.setItem('uname', res.user_name || '')
                window.localStorage.setItem('token', res.token || '')
                this.$refs[formName].resetFields();
                this.dialogVisible = false
                this.$emit('loginStatusChange')
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
        this.dialogVisible = false
      }
    }
  }
  </script>
  
  <style scoped lang="scss">

  </style>
  