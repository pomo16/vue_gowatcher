<template>
  <el-container class="home-container" ref="homePage">
    <!-- header -->
    <el-header>
      <div>
        <img src="../assets/gowatcher.png" alt="">
        <span>gowatcher</span>
      </div>
      <el-button type="info" @click="showDialog">退出</el-button>
    </el-header>
    <!-- body -->
    <el-container>
      <!-- body left -->
      <el-aside :width="isCollapsed ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">&lt;&lt;&lt;</div>
        <!-- menu -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#469EFF"
          unique-opened
          :collapse="isCollapsed"
          :collapse-transition="false"
          router
          :default-active="$route.path">
          <!-- level 1 menu -->
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-baobiao"></i>
              <span>情感分析</span>
            </template>
            <!-- level 2 menu -->
            <el-menu-item index="/dashboard">
              <template slot="title">
                <i class="iconfont icon-baobiao1"></i>
                <span>综合看板</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/ability">
              <template slot="title">
                <i class="iconfont icon-power"></i>
                <span>能力体验</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- level 1 menu -->
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-shezhi"></i>
              <span>任务管理</span>
            </template>
            <!-- level 2 menu -->
            <el-menu-item index="/task">
              <template slot="title">
                <i class="iconfont icon-liebiao"></i>
                <span>任务列表</span>
              </template>
            </el-menu-item>
<!--            <el-menu-item index="/task_edit">-->
<!--              <template slot="title">-->
<!--                <i class="iconfont icon-power"></i>-->
<!--                <span>编辑任务</span>-->
<!--              </template>-->
<!--            </el-menu-item>-->
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- body right -->
      <el-main ref="body">
        <!-- route placeholder -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- dialog -->
    <el-dialog
      title="退出登录"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定退出登录吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="logout">退 出</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapsed: false,
      clientHeight: '',
      dialogVisible: false
    }
  },
  mounted () {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`
    window.onresize = function temp () {
      this.clientHeight = `${document.documentElement.clientHeight}`
    }
  },
  watch: {
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    }
  },
  methods: {
    async logout () {
      await this.$http.get('/monitor/logout')
      window.localStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse () {
      this.isCollapsed = !this.isCollapsed
    },
    changeFixed (clientHeight) {
      this.$refs.homePage.$el.style.height = clientHeight
      this.$refs.body.$el.style.height = clientHeight - 60 + 'px'
    },
    showDialog () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
  .iconfont {
    margin-right: 10px;
  }
  .toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
