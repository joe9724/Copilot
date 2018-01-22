<template>
  <div>
    <!--<h5 class="text-center">编辑专辑</h5>-->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标题">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
              <el-input v-model="form.subTitle"></el-input>
            </el-form-item>
            <el-form-item label="文件">
              <img src="/static/img/play.png" style="width: 20px;height:20px"><el-input v-model="form.url"></el-input>
            </el-form-item>

            <el-form-item label="简介">
              <el-input v-model="form.summary" type="textarea"
                        :autosize="{ minRows: 10, maxRows: 30}"></el-input>
            </el-form-item>
            <!--<el-form-item label="描述">
              <el-input v-model="form.content"></el-input>
            </el-form-item>-->
            <!--<el-form-item label="定价">
              <el-input-number v-model="form.price" @change="handleChange" :min="1" :max="10000" label="改变价格"></el-input-number>
            </el-form-item>-->
            <el-form-item label="小图">
           <!-- <el-input v-model="form.name"></el-input>--><img v-bind:src=form.icon style="width: 60px;height:80px">
          </el-form-item>

           <!-- <el-form-item label="大图">
              <el-input v-model="form.name"></el-input>
            </el-form-item>-->
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
          title: '',
          subTitle: '',
          summary: '',
          content: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          status: '',
          icon: '',
          price: ''
        },
        num1: 1,
        chapterId: 0,
        icon: ''
      }
    },
    methods: {
      handleChange (value) {
        // console.log(value)
      },
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
    },
    created () {
      // alert('created!')
      //
      var chapterId = '0'
      if (this.$route.query.chapterId) {
        chapterId = this.$route.query.chapterId
        this.chapterId = this.$route.query.chapterId
      }
      // console.log('currentUserId is' + currentUserId)
      api.request('get', 'chapter/detail?userid=1&chapterId=' + chapterId)
        .then(response => {
          var data = response.data.body.data
          // this.form.pass = '******'
          this.form.title = data.name
          this.form.subTitle = data.subTitle
          this.form.price = data.value
          this.form.summary = data.summary
          this.form.icon = data.icon
          this.form.url = data.url
          if (data.status === 0) {
            this.form.status = '正常'
          } else {
            this.form.status = '锁定'
          }
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
