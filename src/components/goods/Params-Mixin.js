export default {
  name: 'Params',
  data () {
    return {
    /* 级联相关的数据 */
      categroyList: [],
      categroyValues: [],
      /* tabs切换的相关数据 */
      activeName: 'many',
      disabled: true
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    handleChange () {
    },
    async getData () {
      const {data: {data, meta}} = await this.$http.get('categories')
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      this.categroyList = data
    }
  }
}