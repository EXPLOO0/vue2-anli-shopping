<template>
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="tell" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input v-model="smsCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getSmsCode">
            {{ second === totalSecond ? '获取验证码' : second + '秒后重新发送' }}
          </button>
        </div>
      </div>

      <div @click="tellLogin" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
// 按需导入
import { getPicCode, getSmsCode, tellLogin } from '@/api/login'
import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  data () {
    return {
      tell: null,
      picCode: '', // 用户输入的图形验证码
      picKey: '', // 将来请求传递的图形验证码唯一标识
      picUrl: '', // 存储请求渲染的图片地址
      second: 60, // 当前秒数
      totalSecond: 60, // 等待时间
      timer: null, // 定时器id
      smsCode: null // 短信验证码
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {

    // 获取验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64 // 存储地址
      this.picKey = key // 存储唯一表示
      Toast('获取验证码成功')
    },

    // 获取短信验证码
    async getSmsCode () {
      // 校验 手机号 和 图形验证码 是否合法
      if (!this.verifyTellAndPicCode()) {
        return false
      }
      // 当前目前没有定时器开着，且totalSecond和second一致（秒数归位）才可以倒计时
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求
        const res = await getSmsCode(this.picCode, this.picKey, this.tell)
        // Toast(res.message)
        this.timer = setInterval(() => { // 开启倒计时
          this.second--// 时间-1
          // 60秒后停止定时器
          if (this.second <= 0) {
            clearInterval(this.timer)// 停止定时器
            this.timer = null// 重置定时器id
            this.second = this.totalSecond // 归位
          }
        }, 1000)

        Toast('发送短信验证码成功' + res.message)
      } else {
        Toast('已发送短信')
      }
    },

    // 校验 手机号 和 图形验证码 是否合法
    verifyTellAndPicCode () {
      // 1开头，第二位为3、4、5、6、7、8、9的11位数字的手机号码
      if (!/^1[3456789]\d{9}$/.test(this.tell)) {
        Toast('请输入正确的手机号')
        return false
      }
      // 四位的任意字符
      if (!/^\w{4}$/.test(this.picCode)) {
        Toast('请输入正确的图形验证码')
        return false
      }
      return true
    },

    // 登录
    async tellLogin () {
      // 校验 手机号 和 图形验证码 是否合法
      if (!this.verifyTellAndPicCode()) {
        return false
      }
      // 手机验证码，6位的数字
      if (!/^\d{6}$/.test(this.smsCode)) {
        Toast('请输入正确的手机验证码')
        return false
      }
      // 发送请求（预期：希望如果响应的status非208，最好抛出一个情误，await只会等待成功的promise)
      const res = await tellLogin(this.tell, this.smsCode)

      this.$store.commit('user/setUserInfo', res.data)
      Toast(res.message)

      // 判断地址栏有无回跳地址
      const url = this.$route.query.backUrl || '/'

      this.$router.replace(url)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
