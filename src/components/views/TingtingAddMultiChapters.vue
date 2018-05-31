<template>
  <div>
    <!--<h5 class="text-center">编辑专辑</h5>-->
    <section class="content">
      <div class="row">


      <el-autocomplete
        v-model="state4"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入书本关键字"
        @select="handleSelect"></el-autocomplete>

      <el-upload
        ref="upload"
        class="upload-demo"
        :data = "extradata"
        :action="uploadUrl"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :before-upload="beforeupload"
        :on-success="uploadok"
        :multiple="true"
        :limit="100"
        :on-exceed="handleExceed"
        :file-list="fileLists">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传m4a文件</div>
      </el-upload>
        <el-button size="small" type="warning" @click="clearUploadedImage">清空上传</el-button>
      </div>
    </section>
  </div>
</template>
<script>
  import configParams from '../../config'
  import api from '../../api'
  // import ElDropdown from '../../../node_modules/element-ui/packages/dropdown/src/dropdown.vue'
  // import api from '../../api'

  export default {
    // components: {ElDropdown},
    data () {
      return {
        uploadfilesize: 0,
        files: [],
        uploadUrl: '',
        fileLists: [],
        selectedBookId: '',
        books: [],
        extradata: {
          filename: 'abcd',
          bookId: ''
        },
        restaurants: [],
        state4: '',
        timeout: null,
        value: '未选择',
        arrayData: [],
        options: {
          // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
          target: 'ABC', // configParams.uploadURI,
          testChunks: false,
          chunkSize: 100 * 1024 * 1024
        },
        attrs: {
          accept: '*/*'
        },
        statusText: {
          success: '成功了',
          error: '出错了',
          uploading: '上传中',
          paused: '暂停中',
          waiting: '等待中'
        }
      }
    },
    methods: {
      clearUploadedImage () {
        this.$refs.upload.clearFiles()
      },
      uploadok (response, file, filelist) {
        console.log('this.uploadfilesize', this.uploadfilesize, this.fileLists.length)
        this.uploadfilesize = Number(this.uploadfilesize) + 1
        console.log('fileList is', this.fileLists)
        console.log('this.uploadfilesize is', this.uploadfilesize)
        console.log('length is', this.fileLists.size, Number(this.fileLists.length))
        if (this.uploadfilesize === this.fileLists.length) {
          this.$message({
            message: '上传成功!',
            type: 'success'
          })
          this.$refs.upload.clearFiles()
          // this.$router.go(-1)
        }
      },
      beforeupload (file) {
        console.log('beforeupload file is', file)
        this.extradata.filename = file.name
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 $ { file.name }？`)
      },
      handleCommand (command) {
        this.$message('click on item ' + command)
      },
      complete () {
        console.log('complete', arguments)
        this.$message({
          message: '上传成功!',
          type: 'success'
        })
        //
        this.$router.go(-1)
      },
      fileComplete () {
        console.log('file complete', arguments)
      },
      onSubmit () {
        /*
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
        formData.append('chapterId', Number(-1))
        formData.append('url', this.mp4Url)
        formData.append('type', 'm4a')
        formData.append('duration', (this.timelong).getHours() + ':' + (this.timelong).getMinutes() + ':' + (this.timelong).getSeconds())

        if (this.imgUrl !== '') {
          formData.append('iconUrl', this.imgUrl)
        } else {
          this.$message.info('缺少图标!')
          return
        }
        if (this.mp4Url === '') {
          this.$message.info('缺少音频文件!')
          return
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
          }) */
      },
      loadAll () {
        return [
          {'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号'},
          {'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号'}
        ]
      },
      querySearchAsync (queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 3000 * Math.random())
      },
      createStateFilter (queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect (item) {
        console.log(item)
        this.selectedBookId = item.address
        console.log('this.selectedBookId is', this.selectedBookId)
        if (this.selectedBookId !== '') {
          this.extradata.bookId = item.address
          // this.options.target = configParams.uploadURI + '?bookId=' + this.selectedBookId
          this.uploadUrl = configParams.uploadURI + '?bookId=' + this.selectedBookId
          // console.log('this.options.target is', this.options.target)
          // console.log('this.uploader.optinos.target is', this.uploader.optinos.target)
        }
      }
    },
    created () {
      this.uploadUrl = configParams.uploadURI
      console.log('this.options.url is', this.options.target)
      api.request('get', 'book/list?userid=1&pageSize=2000&pageIndex=0')
        .then(response => {
          console.log(response.data)
          this.arrayData = response.data.body.bookList
          for (var i = 0; i < this.arrayData.length; i++) {
            var p = {
              'value': this.arrayData[i].name,
              'address': this.arrayData[i].id
            }
            this.books.push(p)
          }
          this.restaurants = this.books
          // this.totalCount = response.data.body.status.totalCount
        })
        .catch(error => {
          // this.$store.commit('TOGGLE_LOADING')
          console.log(error)
          this.response = 'Server appears to be offline'
        })
    },
    mounted () {
    }
  }
</script>

<style>

  .datetime-picker input {
    height: 4em !important;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
