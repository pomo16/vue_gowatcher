<template>
    <div>
        <!-- navigation -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>任务管理</el-breadcrumb-item>
            <el-breadcrumb-item>任务列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- task table -->
        <el-card>
            <el-table :data="task_list">
                <el-table-column label="任务ID" prop="task_id"></el-table-column>
                <el-table-column label="应用ID" prop="app_id"></el-table-column>
                <el-table-column label="应用名称" prop="app_name"></el-table-column>
                <el-table-column label="运行状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 1"><el-tag type="success" size="mini"
                                                                          effect="light">运行中</el-tag></span>
                        <span v-if="scope.row.status === 2"><el-tag type="danger" size="mini" effect="light">未运行</el-tag></span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="create_time"></el-table-column>
                <el-table-column label="修改时间" prop="modify_time"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      queryListInfo: {
        q_type: 2
      },
      task_list: []
    }
  },
  created () {
    this.getTaskList()
  },
  methods: {
    async getTaskList () {
      const { data: res } = await this.$http.get('/monitor/crawl/list', { params: this.queryListInfo })
      console.log(res)
      if (res.message !== 'success') {
        return this.$message.error('列表数据获取失败！')
      }
      this.task_list = res.data.task_list
    }
  }
}
</script>

<style lang="less" scoped>
    .el-card {
        margin-top: 20px;
    }
</style>
