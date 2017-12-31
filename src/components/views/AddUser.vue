<template>
  <div>
    <h4 class="text-center">添加用户</h4>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="用户角色">
              <el-radio-group v-model="form.role">
                <el-radio label="root"></el-radio>
                <el-radio label="admin"></el-radio>
                <el-radio label="customer"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="优先级">
            <el-radio-group v-model="form.priority">
              <el-radio label="曲线图优先"></el-radio>
              <el-radio label="数据优先"></el-radio>
              <el-radio label="实时数据优先"></el-radio>
            </el-radio-group>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="组织机构">
              <el-select v-model="value" placeholder="请选择所属组织" value-key="agency_id" @change="change()">
                <el-option v-for="item in options" :label="item.agency_name" :value="item" :key="item.agency_id" />
              </el-select>
            </el-form-item>
            <!--{{value}}-->
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio label="正常"></el-radio>
                <el-radio label="锁定"></el-radio>
              </el-radio-group>
            </el-form-item>
           <!-- <el-form-item label="活动时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="即时配送">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>-->
            <el-form-item label="设备">
              <el-checkbox-group v-model="deviceList">
                <!--&lt;!&ndash;<el-checkbox label="复选框 A"></el-checkbox>-->
                <!--<el-checkbox label="复选框 B"></el-checkbox>-->
                <!--<el-checkbox label="复选框 C"></el-checkbox>-->
                <!--<el-checkbox label="禁用" disabled></el-checkbox>&ndash;&gt;-->
                <el-checkbox v-for="item in chooseList" :label="item.device_name" :data-device_no="item.device_no" @change="getChecked(item.device_no)"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            {{deviceList}}
            {{chooseList}}
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
        // 分页数据
        arrayData: [],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          phone: '',
          role: '',
          priority: '',
          gender: '',
          status: ''
        },
        options: [],
        value: '',
        priOrity: '',
        deviceList: [],
        chooseList: [{'device_name': 'name', 'device_no': 'no'}],
        newList: []
      }
    },
    methods: {
      change () {
        // alert(this.value.agency_id)
        var userid = localStorage.getItem('userid')
        api.request('get', 'agency/devices?operator_id=' + userid + '&agency_id=' + this.value.agency_id)
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
        var userid = localStorage.getItem('userid')
        var params = {
          'operator_id': userid,
          'user_name': this.form.name,
          'password': this.form.password,
          'gender': this.form.gender === '男' ? 0 : 1,
          'birth': '',
          'mobile': this.form.phone,
          'agency_id': this.value.agency_id,
          'related_devices': this.newList,
          'role': this.form.role,  // root admin customer
          'status': this.form.status === '正常' ? 200 : -1,
          'priority': priOrity
        }
        api.request('post', 'user/add', params)
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
    },
    mounted () {
      // this.showPage(this.pageCurrent, null, true)
    },
    computed: {}
  }
</script>

<style>
.datetime-picker input {
  height: 4em !important;
}
</style>
