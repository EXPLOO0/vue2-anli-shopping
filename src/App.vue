<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      value: 5
    }
  }
}
</script>

<style>
.box {
  width: 300px;
  height: 300px;
}
</style>
