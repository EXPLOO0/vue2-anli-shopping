import request from '@/utils/request'

// 获取首页数据
export const goSearch = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      page,
      goodsName,
      categoryId,
      sortPrice: 0,
      sortType: 'all'
    }
  })
}
