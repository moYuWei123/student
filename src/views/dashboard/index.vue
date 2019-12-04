<template>
  <div class="dashboard-main">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="naver" class="card">
          <div slot="header">
            <el-link type="primary" @click="getuser">用户情况</el-link>
          </div>
          <p>总数:{{userCount}}</p>
          <div v-for="item in arr.userCountByDay" :key="item.date">
            <span>{{item.date}}</span>
            新增:
            <span>{{item.count}}</span>
          </div>
          <!-- <p>昨日新增:{{arr.userCountToday.count}}</p> -->
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="naver" class="card">
          <div slot="header">
            <el-link type="primary" @click="getimg">图片情况</el-link>
          </div>
          <p>总数:{{imgCount}}</p>
          <div v-for="item in arr.imgCountByDay" :key="item.date">
            <span>{{item.date}}</span>
            新增:
            <span>{{item.count}}</span>
          </div>
          <!-- <p>昨日新增:{{arr.imgCountToday.count}}</p> -->
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="naver" class="card">
          <div slot="header">
            <el-link type="primary" @click="getnews">新闻情况</el-link>
          </div>
          <p>总数:{{newsCount}}</p>
          <div v-for="item in arr.newsCountByDay" :key="item.date">
            <span>{{item.date}}</span>
            新增:
            <span>{{item.count}}</span>
          </div>
          <!-- <p>昨日新增:{{arr.newsCountToday.count}}</p> -->
        </el-card>
      </el-col>
    </el-row>

    <el-divider></el-divider>
    <div id="myChart" :style="{width: '900px', height: '300px'}"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { getToken } from "@/utils/myAuth";
import dashboardApi from "@/api/dashboard/index";
export default {
  props: {},
  data() {
    return {
      arr: {},
      imgCount: 0,
      userCount: 0,
      newsCount: 0
    };
  },
  computed: {
    name() {
      return getToken().user.username;
    },
   
  },
  created() {
    this.getDashboardList();
  },
  mounted() {
    this.creatE();
  },
  watch: {},
  methods: {
    getDashboardList() {
      dashboardApi.getdashboard().then(res => {
        this.arr = res;
        this.imgCount = res.imgCount.count;
        this.newsCount = res.newsCount.count;
        this.userCount = res.userCount.count;
        console.log(this.arr1);
      });
    },
    getimg() {
      this.$router.push("/management");
    },
    getuser() {
      this.$router.push("/xy");
    },
    getnews() {
      this.$router.push("/management/news");
    },
    creatE() {
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "数据" },
        tooltip: {},
        xAxis: {
          data: ["新闻", "图片", "用户"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36]
          },
          {
            name: "销量",
            type: "bar",

            data: [5, 28, 12],
            color: "yellow"
          },
          {
            name: "销量",
            type: "bar",
            data: [5, 29, 31]
          }
        ]
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.dashboard-main {
  .card {
    margin: 20px;
  }
}
</style>
