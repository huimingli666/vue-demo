<template>
  <div style="padding-left: 5px; padding-right: 5px;">

    <div class="title">
      <el-breadcrumb style="font-size: 14px; line-height: 50px;" separator="">
        <el-breadcrumb-item :to="{ path: '/' }">首页<i class="el-icon-caret-right"></i></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/member/list' }">会员查询<i class="el-icon-caret-right"></i>
        </el-breadcrumb-item>
        <el-breadcrumb-item>会员基本信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box" style="xpadding-left: 30px;">
      <el-row>
        <el-col :span="3"><span>会员ID：</span></el-col>
        <el-col :span="6"><span>{{ member.id}}</span></el-col>
      </el-row>

      <el-row>
        <el-col :span="3"><span>会员姓名：</span></el-col>
        <el-col :span="6"><span>{{ member.name}}</span></el-col>
      </el-row>

      <el-row>
        <el-col :span="3"><span>会员状态：</span></el-col>
        <el-col :span="6">
          <span v-if="member.status == 1">启用</span>
          <span v-else>停用</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="3"><span>会员联系电话：</span></el-col>
        <el-col :span="6">
          <span>{{member.phone}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="3"><span>会员地址：</span></el-col>
        <el-col :span="6">
          <span>{{member.address}}</span>
        </el-col>
      </el-row>
    </div>

    <qf-footer></qf-footer>

  </div>
</template>
<script>
  import api from '../api/index';
  export default {
    data: function () {
      return {
        member: {
          id: "",
          name: "",
          status: 1,
          phone: "",
          address: ""
        }
      }
    },
    methods: {},
    mounted(){
      this.member = api.getMemberById(this.$route.query.memberId);
    }
  }
</script>

<style lang="less">
  @import '/static/css/common.css';
</style>
