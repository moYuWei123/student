<template>
  <div class="detail-main">
    <el-dialog title="编辑信息" :visible.sync="dialog" width="60%" @close="handleClose">
      <el-form label-position="right" label-width="120px" :model="form">
        <el-card class="border-none" shadow="never">
          <div slot="header">
            <span>基本信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别">
                <el-select v-model="form.sex" placeholder="选择性别">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证">
                <el-input v-model="form.manID"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="手机">
                <el-input v-model="form.tel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地区">
                <div id="app">
                  <el-cascader size="large" :options="options" v-model="form.city"></el-cascader>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="QQ">
                <el-input v-model="form.qq"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

        <el-card class="border-none" shadow="never">
          <div slot="header">
            <span>补充信息</span>
          </div>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="微信">
                <el-input v-model="form.wx"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="宿舍使用时间">
                <el-date-picker v-model="form.dormStartTime" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="毕业院校">
                <el-input v-model="form.school"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

        <el-card class="border-none" shadow="never">
          <div slot="header">
            <span>缴费信息</span>
          </div>
          <!-- card body -->
        </el-card>
      </el-form>

      <span slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="doSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import studentApi from "@/api/xy/student.js";
import { regionData } from "element-china-area-data";
import { resetData } from "@/utils/index";
export default {
  props: {},
  data() {
    return {
      dialog: false,
      form: {},
      options: regionData
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    openDialog(id) {
      if (id) {
        console.log(id);
        studentApi.studentdetail({ id }).then(res => {
          console.log(res.data);
          this.form = res.data
        });
      }

      this.dialog = true;
    },
    handleClose() {
      //重置表单
      resetData(this, "xyUser");
      this.dialog = false;
    },
    doSave() {
      const loading = this.$loading({
        lock: true,
        text: "添加中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      studentApi.studentSave({ xyUser: { ...this.form } }).then(res => {
        loading.close();
        console.log(res);
        if (res.code == "success") {
          this.handleClose();
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          //刷新列表
          this.$emit("refresh-list");
        } else {
          this.$message({
            type: "fail",
            message: "添加失败,请重新添加!"
          });
        }
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.detail-main {
  .el-card.border-none {
    border: none;
  }
}
</style>
