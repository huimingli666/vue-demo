<template>
  <div style="padding-left: 5px; padding-right: 5px;">
    <div class="title">
      <el-breadcrumb style="font-size: 14px; line-height: 50px;" separator="">
        <el-breadcrumb-item :to="{ path: '/' }">首页<i class="el-icon-caret-right"></i></el-breadcrumb-item>
        <el-breadcrumb-item>会员查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :model="searchForm" ref="searchForm" label-width="80px" class="box">
      <el-row>
        <el-col :span="6">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入会员名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态：" prop="status">
            <el-select v-model="searchForm.status" placeholder="不限">
              <el-option
                v-for="(item, index ) in memberStatus"
                :key="index"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="searchForm.phone" placeholder="请输入会员手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="地址：" prop="address">
            <el-input v-model="searchForm.address" placeholder="请输入会员地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" style="padding-left: 20px;">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right;padding-right: 10px;">
          <el-button type="primary" @click="jumpToCreateView">新增</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="members" border style="width: 100%;" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template scope="scope">
          <p v-if="scope.row.status == '1'">启用</p>
          <p v-else="scope.row.status == '0'">停用</p>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" align="center"></el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template scope="scope">
          <el-button type="text" @click="handleJumpToView(scope.row)">查看</el-button>
          <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchForm.pageNo"
      :page-sizes="pageSizes"
      :page-size="searchForm.pageSize"
      :layout="layout"
      :total="searchForm.totalRecords">
    </el-pagination>

    <qf-footer></qf-footer>
  </div>
</template>
<script>
  import api from '../api/index';
  import cf from '../../../config';
  export default {
    data: function () {
      return {
        layout: cf.layout,
        pageSizes: cf.pageSizes,
        loading: false,
        memberStatus: [
          {
            name: "不限",
            value: null
          },
          {
            name: "启用",
            value: 1
          }, {
            name: "停用",
            value: 0
          }
        ],
        searchForm: {
          name: "",
          address: "",
          status: null,
          phone: "",
          pageNo: 1,
          pageSize: 5,
          totalRecords: 0
        },
        members: []
      }
    },
    methods: {
      search(){
        this.loading = true;
        setTimeout(() => {
          let queryResult = api.queryMembers(this.searchForm);
          this.members = queryResult.data;
          this.searchForm.pageNo = queryResult.pageNo;
          this.searchForm.pageSize = queryResult.pageSize;
          this.searchForm.totalRecords = queryResult.totalRecords;
          this.loading = false;
        }, 1000);

      },
      handleSizeChange(val){
        this.searchForm.pageSize = val;
        this.search();
      },
      handleCurrentChange(val){
        this.searchForm.pageNo = val;
        this.search();
      },
      handleJumpToView(row) {
        this.$router.push({path: "/member/view", query: {memberId: row.id}});
      },
      handleDelete(index, row) {
        this.dialogVisible = true;
        this.$confirm('此操作将删除该会员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.searchForm.totalRecords -= 1;
          this.members.splice(index, 1);
          api.deleteMember(row.id);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      jumpToCreateView(){
        this.$router.push({path: "/member/new"});
      },
      resetForm(){
        this.$refs['searchForm'].resetFields();
      }
    },
    mounted(){
      this.search();
    }
  }
</script>

<style lang="less">
  @import '/static/css/common.css';
  .pagination {
    background-color: #FFFFFF;
    text-align: right;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
  }

</style>
