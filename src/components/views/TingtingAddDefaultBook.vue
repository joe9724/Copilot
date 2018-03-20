<template>
  <div>
    <h5 class="text-center">添加定时播默认</h5>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="年级">
              <!--<el-input v-model="form.grade"></el-input>-->
              <el-tree
                :data="data2"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps">
              </el-tree>
            </el-form-item>

            <!--<el-form-item label="时间">
              <el-input v-model="form.startTime"></el-input>
            </el-form-item>-->
            <el-form-item label="时间">
              <el-radio-group v-model="form.startTime">
                <el-radio label="06:30">06:30</el-radio>
                <el-radio label="12:20">12:00</el-radio>
                <el-radio label="17:30">17:30</el-radio>
                <el-radio label="22:00">22:00</el-radio>
              </el-radio-group>
            </el-form-item>
            <!--<el-form-item label="结束时间">
              <el-input v-model="form.endTime"></el-input>
            </el-form-item>-->
            <!--<el-form-item label="图标">
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
            </el-form-item>-->
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio label="正常"></el-radio>
                <el-radio label="锁定"></el-radio>
              </el-radio-group>
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
          grade: '',
          bookId: '',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          status: '',
          author: '',
          content: '',
          startTime: '',
          fileList2: [{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }]
        },
        data2: [{
          id: 10,
          label: '学龄前'
        }, {
          id: 20,
          label: '幼儿园'
        }, {
          id: 30,
          label: '小学',
          children: [{
            id: 31,
            label: '小学一年级'
          }, {
            id: 32,
            label: '小学二年级'
          }, {
            id: 33,
            label: '小学三年级'
          }, {
            id: 34,
            label: '小学四年级'
          }, {
            id: 35,
            label: '小学五年级'
          }, {
            id: 36,
            label: '小学六年级'
          }]
        }, {
          id: 40,
          label: '初中',
          children: [{
            id: 41,
            label: '初中一年级'
          }, {
            id: 42,
            label: '初中二年级'
          }, {
            id: 43,
            label: '初中三年级'
          }]
        }, {
          id: 50,
          label: '高中',
          children: [{
            id: 51,
            label: '高中一年级'
          }, {
            id: 52,
            label: '高中二年级'
          }, {
            id: 53,
            label: '高中三年级'
          }]
        }, {
          id: 60,
          label: '大学',
          children: [{
            id: 61,
            label: '大学一年级'
          }, {
            id: 62,
            label: '大学二年级'
          }, {
            id: 63,
            label: '大学三年级'
          }, {
            id: 64,
            label: '大学四年级'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created () {
      this.uploadUrl = configParams.uploadURI
    },
    methods: {
      getCheckedKeys () {
        console.log(this.$refs.tree.getCheckedKeys())
      },
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
        console.log('选中节点有:' + this.$refs.tree.getCheckedKeys())
        // alert(this.content)
        // this.$router.push('/org')
        // console.log('submit!')
        var userid = localStorage.getItem('userid')
        console.log(userid)
        var bookId = '0'
        if (this.$route.query.bookId) {
          bookId = this.$route.query.bookId
          this.bookId = this.$route.query.bookId
        }
        var status
        if (this.form.status === '正常') {
          status = Number(0)
        } else {
          status = Number(1)
        }
        var data = {
          grade: this.form.grade,
          bookId: Number(bookId),
          gradeRange: this.$refs.tree.getCheckedKeys().toString(),
          starttime: this.form.startTime,
          status: status,
          actionCode: Number(0),
          albumId: Number(-1),
          action: Number(0),
          bookIds: ''
        }

        api.request('post', 'relation/default/book/upload', data)
          .then(response => {
            var data = response.data
            console.log(JSON.stringify(data))
            this.$message({
              message: '操作成功!',
              type: 'success'
            })
            //
            this.$router.go(-1)
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
