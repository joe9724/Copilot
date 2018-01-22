<template>
  <div>
    <h5 class="text-center">添加大类</h5>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio label="正常"></el-radio>
                <el-radio label="锁定"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                class="upload-demo"
                action="http://127.0.0.1:81/nanjingyouzi/TingtingBackend/1.0.0/file/upload"
                :on-preview="handlePreview"
                :on-success="successUpload"
                :on-remove="handleRemove"
                :file-list="fileList2"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form label="图片上传1">

            </el-form>
            <quill-editor v-model="content"
                          ref="myQuillEditor"
                          :options="editorOption">
            </quill-editor>
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
  import quillRedefine from 'vue-quill-editor-upload'
  import quillEditor from 'vue-quill-editor'

  export default {
    components: [quillRedefine, quillEditor], //, quillRedefine,
    data () {
      return {
        editorOption: {},  // 必须初始化为对象 init  to Object
        canCrop: false,
        /* 测试上传图片的接口，返回结构为{url:''} */
        uploadUrl: 'http://127.0.0.1:81/nanjingyouzi/TingtingBackend/1.0.0/file/upload',
        content: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          status: '',
          content: '',
          fileList2: [{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }]
        },
        fileList2: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        name: '01-example',
        imgUrl: '',
        content1: ''
      }
    },
    computed: {
      editor () {
        return this.$refs.myTextEditor.quill
      },
      contentCode () {
        // return hljs.highlightAuto(this.content).value
      }
    },
    methods: {
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
        console.log('name is' + this.form.agentName)
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
        formData.append('title', 'title')
        formData.append('summary', this.content)
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
      this.editorOption = quillRedefine(
        {
          // 图片上传的设置
          uplpadConfig: {
            action: '',  // 必填参数 图片上传地址
            // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
            // 你必须把返回的数据中所包含的图片地址 return 回去
            res: (response) => {
              return response.body.url
            },
            methods: 'POST',  // 可选参数 图片上传方式  默认为post
            token: sessionStorage.token,  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
            name: 'img',  // 可选参数 文件的参数名 默认为img
            size: 500,  // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
            accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',  // 可选参数 可上传的图片格式
            // input点击事件  formData是提交的表单实体
            change: (formData) => {
            },
            // 设置请求头 xhr: 异步请求， formData: 表单对象
            header: (xhr, formData) => {
              // xhr.setRequestHeader('myHeader','myValue');
              // formData.append('token', '1234')
            },
            // start: function (){}
            start: () => {
            },  // 可选参数 接收一个函数 开始上传数据时会触发
            end: () => {
            },  // 可选参数 接收一个函数 上传数据完成（成功或者失败）时会触发
            success: () => {
            },  // 可选参数 接收一个函数 上传数据成功时会触发
            error: () => {
            }  // 可选参数 接收一个函数 上传数据中断时会触发
          },
          // 以下所有设置都和vue-quill-editor本身所对应
          placeholder: '请输入内容',  // 可选参数 富文本框内的提示语
          theme: 'snow',  // 可选参数 富文本编辑器的风格
          toolOptions: [],  // 可选参数  选择工具栏的需要哪些功能  默认是全部
          handlers: {}  // 可选参数 重定义的事件，比如link等事件
        }
      )
      console.log(this.editorOption)
    }
  }
</script>

<style>
  .datetime-picker input {
    height: 4em !important;
  }

  .quill-code {
    border: none;
    height: auto;
  }

  > code {
    width: 100%;
    margin: 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0;
    height: 10rem;
    overflow-y: auto;
    resize: vertical;
  }

</style>
