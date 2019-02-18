<template>
  <div class="login-wrap">
    <img class="login-bg" src="../assets/logo.jpg" alt="logo">
    <main>
      <section>
        <p class="form-title">用户登录</p>
        <el-form :model="ruleForm" ref="loginForm" :rules="rules" label-position="top" label-width="0px">
          <el-form-item label="" prop="mobile">
            <el-input v-model="ruleForm.mobile" autofocus placeholder="登录名"></el-input>
            <i class="tako-icon-login_icon_mine"></i>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="密码" @keyup.enter.native="login"></el-input>
            <i class="tako-icon-login_icon_lock"></i>
          </el-form-item>
          <!--<el-form-item label="" prop="captcha">-->
          <!--<el-input v-model="ruleForm.captcha" @keyup.enter.native="login" type="type" placeholder="验证码"></el-input>-->
          <!--<i class="tako-icon-login_icon_verify"></i>-->
          <!--<img @click="HandleCaptcha" class="checkCode_img" :src="captcha" alt="验证码" title="点击刷新验证码" />-->
          <!--</el-form-item>-->
          <el-form-item class="login-btn-form">
            <el-button type="primary" @click="login">登&ensp;录</el-button>
          </el-form-item>
        </el-form>
      </section>
    </main>

  </div>
</template>

<script>
export default {
  data: function () {
    return {
      ruleForm: {
        mobile: '',
        password: ''
      },
      rules: {
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.getCookie()
  },
  methods: {
    login () {
      // this.$router.push('/admin')
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$request(this.$api.login, this.ruleForm).then(res => {
            if (res.code === '0') {
              // 设置cookie
              let {mobile, password} = this.ruleForm
              this.setCookie(mobile, password, 2)
              // 跳转
              this.$router.push('/admin')
              this.$message({
                duration: 1000,
                message: '登录成功！',
                type: 'success'
              })
              // localStorage.setItem('access-user', JSON.stringify(res.data));
            }
          })
        } else {
          return false
        }
      })
    },
    setCookie (name, pwd, exdays = 1) { // 设置cookie
      var exdate = new Date() // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
      // 字符串拼接cookie
      window.document.cookie = 'mobile' + '=' + name + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'password' + '=' + pwd + ';path=/;expires=' + exdate.toGMTString()
    },
    getCookie () { // 读取cookie
      if (document.cookie.length) {
        let arr = document.cookie.split('; ')

        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=') // 再次切割
          // 判断查找相对应的值
          if (arr2[0] === 'mobile') {
            this.ruleForm.mobile = arr2[1]
          } else if (arr2[0] === 'password') {
            this.ruleForm.password = arr2[1]
          }
        }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .login-bg
    position fixed
    width 100%
    height 100%
    display block

  .login-wrap
    main
      section
        background hsla(0, 0%, 100%, .12)
        box-shadow 0 20px 40px 0 rgba(0, 0, 0, .06)
        width 340px
        position absolute
        left 50%
        top 50%
        transform translate(-50%, -50%)
        padding 30px 40px
        z-index 3
        .form-title
          color #fff
          margin-bottom 20px
</style>
