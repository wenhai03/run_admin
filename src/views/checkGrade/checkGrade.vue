<template>
  <div>
    <ul class="tool_bar flex_space_around">
      <li class="flex">
        <div class="search-input search-width">
          <svg-icon icon-class="search" class="icon-search"/>
          <el-select placeholder="请选择年级" >
            <el-option>1</el-option>
            <el-option>2</el-option>
            <el-option>3</el-option>
          </el-select>
        </div>
        <div class="search-input search-width">
          <svg-icon icon-class="search" class="icon-search"/>
          <el-select placeholder="请选择班级" >
            <el-option>1</el-option>
            <el-option>2</el-option>
            <el-option>3</el-option>
          </el-select>
        </div>
        <div class="search-input date-width">
          <el-date-picker v-model="params.startTime" type="date" format="yyyy-MM-dd" placeholder="请选择起始日期">
          </el-date-picker> ~
          <el-date-picker v-model="params.endTime" type="date" format="yyyy-MM-dd" placeholder="请选择结束日期">
          </el-date-picker>
        </div>
        <div class="search-input search-width">
          <svg-icon icon-class="search" class="icon-search"/>
          <el-input placeholder="搜索学生姓名" v-model="params.code"></el-input>
        </div>
        <div class="search-input search-width">
          <svg-icon icon-class="search" class="icon-search"/>
          <el-select placeholder="请选择训练项目" >
            <el-option>1</el-option>
            <el-option>2</el-option>
            <el-option>3</el-option>
          </el-select>
        </div>
      </li>
      <li><el-button type="primary" @click.stop="onAdd">导出Excel表格</el-button></li>
    </ul>
    <div class="hlx_list">
      <div class="info">
        <el-row>
          <el-col :span="4">
            <div>
              <img class="pic" src="../../assets/pic.jpg" alt="">
            </div>
          </el-col>
          <el-col :span="18">
            <el-row :gutter="24">
              <el-col :span="6"><detail label="姓名" :description="哈哈哈"></detail></el-col>
              <el-col :span="6"><detail label="性别" :description="男"></detail></el-col>
              <el-col :span="6"><detail label="年级" :description="五年级"></detail></el-col>
              <el-col :span="6"><detail label="班级" :description="一班"></detail></el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="6"><detail label="生日" :description='2000-1-2'></detail></el-col>
              <el-col :span="6"><detail label="年龄" :description="18"></detail></el-col>
              <el-col :span="6"><detail label="学籍号" :description="sdf"></detail></el-col>
              <el-col :span="6"><detail label="电话" :description="12345678998"></detail></el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="charts">
        <p class="title"><span>学生分数报表</span></p>
        <!--图表-->
        <div style="display: flex;
        align-items: center;
        justify-content: center;">
          <lineChart />
          <lineChart2 />
        </div>
      </div>
      <el-table class="el_table_rewrite" :data="tableData" stripe>
        <el-table-column prop="" label="姓名"></el-table-column>
        <el-table-column prop="" label="学号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="芯片号码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="训练项目"></el-table-column>
        <el-table-column prop="" label="训练成绩" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="得分"></el-table-column>
        <el-table-column prop="" label="开始时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="所属班级" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="所属分组" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="详细数据" show-overflow-tooltip></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination :page-sizes="[15, 30, 50, 100]" :page-size="params.ps" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="total" :current-page="params.pi"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {tableMixin} from '@/mixins/mixins'
import lineChart from './components/lineChart'
import lineChart2 from './components/lineChart2'
export default {
  name: '',
  mixins: [tableMixin],
  components: {
    lineChart,
    lineChart2
  },
  data () {
    return {
      params: {},
      tableData: []
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
.el_table_rewrite
  max-height calc(100% - 400px) !important
.info
  margin-bottom 10px
  .pic
    width 80px
    height 80px
.charts
  .title
    color #666
    margin-bottom 20px
    span
      padding-left 8px
      border-left 2px solid #409eff
</style>
