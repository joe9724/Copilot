<template>
  <div>
    <!--<h5 class="text-center">编辑专辑</h5>-->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
              <el-input v-model="form.icon"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio label="正常"></el-radio>
                <el-radio label="锁定"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确定</el-button>
              <!--<el-button>确定</el-button>-->
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import api from '../../api'

  export default {
    data () {
      return {
        form: {
          name: '',
          icon: '',
          status: ''
        },
        categoryId: 0
      }
    },
    methods: {
      handleChange (value) {
        // console.log(value)
      },
      onSubmit () {
        var userid = localStorage.getItem('userid')
        var params = {
          'operator_id': userid,
          'agency_id': '123',
          'agency_name': this.form.agentName,
          'contact_name': this.form.contactName,
          'contact_number': this.form.contactNumber,
          'contact_addr': this.form.contactAddr,
          'status': this.form.status === '正常' ? 200 : -1
        }
        api.request('post', 'agency/add', params)
          .then(response => {
            var data = response.data
            console.log(JSON.stringify(data))
            if (data.status !== 200) {
              console.log('2')
              this.response = data.message
              return
            }
            if (data.status === 0) {
              console.log('4')
              this.response = data.message
              this.$router.push('/agencyList')
              // console.log('path is' + JSON.stringify(data.data.paths[0].children[0].path))
            }
          })
          .catch(error => {
            console.log(error)
            this.response = error
          })
      }
    },
    created () {
      // alert('created!')
      //
      var categoryId = '0'
      if (this.$route.query.categoryId) {
        categoryId = this.$route.query.categoryId
        this.categoryId = this.$route.query.categoryId
      }
      // console.log('currentUserId is' + currentUserId)
      api.request('get', 'category/detail?categoryId=' + categoryId)
        .then(response => {
          var data = response.data.body.data
          // this.form.pass = '******'
          this.form.name = data.name
          this.form.icon = data.icon
          this.form.status = data.status
        })
        .catch(error => {
          // this.$store.commit('TOGGLE_LOADING')
          console.log(error)
          this.response = 'Server appears to be offline'
        })
    }
  }
</script>

<style>
  .datetime-picker input {
    height: 4em !important;
  }
</style>
