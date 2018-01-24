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
            <!--<el-form-item label="图标">
              <el-input v-model="form.icon"></el-input>
            </el-form-item>-->
            <el-form-item label="图标">
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
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio label="正常"></el-radio>
                <el-radio label="锁定"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="简介">
              <vue-editor id="editor"
                          useCustomImageHandler
                          @imageAdded="handleImageAdded" v-model="htmlForEditor">
              </vue-editor>
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
  import configParams from '../../config'
  import VueCoreImageUpload from '../../../node_modules/vue-core-image-upload/src/vue-core-image-upload.vue'
  import { VueEditor } from 'vue2-editor'
  export default {
    components: {
      VueEditor,
      'vue-core-image-upload': VueCoreImageUpload
    },
    data () {
      return {
        htmlForEditor: '',
        editorOption: {},  // 必须初始化为对象 init  to Object
        canCrop: false,
        /* 测试上传图片的接口，返回结构为{url:''} */
        uploadUrl: '',
        // uploadUrl: 'http://192.168.200.208:81/nanjingyouzi/TingtingBackend/1.0.0/file/upload',
        content: '',
        form: {
          name: '',
          icon: '',
          status: '',
          fileList2: [],
          imageUrl: ''
        },
        categoryId: 0,
        fileList2: [],
        imageUrl: '',
        name: '01-example',
        imgUrl: '',
        content1: ''
      }
    },
    methods: {
      imageUploaded (response) {
        console.log('response is', response)
        this.src = response.body.url
        this.imgUrl = response.body.url
        // alert(this.imgUrl)
        // this.imgUrl = 'https://upload.jianshu.io/users/upload_avatars/2204269/54bc6df9d4b6.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240'
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
      handleChange (value) {
        // console.log(value)
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
      },
      onSubmit () {
        var categoryId = '0'
        if (this.$route.query.categoryId) {
          categoryId = this.$route.query.categoryId
          this.categoryId = this.$route.query.categoryId
        }
        var userid = localStorage.getItem('userid')
        console.log(userid)
        let formData = new FormData()
        formData.append('name', this.form.name)
        if (this.form.status === '正常') {
          formData.append('status', Number(0))
        } else {
          formData.append('status', Number(1))
        }
        formData.append('subTitle', this.form.name)
        formData.append('title', this.form.name)
        formData.append('summary', this.htmlForEditor)
        formData.append('categoryId', categoryId)
        if (this.imgUrl !== '') {
          formData.append('iconUrl', this.imgUrl)
        }
        // formData.append('file', this.file)

        api.requestForm('post', 'category/upload', formData)
          .then(response => {
            var data = response.data
            console.log(JSON.stringify(data))
            alert('ok')
          })
          .catch(error => {
            console.log(error)
            this.response = error
          })
      }
    },
    created () {
      // alert('created!')
      this.uploadUrl = configParams.uploadURI
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
          this.form.status = data.status
          this.htmlForEditor = data.summary
          this.imageUrl = data.icon
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
  }

  .avatar {
    width: 28px;
    height: 28px;
    display: block;
  }

  .datetime-picker input {
    height: 4em !important;
  }
</style>
