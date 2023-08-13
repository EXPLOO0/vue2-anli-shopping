export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关
      userInfo: {
        userId: null, // 用户id
        token: null // 用户token标识
      }
    }
  },
  mutations: {
    setUserInfo (state, user) {
      state.userInfo = user
    }
  },
  actions: { },
  getters: { }
}
