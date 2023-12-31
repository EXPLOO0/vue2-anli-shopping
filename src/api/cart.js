import request from '@/utils/request'

// 获取购物车商品总数
export const getCartTotal = (AccessToken) => {
  return request.get('/cart/total')
}

/**
 * 添加商品到购物车
 * @param {*} goodsId 商品id
 * @param {*} goodsNum 商品数量
 * @param {*} goodsSkuId 商品规格id
 * @returns
 */
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId, goodsNum, goodsSkuId
  })
}

export const getCartList = () => {
  return request.get('/cart/list')
}

// 更新购物车商品数量
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车
export const delSelect = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
