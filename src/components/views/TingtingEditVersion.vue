<template>
  <div>
    <!--<h5 class="text-center">编辑Banner</h5>-->
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="客户端">
              <el-input v-model="form.client"></el-input>
            </el-form-item>
            <el-form-item label="版本号">
              <el-input v-model="form.number"></el-input>
            </el-form-item>
            <el-form-item label="版本信息">
              <el-input v-model="form.msg"></el-input>
            </el-form-item>
            <el-form-item label="下载地址">
              <el-input v-model="form.downloadUrl"></el-input>
            </el-form-item>
            <el-form-item label="强制升级">
              <el-radio-group v-model="form.force">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="图片">
              <img v-bind:src="imgUrl"/>
              <vue-core-image-upload
                class="btn btn-primary"
                :crop="false"
                @imageuploaded="imageUploaded"
                :data="data"
                :max-file-size="5242880"
                inputOfFile="file"
                text="选择图片"
                :credentials="false"
                :url="uploadUrl">

              </vue-core-image-upload>
            </el-form-item>
            <el-form-item>
              <!--<vue-editor id="editor"
                          useCustomImageHandler
                          @imageAdded="handleImageAdded" v-model="htmlForEditor">
              </vue-editor>-->
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
  import configParams from '../../config'
  import api from '../../api'
  import { VueEditor } from 'vue2-editor'
  import VueCoreImageUpload from '../../../node_modules/vue-core-image-upload/src/vue-core-image-upload.vue'

  export default {
    components: {
      VueEditor,
      'vue-core-image-upload': VueCoreImageUpload
    },
    data () {
      return {
        src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
        htmlForEditor: '',
        uploadUrl: '',
        imgUrl: '',
        form: {
          force: '',
          client: '',
          msg: '',
          number: '',
          downloadUrl: '',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          resource: '',
          desc: '',
          status: '',
          author: '',
          content: '',
          type: '',
          jumpid: '',
          jumpurl: '',
          fileList2: [{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }]
        }
      }
    },
    created () {
      this.uploadUrl = configParams.uploadURI
      var id = '0'
      if (this.$route.query.id) {
        id = this.$route.query.id
        this.id = this.$route.query.id
      }
      api.request('get', 'appVersion/detail?userid=1&id=' + id)
        .then(response => {
          var data = response.data.body.data
          // this.form.pass = '******'
          this.form.force = data.force
          this.form.client = data.client
          this.form.msg = data.msg
          this.form.number = data.number
          this.form.downloadUrl = data.downloadUrl
          this.imgUrl = data.cover
          if (data.force === 0) {
            this.form.force = '是'
          } else {
            this.form.force = '否'
          }
        })
        .catch(error => {
          // this.$store.commit('TOGGLE_LOADING')
          console.log(error)
          this.response = 'Server appears to be offline'
        })
    },
    methods: {
      imageUploaded (response) {
        console.log('response is', response)
        this.src = response.body.url
        this.imgUrl = response.body.url
        // alert(this.imgUrl)
        // this.imgUrl = 'https://upload.jianshu.io/users/upload_avatars/2204269/54bc6df9d4b6.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240'
      },
      handleRemove (file, fileList) {
        this.imgUrl = ''
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      onEditorBlur (editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus (editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady (editor) {
        console.log('editor ready!', editor)
      },
      onSubmit () {
        // alert(this.content)
        // this.$router.push('/org')
        // console.log('submit!')
        var id = '0'
        if (this.$route.query.id) {
          id = this.$route.query.id
          this.id = this.$route.query.id
        }
        var userid = localStorage.getItem('userid')
        console.log(userid)
        let formData = new FormData()
        formData.append('id', Number(id))
        formData.append('force', this.form.force)
        formData.append('client', this.form.client)
        formData.append('msg', this.form.msg)
        formData.append('number', this.form.number)
        formData.append('downloadUrl', this.form.downloadUrl)
        if (this.form.force === '是') {
          formData.append('force', Number(0))
        } else {
          formData.append('force', Number(1))
        }
        if (this.imgUrl !== '') {
          formData.append('cover', this.imgUrl)
        }
        // formData.append('file', this.file)

        api.requestForm('post', 'appVersion/edit', formData)
          .then(response => {
            var data = response.data
            console.log(JSON.stringify(data))
            alert('ok')
          })
          .catch(error => {
            console.log(error)
            this.response = error
          })
      },
      handleImageAdded: function (file, Editor, cursorLocation) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)

        var formData = new FormData()
        formData.append('file', file)
        api.requestForm('post', 'file/upload', formData)
          .then((response) => {
            console.log('resultstr is', JSON.stringify(response.data.body))
            let url = response.data.body.url // Get url from response
            Editor.insertEmbed(cursorLocation, 'image', url)
          })
          .catch((err) => {
            console.log(err)
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
