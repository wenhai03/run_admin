export const listMixin = {
  data: function () {
    return {
      filter: {
        keyword: this.$route.query.keyword || ""
      },
      pageSize: this.params.pi || 15,
      pageNo: this.params.ps || 1,
      screenHeight: document.body.clientHeight
    };
  },
  watch: {
    pageNo (val) {
      const param = { pageNo: val };
      paramsRecord(param);
    },
    filter: {
      deep: true,
      handler (newVal, oldVal) {
      }
    },
    "filter.keyword" (val, oldVal) {
      this.reloadData();
    }
  },
  computed: {},
  methods: {
    handleSizeChange: function (val) {
      this.$cache.cacheSet("pageSize", val);
      this.pageSize = val;
      this.reloadData();
    },
    handleCurrentChange: function (index) {
      this.pageNo = index;
      this.refreshData();
    }
  },
  // 生命周期函数
  created () {
    this.init();
  },
  mounted () {
  }
};
