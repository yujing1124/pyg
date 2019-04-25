<template>
<!-- 导航 -->
<div class="rights_containter">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 列表 -->
<el-card>
    <el-table
    :data="rightList"
    style="width: 100%">
    <el-table-column type="index"> </el-table-column>
    <el-table-column property="date"  label="权限名称"> </el-table-column>
    <el-table-column property="date"  label="路径"> </el-table-column>
    <el-table-column property="date"  label="权限等级"> </el-table-column>
    </el-table>
</el-card>

</div>
</template>

<script>
import mixin from './Rights-Mixin'
export default {
    mixins:[mixin]
}
</script>
<style scoped>
</style>