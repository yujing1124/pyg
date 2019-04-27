<template>
<div class="login_container"> 
 <div class="box">
  <img src="../assets/images/logo.png" alt="">
  <el-form  ref="form" :model="form"  :rules="rules">
    <el-form-item  prop="username">
      <el-input    prefix-icon="iconfont icon-ren" placeholder="请输入用户名" v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password"  prefix-icon="iconfont icon-mima1" placeholder="请输入密码" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button >重置</el-button>
      <el-button type="primary" @click="submit()">登录</el-button>
    </el-form-item>
  </el-form>
 </div>
</div>
</template>

<script>

export default {
  name: "Login",
  data () {
    return {
      form:{
        username:'admin',
        password:'123456',
      },
    rules: {
      username:[
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
      ]
    }
    }
  },
  methods: {
    submit () {
      //验证表单
      this.$refs.form.validate(async valid=>{
        if(valid){
        //发送登录的请求
         const {data:{data,meta}}= await this.$http.post('login',this.form)
         //失败时提示
         if(meta.status !==200)return  this.$message.error(meta.msg || '登录失败');
         //登录成功时
         //保存token   setItem是保存的意思  get是请求   remove是移除
         sessionStorage.setItem('token',data.token)
         //跳转到首页面
         this.$router.push('/home')
        this.$message({
          message: '登录成功',
          type: 'success'
        });
        }
      })
    }
  }
}
</script>

<style scoped>
  .login_container{
    width: 100%;
    height: 100%;
    background:linear-gradient(45deg ,#ccc,rgb(140, 198, 245))
  }
  .login_container .box{
    width: 400px;
    height: 250px;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px;
    border-radius: 8px;
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-60%);
    background:linear-gradient(45deg ,#eee,rgba(209, 222, 236, 0.973));
    padding: 0 15px;
    box-sizing:border-box;

  }
  .login_container .box img{
    display: block;
    width: 200px;
    margin: 15px auto;
  }
</style>