export default {
  name: 'Goods',
  data () {   
    return {
      goodsList: [],
      reqParams: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    /* 跳转到添加 */
    toAdd () {
      this.$router.push('/goods/add')
    },
    /* 删除 */
    delGoods (id) {
      this.$confirm('是否删除该参数?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { meta } } = await this.$http.delete(`goods/${id}`)
        if (meta.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        this.getData()
      }).catch(() => { })
    },
    /* 搜索框 */
    search () {
      this.reqParams.pagenum = 1
      this.getData()
    },
    /* 获取数据 */
    async getData () {
      const {data: {data, meta}} = await this.$http.get('goods', {params:
        this.reqParams})
      if (meta.status !== 200) return this.$message.error('获取商品信息失败')
      this.goodsList = data.goods
      this.total = data.total
    },
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      this.getData()
    }
  }
}