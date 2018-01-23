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
            <el-form-item label="图片">
              <el-upload
                class="upload-demo"
                action="http://192.168.200.208:81/nanjingyouzi/TingtingBackend/1.0.0/file/upload"
                :on-preview="handlePreview"
                :on-success="successUpload"
                :on-remove="handleRemove"
                :file-list="fileList2"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>

            <vue-editor id="editor"
                        useCustomImageHandler
                        @imageAdded="handleImageAdded" v-model="htmlForEditor">
            </vue-editor>
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
  import { VueEditor } from 'vue2-editor'

  export default {
    components: {
      VueEditor
    },
    data () {
      return {
        htmlForEditor: '',
        uploadUrl: 'http://192.168.200.208:81/nanjingyouzi/TingtingBackend/1.0.0/file/upload',
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
          price: '',
          fileList2: [{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }]
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
      successUpload (response, file, fileList) {
        console.log('response is ' + JSON.stringify(response))
        this.imgUrl = response.body.url
        console.log(this.imgUrl)
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
        var userid = localStorage.getItem('userid')
        console.log(userid)
        let formData = new FormData()
        formData.append('name', this.form.name)
        if (this.form.status === '正常') {
          formData.append('status', Number(0))
        } else {
          formData.append('status', Number(1))
        }
        formData.append('subTitle', 'subTitle')
        formData.append('title', this.form.title)
        formData.append('authorName', this.form.author)
        formData.append('summary', this.htmlForEditor)
        if (this.imgUrl !== '') {
          formData.append('iconUrl', this.imgUrl)
        }
        // formData.append('file', this.file)

        api.requestForm('post', 'chapter/upload', formData)
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
