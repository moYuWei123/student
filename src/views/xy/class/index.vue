<template>
  <div class="class-main">
    <el-card class="card" shadow="hover">
      <div slot="header">
        <span>搜索</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="根据名字搜索" clearable size="small" v-model="search.className">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="16" style="text-align:right">
          <el-button size="small" @click="clean">重置</el-button>
          <el-button size="small" @click="doSearch" type="primary">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="card" shadow="hover">
      <div slot="header">
        <el-button type="primary" size="small" @click="goAdd">添加班级</el-button>
      </div>
      <el-table v-loading="loading" :data="classList" style="width: 100%" border>
        <el-table-column fixed type="index" label="id" width="50" />
        <el-table-column prop="className" label="班级名称"></el-table-column>
        <el-table-column prop="startTime" label="开班时间"></el-table-column>
        <el-table-column prop="endTime" label="结束时间"></el-table-column>
        <el-table-column prop="desc" label="班级详情"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="small" round @click.native="seedetail(scope.row)">查看</el-button> -->
            <el-button size="small" round type="primary" @click.native="goEdit(scope.row.id)">编辑</el-button>
            <el-button size="small" round type="danger" @click.native="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    </el-card>
    <Detail ref="detail" @refresh-list="getclassList()"></Detail>
  </div>
</template>

<script>
import classApi from "@/api/xy/clazz.js";
import Detail from "./detail";

export default {
  props: {},
  data() {
    return {
      loading: false,

      classList: [],
      search: {},
      page: {
        start: 1,
        limit: 10,
        sizes: [10, 20, 30, 40],
        size: 0,
        total: 0
      }
    };
  },
  computed: {},
  created() {
    this.getclassList();
  },
  mounted() {},
  watch: {},
  methods: {
    clean() {
      this.search = {};
      this.getclassList();
    },
    doSearch() {
      //搜索
      this.page.start = 1;
      this.getclassList();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.limit = val;
      this.getclassList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.start = val;
      this.getclassList();
    },
    getclassList() {
      this.loading = true;

      var params = {
        start: this.page.start,
        limit: this.page.limit,
        ...this.search
      };
      classApi.classList({ ...params }).then(res => {
        this.classList = res.data.list;
        this.page.size = res.data.pageSize;
        this.page.total = res.data.totalRow;
        this.loading = false;
      });
    },
    goEdit(id) {
      this.$refs.detail.openClassDialog(id);
    },
    goAdd() {
      this.$refs.detail.openClassDialog();
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: "删除中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          classApi.classDel({ id: id }).then(res => {
            // console.log(res);
            this.getclassList();
            loading.close();
            if (res.code == true) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message({
                type: "fail",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  components: {
    Detail
  }
};
</script>

<style scoped lang="scss">
.class-main {
  .h2 {
    text-align: center;
  }
  .card {
    margin: 20px;
  }
}
</style>
