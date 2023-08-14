<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.push('/search')" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch || '搜索商品'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格 </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in goodsList.data" :key="item.goods_id" :goods="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import { goSearch } from '@/api/search'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'SearchIndex',
  async created () {
    this.getSearch()
  },
  data () {
    return {
      page: 1,
      goodsList: []
    }
  },
  components: {
    GoodsItem
  },
  computed: {
    goodsId () {
      return this.$route.params.id
    },
    querySearch () {
      return this.$route.query.search
    }
  },
  methods: {
    async getSearch () {
      const data = await goSearch({
        goodsName: this.querySearch, page: this.page, categoryId: this.$route.query.categoryId
      })
      this.goodsList = data.data.list
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
