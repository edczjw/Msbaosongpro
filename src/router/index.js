import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  // mode: 'history',//去掉#号
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      // 登陆页面
      path: '/login',
      name: '登录页',
      component: require('../views/login/login.vue').default,
    },
    {
      // 主页
      path: '/home',
      name: '主页',
      component: require('../views/index/index.vue').default,
      meta: {
        auth: true
      },
      // 含有文件夹的文件children
      children: [{
        // 主页
        path: '/mshome',
        name: 'ms主页',
        component: require('../views/index/home.vue').default,
        meta: {
          auth: true
        },
      },{
          // 合同报送
          path: '/baosong/hetongbaosong',
          name: '合同报送',
          component: require('../views/baosong/hetongbaosong.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 放款报送
          path: '/baosong/fangkuanbaosong',
          name: '放款报送',
          component: require('../views/baosong/fangkuanbaosong.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 还款报送
          path: '/baosong/huankuanbaosong',
          name: '还款报送',
          component: require('../views/baosong/huankuanbaosong.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 坏账报送
          path: '/baosong/huaizhangbaosong',
          name: '坏账报送',
          component: require('../views/baosong/huaizhangbaosong.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 日结报送
          path: '/baosong/rijiebaosong',
          name: '日结报送',
          component: require('../views/baosong/rijiebaosong.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 计提报送
          path: '/baosong/jitibaosong',
          name: '计提报送',
          component: require('../views/baosong/jitibaosong.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 线下报送
          path: '/baosong/xianxiabaosong',
          name: '线下报送',
          component: require('../views/baosong/xianxiabaosong.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 详情页
          path: '/users/detail',
          name: '详情页',
          component: require('../views/users/detail.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 密码修改
          path: '/users/mimaxiugai',
          name: '密码修改',
          component: require('../views/users/mimaxiugai.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 百行管理->账户列表
          path: '/baihangguanli/userList',
          name: '账户列表',
          component: require('../views/baihangguanli/userList.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 账户详情
          path: '/details/userDetail',
          name: '账户详情',
          component: require('../views/details/userDetail.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 百行管理->申请列表
          path: '/baihangguanli/applyList',
          name: '申请列表',
          component: require('../views/baihangguanli/applyList.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 申请详情
          path: '/details/applyDetail',
          name: '申请详情',
          component: require('../views/details/applyDetail.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 百行管理->贷后列表
          path: '/baihangguanli/loanList',
          name: '贷后列表',
          component: require('../views/baihangguanli/loanList.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 贷后详情
          path: '/details/loanDetail',
          name: '贷后详情',
          component: require('../views/details/loanDetail.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 征信管理->征信接口统计
          path: '/zhengxinmanage/creditinterface',
          name: '征信接口统计',
          component: require('../views/zhengxinmanage/Creditinterface.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 征信管理->产品查询统计
          path: '/zhengxinmanage/productsearch',
          name: '产品查询统计',
          component: require('../views/zhengxinmanage/ProductSearch.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 征信管理->征信查询明细
          path: '/zhengxinmanage/creditdetail',
          name: '征信查询明细',
          component: require('../views/zhengxinmanage/CreditDetail.vue').default,
          meta: {
            auth: true
          }
        },

        {
          // 征信结果->征信列表
          path: '/zhengxinresult/creditlist',
          name: '征信列表',
          component: require('../views/zhengxinresult/CreditList.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 黑名单管理->黑名单数据
          path: '/blacklistmanage/blacklist',
          name: '黑名单数据',
          component: require('../views/blacklistmanage/blacklist.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 黑名单管理->黑名单导入
          path: '/blacklistmanage/blackinput',
          name: '黑名单导入',
          component: require('../views/blacklistmanage/blackinput.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 黑名单管理->黑名单移除
          path: '/blacklistmanage/blackremove',
          name: '黑名单移除',
          component: require('../views/blacklistmanage/blackremove.vue').default,
          meta: {
            auth: true
          }
        },
        {
          // 风险评估报告列表
          path: '/fengxianpinggubaogao/fengxianlist',
          name: '风险评估报告列表',
          component: require('../views/fengxianpinggu/fengxianpinggulist.vue').default,
          meta: {
            auth: true
          }
        },
        // {
        //   // 风险评估报告详情
        //   path: '/fengxianpinggubaogao/fengxiandetail',
        //   name: '风险评估报告详情',
        //   component: require('../views/fengxianpinggu/fengxianpinggudetail.vue').default,
        //   meta: {
        //     auth: true
        //   }
        // },
        {
          // 风险评估报告详情
          path: '/fengxianpinggubaogao/fengxiandetail',
          name: '风险评估详情',
          component: require('../views/fengxianpinggu/fengxiandetail.vue').default,
          meta: {
            auth: true
          }
        },
      ]
    }
  ]
})
