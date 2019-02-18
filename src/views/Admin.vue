<template>
  <div class="root-views">
    <header class="home_header">
      <div class="flex_center">
        <div class="logo"><textHoverEffect :text="text"></textHoverEffect></div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <!--<el-menu-item
              v-for="(item, index) in menu"
              :key="index"
              :index="item.index"
              @click="onselect(item.url)"
          >
            {{item.name}}
          </el-menu-item>-->
          <el-menu-item index="1" @click="onselect('/admin')">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">学生配置</template>
            <el-menu-item index="2-1" @click="onselect('/admin/studentAdmin')">学生管理</el-menu-item>
            <el-menu-item index="2-2" @click="onselect('/admin/studentSet')">学生设备</el-menu-item>
            <el-menu-item index="2-3" @click="onselect('/admin/studentGroup')">学生分组</el-menu-item>
          </el-submenu>
          <el-menu-item index="3" @click="onselect('/admin/checkGrade')">查分数据</el-menu-item>
          <el-menu-item index="4" @click="onselect('/admin/trainRecord')">训练记录</el-menu-item>
        </el-menu>
      </div>
      <div>
        <el-dropdown class='header_user' trigger='click' @command='handleHeader'>
          <span class='el-dropdown-link'>
              admin<!--{{loginName}}-->
              <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot='dropdown'>
            <!--<el-dropdown-item command='user_info'>个人信息</el-dropdown-item>-->
            <el-dropdown-item command='logout'>退出</el-dropdown-item>
            <el-dropdown-item command='logout'>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>

    <router-view class='subviews'></router-view>
  </div>
</template>

<script>
import menu from '@/conf/menu.js'
export default {
  data () {
    return {
      text: 'xxxx中学跑步后台',
      menu: menu,
      activeIndex: '1'
    }
  },
  created () {
    // this.init()
  },
  methods: {
    init () {
      this.$request(this.$api.menus)
        .then((res) => {
          // console.log("res", res);
        })
        .catch(err => new Error(err))
    },
    handleHeader (command) {
      if (command === 'logout') {
        this.$router.push('/');
      }
    },
    handleSelect (url) {
      console.log('url', url)
    },
    onselect (val) {
      console.log('valueval', val);
      this.$router.push({
        path: val
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.home_header
  background-color: rgb(84, 92, 100)
  height 60px
  color #fff
  display flex
  align-item: center
  padding 0 20px
  justify-content: space-between
  .logo
    width 180px
    margin-right 30px
  .header_user
    height 60px
    line-height 60px
    color #fff
.subviews
  box-sizing border-box
  height calc(100% - 70px)
  background-color #f4f4f4

</style>
