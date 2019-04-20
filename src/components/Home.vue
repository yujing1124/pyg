<template>
<el-container class="home_container">
  <el-header class="home_header">Header</el-header>
  <el-container>
    <el-aside  class="home_aside" width="180px">Aside</el-aside>
    <el-main class="home_main">Main</el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  name: "Home",
  data () {
    return {
    };
  }
}
</script>
<style scoped>
.home_container{
    height: 100%;
}
.home_header{
    width: 100%;
    background-color: ;
}
</style>