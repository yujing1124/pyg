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
        <el-button type="success" :disabled="disabled" @click="showAddDialog()" >添加动态参数</el-button>
        <el-table :data="manyAttrs">
         <el-table-column type="expand" width="100px">
          <template slot-scope="scope">
            <el-tag @close="delTag(scope.row,i)" v-for="(item,i) in scope.row.attr_vals"
           :key="i" size="normal" closable>{{item}}</el-tag>
           <el-tag  class="w100" size="normal"
           v-show="!scope.row.inputShow"
           @click="showInput(scope.row)" 
           :disable-transitions="true">
           +添加tag
           </el-tag>
           <el-input class="w100 newinput" 
           v-model="scope.row.inputValue"
           @blur="hideInput(scope.row)"
           @keyup.native.enter="hideInput(scope.row)"
           :ref="'input'+scope.row.attr_id"
           v-show="scope.row.inputShow"> 
           </el-input>
          </template>
         </el-table-column>
         <el-table-column label="属性名称" prop="attr_name"></el-table-column>
         <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" circle></el-button>
            <el-button icon="el-icon-delete" circle @click="delParams(scope.row.attr_id)"></el-button>
          </template>
         </el-table-column>
        </el-table>
    </el-tab-pane>
    <el-tab-pane label="静态参数" name="only">
        <el-button type="success" :disabled="disabled" @click="showAddDialog()" >添加静态参数</el-button>
        <el-table :data="onlyAttrs">
         <el-table-column type="index" width="100px" aglin="center"></el-table-column>
         <el-table-column label="属性名称" prop="attr_name"></el-table-column>
         <el-table-column label="属性值">
           <template slot-scope="scope">
             <el-tag size="normal" style="width:200px">
               {{scope.row.attr_vals}}
             </el-tag>
           </template>
         </el-table-column>
         <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" circle></el-button>
            <el-button icon="el-icon-delete" circle @click="delParams(scope.row.attr_id)"></el-button>
          </template>
         </el-table-column>
        </el-table>
    </el-tab-pane>
  </el-tabs>
 </el-card>   
 <!-- 添加参数对话框 -->
<el-dialog :title="activeName==='many'? '添加动态参数':'添加静态参数'"  width="400px"
:visible.sync="addDialogFormVisible">
  <el-form ref="addForm"  :model="addForm" :rules='addRules' label-width="100px" autocomplete="off">
    <el-form-item label="活动名称" prop="attr_name">
     <el-input v-model="addForm.attr_name" ></el-input> 
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click='addDialogFormVisible = false'>取 消</el-button>
    <el-button type="primary" @click='addSubmit()'>确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import mixin from './Params-Mixin'
export default {
    mixins:[mixin]
}
</script>

<style scoped>
.el-tag{
  margin: 5px;
}
.w100{
  width:100px;
}
.newinput{
  margin: 5px;
}
</style>