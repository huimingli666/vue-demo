<template>
  <div>
    <el-menu default-active="0" :router="true">
      <el-submenu v-for="item in menus" :index="item.path">
        <template slot="title"><i :class="item.icon"></i>{{ item.name }}</template>
        <el-menu-item-group v-if="item.children.length > 0 ">
          <el-menu-item v-for="child in item.children" :index ="child.path">
             {{child.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

  </div>
</template>
<script>
  import menusData from  '../menu.config';
  export default {
    data: function () {
      return {
        menus: menusData
      }
    },
    methods: {}
  }
</script>
<style>
  .header {
    height: 50px;
    width: 100%;
    background-color: #246ED2;
  }
</style>
