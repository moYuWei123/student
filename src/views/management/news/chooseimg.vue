<template>
  <div class="detail-main">
    <el-dialog title="选择图片" top="20px" :visible.sync="openDialog" @close="handleClose()" width="80%">
      <el-row v-loading="loading" :gutter="20">
        <el-col :span="6" v-for="item in imgList" :key="item.id">
          <el-image
            style="width: 200px; height: 200px"
            :src="host+item.dir+'/'+item.fileName"
            fit="contain"
            :preview-src-list="[host+item.dir+'/'+item.fileName]"
          ></el-image>
          <el-button
            size="mini"
            type="primary"
            v-if="showbutton"
            @click="copypath(host+item.dir+'/'+item.fileName)"
          >复制图片地址</el-button>
          <el-button
            size="mini"
            type="primary"
            v-if="!showbutton"
            @click="affirm(host+item.dir+'/'+item.fileName)"
          >确认</el-button>
        </el-col>
      </el-row>
      <!-- 分页组件 -->
      <pages @refresh-list="getimgList" :page="page"></pages>
    </el-dialog>
  </div>
</template>

<script>
import imgApi from "@/api/material/img";
import setting from "@/api/settinghost";
import pages from '@/components/page'
import pageMixin from '@/mixins/pageMixin'

export default {
  props: {},
  mixins:[pageMixin],//混合这是分页设置
  data() {
    return {
      imgList: [],
      showbutton: true,
      openDialog: false,
      host: setting.host,
      loading:false,
    };
  },
  computed: {},

  mounted() {},
  watch: {},
  created() {
    this.getimgList();
  },
  methods: {
    copypath(data) {
      console.log(data);

      let url = data;
      let oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        message: "已成功复制到剪切板",
        type: "success"
      });
      oInput.remove();
      this.openDialog = false;
    },
    affirm(url) {
      this.$emit("sendimgurl", url);
      this.openDialog = false;
    },
    handleClose() {
      this.openDialog = false;
    },
    //打开弹窗并判断是选择还是添加
    openImgDialog(val) {
      this.openDialog = true;
      if (val == "选择") {
        this.showbutton = false;
      } else {
        this.showbutton = true;
      }
      console.log(val);

      // else {
      //   this.showbutton = false;
      // }
    },
    getimgList() {
      this.loading = true
      imgApi.imgList({
          start: this.page.start,
          limit: this.page.limit,
      }).then(res => {
        this.loading = false
        console.log(res);
        this.imgList = res.data.list;
           this.page.size = res.data.pageSize;
          this.page.total = res.data.totalRow;
      });
    }
  },
  components: {
    pages
  }
};
</script>

<style scoped lang="scss">
</style>
