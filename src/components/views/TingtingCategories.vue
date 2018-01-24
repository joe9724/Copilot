<template>
  <section class="content">

    <div class="row center-block" style="background: #ffffff">
      <div id="example1_length" class="dataTables_length">
        <router-link  class="pageLink" to="/category/add">
          <a>
            <span class="page" style="float:right;margin:5px"><el-button type="success" plain>添加类目</el-button></span>

          </a>
        </router-link>

      </div>
      <table class="table table-bordered table-responsive table-striped">
        <thead>
        <tr>
          <th style='text-align: center'>序号</th>
          <th style='text-align: center'>名称</th>
          <th style='text-align: center'>图标</th>
          <!--<th>副标题</th>-->
          <!--<th>是否显示icon</th>-->
          <!--<th>大图</th>-->
          <th style='text-align: center'>状态</th>
          <!--<th>播放数</th>
          <!--<th>更新提示</th>-->
         <!-- <th>播放地址</th>
          <th>顺序</th>
          <th>状态</th>
          <th>时间</th>-->
          <th style='text-align: center'>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in arrayData" v-bind:key="item.name">
          <td align="center">{{index+1}}</td>
          <td align="center">{{item.name}}</td>
          <td align="center"><img v-bind:src=item.icon style="width: 20px;height:20px"> </td>
          <!--<td class="sorting_1" style="vertical-align: middle">{{item.subTitle}}</td>-->
          <!--<td class="sorting_1" style="vertical-align: middle">{{item.showIcon}}</td>-->
          <!--<td class="sorting_1" style="vertical-align: middle">{{item.bigCover}}</td>-->
          <td align="center">{{item.status | FormatStatus}}</td>
          <!--<td class="sorting_1" style="vertical-align: middle">{{item.clipsNumber}}</td>-->
          <!--<td class="sorting_1" style="vertical-align: middle">{{item.duration}}</td>
          &lt;!&ndash;<td class="sorting_1" style="vertical-align: middle">{{item.updateTips}}</td>&ndash;&gt;
          <td class="sorting_1" style="vertical-align: middle">{{item.url}}</td>
          <td class="sorting_1" style="vertical-align: middle">{{item.order}}</td>
          <td class="sorting_1" style="vertical-align: middle">{{item.status | FormatStatus}}</td>
          <td class="sorting_1" style="vertical-align: middle">{{item.time*1000 | BTKformatDate}}</td>-->
          <td align="center">
            <el-button type="text" @click="editChildren(item.id)">子类</el-button>
            <el-button type="text" @click="editCategory(item.id)">编辑</el-button>
            <el-button type="text" @click="removeCategory(item.id)">删除</el-button>
          </td>
        </tr>
        </tbody>
      </table>
      <div align="center">
        <div class="block">
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
        dialogVisible: false,
        // 默认父id
        parentId: -1
      }
    },
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      removeCategory (id) {
        this.$confirm('此操作将永久删除 ' + ', 是否继续?', '提示', {type: 'warning'})
          .then(() => {
            // 向请求服务端删除
            var userid = localStorage.getItem('userid')
            api.request('get', 'category/delete?categoryId=' + id + '&operator_id=' + userid)
              .then(response => {
                console.log(response.data)
                this.$message.info('删除成功!')
                // reload
                api.request('get', 'category/list?userid=1&pageSize=12&pageIndex=1&parentId=-1')
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
        api.request('get', 'category/list?userid=' + userid + '&pageIndex=' + (Number(val) - 1) + '&pageSize=12&parentId=-1')
          .then(response => {
            console.log(response.data)
            this.arrayData = response.data.body.subCategoryList
          })
          .catch(error => {
            // this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = 'Server appears to be offline'
          })
      },
      editCategory (id) {
        this.$router.push({path: '/category/edit?categoryId=' + id})
      },
      editChildren (id) {
        this.$router.push({path: '/subCategory/list?subCategoryId=' + id})
      }
    },
    created () {
      // var userid = localStorage.getItem('userid')
      api.request('get', 'category/list?userid=1&pageSize=12&pageIndex=0&parentId=-1')
        .then(response => {
          console.log(response.data)
          this.arrayData = response.data.body.subCategoryList
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
