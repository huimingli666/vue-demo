<template lang="html">
  <div class="layout-app">
    <t-header class="layout-header"></t-header>
    <t-menu class="layout-menu"></t-menu>
    <div class="layout-container container">
      <div class="wrapper">
       <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import tHeader from './Header.vue'
import tMenu from './Menu.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    tHeader,
    tMenu
  }
}
</script>

<style lang="less">
  .layout-app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .layout-header {
  }
  .layout-menu {
    position: absolute;
    top: 50px;
    left: 0;
    right:0;
    bottom: 0;
    width: 260px;
    overflow: auto;
  }
  .layout-container {
    position: absolute;
    left: 260px;
    top: 50px;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    overflow: auto;
    background-color: #e5e9f2;
    width: auto;
    overflow-y: scroll;
  }
</style>
