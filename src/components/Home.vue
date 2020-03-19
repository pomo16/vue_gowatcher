<template>
  <el-container class="home-container">
    <!-- header -->
    <el-header>
      <div>
        <img src="../assets/gowatcher.png" alt="">
        <span>gowatcher</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
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
<!--          <el-submenu index="2">-->
<!--            <template slot="title">-->
<!--              <i class="iconfont icon-baobiao"></i>-->
<!--              <span>任务管理</span>-->
<!--            </template>-->
<!--            &lt;!&ndash; level 2 menu &ndash;&gt;-->
<!--            <el-menu-item index="/task_list">-->
<!--              <template slot="title">-->
<!--                <i class="iconfont icon-baobiao1"></i>-->
<!--                <span>任务列表</span>-->
<!--              </template>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="/task_edit">-->
<!--              <template slot="title">-->
<!--                <i class="iconfont icon-power"></i>-->
<!--                <span>编辑任务</span>-->
<!--              </template>-->
<!--            </el-menu-item>-->
<!--          </el-submenu>-->
        </el-menu>
      </el-aside>
      <!-- body right -->
      <el-main>
        <!-- route placeholder -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapsed: false
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse () {
      this.isCollapsed = !this.isCollapsed
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
