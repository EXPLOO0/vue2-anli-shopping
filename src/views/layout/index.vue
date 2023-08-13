<template>
  <div>
    <!--二级路由出口：二级组件展示的位置-->
    <router-view />
    <van-tabbar route active-color="RGB(25,137,250)" inactive-color="#000">
      <van-tabbar-item replace icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item replace icon="apps-o" to="/category">分类页</van-tabbar-item>
      <van-tabbar-item replace icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item replace icon="manager-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  data () {
    return {
    }
  }
}
</script>

<style></style>
