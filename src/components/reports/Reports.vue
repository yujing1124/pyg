<template>
<div class="report_containter">
  <!-- 导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">数据统计</a></el-breadcrumb-item>
  <el-breadcrumb-item>数据报表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <div ref="box"  class="box"></div>
  </el-card>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'Reports',
    data () {
      return {
        options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
      }
    },
    mounted () {
      /* 实例化 */
     /*  const dom = this.$refs.box
      const myEcharts = echarts.init(dom) */
      /* options需要去后台获取数据 */
      // 指定图表的配置项和数据  
     /*  myEcharts.setOption(this.options) */
     this.getData()
    },
    methods: {
      async getData () {
        const {data: {data,meta}} = await this.$http.get('reports/type/1')
        if (meta.status !== 200) return this.$message.error('获取报表数据失败')
        
        const myEcharts = echarts.init(this.$refs.box)
        const options = {...this.options, ...data}
        myEcharts.setOption(options)
      }
    }
}
</script>

<style scoped>
.box{
  height: 450px;
  width: 600px;
}
</style>