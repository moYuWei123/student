<template>
  <div class="detail-main">
    <el-dialog title="编辑宿舍信息" :visible.sync="dialogVisible" @close="handleClose()" width="50%">
      <el-form label-position="right" label-width="120px" :model="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="宿舍名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="宿舍类型">
              <el-select v-model="form.type" placeholder="选择宿舍类型">
                <el-option label="男" value=0></el-option>
                <el-option label="女" value=1></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="form.startTime"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="form.endTime"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="20">
            <el-form-item label="宿舍描述">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.bak"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="doSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dormApi from "@/api/xy/dorm.js";

import { resetData } from "@/utils/index";

export default {
  props: {},
  data() {
    return {
      dialogVisible: false,
      dormList: [],
      form: {}
    };
  },
  computed: {},
  created() {
    this.getdormList();
  },
  mounted() {},
  watch: {},

  methods: {
    handleClose() {
      this.dialogVisible = false;
      resetData(this, "form");
    },
    getdormList() {
      dormApi.dormList().then(res => {
        this.dormList = res.data.list;
      });
    },
    opendromDialog(id) {
      if (id) {
        dormApi.dormDetail({ id }).then(res => {
          console.log(res.data);
          this.form = res.data;
        });
      }
      this.dialogVisible = true;
    },
    doSave() {
      var api = null;
      var text = "";
      var message = "";

      if (this.form.id) {
        api = dormApi.dormUpdate;
        text = "修改中";
        message = "修改成功";
      } else {
        api = dormApi.dormSave;
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
        xyDormInfo: this.form
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
  components: {}
};
</script>

<style scoped lang="scss">
</style>
