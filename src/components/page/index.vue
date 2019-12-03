<template>
  <div>
    <el-pagination
      background
      :current-page="page.start"
      :page-sizes="page.sizes"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      style="text-align:right;margin-top:20px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.limit = val;
      //   this.getimgList();
      this.$emit("refresh-list");
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.start = val;
      this.$emit("refresh-list");

    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
</style>
