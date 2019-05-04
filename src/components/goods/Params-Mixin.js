export default {
  name: 'Params',
  data () {
    return {
    /* 级联相关的数据 */
      categroyList: [],
      categroyValues: [],
      /* tabs切换的相关数据 */
      activeName: 'many',
      /* 控制按钮的禁用状态 */
      disabled: true,
      /* 动态参数列表 */
      manyAttrs: [],
      /* 静态参数列表 */
      onlyAttrs: [],
      addDialogFormVisible: false,
      addForm: {
        attr_name: ''
      },
      addRules: {
        attr_name: [
          {required: true, message: '活动名称不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    id: function () {
      // 为了严谨  程序更加健壮
      if (this.categoryValues.length === 3) {
        return this.categoryValues[2]
      } else {
        return null
      }
    }
  },
  methods: {
    /* 隐藏input事件 */
    hideInput (row) {
      row.inputShow = false
      if (row.inputValue) {
        row.attr_vals.push(row.inputValue)
        this.editAttr(row)
        row.inputValue = ''
      }
    },
    /* 显示input事件 */
    showInput (row) {
      row.inputShow = true
      console.log(this.$refs['input' + row.attr_id])
      this.$nextTick(() => {
        this.$refs['input' + row.attr_id].focus()
      })
    },
    /* tag关闭事件 */
    delTag (row, i) {
      row.attr_vals.splice(i, 1)
      this.editAttr(row)
    },
    async editAttr (row) {
      const {data: {meta}} = await this.$http.put(`categories/${this.id}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        attr_sel: this.activeName,
        attr_vals: row.attr_vals.join(',')
      })
      if (meta.status !== 200) return this.$message.error('更新参数值失败')
      this.$message.success('更新参数值成功')
    },
    /* 删除参数 */
    delParams (attrId) {
      this.$confirm('是否删除该参数?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const id = this.categroyValues[2]
        const { data: { meta } } = await this.$http.delete(`categories/${id}/attributes/${attrId}`)
        if (meta.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        this.getParams()
      }).catch(() => { })
    },
    /* 显示对话框 */
    showAddDialog () {
      this.addDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    addSubmit () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const id = this.categroyValues[2]
          const {data:{meta}} = await this.$http.post(`categories/${id}/attributes`, {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName})
          if (meta.status !== 201) return this.$message.error('添加参数失败')
          this.$message.success('添加参数成功')
          this.getParams()
          this.addDialogFormVisible = false
        }
      })
    },
    handleChange () {
      this.getParams()
    },
    handleClick () {
      this.getParams()
    },
    /* 获取数据 */
    async getData () {
      const {data: {data, meta}} = await this.$http.get('categories')
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      this.categroyList = data
    },
    async getParams () {
      /* 获取参数列表 */
      const len = this.categroyValues.length
      if (len === 3) {
        /* 如果是三级则发送请求获取数据 */
        const id = this.categroyValues[len - 1]
        /* 发送请求 */
        const {data: {data, meta}} = await this.$http.get(`categories/${id}/attributes`, {
          params: {sel: this.activeName} 
        })
        if (meta.status !== 200) return this.$message.error('获取参数数据失败')
        if (this.activeName === 'many') {
          data.forEach(item => {
            item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
            item.inputShow = false
            item.inputValue = ''
          })
        }
        this[`${this.activeName}Attrs`] = data
        this.disabled = false
      } else {
        /* 如果不是三级则清空当前不符合要求的选择 */
        this.categroyValues = []
        this.disabled = true 
      }
    }
  }
}