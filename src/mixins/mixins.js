// import dayjs from 'dayjs'
export const tableMixin = {
  data () {
    return {
      tableData: [],
      total: 0,
      dialogVisible: false,
      dialogTitle: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      baseForm: {}
    }
  },
  watch: {
    params (mobile) {
      this.params.mobile = mobile
      let timer
      clearInterval(timer)
      timer = setTimeout(() => {
        this.init()
      }, 500)
    }
  },
  created () {
  },
  methods: {
    handleCurrentChange (val) {
      this.params.ps = val
      this.init()
    },
    handleSizeChange (val) {
      this.params.ps = val
      this.init()
    },
    onEdit (row) {
      this.baseForm = Object.assign({}, row)
      this.dialogTitle = 'update'
      this.dialogVisible = true

      this.$nextTick(() => {
        this.$refs['baseForm'].clearValidate()
      })
    },
    resetBaseForm () {
      this.baseForm = {}
    },
    onAdd () {
      this.resetBaseForm()
      this.dialogTitle = 'create'
      this.dialogVisible = true

      this.$nextTick(() => {
        this.$refs['baseForm'].clearValidate()
      })
    }
  }
}

export const params = {
  watch: {
    'params': {
      handler: function (val, old) {
        let timer
        clearInterval(timer)
        timer = setTimeout(() => {
          this.init()
        }, 500)
      },
      deep: true
    }
  }
}

export const filterTime = {
  watch: {
    'filterTime': {
      handler: function (v) {
        if (v === '0') {
          this.$utils.today(this.params)
        } else if (v === '1') {
          this.$utils.week(this.params)
        } else if (v === '2') {
          this.$utils.month(this.params)
        } else if (v === '3') {
          this.$utils.year(this.params)
        }
        this.init()
      },
      deep: true
    }
  }
}
