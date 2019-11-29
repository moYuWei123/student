<template>
  <div class="detail-main">
    <el-dialog title="编辑信息" :visible.sync="dialog" width="60%" @close="handleClose">
      <el-form label-position="right" label-width="120px" status-icon :model="form" ref="ruleForm" :rules="rules">
        <el-card class="border-none" shadow="never">
          <div slot="header">
            <span>基本信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input size="small" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别">
                <el-select size="small" v-model="form.sex" placeholder="选择性别">
                  <el-option label="男" value="0"></el-option>
                  <el-option label="女" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证" prop="manID">
                <el-input size="small" v-model="form.manID"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="手机" prop="tel">
                <el-input size="small" v-model.number="form.tel"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="地区">
                <div id="app">
                  <el-cascader size="large" :options="options" v-model="form.city"></el-cascader>
                </div>
              </el-form-item>
            </el-col>-->
            <el-col :span="8">
              <el-form-item label="QQ">
                <el-input size="small" v-model="form.qq"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="选择班级">
                <el-select size="small" v-model="form.classId" clearable placeholder="请选择班级">
                  <el-option
                    v-for="item in classList"
                    :key="item.id"
                    :label="item.className"
                    :value="item.id"
                  />
                </el-select>
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
                <el-input size="small" v-model="form.wx"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="宿舍使用时间">
                <el-date-picker
                  size="small"
                  v-model="form.dormStartTime"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="毕业院校">
                <el-input size="small" v-model="form.school"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>

      <el-form label-position="right" label-width="120px" :model="cost">
        <el-card class="border-none" shadow="never">
          <div slot="header">
            <span>缴费信息</span>
            <el-button type="text" @click="goAddcost">添加缴费信息</el-button>
          </div>
          <transition name="el-fade-in-linear">
            <el-table align="center" :data="costList" v-show="!costShow" border stripe>
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column label="费用类型" prop="costType" width="150">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.costType=="1"?"住宿费":"学费" }}</span>
                </template>
              </el-table-column>
              <el-table-column label="费用" prop="costValue" width="150"></el-table-column>
              <el-table-column label="缴费时间" prop="costTime" width="255"></el-table-column>
              <el-table-column label="费用描述" prop="costBak" width="350"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    v-if="!scope.row.id"
                    type="text"
                    style="color:red;"
                    size="mini"
                    @click="delCostInfo(scope.row.tempId)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </transition>

          <transition name="el-fade-in-linear">
            <div class="cost-main" v-show="costShow">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="费用类型">
                    <el-radio-group v-model="cost.costType">
                      <el-radio label="0">学费</el-radio>
                      <el-radio label="1">住宿费</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="费用">
                    <el-input-number v-model="cost.costValue" :min="1" label="label"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="缴费时间">
                    <el-date-picker
                      v-model="cost.costTime"
                      value-format="yyyy-MM-dd"
                    >type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="18">
                  <el-input v-model="cost.costBak" type="textarea" placeholder="交费描述"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4" :offset="20">
                  <el-button round size="mini" @click="handlecancelCostSave">取消</el-button>
                  <el-button round size="mini" type="primary" @click="handleCostSave">添加到暂存区</el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
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
import classApi from "@/api/xy/clazz.js";

import costApi from "@/api/cost/index.js";

import { regionData } from "element-china-area-data";
import { resetData } from "@/utils/index";
export default {
  props: {},

  data() {
    //验证手机哈号码
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (!/^1[3456789]\d{9}$/.test(value)) {
            callback(new Error("请输入正确手机号码"));
          } else {
            callback();
          }
        }
      }, 500);
    };
    //验证名字
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      }
      setTimeout(() => {
        callback();
      }, 500);
    };
//验证身份证号码
    var checkmanID = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("身份证号码不能为空"));
      }
      value = parseInt(value); //returns 1234
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
            callback(new Error("请输入正确身份证号码"));
          } else {
            callback();
          }
        }
      }, 500);
    };
    return {
      costShow: false,
      dialog: false,
      form: {},
      classList: [],
      costList: [],
      newcostList: [],
      cost: {
        costType: "0"
      },
      rules: {
        tel: [{ validator: checkAge, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }],
        manID:[{ validator: checkmanID, trigger: "blur" }]
      },

      options: regionData
    };
  },
  computed: {},
  created() {
    this.getclassList();
  },
  mounted() {},
  watch: {},
  methods: {
    //针对后台需求对costlist进行转换
    formartCostList() {
      var obj = {
        _size: this.newcostList.length
      };
      for (var i = 0; i < this.newcostList.length; i++) {
        obj["xyCostItems_" + i] = {
          ...this.newcostList[i]
        };
      }

      return obj;
    },

    getcostList(id) {
      costApi
        .costList({
          userId: id
        })
        .then(res => {
          console.log(res.data.list);
          if (res.data.list) {
            this.costList = res.data.list;
          }
        });
    },
    getclassList() {
      classApi.classList().then(res => {
        this.classList = res.data.list;
      });
    },

    delCostInfo(id) {
      // this.costList = this.costList.filter(ele => ele.tempId != id);
      // this.newcostList = this.newcostList.filter(ele => ele.tempId != id);
      // console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.costList = this.costList.filter(ele => ele.tempId != id);
          this.newcostList = this.newcostList.filter(ele => ele.tempId != id);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    goAddcost() {
      this.costShow = true;
    },
    handlecancelCostSave() {
      this.handleCosrClose();
    },
    handleCostSave() {
      var costItem = Object.assign({ tempId: new Date().getTime() }, this.cost);
      this.costList.push(costItem);

      this.newcostList.push(costItem);

      console.log(this.costList);
      console.log(this.newcostList);

      this.handleCosrClose();
    },
    handleCosrClose() {
      this.costShow = false;
      resetData(this, "cost");
    },
    openDialog(id) {
      if (id) {
        console.log(id);
        this.getcostList(id);
        studentApi.studentdetail({ id }).then(res => {
          console.log(res.data);
          this.form = res.data;
        });
      }

      this.dialog = true;
    },
    handleClose() {
      //重置表单
      resetData(this, "form");
      resetData(this, "cost");
      this.costList = [];
      this.newcostList = [];
      this.$refs.ruleForm.resetFields();
      this.dialog = false;
      this.costShow = false;
    },
    doSave() {
      var api = null;
      var text = "";
      var message = "";

      if (this.form.id) {
        api = studentApi.studentUpdate;
        text = "修改中";
        message = "修改成功";
      } else {
        api = studentApi.studentSave;
        text = "添加中";
        message = "添加成功";
      }

      const loading = this.$loading({
        lock: true,
        text: text,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      api({ xyUser: this.form, ...this.formartCostList() }).then(res => {
        loading.close();
        console.log(res);
        if (res.code == "success") {
          this.handleClose();
          this.$message({
            type: "success",
            message: message
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
