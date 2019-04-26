export default {
  name: 'Rights',
  data () {
    return {
      rightList: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const {data: {data, meta}}=await this.$http.get('rights/list')
      if (meta.status !== 200) return this.$message.error('获取用户失败')
      this.rightList = data 
      console.log(data)
    }
  }
}