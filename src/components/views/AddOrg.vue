<template>
  <div>
    <h1 class="text-center">添加组织</h1>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
              <el-input v-model="form.agentName"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="form.contactName"></el-input>
            </el-form-item>
            <el-form-item label="联系号码">
              <el-input v-model="form.contactNumber"></el-input>
            </el-form-item>
            <el-form-item label="联系地址">
              <el-input v-model="form.contactAddr"></el-input>
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
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          status: ''
        }
      }
    },
    methods: {
      onSubmit () {
        // this.$router.push('/org')
        // console.log('submit!')
        console.log('name is' + this.form.agentName)
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
    }
  }
</script>

<style>
  .datetime-picker input {
    height: 4em !important;
  }
</style>
