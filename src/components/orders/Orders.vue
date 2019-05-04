<template>
<div class="orders_containter">
  <!-- 导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">订单管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>订单列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
  <!-- 输入框 -->
  <el-row :gutter="20">
    <el-col :span="6">
      <el-input   placeholder="请输入搜索关键字">
        <el-button slot="append"  @click="search()" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
  </el-row>
  <!-- 列表表格 -->
  <el-table :data="ordersList">
    <el-table-column type="index"></el-table-column>
    <el-table-column  prop="order_number"  label="订单编号" width="300px"></el-table-column>
    <el-table-column  prop="order_price"  label="订单金额"></el-table-column>
    <el-table-column   label="是否付款">
        <template slot-scope="scope">
            {{scope.row.pay_status === '0' ? '未支付' : '已支付'}}
        </template>
    </el-table-column>
    <el-table-column  prop="is_send"  label="是否发货"></el-table-column>
    <el-table-column    label="创建时间">
      <template slot-scope="scope">
        {{scope.row.create_time|ft}}
      </template>
    </el-table-column>
    <el-table-column  label="操作">
      <template slot-scope="scope">
        <el-button-group>
          <el-button icon="el-icon-edit" @click="editDialogFormVisible = true" circle></el-button>
          <el-button icon="el-icon-location" @click="wlDialogFormVisible = true"></el-button>
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
  <!-- 编辑分类对话框 -->
  <el-dialog title="编辑订单"  width="400px"
    :visible.sync="editDialogFormVisible" >
    <el-form :model="ruleForm">
      <el-form  autocomplete="off">
        <el-form-item label="省市区">
          <el-cascader
            clearable
            style="width: 250px"
            expand-trigger="hover"
            :options="categoryList"
            v-model="categoryValues">
          </el-cascader>
        </el-form-item>
      </el-form>
      <el-form-item label="详细地址">
        <el-input type="textarea"  style="width:250px" v-model="ruleForm.desc"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click='editDialogFormVisible = false'>取 消</el-button>
      <el-button type="primary" @click="editDialogFormVisible=false">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 显示物流对话框 -->
  <el-dialog title="查询物流"  width="400px"
    :visible.sync="wlDialogFormVisible">
    <!-- 时间线 -->
    <el-timeline>
      <el-timeline-item
        v-for="(item, i) in wlList"
        :key="i"
        :timestamp="item.time">
        {{item.context}}
      </el-timeline-item>
    </el-timeline>
    <div slot="footer" class="dialog-footer">
      <el-button @click='wlDialogFormVisible = false'>取 消</el-button>
      <el-button type="primary" @click="wlDialogFormVisible=false">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import mixin from './Orders-Mixin'
export default {
    mixins:[mixin]
}
</script>
<style scoped>

</style>