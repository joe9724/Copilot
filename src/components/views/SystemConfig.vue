<template>
  <section class="content">

    <div class="row center-block">
      <h2></h2>
      <div class="col-md-12">
        <div class="box">
          <!--<div class="box-header">
            <h3 class="box-title">Data Table With Full Features</h3>
          </div>-->
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <!--
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length">

                  </div>
                </div>
              </div>-->

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <div class="tTable container body-content">
                    <div class="form-group">
                      <div class="form-group">
                        <div class="page-header">
                          表格
                        </div>
                        <table class="table table-bordered table-responsive table-striped">
                          <thead>
                          <tr>
                            <th>序号</th>
                            <th>点击数</th>
                            <th>点击数</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="(item,index) in arrayData" v-bind:key="item.name">
                            <td>{{index + 1}}</td>
                            <td>{{item.name}}</td>
                            <td></td>
                          </tr>
                          </tbody>
                        </table>
                        <div>
                          <div class="block">
                            <span class="demonstration">调整每页显示条数</span>
                            <el-pagination
                              @size-change="handleSizeChange"
                              @current-change="handleCurrentChange"
                              :current-page.sync="currentPage"
                              :page-sizes="[10, 20, 30, 40]"
                              :page-size="10"
                              layout="sizes, prev, pager, next"
                              :total="totalCount">
                            </el-pagination>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
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
        arrayData: []
      }
    },
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        api.request('get', 'http://127.0.0.1:8080' + '/mock/devicelist' + (val) + '.json')
          .then(response => {
            console.log(response.data)
            this.arrayData = response.data.data
          })
          .catch(error => {
            // this.$store.commit('TOGGLE_LOADING')
            console.log(error)
            this.response = 'Server appears to be offline'
          })
      }
//      showPage (pageIndex, $event, forceRefresh) {
//        if (pageIndex > 0) {
//          if (pageIndex > this.pageCount) {
//            pageIndex = this.pageCount
//          }
//          // 判断数据是否需要更新
//          var currentPageCount = Math.ceil(this.totalCount / this.pagesize)
//          if (currentPageCount !== this.pageCount) {
//            pageIndex = 1
//            this.pageCount = currentPageCount
//          } else if (this.pageCurrent === pageIndex && currentPageCount === this.pageCount && typeof (forceRefresh) === 'undefined') {
//            return
//          }
//
//          // 处理分页点中样式
//          var buttons = $('#pager').find('span')
//          // console.log(buttons)
//          for (var i = 0; i < buttons.length; i++) {
//            console.log('pageIndex is' + pageIndex + 'html() is' + buttons.eq(i).text())
//            if (buttons.find('span').eq(i).html() !== pageIndex) {
//              buttons.eq(i).removeClass('active')
//              // console.log('if')
//            } else {
//              buttons.eq(0).addClass('active')
//              // console.log('sdfjh')
//              buttons.eq(i).addClass('active')
//            }
//          }
//          // 测试数据 随机生成的
//          var newPageInfo = []
//          var time = new Date()
//          for (var k = 0; k < this.pagesize; k++) {
//            newPageInfo[newPageInfo.length] = {
//              timestamp: time,
//              count: (k + (pageIndex - 1) * 20)
//            }
//          }
//          this.pageCurrent = pageIndex
//          this.arrayData = newPageInfo
//          // 如果当前页首页或者尾页，则上一页首页就不能点击，下一页尾页就不能点击
//          if (this.pageCurrent === 1) {
//            this.fDisabled = true
//          } else if (this.pageCurrent === this.pageCount) {
//            this.lDisabled = true
//          } else {
//            this.fDisabled = false
//            this.lDisabled = false
//          }
//
//          // 计算分页按钮数据
//          if (this.pageCount > this.showPages) {
//            if (pageIndex <= (this.showPages - 1) / 2) {
//              this.showPagesStart = 1
//              this.showPageEnd = this.showPages - 1
//              console.log('showPage1')
//            } else if (pageIndex >= this.pageCount - (this.showPages - 3) / 2) {
//              this.showPagesStart = this.pageCount - this.showPages + 2
//              this.showPageEnd = this.pageCount
//              console.log('showPage2')
//            } else {
//              console.log('showPage3')
//              this.showPagesStart = pageIndex - (this.showPages - 3) / 2
//              this.showPageEnd = pageIndex + (this.showPages - 3) / 2
//            }
//          }
//          console.log('showPagesStart:' + this.showPagesStart + ',showPageEnd:' + this.showPageEnd + ',pageIndex:' + pageIndex)
//        }
//      }
    },
    created () {
      api.request('get', 'http://127.0.0.1:8080' + '/mock/devicelist.json')
        .then(response => {
          console.log(response.data)
          this.arrayData = response.data.data
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
