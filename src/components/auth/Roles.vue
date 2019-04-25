<template>
<div class="roles_continter">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
    <!-- 按钮 -->
    <el-button type="primary"  plain>添加角色</el-button>
    <!-- 列表 -->
    <el-table
    :data="rightList">
    <el-table-column type="index" width="100px"> </el-table-column>
    <el-table-column property="date"  label="角色名称"> </el-table-column>
    <el-table-column property="date"  label="角色描述"> </el-table-column>
     <el-table-column  label="操作">
      <template slot-scope="scope">
      <el-button-group>
      <el-button icon="el-icon-edit" round></el-button>
      <el-button icon="el-icon-delete" round></el-button>
      <el-button icon="el-icon-setting" round></el-button>
      </el-button-group>
      </template>
    </el-table-column>
    </el-table>
</el-card>
</div>
</template>

<script>
import mixin from './Roles-Mixin'
export default {
    mixins:[mixin]
}
</script>
<style scoped>
</style>