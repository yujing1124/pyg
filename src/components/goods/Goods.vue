<template>
<div class='goods_containter'>
  <!-- 导航 -->
 <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>商品列表</el-breadcrumb-item>
 </el-breadcrumb>
 <el-card>
  <!-- 输入框 -->
  <el-row :gutter="20">
    <el-col :span="6">
      <el-input  v-model="reqParams.query"  placeholder="请输入搜索关键字">
        <el-button slot="append"  @click="search()" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="18">
      <el-button type="primary" @click="toAdd" plain>添加商品</el-button>
     </el-col>
  </el-row>
  <!-- 列表表格 -->
  <el-table :data="goodsList">
    <el-table-column type="index"></el-table-column>
    <el-table-column  prop="goods_name"  label="商品名称" width="300px"></el-table-column>
    <el-table-column  prop="goods_price"  label="价格"></el-table-column>
    <el-table-column  prop="goods_weight"  label="重量"></el-table-column>
    <el-table-column    label="创建时间">
      <template slot-scope="scope">
        {{scope.row.add_time|ft}}
      </template>
    </el-table-column>
    <el-table-column  label="操作">
      <template slot-scope="scope">
        <el-button-group>
          <el-button icon="el-icon-edit" circle></el-button>
          <el-button icon="el-icon-delete"  @click="delGoods(scope.row.goods_id)"></el-button>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>   
  <!-- 分页区域 -->
  <div class="pager_container">
    <el-pagination
      @current-change="changePager"
      :page-size="reqParams.pagesize"
      :current-change="reqParams.pagenum"
      background
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div> 
</el-card>
</div> 
</template>

<script>
import mixin from './Goods-Mixin'
export default {
    mixins:[mixin]
}
</script>
<style scoped>
</style>