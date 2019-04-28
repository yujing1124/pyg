<template>
<div class='goods_containter'>
  <!-- 导航 -->
 <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>分类参数</el-breadcrumb-item>
 </el-breadcrumb>
</div> 
</template>

<script>
import mixin from './Goods-Add-Mixin'
export default {
    mixins:[mixin]
}
</script>
<style scoped>
</style>