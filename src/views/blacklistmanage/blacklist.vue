<template>
  <div class="page-human">
    <div class="li-title">
      <b>黑名单管理 / 黑名单列表</b>
    </div>
    <el-card>
      <el-form :model="searchform" ref="searchform" label-width="130px">
        <el-row type="flex" class="human-form">
          <el-col :span="8">
            <el-form-item label="服务号" prop="serviceId">
              <el-input size="mini" v-model.trim="searchform.serviceId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品号" prop="productId">
              <el-input size="mini" v-model.trim="searchform.productId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="外部流水号" prop="outUniqueCode">
              <el-input size="mini" v-model.trim="searchform.outUniqueCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row>
            <el-col :span="8">
            <el-form-item label="黑名单类型" prop="blacklistType">
              <el-select size="mini" v-model="searchform.blacklistType" placeholder="请选择类型" clearable>
                    <el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建开始时间" prop="beginDate">
              <el-date-picker
                size="mini"
                v-model="searchform.beginDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择开始时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
            
          <el-col :span="8">
            <el-form-item label="至" prop="endDate">
              <el-date-picker
                size="mini"
                v-model="searchform.endDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择结束时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item>
              <el-button size="mini" type="primary" @click="submitForm()">搜索</el-button>
              <el-button size="mini" @click="resetForm('searchform')">重置</el-button>
            </el-form-item>
          </el-col>
          
        </el-row>
      </el-form>
    </el-card>
    <el-card class="human-table">
      <el-table
        :data="tableData"
        border
        size="mini"
        stripe
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%; height:100%;"
        :default-sort = "{prop: 'outUniqueCode', order: 'descending'}"
      >
        <el-table-column prop="sysCode" label="系统编码" align="center"></el-table-column>
        <el-table-column prop="serviceId" label="服务号" width="125" align="center"></el-table-column>
        <el-table-column prop="productId" label="产品号" align="center"></el-table-column>
        <el-table-column prop="outUniqueCode" sortable label="外部流水号" width="125" align="center"></el-table-column>
        <el-table-column prop="blacklistType" label="黑名单类型" align="center">
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.blacklistType == 'IdCard'">身份证</span>
            <span v-else-if="scope.row.blacklistType == 'Phone'">手机号</span>
            <span v-else-if="scope.row.blacklistType == 'Deviceid'">设备ID</span>
            <span v-else-if="scope.row.blacklistType == 'HomeTel'">家庭电话</span>
            <span v-else-if="scope.row.blacklistType == 'EmpName'">单位名称</span>
            <span v-else-if="scope.row.blacklistType == 'EmpTel'">单位电话</span>
            <span v-else-if="scope.row.blacklistType == 'RelativeContact'">直系联系人电话</span>
            <span v-else-if="scope.row.blacklistType == 'OtherContact'">其他联系人电话</span>
            <span v-else="scope.row.blacklistType == ''">无</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="blacklistDes" label="黑名单类型描述" width="115" align="center"></el-table-column>
        <el-table-column prop="blacklistValue" label="黑名单值" align="center"></el-table-column>
        <el-table-column prop="priority" label="优先级" align="center"></el-table-column>
        <el-table-column prop="stage" label="阶段" align="center"></el-table-column>
        <el-table-column prop="ruleCode" label="规则编码" align="center"></el-table-column>
        <el-table-column prop="ruleDes" label="规则描述" align="center"></el-table-column>
        <el-table-column prop="beginDate" label="生效时间" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.beginDate !=null">
              {{formatDate(scope.row.beginDate)}}
            </span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column prop="endDate" label="失效时间" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.endDate !=null">
              {{formatDate(scope.row.endDate)}}
            </span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
          <template slot-scope="scope">
            <span  v-if="scope.row.createTime !=null">
              {{formatDate(scope.row.createTime)}}
            </span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="55" align="center"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="human-pagination">
        <el-pagination
          background
          style="text-align:center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.searchform.pageIndex"
          :page-sizes="[20,50,100]"
          :page-size="this.searchform.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="count"
        >
          <!--这是显示总共有多少数据-->
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { formatDate } from "../../common/date.js";
export default {
  data() {
    return {
      count: 0,
      options: [{
          value: "IdCard",
          label: "身份证"
        },
        {
          value: "Phone",
          label: "手机号"
        },
        {
          value: "Deviceid",
          label: "设备ID"
        },
        {
          value: "HomeTel",
          label: "家庭电话"
        },
        {
          value: "EmpName",
          label: "单位名称"
        },
        {
          value: "EmpTel",
          label: "单位电话"
        },
        {
          value: "RelativeContact",
          label: "直系联系人电话"
        },
        {
          value: "OtherContact",
          label: "其他联系人电话"
        }],
      searchform: {
        serviceId: "",
        productId: "",
        outUniqueCode: "",
        blacklistType:"",
        beginDate: "", //申请开始时间
        endDate: "", //至
        pageIndex: 1, //初始页
        pageSize: 50 //显示当前行的条数
      },
      tableData: []
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    this.load(this.searchform);
  },

  methods: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    submitForm() {
      this.load(this.searchform);
    },
    // 重置功能
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.getlist();
    },
    handleSizeChange(psize) {
      // 改变每页显示的条数
      this.searchform.pageSize = psize;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.searchform.pageIndex = 1;
      this.load(this.searchform);
    },

    // 初始页currentPage
    handleCurrentChange(pageIndex) {
      this.searchform.pageIndex = pageIndex;
      this.load(this.searchform);
    },

    //初始化数据
    load(data) {
      this.tableData = [];
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/blacklist/query",
        data: data
      }).then(
        response => {
          var res = response.data;
          if (res.code == 0) {
            this.tableData = res.detail.pageList;
            this.count = res.detail.count;
            this.searchform.pageIndex = res.detail.pageIndex;
            this.searchform.pageSize = res.detail.pageSize;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        error => {}
      );
    }
  },
  watch: {}
};
</script>
<style lang='less' scoped>
//  导入统一样式less样式
@import "../users/style.css";
/deep/ .el-card {
  // background: rgba(255, 255, 255, 0.1);
  /deep/ .el-table tr,
  .el-table th {
    background: rgba(174, 228, 240, 0.822);
    // background: rgb(248, 246, 246);
    color: rgb(118, 104, 104);
    font-family: "苹方";
  }
  /deep/ .el-table--border td,
  .el-table--border th,
  .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    border-right: 1px solid #fff;
  }
  .el-form-item__content {
    margin-left: 130px !important;
  }
}
.page-human {
  padding: 25px 50px;
  // background: rgb(202, 201, 201);
  .human-table {
    margin-top: 20px;
  }
  .human-pagination {
    margin-top: 30px;
  }
}
</style>