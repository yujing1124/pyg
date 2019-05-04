export default {
  name: 'Categories',
  data () {
    return {
      reqParams: {
        pagenum: 1,
        pagesize: 5
      },
      categories: [],
      total: 0,
      addDialogFormVisible: false,
      addForm: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      },
      /* 添加校验规则 */
      addRules: {
        cat_name: [
          {required: true, message: '分类名称不能为空', trigger: 'blur'}
        ]
      },
      /* 联级相关数据 */
      catgoryList: [],
      catgoryValues: [],
      /* 编辑对话框 */
      editDialogFormVisible: false,
      editForm: {},
      editRules: {
        cat_name: [
          {required: true, message: '分类名称不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    /* 显示编辑的对话框 */
    showEditDialog (id) {
      this.editDialogFormVisible = true
      /* 重置表单 */
      this.$nextTick(async () => {
        this.$refs.editForm.resetFields()
        /* 获取数据 */
        const {data: {data, meta}} = await this.$http.get(`categories/${id}`)
        if (meta.status !== 200) return this.$message.error('获取分类失败')
        /* 填充数据 */
        this.editForm = data 
      })
    },
    /* 编辑提交前校验 */
    editSubmit () {
      this.$refs.editForm.validate(async valid =>{
        if (valid) {
          /* 如果校验成功发送编辑请求 */
          const {data: {meta}} = await this.$http.put(`categories/${this.editForm.cat_id}` ,
            {cat_name: this.editForm.cat_name})
          if (meta.status !== 200) return this.$message.error('编辑分类失败')
          this.$message.success('编辑分类成功')
          this.getData()
          this.editDialogFormVisible = false
        }
      })
    },
    /* 删除数据 */
    delCategory (id) {
      this.$confirm('是否删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { meta } } = await this.$http.delete(`categories/${id}`)
        if (meta.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        this.getData()
      }).catch(() => { })
    },
    /* 添加对话框 */
    addSubmit () {
    /* 提交前做校验 */
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const len = this.catgoryValues.length
          if (len) {
            this.addForm.cat_pid = this.categoryValues[len - 1]
          } else {
            this.addForm.cat_pid = 0
          }
          this.addForm.cat_level = len
          /* 提交 */
          const {data: {meta}} = await this.$http.post('categories', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加分类失败')
          this.$message.success('添加分类成功')
          this.getData()
          this.addDialogFormVisible = false
        }
      })
    },
    /* 显示添加对话框 */
    async showAddDialog () {
      /* 动态渲染 获取数据 */
      const {data: {data, meta}} = await this.$http.get('categories', {
        params: {type: 2}
      })
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      /* 设置下拉选项数据 */
      this.catgoryList = data
      /* 重置级联之前选择的值 */
      this.categoryValues = []
      /* 打开对话框 */
      this.addDialogFormVisible = true
      /* 重置表单 */
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    /* 获取数据信息 */
    async getData () {
      const { data: { data, meta } } = await this.$http.get('categories', { params: this.reqParams })
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      this.categories = data.result   
      /* 列表数据 */
      this.total = data.total
    },
    changePager (newPage) {
    /* 改变页码 */
      this.reqParams.pagenum = newPage
      /* 获取数据 */
      this.getData()
    }
  }
}