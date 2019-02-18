<template>
  <div class="importExcel">
    <el-dialog title="导入excel" :visible.sync="dialogVisible" custom-class="el-dialog-two">
      <el-upload
          class="upload-demo"
          accept=".xls"
          drag
          action=""
          multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em> <br><span class="tip">只能上传xls文件，且不超过2M</span></div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary"  @click="onUpload">上 传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      dialogVisible: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    onClose () {},
    onUpload () {}
  }
}
</script>

<style lang="stylus" scoped>
.el-upload__text
  font-size 14px
.tip
  text-align center
  font-size 12px
  color rgb(153, 153, 153)
  line-height 30px
</style>
