<template>
  <section class="content">

    <div class="row center-block" style="background: #ffffff">
      <div id="example1_length" class="dataTables_length">
        <!--
        <router-link  class="pageLink" to="/user/add">
          <a>
            <span class="page" style="float:right;margin:5px"><el-button type="success" plain>添加用户</el-button></span>

          </a>
        </router-link>
-->   <el-button type="primary" @click="getTodayMember()" plain>今日注册用户</el-button><el-button type="primary" @click="getAllMember()" plain>所有注册用户</el-button>
      </div>
      <table class="table table-bordered table-responsive table-striped">
        <thead>
        <tr>
          <th style='text-align: center'>序号</th>
          <th style='text-align: center'>头像</th>
          <th style='text-align: center'>性别</th>
          <th style='text-align: center'>用户名</th>
          <!--<th style='text-align: center'>角色</th>-->
          <th style='text-align: center'>状态</th>
          <th style='text-align: center'>时间</th>
          <th style='text-align: center'>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in arrayData" v-bind:key="item.name">
          <td style='text-align: center'>{{index+1}}</td>
          <td style='text-align: center'><img v-bind:src=item.avatar style="width: 30px;height:30px"> </td>
          <td style='text-align: center'><!--{{item.gender}}-->
            <div v-if="item.gender===0">
                     保密
                 </div>
                 <div v-else-if="message===1">
                       男
                   </div>
                 <div v-else="message===2">
                       女
                   </div>
                </td>
          <td style='text-align: center'>{{item.name}}</td>
          <!--<td style='text-align: center'>{{item.role}}</td>-->
          <td style='text-align: center'>{{item.status | FormatStatus}}</td>
          <td style='text-align: center'>{{item.ts*1000 | BTKformatDate}}</td>
          <td style='text-align: center'>
            <div v-if="item.status==0"><el-button type="primary" @click="getFavAlbum(item.id)" plain>收藏专辑</el-button><el-button type="primary" @click="getFavBook(item.id)" plain>收藏书本</el-button><el-button type="primary" @click="resetPass(item.id)" plain>初始化密码</el-button> <el-button type="warning" @click="removeUser(item.id,'stop')" plain>停用</el-button></div>
            <div v-else="item.status==1"><el-button type="primary" @click="getFavAlbum(item.id)" plain>收藏专辑</el-button><el-button type="primary" @click="getFavBook(item.id)" plain>收藏书本</el-button><el-button type="primary" @click="resetPass(item.id)" plain>初始化密码</el-button> <el-button type="warning" @click="removeUser(item.id,'start')" plain>启用</el-button></div>
          </td>
        </tr>
        </tbody>
      </table>
      <div>
        <div align="center">
          <!--<span class="demonstration">调整每页显示条数</span>-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="20"
            layout="prev, pager, next"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
            <!-- /.box-body -->
          </div>

  </section>
</template>

