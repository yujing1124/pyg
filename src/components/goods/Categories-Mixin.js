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
      catgoryValues: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    handleChange () {
    },
    addSubmit () {
    /* 提交前做校验 */
    /*  this.$refs.addForm.validata(async valid => {
        if (valid) {
          const len = this.catgoryValues.length
          if (len) {
            this.addForm.cat_pid = this.categoryValues[len - 1]
          } else {
            this.addForm.cat_pid = 0
          }
          this.addForm.cat_level = len
        }
      }) */
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
    },
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