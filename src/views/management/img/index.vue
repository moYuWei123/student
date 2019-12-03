<template>
  <div class="img-main">
    <el-card class="card">
      <div slot="header">
        <span>图片上传</span>
      </div>

      <el-upload
        class="upload-demo"
        action="/admin/xy/upload/uploadImg"
        :on-success="success"
        :file-list="fileList"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-card>

    <el-card class="card content" v-loading="loading">
      <div slot="header">
        <span>图片展示</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="4.6" v-for="item in imgList" :key="item.id">
          <el-card shadow="hover" class="imgshow">
            <div class="imgsize">
              <el-image
                style="width: 200px; height: 200px"
                :src="host+item.dir+'/'+item.fileName"
                fit="contain"
                :preview-src-list="[host+item.dir+'/'+item.fileName]"
              ></el-image>
            </div>
            <div style="padding-top:5px" >
              <p v-if="item.showinput" class="spantext">{{item.title}}</p>
              <div class="editor" v-if="!item.showinput">
                <el-input size="mini" class="magin10" v-model="item.title" placeholder="请输入名称"></el-input>
                <el-button size="mini" type="primary" @click="save(item)">确定</el-button>
                <el-button size="mini" @click="item.showinput=true">取消</el-button>
              </div>

              <div class="bottom clearfix" v-if="item.showinput">
                <el-button type="text" @click.native="item.showinput=false">编辑</el-button>
                <el-button type="text" @click.native="del(item.id)" style="color:red">删除</el-button>
              </div>
            </div>
          </el-card>

          <!-- <el-image
            style="width: 200px; height: 200px"
            :src="'http://bufan.cloud/'+item.dir+'/'+item.fileName"
            fit="contain"
            :preview-src-list="['http://bufan.cloud/'+item.dir+'/'+item.fileName]"
          ></el-image>-->

          <!-- <img :src="'http://bufan.cloud/'+item.dir+'/'+item.fileName" alt /> -->
          <!-- <el-button size="mini" type="danger" @click.native="del(item.id)">删除</el-button>
          <el-button size="mini" type="primary" @click.native="edit(item.id)">编辑</el-button>-->
        </el-col>
      </el-row>

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
  </div>
</template>

<script>
import imgApi from "@/api/material/img";
import setting from "@/api/settinghost";
export default {
  props: {},
  data() {
    return {
      fileList: [],
      imgList: [],
      host: setting.host,
      showinput: true,
      loading: false,
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
    this.getimgList();
  },
  mounted() {},
  watch: {},
  methods: {
    save(item) {
      console.log(item);

      imgApi
        .updateTitle({
          title: item.title,
          id: item.id
        })
        .then(res => {
          item.showinput = true;
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        });
    },
    getimgList() {
      this.loading = true;
      imgApi
        .imgList({
          start: this.page.start,
          limit: this.page.limit
        })
        .then(res => {
          this.loading = false;
          console.log(res);
          this.imgList = res.data.list.map(ele => {
            ele.showinput = true;
            return ele;
          });

          this.page.size = res.data.pageSize;
          this.page.total = res.data.totalRow;
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.limit = val;
      this.getimgList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.start = val;
      this.getimgList();
    },
    success(res) {
      this.getimgList();
    },
    edit(item) {
      console.log(item);
      item.showinput = "false";
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
          imgApi.imgDel({ id: id }).then(res => {
            // console.log(res);
            this.getimgList();
            loading.close();
            if (res) {
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
  components: {}
};
</script>

<style scoped lang="scss">
.img-main {
  .card {
    margin: 20px;
  }
  .content {
    .imgshow {
      margin: 20px;
      width: 250px;
      height: 320px;
    
      .spantext {
        line-height: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        
      }
      .imgsize {
        width: 200px;
        height: 200px;
        display: block;
      }
      .magin10 {
        margin-bottom: 10px;
      }
      .bottom {
        margin-left: 100px;
        margin-top: 20px;
      }
    }
  }
}
</style>
