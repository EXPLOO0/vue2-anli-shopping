import request from '@/utils/request'

// 获取商品详情数据
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 获取商品详情数据
export const getDetailComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId, limit
    }
  })
}
