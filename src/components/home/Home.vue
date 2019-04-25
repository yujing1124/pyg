<template>
<el-container class="home_container">
  <el-header class="home_header">
     <el-button icon="iconfont icon-liebiao"  size="mini" @click="toggleMenu()" circle></el-button>
     <span class="title">品优购后台管理系统</span>
     <el-button  class="layout" type="danger"  size="mini" round @click="esc()">退出</el-button>
  </el-header>
  <el-container>
    <el-aside  class="home_aside" :width="collapse?'65px':'180px'">
      <el-menu
      router
      :collapse="collapse"
      :collapse-transition="false"
      :unique-opened="true"
      style="border: none; margin-top: 5px"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- 一级菜单 -->
      <el-submenu :index="item.id.toString()" v-for="(item,i) in list" :key="item.id">
        <template slot="title">
          <i :class="['iconfont',iconArr[i]]"></i>
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
          <el-menu-item :index="itemChild.path" v-for="itemChild in item.children" :key="itemChild.id">
            <i class="el-icon-menu"></i>
            <span>{{itemChild.authName}}</span>  
          </el-menu-item>      
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main class="home_main">
      <router-view> </router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  name: "Home",
  data () {
    return {
      collapse:false,
      menus:[] ,
      list:[
        {authName: '',
        id:'',
        children: [
          {authName: '',id: ''}
        ]
        }
      ],
      //图标数组
      iconArr:[
        'icon-yonghuguanli','icon-quanxianguanli','icon-goods','icon-yonghuguanli','icon-shujuguanli'

      ]
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
        console.log(res.data.data)
        this.list=res.data.data
      })
    },
    esc(){
      //清除token,跳转到登录页
      sessionStorage.removeItem('token')
      this.$router.push('/login')
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
</style>