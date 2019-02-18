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
        <div class="search-input search-width">
          <svg-icon icon-class="search" class="icon-search"/>
          <el-input placeholder="搜索学生姓名"></el-input>
        </div>
      </li>
      <li>
        <el-button type="primary" @click.stop="onImport">导入学生</el-button>
        <el-button type="primary" @click.stop="onDown">下载学生模板</el-button>
        <el-button type="primary" @click.stop="onAdd">新增</el-button>
      </li>
    </ul>
    <div class="hlx_list">
      <el-table :data="tableData" stripe>
        <el-table-column prop="" label="学生"></el-table-column>
        <el-table-column prop="" label="性别" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="学籍号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="所属班级" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="绑定时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click.stop="onEdit(scope.row)" class="el-button--table">编辑</el-button>
            <el-button @click.stop="onDel(scope.row)" class="el-button--table">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination :page-sizes="[15, 30, 50, 100]" :page-size="params.ps" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="total" :current-page="params.pi"></el-pagination>
      </div>
      <!--弹框-->
      <el-dialog :title="textMap[dialogTitle]" :visible.sync="dialogVisible" width="500px">
        <el-form :model="baseForm" ref="baseForm" :rules="baseFormRules" label-position="right" label-width="100px">
          <el-row :gutter="24">
            <el-col :span="20">
              <el-form-item label="学籍号" prop="stuNo">
                <el-input v-model="baseForm.number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="20">
              <el-form-item label="学生" prop="stuName">
                <el-input v-model.trim="baseForm.stuName" style="width: 80px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="20">
              <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="baseForm.gender">
                  <el-radio label="0">女</el-radio>
                  <el-radio label="1">男</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="所属班级" prop="classId">
                <el-col :span="12">
                  <el-select placeholder="请选择年级" >
                    <!--<el-option
                        v-for="item in testList"
                        :key="item.uuid"
                        :label="item.name"
                        :value="item.uuid">
                    </el-option>-->
                    <el-option>1</el-option>
                    <el-option>2</el-option>
                    <el-option>3</el-option>
                  </el-select>
                </el-col>
                <el-col :span="12">
                  <el-select placeholder="请选择班级" >
                    <!--<el-option
                        v-for="item in testList"
                        :key="item.uuid"
                        :label="item.name"
                        :value="item.uuid">
                    </el-option>-->
                    <el-option>1</el-option>
                    <el-option>2</el-option>
                    <el-option>3</el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="default" @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="onEnsure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {tableMixin} from '@/mixins/mixins'
export default {
  name: '',
  mixins: [tableMixin],
  components: {},
  data () {
    return {
      params: {},
      tableData: [],
      total: 0,
      dialogTitle: '',
      baseFormRules: {
        stuNo: [{required: true, message: "请填写学籍号", trigger: "change"}],
        stuName: [{required: true, message: "请填写姓名", trigger: "change"}],
        gender: [{required: true, message: "请选择性别", trigger: "change"}],
        classId: [{required: true, message: "请选择班级", trigger: "change"}]
      },
      baseForm: {},
      gradeIds: null,
      classIds: null,
      gradeList: [],
      classList: []
    }
  },
  watch: {
    gradeIds: {
      async handler (newVal) {
        this.classIds = null
        await this.$request(this.$api.home_grade).then(res => {
          this.gradeList = res.data
          return newVal
        }).then((res) => {
          if (res) {
            this.$request(this.$api.home_classes, {gradeId: newVal}).then(res => {
              this.classList = res.data || []
            })
          }
        }).catch((err) => console.log(err))
      },
      deep: true,
      immediate: true
    },
    classIds: {
      handler (newVal) {
        if (newVal) {
          this.init()
        }
      },
      deep: true
    }
  },
  created () {
    if (!this.classIds) {
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
      const classId = this.classIds
      this.$request(this.$api.home_students, {classId}).then((res) => {
        if (res.code === 0) {
          this.init()
          this.$message({
            type: 'success',
            message: '操作成功',
            duration: 800
          }).catch(err => {
            console.log('err', err)
          })
        } else if (!res.data.data) {
          this.$message({
            duration: 1000,
            message: '暂无数据',
            type: 'warning'
          })
        }
      })
    },
    onDown () {},
    onImport () {
      // console.log('this.$toast', this.$toast)
      this.$importExcel()
    },
    onDel (row) {
      const params = {
        stuId: row.stuId
      }
      this.$confirm('确定要删除？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$request(this.$api.stu_admin_del, params).then((res) => {
          if (res.code === '0') {
            this.init()
            this.$message({
              type: 'success',
              message: '操作成功',
              duration: 800
            })
          }
        })
      }).catch(err => {
        console.log('err', err)
      })
    },
    onEnsure () {
      this.$refs.baseForm.validate((valid) => {
        if (!valid) {
          return false;
        }

        if (this.baseForm.stuId) { // 编辑
          this.$request(this.$api.stu_admin_editor, this.baseForm).then(res => {
            if (res.code === '0') {
              this.$message({
                type: 'success',
                message: '操作成功!',
                duration: 800
              })
              this.init()
              this.dialogVisible = false
            }
          })
        } else { // 新增
          this.$request(this.$api.stu_admin_add, this.baseForm).then(res => {
            if (res.code === '0') {
              this.$message({
                type: 'success',
                message: '操作成功!',
                duration: 800
              })
              this.init()
              this.dialogVisible = false
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
