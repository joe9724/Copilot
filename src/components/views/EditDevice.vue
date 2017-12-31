<template>
  <div>
    <!--<h4 class="text-center">编辑设备</h4>-->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="编号">
              <el-input v-model="form.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="所属组织">
              <el-select v-model="value" placeholder="请选择所属组织" value-key="agency_id">
                <el-option v-for="item in options" :label="item.agency_name" :value="item" :key="item.agency_id"/>
              </el-select>
            </el-form-item>
            <!--{{value}}-->
            <!--<el-form-item label="活动形式">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>-->
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio label="正常"></el-radio>
                <el-radio label="锁定"></el-radio>
                <el-radio label="无效"></el-radio>
                <el-radio label="未分配"></el-radio>
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
          id: '',
          region: '',
          defautvalue: '',
          status: ''
        },
        desc: '',
        desc_status: '',
        options: [{
          agency_id: '选项1',
          agency_name: '黄金糕'
        }],
        value: ''
      }
    },
    methods: {
      changed () {
        console.log('changed')
        let me = this
        console.log('me =' + me.agency_id)
      },
      onSubmit () {
        // this.$router.push('/org')
        // console.log('submit!')
        console.log('name is' + this.form.agentName)
        var deviceNo = 'abc'
        if (this.$route.query.device_no) {
          deviceNo = this.$route.query.device_no
        }
        var userid = localStorage.getItem('userid')
        var statusValue = ''
        if (this.form.status === '正常') {
          statusValue = '200'
        } else if (this.form.status === '锁定') {
          statusValue = '-1'
        } else if (this.form.status === '无效') {
          statusValue = '-100'
        } else if (this.form.status === '未分配') {
          statusValue = '100'
        }
        var params = {
          'operator_id': userid,
          'device_no': deviceNo,
          'device_name': this.form.name,
          'agency_id': this.value.agency_id,
          'latitude': 0,
          'longitude': 0,
          'status': statusValue
        }
        api.request('post', 'device/edit', params)
          .then(response => {
            var data = response.data
            console.log(JSON.stringify(data))
            if (data.status !== 200) {
              console.log('2')
              this.response = data.message
              return
            }
            if (data.status === 200) {
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
      // 先获取组织机构列表
      var userid = localStorage.getItem('userid')
      api.request('get', 'agency/list?operator_id=' + userid + '&page=1&size=12')
        .then(response => {
          console.log(response.data)
          this.options = response.data.datas
        })
        .catch(error => {
          // this.$store.commit('TOGGLE_LOADING')
          console.log(error)
          this.response = 'Server appears to be offline'
        })
      // 再获取设备信息
      var deviceNo = 'abc'
      if (this.$route.query.device_no) {
        deviceNo = this.$route.query.device_no
      }
      api.request('get', 'device/view?operator_id=' + userid + '&device_no=' + deviceNo)
        .then(response => {
          var msg = response.data.data
          console.log('msg is' + msg)
          this.form.name = msg.device_name
          this.form.id = msg.device_no
          this.form.status = msg.status_desc
          this.value = msg.agency_name
          // 设置所属组织机构初始值
          // this.form.defaultvalue = msg.agency_id
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
