<template>
  <div>
    <ul class="tool_bar flex_space_around">
      <li class="flex">
        <div class="search-input search-width">
          <svg-icon icon-class="search" class="icon-search"/>
          <el-select v-model="gradeIds" placeholder="请选择年级" >
            <el-option
                v-for="item in gradeList"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
            </el-option>
          </el-select>
        </div>
        <div class="search-input search-width">
          <svg-icon icon-class="search" class="icon-search"/>
          <el-select v-model="classIds" placeholder="请选择班级" >
            <el-option
                v-for="item in classList"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
            </el-option>
          </el-select>
        </div>
        <div class="search-input date-width">
          <el-date-picker v-model="params.sdt" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择起始日期">
          </el-date-picker> ~
          <el-date-picker v-model="params.edt" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择结束日期">
          </el-date-picker>
        </div>
        <div class="search-input search-width">
          <svg-icon icon-class="search" class="icon-search"/>
          <el-select v-model="testIds" placeholder="请选择训练项目" >
            <el-option
                v-for="item in testList"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
            </el-option>
          </el-select>
        </div>
        <div class="search-input search-width">
          <svg-icon icon-class="search" class="icon-search"/>
          <el-select v-model="groupIds" placeholder="请选择分组" >
            <el-option
                v-for="item in groupList"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
            </el-option>
          </el-select>
        </div>
        <div class="search-input search-width">
          <svg-icon icon-class="search" class="icon-search"/>
          <el-select v-model="stuIds" placeholder="请选择学生" >
            <el-option
                v-for="item in studentList"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
            </el-option>
          </el-select>
        </div>
      </li>
      <li><el-button type="primary" @click.stop="onExcel">导出Excel表格</el-button></li>
    </ul>
    <div class="hlx_list">
      <el-table :data="tableData" id="Table" stripe>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="number" label="学籍号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="number2" label="芯片号码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="project" label="训练项目"></el-table-column>
        <el-table-column prop="grade" label="训练成绩" show-overflow-tooltip></el-table-column>
        <el-table-column prop="score" label="得分"></el-table-column>
        <el-table-column prop="start" label="开始时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="room" label="所属班级" show-overflow-tooltip></el-table-column>
        <el-table-column prop="group" label="所属分组" show-overflow-tooltip></el-table-column>
        <el-table-column prop="data" label="详细数据" show-overflow-tooltip></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination :page-sizes="[15, 30, 50, 100]" :page-size="params.ps" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="total" :current-page="params.pi"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import {tableMixin} from '@/mixins/mixins'
export default {
  name: '',
  mixins: [tableMixin],
  components: {},
  data () {
    return {
      params: {
        "sdt": dayjs().format('YYYY-MM-DD'),
        "edt": dayjs().format('YYYY-MM-DD'),
        "testIds": [],
        "groupIds": [],
        "stuIds": [],
        "pi": 1,
        "ps": 15
      },
      tableData: [
        {name: '哈哈哈', number: '23', number2: '00', project: '项目一', grade: '100', score: '10', start: '2018-11-13', room: '六年一班', group: '一班', data: '暂无'}
      ],
      classList: [],
      groupList: [],
      studentList: [],
      gradeIds: null,
      classIds: [],
      testIds: [],
      groupIds: [],
      stuIds: []
    }
  },
  watch: {
    gradeIds: {
      handler (newVal) {
        if (newVal) {
          this.classIds = null
          this.$request(this.$api.home_classes, {gradeId: newVal}).then(res => {
            this.classList = res.data || []

            this.init()
          }).catch(err => new Error(err))
        } else {
          return []
        }
      },
      deep: true
    },
    testIds: {
      handler (newVal) {
        if (newVal) {
          this.$request(this.$api.home_groups, {classId: newVal}).then(res => {
            this.groupList = res.data || []
          }).catch(err => new Error(err))

          this.$request(this.$api.home_students, {classId: newVal}).then(res => {
            this.studentList = res.data || []
          }).catch(err => new Error(err))
        } else {
          return []
        }
      },
      deep: true
    },
    stuIds: {
      handler (newVal) {
        this.stuIds = newVal
        this.init()
      },
      deep: true
    }
  },
  asyncComputed: {
    async gradeList () {
      let gradeList = []
      await this.$request(this.$api.home_grade).then(res => {
        gradeList = res.data
      }).catch(err => new Error(err))
      return gradeList
    },
    async testList () {
      let testList = []
      await this.$request(this.$api.home_trainProject).then(res => {
        testList = res.data
      }).catch(err => new Error(err))
      return testList
    }
  },
  created () {
    if (this.groupIds && this.testIds && this.stuIds) {
      this.$message({
        duration: 2000,
        message: '请选择相关信息后查询！',
        type: 'warning'
      })
    }
  },
  mounted () {},
  methods: {
    init () {
      if (this.groupIds && this.testIds && this.stuIds) {
        this.params.groupIds.push(this.groupIds)
        this.params.testIds.push(this.testIds)
        this.params.stuIds.push(this.stuIds)
        this.$request(this.$api.home_list, this.params).then((res) => {
          if (!res.data.data) {
            this.$message({
              duration: 1200,
              message: `暂无数据`,
              type: 'warning'
            })
          }
          this.tableData = res.data
          console.log("this.tableData = res.data", res.data);
        }).catch((err) => console.log(err))
      }
    },
    onExcel () {
      console.log('this.tableData', this.tableData)
      if (!this.tableData.length) {
        this.$message({
          duration: 1500,
          message: `暂无Excel表格数据！`,
          type: 'warning'
        })
        return false;
      }
      let wb = XLSX.utils.table_to_book(document.querySelector('#Table'))
      let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
      try {
        FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), 'excel数据.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
