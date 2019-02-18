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
      </li>
      <li>
        <el-button type="primary" @click.stop="onAdd">新增</el-button>
      </li>
    </ul>
    <div class="hlx_list">
      <el-table :data="tableData" stripe>
        <el-table-column prop="" label="训练项目"></el-table-column>
        <el-table-column prop="" label="开始时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="结束时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="所属班级" show-overflow-tooltip></el-table-column>
        <el-table-column prop="" label="所属分组" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click.stop="onDetail(scope.row)" class="el-button--table">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination :page-sizes="[15, 30, 50, 100]" :page-size="params.ps" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="total" :current-page="params.pi"></el-pagination>
      </div>
      <!--弹框-->
      <el-dialog title="训练详情" :visible.sync="dialogVisible" width="1000px">
        <el-table :data="tableData" stripe>
          <el-table-column prop="" label="姓名"></el-table-column>
          <el-table-column prop="" label="学籍号"></el-table-column>
          <el-table-column prop="" label="芯片号码"></el-table-column>
          <el-table-column prop="" label="训练项目"></el-table-column>
          <el-table-column prop="" label="训练成绩"></el-table-column>
          <el-table-column prop="" label="得分"></el-table-column>
          <el-table-column prop="" label="开始时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="" label="所属班级" show-overflow-tooltip></el-table-column>
          <el-table-column prop="" label="所属分组" show-overflow-tooltip></el-table-column>
          <el-table-column prop="" label="详细数据" show-overflow-tooltip></el-table-column>
        </el-table>

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
        deviceId: [{required: true, message: "请填写编组名称", trigger: "change"}]
      },
      baseForm: {},
      gradeIds: null,
      classIds: null
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
    }
  },
  asyncComputed: {
    async gradeList () {
      let gradeList = []
      await this.$request(this.$api.home_grade).then(res => {
        gradeList = res.data
      }).catch(err => new Error(err))
      return gradeList
    }
  },
  created () {},
  mounted () {},
  methods: {
    onDel (row) {
      /*const params = {
        id: row.id,
        del: 1
      }
      this.$confirm('确定要下架？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$request(this.$api.delcard, params).then((res) => {
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
      })*/
    },
    onEnsure () {
      this.$refs.baseForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        if (this.baseForm.id) {
          this.$request(this.$api.vip_addOrEditor, this.baseForm).then(res => {
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
        } else {
          this.$request(this.$api.vip_addOrEditor, this.baseForm).then(res => {
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
