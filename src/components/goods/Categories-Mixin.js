export default {
    name: 'Categories',
    data() {
        return {
            reqParams: {
                pagenum: 1,
                pagesize: 5
            },
            categories: [],
            total: 0,
            addDialogFormVisible : false,
            addForm: {
                cat_pid : 0,
                cat_name : '',
                cat_level : 0
            }
        }
    },
    mounted () {
        this. getData ()
    },
    methods: {
        //显示添加对话框
        showAddDialog () {
            addDialogFormVisible :false
        },
        async getData () {
            const { data: { data, meta } } = await this.$http.get('categories', { params: this.reqParams })
            if (meta.status !== 200) return this.$message.error("获取分类数据失败")
            this.categories = data.result   //列表数据
            this.total = data.total
        },
        changePager (newPage) {
        //改变页码
            this.reqParams.pagenum = newPage
            //获取数据
            this.getData()
        } 
    }
}