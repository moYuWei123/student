<template>
  <div class="news-main">
    <el-card  class="card" shadow="hover">
      <div slot="header">
        <span>搜索</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="根据标题搜索" clearable size="small" v-model="search.title">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="根据作者搜索" clearable size="small" v-model="search.author">
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
    <el-card class="card">
      <div slot="header">
        <el-button type="primary" size="small" @click="openNewDetail">添加新闻</el-button>
      </div>
      <!-- <el-table :data="newsList" style="width: 100%">
        <el-table-column prop="addTime" label="添加时间" width="180"></el-table-column>
        <el-table-column prop="author" label="作者" width="180"></el-table-column>
        <el-table-column prop="title" width="180" label="标题"></el-table-column>

        <el-table-column prop="viewCount" width="180" label="浏览量"></el-table-column>
        <el-table-column prop="desc" label="内容描述"></el-table-column>
      </el-table>-->
      <el-row v-loading="loading" :gutter="20">
        <el-col :span="12" v-for="item in newsList" :key="item.id">
          <el-row :gutter="20">
            <el-card shadow="hover" class="card">
              <el-col :span="12">
                <el-image style=" height: 200px" :src="item.cover" fit="contain"></el-image>
              </el-col>
              <el-col :span="12">
                <p>标题:{{item.title}}</p>
                <p>添加时间:{{item.addTime}}</p>
                <p>作者:{{item.author}}</p>
                <!-- <p>浏览量:{{item.viewCount}}</p> -->
                <p class="spantext">内容描述:{{item.desc}}</p>
                <el-button-group>
                  <el-button size="mini">查看</el-button>

                  <el-button size="mini" type="primary" @click="edit(item.id)">编辑</el-button>
                  <el-button size="mini
                  " @click="del(item.id)" type="danger">删除</el-button>
                </el-button-group>
              </el-col>
            </el-card>
          </el-row>
        </el-col>
      </el-row>
     

       <pages @refresh-list="getnewsList" :page="page"></pages>
    </el-card>
    <newsDetail @refresh-list="getnewsList()" ref="newsDetail"></newsDetail>
  </div>
</template>

<script>
import newsApi from "@/api/news/index";
import newsDetail from "./detail";
import pages from '@/components/page'
import pageMixin from '@/mixins/pageMixin'
export default {
  props: {},
  mixins:[pageMixin],//混合这是分页设置
  data() {
    return {
      search: {},
      tinContent: "<h2>我是你爸爸</h2>",
      newsList: [],
      loading:true,
       
    };
  },
  computed: {},
  created() {
    this.getnewsList();
  },
  mounted() {},
  watch: {},
  methods: {
   
    openNewDetail() {
      this.$refs.newsDetail.openClassDialog();
    },
    clean() {
      this.search = {};
      this.getnewsList();
    },
    doSearch() {
      //搜索
      this.page.start = 1;
      this.getnewsList();
    },

    getnewsList() {
      this.loading = true
      newsApi
        .newsList({
           start: this.page.start,
          limit: this.page.limit,
          ...this.search
        })
        .then(res => {
          this.loading = false
          //    console.log(res.data.list)
          this.newsList = res.data.list;
           this.page.size = res.data.pageSize;
          this.page.total = res.data.totalRow;
        });
    },
    edit(id) {
      this.$refs.newsDetail.openClassDialog(id);
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
          newsApi.newsDel({ id: id }).then(res => {
            // console.log(res);
            this.getnewsList();
            loading.close();
            if (res.code) {
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
    newsDetail,
    pages
  }
};
</script>

<style scoped lang="scss">
.news-main {
  .card {
    margin: 20px;
  }
  .spantext {
    line-height: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
