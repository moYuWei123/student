<template>
  <div class="detail-main">
    <el-dialog title="编辑班级信息" :visible.sync="dialogVisible" @close="handleClose()" width="50%">
      <el-form label-position="right" label-width="120px" :model="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="班级名称">
              <el-input v-model="form.className"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级类型">
              <el-select v-model="form.type" placeholder="选择班级类型">
                <el-option label="前端" value="0"></el-option>
                <el-option label="ui" value="1"></el-option>
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
            <el-form-item label="班级描述">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.desc"></el-input>
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
import classApi from "@/api/xy/clazz.js";

import { resetData } from "@/utils/index";

export default {
  props: {},
  data() {
    return {
      dialogVisible: false,
      classList: [],
      form: {}
    };
  },
  computed: {},
  created() {
    this.getclassList();
  },
  mounted() {},
  watch: {},

  methods: {
    handleClose() {
      this.dialogVisible = false;
      resetData(this, "form");
    },
    getclassList() {
      classApi.classList().then(res => {
        this.classList = res.data.list;
      });
    },
    openClassDialog(id) {
      if (id) {
        classApi.classDetail({ id }).then(res => {
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
        api = classApi.classUpdate;
        text = "修改中";
        message = "修改成功";
      } else {
        api = classApi.classSave;
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
        xyClassInfo: this.form
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
