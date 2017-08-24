<template>
  <div style="padding-left: 5px; padding-right: 5px;">

    <div class="title">
      <el-breadcrumb style="font-size: 14px; line-height: 50px;" separator="">
        <el-breadcrumb-item :to="{ path: '/' }">首页<i class="el-icon-caret-right"></i></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/member/list' }">会员查询<i class="el-icon-caret-right"></i>
        </el-breadcrumb-item>
        <el-breadcrumb-item>会员新建</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px">
        <el-form-item label="会员ID：" prop="id">
          <el-input v-model="createForm.id" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="名称：" prop="name">
          <el-input v-model="createForm.name" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model="createForm.status" style="width: 400px;">
            <el-option
              v-for="(item, index ) in memberStatus"
              :key="index"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="createForm.phone" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input type="textarea" v-model="createForm.address" style="width: 400px;"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit">创建</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>

      </el-form>
    </div>
    <qf-footer></qf-footer>

  </div>
</template>
<script>
  import api from '../api/index';
  export default {
    data: function () {
      return {
        memberStatus: [
          {
            name: "启用",
            value: 1
          }, {
            name: "停用",
            value: 0
          }
        ],
        createForm: {
          id: "",
          name: "",
          status: 1,
          phone: "",
          address: ""
        },
        rules: {
          id: [
            {required: true, message: '请输入会员ID', trigger: 'change'},
            {min: 10, max: 30, message: '长度在 10 到 30 个字符', trigger: 'change'}
          ],
          name: [
            {required: true, message: '请输入会员名称', trigger: 'change'}
          ],
          phone: [
            {required: true, message: '请输入会员ID', trigger: 'change'},
            {validator: this.phoneValidator, trigger: "change"}
          ],
          address: [
            {max: 255, message: '长度在255个字符内', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      phoneValidator(rule, value, callback){
        if (value == null || value == "") {
          callback();
        } else {
          let regex = /^1(3|4|5|7|8)\d{9}$/
          if (regex.test(value) == false) {
            callback(new Error("请输入正确手机号格式"));
          } else {
            callback();
          }
        }
      },
      submit(){
        this.$refs['createForm'].validate((valid) => {
          if (valid) {
            api.createMember(this.createForm);
            this.$router.push({path: "/member/view", query: {memberId: this.createForm.id}});
          } else {
            return false;
          }
        });
      },
      resetForm(){
        this.$refs['createForm'].resetFields();
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  @import '/static/css/common.css';
</style>
