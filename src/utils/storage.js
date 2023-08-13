// 设置通用键名
const INFO_KEY = 'anli_shpping_info'
// 获取
export const getInfo = () => {
  // 默认值，空
  const defaultobj = { token: '', userId: '' }
  // 获取本地缓存中的数据
  const result = localStorage.getItem(INFO_KEY)
  // 判断是否有本地数据，有就返回数据，没有就返回默认值
  return result ? JSON.parse(result) : defaultobj
}
export const setInfo = () => {

}
export const removeInfo = () => {

}
