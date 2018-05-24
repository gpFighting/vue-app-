<template>
  <div class="app">
        <!-- header区域 -->
    <Header></Header>
    <Tab></Tab>


    <!-- 主内容区域 -->

    <router-view></router-view>
    <!-- 购物车区域 -->
    <Shopcar></Shopcar>
  </div>

</template>

<script>
  import Header from './components/Header.vue'
  import Tab from './components/tab.vue'
  import Shopcar from './components/shopcar.vue'
  export default {
    data () {
      return {

      }
    },
    methods: {

    },
    components: {
      Header,
      Tab,
      Shopcar
    }
  }
</script>

<style lang="less">
html, body, div, p, h1, h2,h3,h4,h5,span,img {
  padding: 0;
  margin: 0;
}
html,body {
  width: 100%;
  height: 100%;
}
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>