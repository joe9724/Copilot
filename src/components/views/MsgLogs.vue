<template>
  <section class="content">

    <div class="row center-block" style="background: #ffffff">
      <table class="table table-bordered table-responsive table-striped">
        <thead>
        <tr>
          <th>序号</th>
          <th>设备id</th>
          <th>时间</th>
          <th>IP</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in arrayData" v-bind:key="item.device_id">
          <td class="sorting_1" style="vertical-align: middle">{{index+1}}</td>
          <td class="sorting_1" style="vertical-align: middle">{{item.device_id}}</td>
          <td class="sorting_1" style="vertical-align: middle">{{item.create_time*1000 | BTKformatDate}}</td>
          <td class="sorting_1" style="vertical-align: middle">{{item.source_ip}}</td>
          <td class="sorting_1" style="vertical-align: middle"><el-button type="text" @click="dialogVisible = true">查看数据</el-button><el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>{{item.content}}</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">关 闭</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
          </el-dialog></td>
        </tr>
        </tbody>
      </table>
      <div>
        <div class="block">
          <!--<span class="demonstration">调整每页显示条数</span>-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout=" prev, pager, next"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  // import $ from 'jquery'
  import api from '../../api'

  export default {
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
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        var userid = localStorage.getItem('userid')
        api.request('get', 'log/message?operator_id=' + userid + '&page=' + val + '&size=12')
          .then(response => {
            // console.log(response.data)
            this.arrayData = response.data.datas
          })
          .catch(error => {
            // this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = 'Server appears to be offline'
          })
      }
    },
    created () {
      var userid = localStorage.getItem('userid')
      api.request('get', 'log/message?operator_id=' + userid + '&page=1&size=12')
        .then(response => {
          // console.log(response.data)
          this.arrayData = response.data.datas
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
