<template>
  <div>
    <div class="header">
      <div style="padding-left: 15px; line-height: 50px;color: #FFFFFF;font-size: 18px; width: 50%; float: left;">
        大会员
      </div>
      <div style="width:45%; float: left;text-align: right;line-height: 50px; ">
        <el-dropdown trigger="click">
        <span class="el-dropdown-link" style="color:#FFFFFF; cursor: pointer;">
        管理员<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  .header {
    height: 50px;
    width: 100%;
    background-color: #246ED2;
  }
</style>
