// 此处用于存放所有登录相关的接口请求
import request from '@/utils/request'

// 1.获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 1.获取短信验证码
export const getSmsCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode, // 图形验证码
      captchaKey, // 图形验证码key
      mobile// 接收验证码手机
    }
  })
}

// 1.获取短信验证码
export const tellLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false, // boolean 是否存在第三方用户信息
      partyData: {}, // object {0} 三方登录信息，默认为：{}
      mobile, // string 手机号
      smsCode// string 短信验证码， 测试环境验证码为：246810
    }
  })
}
