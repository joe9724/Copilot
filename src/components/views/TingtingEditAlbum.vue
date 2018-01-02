<template>
  <section class="content">

    <div class="row center-block" style="background: #ffffff">
      <!--
      <div id="example1_length" class="dataTables_length">
        <router-link  class="pageLink" to="/album/add">
          <a>
            <span class="page" style="float:right;margin:5px"><el-button type="success" plain>添加专辑</el-button></span>

          </a>
        </router-link>

      </div>
      -->
      <el-transfer
        v-model="value3"
        filterable
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :render-content="renderFunc"
        :titles="['Source', 'Target']"
        :button-texts="['到左边', '到右边']"
        :format="{
      noChecked: '${total}',
      hasChecked: '${checked}/${total}'
    }"
        @change="handleChange"
        :data="data">
        <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
        <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
      </el-transfer>
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
      const generateData = _ => {
        const data = []
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 $ { i }`,
            disabled: i % 4 === 0
          })
        }
        return data
      }
      return {
        data: generateData(),
        value3: [1],
        renderFunc (h, option) {
          return '<span>' + option.key - option.label + '</span>'
        }
      }
    },
    methods: {
      handleChange (value, direction, movedKeys) {
        console.log(value, direction, movedKeys)
      },
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
        api.request('get', 'book/list?userid=' + userid + '&pageIndex=' + val + '&pageSize=10')
          .then(response => {
            console.log(response.data)
            this.arrayData = response.data.body.bookList
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
      api.request('get', 'album/list?userid=1&pageSize=12&pageIndex=1')
        .then(response => {
          console.log(response.data)
          this.arrayData = response.data.body.albumList
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
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>
