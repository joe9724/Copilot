<template>
  <section class="content">

    <div class="row center-block" style="background: #ffffff">
      <div id="example1_length" class="dataTables_length">
        <router-link  class="pageLink" to="/user/add">
          <a>
            <span class="page" style="float:right;margin:5px"><el-button type="success" plain>添加用户</el-button></span>

          </a>
        </router-link>

      </div>
      <table class="table table-bordered table-responsive table-striped">
        <thead>
        <tr>
          <th style='text-align: center'>序号</th>
          <th style='text-align: center'>头像</th>
          <th style='text-align: center'>性别</th>
          <th style='text-align: center'>用户名</th>
          <th style='text-align: center'>角色</th>
          <th style='text-align: center'>状态</th>
          <th style='text-align: center'>时间</th>
          <th style='text-align: center'>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in arrayData" v-bind:key="item.name">
          <td style='text-align: center'>{{index+1}}</td>
          <td style='text-align: center'>{{item.avatar}}</td>
          <td style='text-align: center'>{{item.gender}}</td>
          <td style='text-align: center'>{{item.name}}</td>
          <td style='text-align: center'>{{item.role}}</td>
          <td style='text-align: center'>{{item.status | FormatStatus}}</td>
          <td style='text-align: center'>{{item.time*1000 | BTKformatDate}}</td>
          <td style='text-align: center'>
            <el-button type="text" @click="editUser(item.id)">编辑</el-button>
            <el-button type="text" @click="removeUser(item.id)">删除</el-button>
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
            :page-size="10"
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
        pagesize: 10,
        // 显示分页按钮数
        showPages: 11,
        // 开始显示的分页按钮
        showPagesStart: 1,
        // 结束显示的分页按钮
        showPageEnd: 100,
        // 分页数据
        arrayData: [],
        // 删除确认框
        dialogVisible: false
      }
    },
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      removeUser (userId) {
        this.$confirm('此操作将永久删除 ' + ', 是否继续?', '提示', {type: 'warning'})
          .then(() => {
            // 向请求服务端删除
            var userid = localStorage.getItem('userid')
            api.request('get', 'user/delete?user_id=' + userId + '&operator_id=' + userid)
              .then(response => {
                console.log(response.data)
                this.$message.info('删除成功!')
                // reload
                api.request('get', 'user/list?operator_id=' + userid + '&page=1&size=10')
                  .then(response => {
                    console.log(response.data)
                    this.arrayData = response.data.datas
                  })
                  .catch(error => {
                    // this.$store.commit('TOGGLE_LOADING')
                    console.log(error)
                    this.response = error
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
        api.request('get', 'user/list?operator_id=' + userid + '&page=' + val + '&size=10')
          .then(response => {
            console.log(response.data)
            this.arrayData = response.data.datas
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
      }
    },
    created () {
      // var userid = localStorage.getItem('userid')
      api.request('get', 'user/list?userid=1&pageSize=12&pageIndex=1')
        .then(response => {
          console.log(response.data)
          this.arrayData = response.data.body.users
          for (var i = 0; i < this.arrayData.length; i++) {
            this.arrayData.time = formatDateBtk(this.arrayData.time)
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
