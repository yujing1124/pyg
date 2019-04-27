<template>
<div class="params_containter">
  <!-- 导航 -->
 <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>商品分类</el-breadcrumb-item>
 </el-breadcrumb>
  <el-card>
    <!--警告提示框  -->
    <el-alert
    title="注意:第三级分类才可设置参数"
    type="warning" show-icon>
    </el-alert>
    <!-- 选择商品分类 -->
    <el-form style="margin: 15px 0">
     <el-form-item label="选择商品分类:">
     <el-cascader
        expand-trigger="hover"
        :props="{value:'cat_id',label:'cat_name'}"
        :options="categroyList"
        v-model="categroyValues"
        @change="handleChange">
     </el-cascader>
     </el-form-item>
    </el-form>
    <!-- 动态静态切换栏 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="动态参数" name="many">
        <el-button type="success" :disabled="disabled" >添加动态参数</el-button>
    </el-tab-pane>
    <el-tab-pane label="静态参数" name="only">
        <el-button type="success" :disabled="disabled" >添加静态参数</el-button>
    </el-tab-pane>
  </el-tabs>
 </el-card>   
</div>
</template>

<script>
import mixin from './Params-Mixin'
export default {
    mixins:[mixin]
}
</script>

<style scoped>
</style>