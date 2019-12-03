<template>
  <div class="detail-main">
    <el-dialog
      fullscreen
      title="编辑文章"
      :visible.sync="dialogVisible"
      @close="handleClose()"
      width="80%"
    >
      <el-form label-position="right" label-width="120px" :model="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文章名称">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文章作者">
              <el-input v-model="form.author"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="摘要">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="是否最热">
              <el-switch
                v-model="form.hot"
                active-color="#13ce66"
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="封面图片">
              <el-button type="primary" size="mini" @click="chooseimg">选择图片</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-image style="width: 100px" :src="form.cover" fit="fit"></el-image>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="切换文本类型">
              <el-radio-group v-model="form.type">
                <el-radio :label="'0'">富文本</el-radio>
                <el-radio :label="'1'">markdown</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button @click="addimg" size="small" type="primary">添加素材</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="编辑文章内容">
              <div v-if="form.type=='0'" class="tin">
                <tinymce ref="tin" v-model="form.content1"></tinymce>
                <!-- <el-button type="primary" @click="getTincontent()">获取</el-button> -->
              </div>
              <div v-else class="mk">
                <MarkdownEditor ref="mk" v-model="form.content1"></MarkdownEditor>
                <!-- <el-button @click="setMkcontent()" type="primary">hhh</el-button> -->
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="doSave">确 定</el-button>
      </div>
    </el-dialog>
    <chooseimg @sendimgurl="change" ref="choose"></chooseimg>
  </div>
</template>

<script>
import tinymce from "@/components/Tinymce";
import MarkdownEditor from "@/components/MarkdownEditor";
import chooseimg from "./chooseimg";

import newsApi from "@/api/news/index";

import { resetData } from "@/utils/index";

export default {
  props: {},
  data() {
    return {
      dialogVisible: false,
      classList: [],
      imgurl: "",
      form: {
        type: "0",
        cover: ""
      }
    };
  },
  computed: {},

  mounted() {},
  watch: {},

  methods: {
    change(val) {
      console.log(val);
      this.form.cover = val;
    },
    //添加图片
    addimg() {
      this.$refs.choose.openImgDialog("添加");
    },
    chooseimg() {
      this.$refs.choose.openImgDialog("选择");
    },
    handleClose() {
      //注意格式
      if (this.form.type == "0") {
        this.$refs.tin.setContent("");
      } else {
        this.$refs.mk.setValue("");
      }
      //先判断又没有然后在清空
      resetData(this, "form");
      // if (this.form.type == "0") {
      // }

      this.dialogVisible = false;
    },
    //开启弹窗并传入值
    openClassDialog(id) {
      if (id) {
        newsApi.newsdetail({ id }).then(res => {
          console.log(res.data);
          this.form = res.data;

          this.$refs.tin.setContent(res.data.content1);

          //因为富文本编辑器不是动态绑定的,所以先获取值然后再赋值数据不会丢失
        });
      }
      this.dialogVisible = true;
    },
    //上传
    doSave() {
      var api = null;
      var text = "";
      var message = "";
      if (this.form.id) {
        api = newsApi.newsupdate;
        text = "修改中";
        message = "修改成功";
      } else {
        api = newsApi.newssave;
        text = "添加中";
        message = "添加成功";
      }

      const loading = this.$loading({
        lock: true,
        text: text,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      api({
        xyNews: this.form
      }).then(res => {
        loading.close();
        if (res.code == true) {
          this.$message({
            type: "success",
            message: message
          });
        } else {
          this.$message({
            type: "success",
            message: message
          });
        }

        console.log(res);
        this.$emit("refresh-list");
      });

      this.handleClose();
    }
  },
  components: {
    tinymce,
    MarkdownEditor,
    chooseimg
  }
};
</script>

<style scoped lang="scss">
</style>
