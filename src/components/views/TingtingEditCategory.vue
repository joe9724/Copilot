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
            <el-form-item label="图标">
              <el-input v-model="form.icon"></el-input>
            </el-form-item>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
          name: '',
          icon: '',
          status: '',
          fileList2: [],
          imageUrl: ''
        },
        categoryId: 0,
        fileList2: [],
        imageUrl: ''
      }
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      handleChange (value) {
        // console.log(value)
      },
      onSubmit () {
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
        formData.append('summary', this.form.content)
        // formData.append('file', this.file)

        api.requestForm('post', 'category/edit', formData)
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
      //
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
          this.form.icon = data.icon
          this.form.status = data.status
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
