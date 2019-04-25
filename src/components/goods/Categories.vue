<template>
<div class="roles_continter">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>商品分类</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
    <!-- 按钮 -->
    <el-button type="primary" @click="showAddDialog()" plain>添加分类</el-button>
    <!-- 列表 -->
    <el-table
    :data="categories"
    :indent="50"
    style="width: 100%;margin-bottom: 20px;"
    row-key="cat_id">
    <el-table-column
      prop="cat_name"  label="分类名称" >
    </el-table-column>
    <el-table-column 
      prop="cat_deleted" label="是否有效" >
    </el-table-column>
    <el-table-column
      prop="cat_level" label="等级">
      <template slot-scope="scope">
          <el-tag v-if="scope.row.cat_level===0">一级分类</el-tag>
          <el-tag  type="success" v-if="scope.row.cat_level===1">二级分类</el-tag>
          <el-tag  type="" v-if="scope.row.cat_level===2">三级分类</el-tag>
      </template>
    </el-table-column>
    <el-table-column
       label="操作">
        <template slot-scope="scope">
        <el-button-group>
        <el-button icon="el-icon-edit" round></el-button>
        <el-button icon="el-icon-delete" round></el-button>
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
<!-- 添加分类对话框 -->
<!-- <el-dialog title="添加分类" :visible.sync="addDialogFormVisible">
  <el-form :model="addForm" :label-width="100px">
    <el-form-item label="父级分类">
      <el-input v-model="addForm.cat_name"></el-input>
    </el-form-item>
    <el-form-item label="子级分类">
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog> -->
</div>
</template>
<script>
import mixin from './Categories-Mixin'
export default {
    mixins:[mixin]
}
</script>

<style scoped>
</style>