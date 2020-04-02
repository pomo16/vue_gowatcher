<template>
  <div class="register_container">
    <div class="register_box">
      <!-- avatar -->
      <div class="avatar_box">
        <img src="../assets/dog2.png" alt="">
      </div>
      <!-- register form -->
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="0px" class="register_form">
        <!-- username -->
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" prefix-icon="iconfont icon-user_login" placeholder="请输入用户名" type="text"></el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" prefix-icon="iconfont icon-3702mima" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <!-- check password -->
        <el-form-item prop="checkPass">
          <el-input v-model="registerForm.checkPass" prefix-icon="iconfont icon-3702mima" placeholder="请再次输入密码" type="password"></el-input>
        </el-form-item>
        <!-- button -->
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="resetregisterForm">重置</el-button>
          <el-button type="danger" @click="toLogin">返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // register form data binding
      registerForm: {
        username: '',
        password: '',
        checkPass: ''
      },
      // register form validator
      registerFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        checkPass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // reset register form
    resetregisterForm () {
      // console.log(this)
      this.$refs.registerFormRef.resetFields()
    },
    register () {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('/auth/register', this.registerForm)
        if (res.status_code !== 200) return this.$message.error('用户名已存在!')
        this.$message.success('register success!')
        await this.$router.push('/login')
      })
    },
    async toLogin () {
      await this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
  .register_container {
    background-color: #663366;
    height: 100%;
  }

  .register_box {
    width: 450px;
    height: 350px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .register_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>
