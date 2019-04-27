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
      // 分页的总条数
      total: 0,
      // 标识当前对话框是否显示
      dialogFormVisible: false,
      /* 添加用户表单对象数据 */
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      /* 表单校验 */
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
        ]
      },
      /* 分配角色对话框的显示隐藏 */
      roleDialogFormVisible: false,
      roleValue: '',
      roleUserName: '',
      roleUserRoleName: '',
      roleUserId: '',
      options: [],
      /* 编辑按钮 */
      editDialogFormVisible: false,
      editForm: {},
      editRules: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: checkMobile, rigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // 用户列表数据的获取
    this.getData()
  },
  methods: {
    /* 显示编辑的对话框 */
    async showEditDialogFormVisible (id) {
      this.editDialogFormVisible = true
      /* 填充数据 发送请求 */
      const {data: {data, meta}} = await this.$http.get(`users/${id}`)
      if (meta.status !== 200) return this.$message.error('获取用户数据失败')
      /* 把数据展示在表单内 */
      this.editForm = data
    },
    /* 编辑用户提交请求 */
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          /* 校验成功 */
          const {data: {meta}} = await this.$http.put(`users/${this.editForm.id}`,{
            email: this.editForm.email,
            mobile: this.editForm.mobile
          })
          if (meta.status !== 200) return this.$message.error('修改状态')
          this.$message.success('修改成功')
          this.getData()
          this.editDialogFormVisible = false
        }
      })
    },
    /* 用户列表 */
    async getData () {
      // get请求 参数本来是在url?的后面
      const { data: { data, meta } } = await this.$http.get('users', { params: this.reqParams })
      if (meta.status !== 200) return this.$message.error('获取用户失败')
      this.userList = data.users   
      // 列表数据
      this.total = data.total      
      // 总分页条数数据
    },
    /* 分页操作 */
    changePager (newPage) {
      // 进行分页查询
      this.reqParams.pagenum = newPage
      this.getData()
    },
    /* 查询操作 */
    search () {
      this.reqParams.pagenum = 1
      this.getData()
    },
    /* 添加对话框 */
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
    showDialogForm () {
      // 显示添加对话框
      this.dialogFormVisible = true
      /* 下一帧要做的事情 */
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    /* 删除 */
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
    /* 改变状态 */
    async updateState (id, newState) {
      const { data: { meta } } = await this.$http.put(`users/${id}/state/${newState}`)
      if (meta.status !== 200) return this.$message.error('修改状态失败')
      this.$message.success('修改状态成功')
      this.getData()
    },
    
    /* 添加用户按钮渲染数据显示对话框 */
    async showRoleDialogFormVisible (row) {
      /* 打开对话框 */
      this.roleDialogFormVisible = true
      /* 渲染下拉菜单 */
      const {data: {data, meta}} = await this.$http.get('roles')
      if (meta.status !== 200) return this.$message.error('获取角色失败')
      this.options = data 
      this.roleUserId = row.id
      this.roleUserName = row.username
      this.roleUserRoleName = row.role_name
    },
    /* 分配角色提交角色 */
    async changeRole () {
      const {data: {meta}} = await this.$http.put(`users/${this.roleUserId}/role`, {
        rid: this.roleValue
      })
      if (meta.status !== 200) return this.$message.error('分配角色失败')
      this.$message.success('分配角色成功')
      this.roleDialogFormVisible = false
      this.getData()
    }
  }
}