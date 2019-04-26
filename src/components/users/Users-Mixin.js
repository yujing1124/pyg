export default {
  name: 'Users',
  data () {
  // 定义校验函数
    const checkMobile = (rule, value, callback) => {
      // rule是规则信息,value验证输入框的值,callback是回调函数(成功或失败)
      if (!/^1[3456789]\d{9}$/.test(value)) return callback(new Error('手机号错误'))
      callback()
    }

    return {
      // 用户列表
      userList: [],
      // 传参
      reqParams: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      // 分页的综调室
      total: 0,
      // 标识当前对话框是否显示
      dialogFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度在6-18位之间', tirgger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: checkMobile, rigger: 'blur' }
        ],
      }
    }
  },
  mounted () {
    // 调用getData
    this.getData()
  },
  methods: {
    async getData () {
      // get请求 参数本来是在url?的后面
      const { data: { data, meta } } = await this.$http.get('users', { params: this.reqParams })
      if (meta.status !== 200) return this.$message.error('获取用户失败')
      this.userList = data.users   
      // 列表数据
      this.total = data.total      
      // 总分页条数数据
    },
    changePager (newPage) {
      // 进行分页查询
      this.reqParams.pagenum = newPage
      this.getData()
    },
    search () {
      this.reqParams.pagenum = 1
      this.getData()
    },
    addSubmit () {
      // 输入时候进行数据的验证
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          // 请求后台
          const { data: { meta } } = await this.$http.post('users', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加失败')
          // 添加成功后,关闭对话框
          this.dialogFormVisible = false
          // 更新列表
          this.getData()
        }
      })
    },
    showForm () {
      // 显示添加对话框
      this.dialogFormVisible = true
      this. $refs. addForm. resetFields
    },
    delUsers (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { meta } } = await this.$http.delete(`users/${id}`)
        if (meta.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        this.getData()
      }).catch(() => { })
    },
    async updateState (id, newState) {
      const { data: { meta } } = await this.$http.put(`users/${id}/state/${newState}`)
      if (meta.status !== 200) return this.$message.error('修改状态失败')
      this.$message.success('修改状态成功')
      this.getData()
    }
  }
}