export default {
  name: 'Goods-Add',
  data () { 
    return {
      active: 0,
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      rules: {
        goods_name: [
          {required: true, message: '商品名称不能为空', trigger: 'blur'}
        ],
        goods_cat: [
          {required: true, message: '分类必须是第三级', trigger: 'change'}
        ],
        goods_price: [
          {required: true, message: '商品价格不能为空', trigger: 'blur'}
        ],
        goods_number: [
          {required: true, message: '商品数量不能为空', trigger: 'blur'}
        ],
        goods_weight: [
          {required: true, message: '商品重量不能为空', trigger: 'blur'}
        ]
      },
      /* 级联相关的数据 */
      categoryList: [],
      categoryValues: [],
      /* 参数列表的数据 */
      manyAttrs: [],
      onlyAttrs: [],
      /* 上传图片 */
      dialogImageUrl: '',
      dialogVisible: false,
      action: this.$http.defaults.baseURL + 'upload/',
      headers: {
        Authorization: sessionStorage.getItem('token')
      }  
    }  
  },
  watch: {
    categoryValues (now, old) {
      if (now.length === 3) {
        this.form.goods_cat = now.join(',')
      } else {
        this.form.goods_cat = ''
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async addSubmit () {
      /* 合并动态静态参数 */
      this.form.attrs = [...this.manyAttrs, ...this.onlyAttrs]
      /* 发送请求 */
      const {data: {meta}} = await this.$http.post('goods', this.form)
      if (meta.status !== 201) return this.$message.error('商品录入失败')
      this.$message.success('商品录入成功') 
      /* 去列表页 */
      this.$router.push('/goods')   
    },
    handleSuccess (res) {
      // 图片地址？  在上传成功后获取响应数据   才有图片地址
      this.form.pics.push({pic: res.data.tmp_path})
    },
    /* 上传图片 */
    handleRemove (file, fileList) {
      /* console.log(file, fileList) */
      const tmpPath = file.response.data.tmp_path
      const index = this.form.pics.findIndex(item => item.pic === tmpPath)
      this.form.pics.splice(index, 1)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    /* 对整个表单进行校验 */
    changeTabBefore (activeName, oldActiveName) {
      console.log(activeName, oldActiveName)
      if (oldActiveName === '0') {
        return new Promise((resolve, reject) => {
          this.$refs.form.validate(valid => {
            if (valid) {
              this.active = +activeName
              /* 获取第二个和第三个选项卡的数据 */
              this.getParams('many')
              this.getParams('only')
              resolve()
            } else {
              reject(new Error('校验表单失败'))
            }
          })
        })
      } else {
        this.active = +activeName
      }
    },
    async getParams (type) {
      const id = this.categoryValues[2]
      const {data: {data, meta}} = await this.$http.get(`categories/${id}/attributes`, {
        params: {sel: type}
      })  
      if (meta.status !== 200) return this.$message.error('获取参数数据失败')  
      this[type + 'Attrs'] = data
    },
    /* 获取三级分类数据 */
    async getData () {
      const {data: {data, meta}} = await this.$http.get('categories')

      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      this.categoryList = data
    },
    handleChange () {
    }
  }
}