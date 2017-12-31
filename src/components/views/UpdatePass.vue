<template>
  <div>
    <!--<h4 class="text-center">编辑用户</h4>-->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="新密码">
              <el-input v-model="form.newpass"></el-input>
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
          newpass: ''
        }
      }
    },
    methods: {
      onSubmit () {
        // this.$router.push('/users')
        console.log('submit!')
        var userid = localStorage.getItem('userid')
        var params = {
          'operator_id': userid,
          'user_id': userid,
          'password': this.form.newpass
        }
        api.request('post', 'user/updatePwd', params)
          .then(response => {
            var data = response.data
            console.log(JSON.stringify(data))
            if (data.status !== 200) {
              console.log('2')
              this.response = data.message
              return
            } else {
              console.log('修改成功')
            }
            if (data.status === 0) {
              console.log('4')
              this.response = data.message
              // this.$router.push('/deviceList')
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
    }
  }
</script>

<style>
.datetime-picker input {
  height: 4em !important;
}
</style>
