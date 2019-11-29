<template>
  <div class="news-main">
    <h1 class="h1">新闻</h1>

    <el-card class="card" v-for="item in newsList" :key="item.id">
      <div slot="header">
        <span>{{item.title}}</span>
      </div>
      {{item.content2}}
    </el-card>
  </div>
</template>

<script>
import newsApi from "@/api/news/index";
export default {
  props: {},
  data() {
    return {
      newsList: []
    };
  },
  computed: {},
  created() {
    this.getNewsList();
  },
  mounted() {},
  watch: {},
  methods: {
    getNewsList() {
      newsApi.newsList().then(res => {
        console.log(res.data.list);
        this.newsList = res.data.list;
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.news-main {
  .h1 {
    margin-left: 20px;
  }
  .card {
    margin: 20px;
  }
}
</style>
