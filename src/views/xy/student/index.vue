<template>
  <div class="student-main">
    <el-card class="card" shadow="hover">
      <div slot="header">
        <span>搜索</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="根据名字搜索" clearable size="small" v-model="search.name">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-select v-model="search.classId" size="small"  clearable placeholder="根据班级搜索">
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.className"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-date-picker v-model="search.startTime" size="small" type="date" placeholder="选择日期时间" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="16" style="text-align:right">
          <el-button size="small" @click="clean">重置</el-button>
          <el-button size="small" @click="doSearch" type="primary">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 内容区域开始 -->

    <el-card class="card content" shadow="hover">
      <div slot="header">
        <el-button type="primary" size="small" @click="goAdd">添加</el-button>
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="studentList"
        style="width: 100%"
        border
      >
        <el-table-column fixed type="index" label="id" width="50" />
        <el-table-column fixed prop="name" label="姓名" width="150" />
        <el-table-column prop="sexv" label="性别" width="80" />
        <el-table-column prop="age" label="年龄" width="100" />

        <el-table-column prop="job" label="工作" width="100" />
        <el-table-column prop="cityText" label="地址" width="200" />
        <el-table-column prop="classname" label="班级名称" width="100" />

        <el-table-column prop="school" label="学校" width="200" />
        <el-table-column prop="education" label="学历" width="120" />
        <el-table-column prop="addTime" label="添加时间" width="220" />
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="small" round @click.native="seedetail(scope.row)">查看</el-button>
            <el-button size="small" round type="primary" @click.native="goEdit(scope.row.id)">编辑</el-button>
            <el-button size="small" round type="danger" @click.native="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
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

    <Detail ref="detail" @refresh-list="getStudentList()"></Detail>

    <el-dialog title="详细信息" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="sex" label="性别" width="200"></el-table-column>
        <el-table-column property="age" label="年龄" width="200"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import classApi from "@/api/xy/clazz.js";
import studentApi from "@/api/xy/student.js";
import Detail from "./detail";
export default {
  name: "XyStudent",
  components: {
    Detail
  },
  props: {},
  data() {
    return {
      loading: false,
      dialogTableVisible: false,
      search: {},
      page: {
        start: 1,
        limit: 10,
        sizes: [10, 20, 30, 40],
        size: 0,
        total: 0
      },

      xyUser: {
        name: "1"
      },
      gridData: [],
      classList: [],
      studentList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getclassList();
    this.getStudentList();
  },
  mounted() {},
  methods: {
    //删除方法
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
          studentApi.del({ id: id }).then(res => {
            // console.log(res);
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
            this.getStudentList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.limit = val;
      this.getStudentList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.start = val;
      this.getStudentList();
    },
    goAdd() {
      this.$refs.detail.openDialog();
    },

    //添加

    //获取宿舍列表
    getclassList() {
      classApi.classList().then(res => {
        this.classList = res.data.list;
      });
    },
    //获取学生列表
    getStudentList() {
      this.loading = true;
      var params = {
        start: this.page.start,
        limit: this.page.limit,
        ...this.search
      };
      studentApi.studentList({ ...params }).then(res => {
        console.log(res.data.list);
        this.studentList = res.data.list;
        this.page.size = res.data.pageSize;
        this.page.total = res.data.totalRow;
        this.loading = false;
      });
    },

    doSearch() {
      //搜索
      this.page.start = 1;
      this.getStudentList();
    },

    clean() {
      this.search = {};
      this.getStudentList();
    },

    seedetail(val) {
      console.log(val);
      this.gridData = [val];
      this.dialogTableVisible = true;
    },
    goEdit(val) {
      this.$refs.detail.openDialog(val);
    }
  }
};
</script>

<style scoped lang="scss">
.student-main {
  .card {
    margin: 20px;
    box-sizing: border-box;
  }
}
</style>

<style lang="scss">
.el-table {
  td {
    text-align: center;
  }
  th {
    text-align: center;
  }
}
</style>
