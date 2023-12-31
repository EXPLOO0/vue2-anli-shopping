// 设置通用键名
const INFO_KEY = 'anli_shpping_info'
const HISTORY_KEY = 'anli_shpping_search_history'

// 获取个人信息
export const getInfo = () => {
  // 默认值，空
  const defaultobj = { token: '', userId: '' }
  // 获取本地缓存中的数据
  const result = localStorage.getItem(INFO_KEY)
  // 判断是否有本地数据，有就返回数据，没有就返回默认值
  return result ? JSON.parse(result) : defaultobj
}

// 设置个人信息
export const setInfo = (obj) => {
  // 对象不能直接传，要转成json格式
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取历史记录
export const getHistory = () => {
  // 默认值，空
  const defaultobj = []
  // 获取本地缓存中的数据
  const result = localStorage.getItem(HISTORY_KEY)
  // 判断是否有本地数据，有就返回数据，没有就返回默认值
  return result ? JSON.parse(result) : defaultobj
}

// 设置历史记录
export const setHistory = (obj) => {
  // 对象不能直接传，要转成json格式
  localStorage.setItem(HISTORY_KEY, JSON.stringify(obj))
}

// 移除历史记录
export const removeHistory = () => {
  localStorage.removeItem(HISTORY_KEY)
}