<script>
  // import $ from 'jquery'
  import api from '../../api'
  import {formatDateBtk, formatStatus} from '../../filters/index.js'
  export default {
    filters: {
      BTKformatDate (time) {
        var date = new Date(time)
        return formatDateBtk(date, 'yyyy-MM-dd hh:mm')
      },
      FormatStatus (status) {
        return formatStatus(status)
      }
    },
    data () {
      return {
        currentPage: 1,
        // 为第一页或者最后一页时，首页，尾页不能点击
        fDisabled: false,
        lDisabled: false,
        // 总项目数
        totalCount: 40,
        // 分页数
        pageCount: 20,
        // 当前页面
        pageCurrent: 1,
        // 分页大小
        pagesize: 20,
        // 显示分页按钮数
        showPages: 11,
        // 开始显示的分页按钮
        showPagesStart: 1,
        // 结束显示的分页按钮
        showPageEnd: 100,
        // 分页数据
        arrayData: [],
        // 删除确认框
        dialogVisible: false,
        startTime: ''
      }
    },
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      resetPass (memberId) {
        this.$confirm('是否确定重置该用户登录密码 ' + ', 是否继续?', '提示', {type: 'warning'})
          .then(() => {
            // 向请求服务端删除
            // this.$message.info('操作成功!')
            var userid = localStorage.getItem('userid')
            api.request('get', 'member/detail?action=reset&memberId=' + memberId + '&operator_id=' + userid)
              .then(response => {
                this.$message.info('操作成功!')
                console.log(response.data)
                // reload
                api.request('post', 'member/list?userid=1&pageSize=20&pageIndex=0')
                  .then(response => {
                    console.log(response.data)
                    this.arrayData = response.data.body.orders
                    this.totalCount = response.data.body.status.totalCount
                    for (var i = 0; i < this.arrayData.length; i++) {
                      // this.arrayData.time = formatDateBtk(this.arrayData.time)
                      // this.arrayData.last_time = formatDateBtk(this.arrayData.last_time)
                      console.log()
                    }
                  })
                  .catch(error => {
                    // this.$store.commit('TOGGLE_LOADING')
                    console.log(error)
                    this.response = 'Server appears to be offline'
                  })
              })
              .catch(error => {
                // this.$store.commit('TOGGLE_LOADING')
                console.log(error)
                this.response = error
              })
          })
          .catch(() => {
            this.$message.info('已取消操作!')
          })
      },
      removeUser (memberId, action) {
        this.$confirm('是否继续?', '提示', {type: 'warning'})
          .then(() => {
            // 向请求服务端删除
            var userid = localStorage.getItem('userid')
            api.request('get', 'member/detail?memberId=' + memberId + '&operator_id=' + userid + '&action=' + action)
              .then(response => {
                console.log(response.data)
                this.$message.info('操作成功!')
                // reload
                api.request('post', 'member/list?userid=1&pageSize=20&pageIndex=0')
                  .then(response => {
                    console.log(response.data)
                    this.arrayData = response.data.body.orders
                    this.totalCount = response.data.body.status.totalCount
                    for (var i = 0; i < this.arrayData.length; i++) {
                      // this.arrayData.time = formatDateBtk(this.arrayData.time)
                      // this.arrayData.last_time = formatDateBtk(this.arrayData.last_time)
                      console.log()
                    }
                  })
                  .catch(error => {
                    // this.$store.commit('TOGGLE_LOADING')
                    console.log(error)
                    this.response = 'Server appears to be offline'
                  })
              })
              .catch(error => {
                // this.$store.commit('TOGGLE_LOADING')
                console.log(error)
                this.response = error
              })
          })
          .catch(() => {
            this.$message.info('已取消操作!')
          })
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        var userid = localStorage.getItem('userid')
        api.request('post', 'member/list?operator_id=' + userid + '&pageIndex=' + Number(val - 1) + '&pageSize=20' + this.startTime)
          .then(response => {
            // console.log(response.data)
            this.arrayData = response.data.body.orders
          })
          .catch(error => {
            // this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = 'Server appears to be offline'
          })
      },
      editUser (userId) {
        // this.$router.push('/org/edit?orgid=' + agentId)
        this.$router.push({path: '/user/edit?userid=' + userId})
      },
      getFavAlbum (memberId) {
        // this.$router.push('/org/edit?orgid=' + agentId)
        this.$router.push({path: '/album/list/fav?memberId=' + memberId})
      },
      getFavBook (memberId) {
        // this.$router.push('/org/edit?orgid=' + agentId)
        this.$router.push({path: '/book/list/fav?memberId=' + memberId})
      },
      getTodayMember () {
        this.startTime = '&startTime=1'
        // var userid = localStorage.getItem('userid')
        api.request('post', 'member/list?userid=1&pageSize=20&pageIndex=0&startTime=1')
          .then(response => {
            console.log(response.data)
            this.arrayData = response.data.body.orders
            this.totalCount = response.data.body.status.totalCount
            for (var i = 0; i < this.arrayData.length; i++) {
              // this.arrayData.time = formatDateBtk(this.arrayData.time)
              // this.arrayData.last_time = formatDateBtk(this.arrayData.last_time)
              console.log()
            }
          })
          .catch(error => {
            // this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = 'Server appears to be offline'
          })
      },
      getAllMember () {
        this.startTime = ''
        // var userid = localStorage.getItem('userid')
        api.request('post', 'member/list?userid=1&pageSize=20&pageIndex=0')
          .then(response => {
            console.log(response.data)
            this.arrayData = response.data.body.orders
            this.totalCount = response.data.body.status.totalCount
            for (var i = 0; i < this.arrayData.length; i++) {
              // this.arrayData.time = formatDateBtk(this.arrayData.time)
              // this.arrayData.last_time = formatDateBtk(this.arrayData.last_time)
              console.log()
            }
          })
          .catch(error => {
            // this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = 'Server appears to be offline'
          })
      }
    },
    created () {
      // var userid = localStorage.getItem('userid')
      api.request('post', 'member/list?userid=1&pageSize=20&pageIndex=0')
        .then(response => {
          console.log(response.data)
          this.arrayData = response.data.body.orders
          this.totalCount = response.data.body.status.totalCount
          for (var i = 0; i < this.arrayData.length; i++) {
            // this.arrayData.time = formatDateBtk(this.arrayData.time)
            // this.arrayData.last_time = formatDateBtk(this.arrayData.last_time)
            console.log()
          }
        })
        .catch(error => {
          // this.$store.commit('TOGGLE_LOADING')
          console.log(error)
          this.response = 'Server appears to be offline'
        })
    },
    mounted () {
      // this.showPage(this.pageCurrent, null, true)
    },
    computed: {}
  }

</script>

<style>
  /* Using the bootstrap style, but overriding the font to not draw in
     the Glyphicons Halflings font as an additional requirement for sorting icons.

     An alternative to the solution active below is to use the jquery style
     which uses images, but the color on the images does not match adminlte.

  @import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
  */
  @import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

  table.dataTable thead .sorting:after,
  table.dataTable thead .sorting_asc:after,
  table.dataTable thead .sorting_desc:after {
    font-family: 'FontAwesome';
  }

  table.dataTable thead .sorting:after {
    content: "\f0dc";
  }

  table.dataTable thead .sorting_asc:after {
    content: "\f0dd";
  }

  table.dataTable thead .sorting_desc:after {
    content: "\f0de";
  }
</style>
