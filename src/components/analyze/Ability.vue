<template>
  <div>
    <!-- navigation -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>情感分析</el-breadcrumb-item>
      <el-breadcrumb-item>能力体验</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- input -->
    <el-card>
      <div class="title">文本输入</div>
      <el-input
        type="text"
        placeholder="请输入您想尝试的文本~~~"
        v-model="text"
        maxlength="30"
        show-word-limit>
      </el-input>
      <el-button type="primary" @click="analyze">情感分析</el-button>
    </el-card>
    <!-- result -->
    <el-card class="input-card">
      <div class="title">分析结果</div>
      <template>
        <!-- table -->
        <el-table :data="analyzeResult" style="width: 100%">
          <el-table-column prop="content" label="文本内容" width="600">
          </el-table-column>
          <el-table-column prop="polarity" label="情感标签">
            <template slot-scope="scope">
              <span v-if="scope.row.polarity === 'pos'"><el-tag type="success" size="mini" effect="light">positive</el-tag></span>
              <span v-if="scope.row.polarity === 'net'"><el-tag type="warning" size="mini" effect="light">neutral</el-tag></span>
              <span v-if="scope.row.polarity === 'neg'"><el-tag type="danger" size="mini" effect="light">negative</el-tag></span>
            </template>
          </el-table-column>
          <el-table-column prop="score" label="情感分数">
          </el-table-column>
        </el-table>
        <!-- gauge -->
        <div id="main" class="echarts-div"></div>
      </template>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      queryAnalyzeInfo: {
        content: ''
      },
      text: '',
      analyzeResult: [{
        content: '',
        score: 0,
        polarity: ''
      }],
      option: {
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '情感分数',
            type: 'gauge',
            detail: { formatter: 0 },
            data: [{ value: 0 }],
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                show: true,
                color: [[0.2, '#f4516c'], [0.8, '#f5bb89'], [1, '#40c9c6']]
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }
        ]
      },
      myChart: {}
    }
  },
  async mounted () {
    this.init()
  },
  methods: {
    init () {
      this.myChart = echarts.init(document.getElementById('main'))
      this.myChart.setOption(this.option)
    },
    async analyze () {
      this.queryAnalyzeInfo.content = this.text
      const { data: res } = await this.$http.get('/monitor/analyze/polarity', { params: this.queryAnalyzeInfo })
      if (res.message !== 'success') {
        return this.$message.error('不能分析空文本哦！')
      }
      this.analyzeResult = [res.data]
      this.option.series[0].detail.formatter = this.analyzeResult[0].score
      this.option.series[0].data[0].value = this.analyzeResult[0].score * 100
      this.myChart.setOption(this.option, true)
    }
  }
}
</script>

<style lang="less" scoped>
  .el-card {
    margin-top: 20px;
  }
  .el-input {
    width: 600px;
  }
  .el-table {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .title {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 20px;
    margin-bottom: 12px;
  }
  .el-button {
    margin-left: 20px;
  }
  .echarts-div {
    width: 100%;
    height: 300px;
  }
</style>
