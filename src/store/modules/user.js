import { setInfo, getInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, user) {
      state.userInfo = user
      setInfo(user)
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      // 跨模块调用
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: { }
}
