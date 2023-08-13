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
  actions: { },
  getters: { }
}
