<template>
<el-container class="home_container">
  <el-header class="home_header">
     <el-button icon="iconfont icon-ren"  size="mini" @click="toggleMenu()" circle></el-button>
     <span class="title">品优购后台管理系统</span>
     <el-button  class="layout" type="danger"  size="mini" round>退出</el-button>
  </el-header>
  <el-container>
    <el-aside  class="home_aside" :width="collapse?'65px':'180px'">
      <el-menu
      :collapse="collapse"
      :collapse-transition="false"
      style="border: none; margin-top: 5px"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main class="home_main">欢迎登陆品优购后台管理系统</el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  name: "Home",
  data () {
    return {
      collapse:false,
      menus:[]   //菜单数据
    };
  },
  mounted(){
    //获取菜单数据
  this.getData()
  },
  methods: {
    toggleMenu () {
      this.collapse=! this.collapse
    },
    //获取数据
    getData(){
      this.$http.get('menus').then(res=>{
        console.log(res.data)
      })
    }
  }
}
</script>
<style scoped>
.home_container{
    height: 100%;
}
.home_header{
    width: 100%;
    background: #373D41;
    line-height: 60px;
}
.home_aside{
    background: #333744;
}
.home_admin{
    background: #EAEDF1;
}
.title{
  color:#ccc;
  font-size:18px;
  margin-left: 10px;
}
.layout{
  float: right;
  margin-top: 15px;
}
.home_main{
  text-align: center;
  font-size:20px;
}
</style>