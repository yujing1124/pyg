export default {
  name: 'Roles',
  data () {
    return {
      rolesList: [],
      /* 添加相关的数据 */
      addDialogFormVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      addRules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      },
      /* 编辑相关的数据 */
      editDialogFormVisible: false,
      editForm: {},
      editRules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      },
      /* 分配权限的数据 */
      rightDialogFormVisible: false,
      /* 权限树 */
      rightTree: [],
      rightCheckedList: [],
      /* 分配权限角色id */
      rightRoleId: null,
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    /* 分配权限 */
    async rightSubmit () {
      const treeDom = this.$refs.tree
      const checkedArr = treeDom.getCheckedKeys()
      const halfCheckArr = treeDom.getHalfCheckedKeys()
      const arr = [...checkedArr, ...halfCheckArr]
      /* 提交角色授权请求 */
      const {data: {meta}} = await 
      this.$http.post(`roles/${this.rightRoleId}/rights`, {
        rids: arr.join(',')
      })
      if (meta.status !== 200) return this.$message.error('分配权限失败')
      this.$message.success('分配权限成功')
      /* 关闭当前对话框 */
      this.rightDialogFormVisible = false
      /* 展示更改完的数据 */
      this.getData()
    },
    /* 显示分配权限的对话框 */
    async showRightDialog (row) {
      /* 获取树状的所有权限数据 */
      const {data: {data, meta}} = await this.$http.get('rights/tree')
      if (meta.status !== 200) return this.$message.error('获取失败')
      this.rightTree = data 
      const arr = []
      row.child.forEach(item => {
        item.child.forEach(item => {
          item.child.forEach(item => {
            arr.push(item.id)
          })
        })
      })
      this.rightCheckedList = arr 
      /* 获取数据 进行选中 */
      this.rightDialogFormVisible = true
      this.rightRoleId = row.id
    },
    /* 删除权限 */
    delRights (row, rightId) {
      this.$confirm('确定删除该权限吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: {data, meta}} = await this.$http.delete(`roles/${row.id}/rights/${rightId}`)
        if (meta.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        data.forEach(item => {
          item.child = item.children
          delete item.children
          item.child.forEach(item => {
            item.child = item.children
            delete item.children
          })
        })
        row.child = data
      }).catch(() => { })
    },
    /* 提交编辑 */
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          // 注意ID是 roleId
          const {data: {meta}} = await this.$http.put(`roles/${this.editForm.roleId}`, {
            roleName: this.editForm.roleName,
            roleDesc: this.editForm.roleDesc
          })
          if (meta.status !== 200) return this.$message.error('编辑角色失败')
          this.$message.success('编辑角色成功')
          // 关闭编辑对话框  更新列表
          this.editDialogFormVisible = false
          this.getData()
        }
      })
    },
    /* 显示编辑对话框 */
    showEditDialog (role) {
      this.editDialogFormVisible = true
      /* 填充默认数据 */
      this.$nextTick(async () => {
        this.$refs.editForm.resetFields()
        const {data: {data, meta}} = await this.$http.get(`roles/${role.id}`)
        if (meta.status !== 200) return this.$message.error('获取角色失败')
        this.editForm = data 
      })
    },
    /* 删除 */
    delRoles (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { meta } } = await this.$http.delete(`roles/${id}`)
        if (meta.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        this.getData()
      }).catch(() => { })
    },
    /* 显示添加对话框 */
    showAddDialog () {
      this.addDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    /* 添加操作 */
    addSubmit () {
      /* 整个表单验证 */
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$http.post('roles', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加角色失败')
          this.$message.success('添加角色成功')
          /* 关闭对话框 更新列表数据 */
          this.addDialogFormVisible = false
          this.getData()
        }
      })
    },
    /* 获取数据 */
    async getData () {
      const {data: {data, meta}} = await this.$http.get('roles')
      if (meta.status !== 200) return this.$message.error('获取角色失败')
      /* 数据中有children属性,表格会默认有展开内容 */
      data.forEach(item => {
        item.child = item.children
        delete item.children
        item.child.forEach(item => {
          item.child = item.children
          delete item.children
          item.child.forEach(item => {
            item.child = item.children
            delete item.children
          })
        })
      })
      this.rolesList = data
    }
  }
}