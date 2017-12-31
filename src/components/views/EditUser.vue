<template>
  <div>
    <!--<h4 class="text-center">编辑用户</h4>-->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="gender">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="优先级">
              <el-radio-group v-model="form.priority">
                <el-radio label="曲线图优先"></el-radio>
                <el-radio label="数据优先"></el-radio>
                <el-radio label="实时数据优先"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="组织机构">
              <el-select v-model="value" placeholder="请选择所属组织" value-key="agency_id" @change="change()">
                <el-option v-for="item in options" :label="item.agency_name" :value="item" :key="item.agency_id"/>
              </el-select>
            </el-form-item>
            <!--{{value}}-->
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio label="正常"></el-radio>
                <el-radio label="锁定"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="设备">
              <el-checkbox-group v-model="deviceList">
                <!--&lt;!&ndash;<el-checkbox label="复选框 A"></el-checkbox>-->
                <!--<el-checkbox label="复选框 B"></el-checkbox>-->
                <!--<el-checkbox label="复选框 C"></el-checkbox>-->
                <!--<el-checkbox label="禁用" disabled></el-checkbox>&ndash;&gt;-->
                <el-checkbox v-for="item in chooseList" :label="item.device_name" :data-device_no="item.device_no"
                             @change="getChecked(item.device_no)"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!--<el-form-item label="活动形式">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>-->
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
          pass: '',
          gender: '',
          region: '',
          group: '',
          status: false,
          devicelist: [],
          priority: ''
        },
        radio: '',
        gender: '',
        deviceList: [],
        options: [],
        value: '',
        priOrity: '',
        chooseList: [{'device_name': 'name', 'device_no': 'no'}],
        newList: [],
        temp_agencyId: 'abc',
        currentUserId: ''
      }
    },
    methods: {
      change () {
        // alert(this.value.agency_id)
        var userid = localStorage.getItem('userid')
        // alert(this.value)
        // 根据组织机构名称获得组织机构ID
        if (this.value.agency_id) {
          // 手动改变组织机构后
          this.temp_agencyId = this.value.agency_id
          api.request('get', 'agency/devices?operator_id=' + userid + '&agency_id=' + this.temp_agencyId)
            .then(response => {
              var msg = response.data.datas
              console.log('msg is' + msg)
//            this.deviceList = msg
              this.chooseList = msg
            })
            .catch(error => {
              // this.$store.commit('TOGGLE_LOADING')
              console.log(error)
              this.response = 'Server appears to be offline'
            })
        }
      },
      getChecked (deviceNo) {
//        console.log(this)
        console.log('this.deviceList = ' + deviceNo)
        var valObj = this.newList.filter(function (elem) {
          if (elem === deviceNo) return elem
        })
        if (valObj.length > 0) {
          this.newList.pop(deviceNo)
        } else {
          if (valObj != null) {
            this.newList.push(deviceNo)
          }
        }
        console.log('this.newList = ' + this.newList)
      },
      onSubmit () {
        // this.$router.push('/users')
        var priOrity
        if (this.form.priority === '曲线图优先') {
          priOrity = 'curve'
        } else if (this.form.priority === '数据优先') {
          priOrity = 'data'
        } else if (this.form.priority === '实时数据优先') {
          priOrity = 'realData'
        }
        console.log('priOrity is' + priOrity)
        var userid = localStorage.getItem('userid')
        var params = {
          'operator_id': userid,
          'user_id': this.currentUserId,
          'user_name': this.form.name,
          'password': this.form.password,
          'gender': this.form.gender === '男' ? 0 : 1,
          'birth': '',
          'mobile': this.form.phone,
          'agency_id': this.temp_agencyId,
          'related_devices': this.newList,
          'role': this.form.role,  // root admin customer
          'status': this.form.status === '正常' ? 200 : -1,
          'priority': priOrity
        }
        api.request('post', 'user/edit', params)
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
              this.$router.push('/deviceList')
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
      var currentUserId = 'abc'
      if (this.$route.query.userid) {
        currentUserId = this.$route.query.userid
        this.currentUserId = this.$route.query.userid
      }
      // console.log('currentUserId is' + currentUserId)
      api.request('get', 'user/view?operator_id=' + userid + '&user_id=' + currentUserId)
        .then(response => {
          var msg = response.data.data
          console.log('msg is' + msg)
          // this.form.pass = '******'
          this.form.name = msg.user_name
          this.form.contactName = msg.contact_name
          this.form.contactNumber = msg.contact_number
          this.form.contactAddr = msg.contact_addr
          this.form.status = msg.status_desc
          this.form.gender = msg.gender
          this.radio = 0
          this.gender = msg.gender
          this.chooseList = msg.devices
          // 设置组织机构默认值
          this.value = msg.agency_name
          // this.value.agency_id = msg.agency_id
          this.temp_agencyId = msg.agency_id
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
