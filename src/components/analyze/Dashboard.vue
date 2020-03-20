<template>
  <div>
    <!-- navigation -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>情感分析</el-breadcrumb-item>
      <el-breadcrumb-item>综合看板</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- data cards -->
    <div class="panel-group el-row">
      <el-row :gutter="40" class="panel-group" type="flex" justify="center">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-total">
              <span class="iconfont icon-tongji card-panel-icon"></span>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                7天总声量
              </div>
              <div class="card-panel-num">{{totalCount}}</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-pos">
              <span class="iconfont icon-kaixin card-panel-icon"></span>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                7天乐观声量
              </div>
              <div class="card-panel-num">{{posCount}}</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-net">
              <span class="iconfont icon-normal-l card-panel-icon"></span>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                7天中性声量
              </div>
              <div class="card-panel-num">{{netCount}}</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-neg">
              <span class="iconfont icon-bukaixin card-panel-icon"></span>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                7天消极声量
              </div>
              <div class="card-panel-num">{{negCount}}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- histogram -->
    <el-card class="echarts-card">
      <div id="main" class="echarts-div"></div>
    </el-card>
    <!-- comment table -->
    <el-card>
      <el-table :data="comment_list">
        <el-table-column label="评论时间" prop="publish_time"></el-table-column>
        <el-table-column label="内容" prop="content"></el-table-column>
        <el-table-column label="评分" width="170px">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.rating"
              disabled
              text-color="#ff9900">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column label="应用" prop="app_name"></el-table-column>
        <el-table-column label="情感">
          <template slot-scope="scope">
            <span v-if="scope.row.polarity === 'pos'"><el-tag type="success" size="mini"
                                                              effect="light">positive</el-tag></span>
            <span v-if="scope.row.polarity === 'net'"><el-tag type="warning" size="mini"
                                                              effect="light">neutral</el-tag></span>
            <span v-if="scope.row.polarity === 'neg'"><el-tag type="danger" size="mini" effect="light">negative</el-tag></span>
          </template>
        </el-table-column>
        <el-table-column label="情感分数" prop="score"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showDialog(scope.row)">评论详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- pagination -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryListInfo.offset / queryListInfo.limit + 1"
        :page-sizes="[5, 10, 20]"
        :page-size="queryListInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- dialog -->
    <el-dialog
      title="评论详情"
      :visible.sync="dialogVisible"
      width="30%">
      <div class="item">
        <div class="item-title">评论ID</div>
        <div class="item-content">{{comment.comment_id}}</div>
      </div>
      <div class="item">
        <div class="item-title">存储ID</div>
        <div class="item-content">{{comment.main_id}}</div>
      </div>
      <div class="item">
        <div class="item-title">应用名称</div>
        <div class="item-content">{{comment.app_name}}</div>
      </div>
      <div class="item">
        <div class="item-title">评论标题</div>
        <div class="item-content">{{comment.title}}</div>
      </div>
      <div class="item">
        <div class="item-title">评论内容</div>
        <div class="item-content">{{comment.content}}</div>
      </div>
      <div class="item">
        <div class="item-title">评分</div>
        <div class="item-content">
          <el-rate
            v-model="comment.rating"
            disabled
            show-score
            text-color="#ff9900">
          </el-rate>
        </div>
      </div>
      <div class="item">
        <div class="item-title">情感标签</div>
        <div class="item-content" v-if="comment.polarity === 'pos'">
          <el-tag type="success" size="mini" effect="light">positive</el-tag>
        </div>
        <div class="item-content" v-if="comment.polarity === 'net'">
          <el-tag type="warning" size="mini" effect="light">neutral</el-tag>
        </div>
        <div class="item-content" v-if="comment.polarity === 'neg'">
          <el-tag type="danger" size="mini" effect="light">negative</el-tag>
        </div>
      </div>
      <div class="item">
        <div class="item-title">情感分数</div>
        <div class="item-content">{{comment.score}}</div>
      </div>
      <div class="item">
        <div class="item-title">应用版本</div>
        <div class="item-content">{{comment.version}}</div>
      </div>
      <div class="item">
        <div class="item-title">爬取时间</div>
        <div class="item-content">{{comment.crawl_time}}</div>
      </div>
      <div class="item">
        <div class="item-title">评论时间</div>
        <div class="item-content">{{comment.publish_time}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      queryCountInfo: {
        begin_time: '',
        end_time: '',
        polarity: ''
      },
      queryListInfo: {
        begin_time: '',
        end_time: '',
        q_type: 2,
        limit: 10,
        offset: 0
      },
      queryHistogramInfo: {
        begin_time: '',
        end_time: '',
        polarity: ''
      },
      totalCount: 0,
      posCount: 0,
      netCount: 0,
      negCount: 0,
      comment_list: [],
      comment: {},
      total: 0,
      dialogVisible: false
    }
  },
  created () {
    this.getTimeStamp()
    this.getCounts()
    this.getCommentList()
  },
  async mounted () {
    const myChart = echarts.init(document.getElementById('main'))

    const totalVote = await this.getHistogramHelper('')
    const posVote = await this.getHistogramHelper('pos')
    const netVote = await this.getHistogramHelper('net')
    const negVote = await this.getHistogramHelper('neg')

    const option = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['积极声量', '中性声量', '消极声量']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
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
          type: 'category',
          boundaryGap: false,
          data: totalVote.times
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '积极声量',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: posVote.counts
        },
        {
          name: '中性声量',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: netVote.counts
        },
        {
          name: '消极声量',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: negVote.counts
        }
      ]
    }

    myChart.setOption(option)
  },
  methods: {
    getTimeStamp () {
      const date = new Date()
      const timeStamp = Date.parse(date.toDateString()).toString().substr(0, 10)
      this.queryCountInfo.begin_time = timeStamp - 3600 * 24 * 7
      this.queryCountInfo.end_time = timeStamp
      this.queryListInfo.begin_time = timeStamp - 3600 * 24 * 7
      this.queryListInfo.end_time = timeStamp
      this.queryHistogramInfo.begin_time = timeStamp - 3600 * 24 * 7
      this.queryHistogramInfo.end_time = timeStamp
    },
    async getCountsHelper (polarity) {
      this.queryCountInfo.polarity = polarity
      const { data: res } = await this.$http.get('/monitor/comment/count', { params: this.queryCountInfo })
      if (res.message !== 'success') {
        return this.$message.error('计数数据获取失败！')
      }
      return res.data.count
    },
    async getCounts () {
      this.totalCount = await this.getCountsHelper('')
      this.posCount = await this.getCountsHelper('pos')
      this.netCount = await this.getCountsHelper('net')
      this.negCount = await this.getCountsHelper('neg')
    },
    async getCommentList () {
      const { data: res } = await this.$http.get('/monitor/comment/list', { params: this.queryListInfo })
      if (res.message !== 'success') {
        return this.$message.error('列表数据获取失败！')
      }
      this.comment_list = res.data.comment_list
      this.total = await this.getCountsHelper('')
    },
    // watching size
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryListInfo.limit = newSize
      this.getCommentList()
    },
    // watching page
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryListInfo.offset = (newPage - 1) * this.queryListInfo.limit
      this.getCommentList()
    },
    showDialog (data) {
      this.dialogVisible = true
      this.comment = data
    },
    async getHistogramHelper (polarity) {
      this.queryHistogramInfo.polarity = polarity
      const { data: res } = await this.$http.get('/monitor/comment/histogram', { params: this.queryHistogramInfo })
      if (res.message !== 'success') {
        return this.$message.error('直方图数据获取失败！')
      }
      return { counts: res.data.counts, times: res.data.times }
    }
  }
}
</script>

<style lang="less" scoped>
  .dashboard-container {
    padding: 32px;
    position: relative;
  }

  .echarts-card {
    margin-bottom: 30px;
  }

  .echarts-div {
    width: 100%;
    height: 400px;
  }

  .el-table {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .item {
    margin-bottom: 18px;
  }

  .item-title {
    display: flex;
    float: left;
    width: 100px;
    font-weight: bold;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
  }

  .item-content {
    display: flex;
  }

  .panel-group {
    margin-top: 12px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-total {
          background: #36a3f7;
        }

        .icon-pos {
          background: #40c9c6;
        }

        .icon-net {
          background: #f5bb89;
        }

        .icon-neg {
          background: #f4516c;
        }
      }

      .icon-total {
        color: #36a3f7;
      }

      .icon-pos {
        color: #40c9c6;
      }

      .icon-net {
        color: #f5bb89;
      }

      .icon-neg {
        color: #f4516c;
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px 26px 26px 0px;
        text-align: right;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
