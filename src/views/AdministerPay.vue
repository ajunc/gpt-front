<template>
  <div class="register-container">
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
      <el-form-item label="充值金额" prop="payment">
        <el-input type="number" v-model.number="ruleForm.payment"></el-input>
      </el-form-item>
      <el-form-item label="管理员口令" prop="token">
        <el-input type="password" v-model="ruleForm.token" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="btn-container">
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">提交</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { administerPay } from "../api"
  export default {
    data() {
      return {
        loading: false,
        ruleForm: {
          token: '',
          checkPass: '',
          payment: '',
          user_account: ''
        },
        rules: {
          user_account: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          payment: [
            { required: true, message: '请输入充值金额', trigger: 'blur' }
          ],
          token: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            administerPay(this.ruleForm).then( res => {
              if(res.status == "OK") {
                this.$message({
                  message: '充值成功！',
                  type: 'success'
                });
                this.$refs[formName].resetFields();
              } else {
                this.$message.error(res.description || "充值失败，请稍后再试~");
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
        this.$router.push({
          path: "/"
        })
      }
    }
  }
</script>
<style scoped>
.register-container{
  box-sizing: border-box;
  width: 50%;
  margin: 50px auto 40px;
  padding: 60px 120px;
  box-shadow: 0 3px 21px #c3c3c352;
}
.btn-container{
  margin-top: 40px;
  margin-bottom: 0;
}
</style>