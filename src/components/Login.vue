<template>

  <!--<div class="container container-table">-->
      <!--<div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-md-4 col-sm-offset-4">
            &lt;!&ndash; login form &ndash;&gt;
            <form class="ui form loginForm"  @submit.prevent="checkCreds">

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                <input class="form-control" value="root" name="username" placeholder="Username" type="text" v-model="user_name">
              </div>

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-key"></i></span>
                <input class="form-control" value="root123" name="password" placeholder="Password" type="password" v-model="password">
              </div>
              <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading"> 登 录 </button>
            </form>

            &lt;!&ndash; errors &ndash;&gt;
            <div v-if=response class="text-red"><p>{{response}}</p></div>
          </div>
        </div>
      </div>-->
    <div class="user-login" style="background: #ffffff">
      <div class="row bs-reset">
        <div class="col-md-6 bs-reset">
          <div class="login-bg" style="background: none; position: relative; z-index: 0;">
            <!--<img class="login-logo" src="../../static/img/logo.png">-->
            <div class="backstretch" style="left: 0px; top: 0px; overflow: hidden; margin: 0px; padding: 0px; height: 100%; width: 952px; z-index: -999998; position: absolute;"><img src="../../static/img/bg2.jpg" style="position: absolute; margin: 0px; padding: 0px; border: none; width: 75%; height: 100%; max-height: none; max-width: none; z-index: -999999; left: -24.5556px; top: 0px;"></div></div>
        </div>
        <div class="col-md-6 login-container bs-reset">
          <div class="login-content">

            <h1>听听悦读 管理登录</h1>
            <p> 登录账号即为工号，公共场合注意密码保护，及时登出. </p>

            <!-- MESSAGES -->
            <!-- END MESSAGES -->
            <form @submit.prevent="checkCreds" class="login-form">
              <div class="row">
                <div class="col-xs-6">
                  <input class="form-control form-control-solid placeholder-no-fix form-group" type="text" placeholder="登录账户，注意大小写" name="username" v-model="user_name">
                </div>
                <div class="col-xs-6">
                  <input class="form-control form-control-solid placeholder-no-fix form-group" type="password" placeholder="登录密码，注意大小写" name="password" v-model="password">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4">
                  <div class="rem-password">
                    <label class="rememberme mt-checkbox mt-checkbox-outline">
                      <input type="checkbox" name="remember" value="8640000" checked="checked"> 记住登录状态
                      <span></span>
                    </label>
                  </div>
                </div>
                <div class="col-sm-8 text-right">
                  <button class="btn green" id="btnLogin" type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">  登录  </button>
                  <div v-if=response class="text-red"><p>{{response}}</p></div>
                </div>
              </div>
            </form>
          </div>
          <div class="login-footer">
            <div class="row bs-reset">
              <div class="col-xs-5 bs-reset">
                <ul class="login-social">
                </ul>
              </div>
              <div class="col-xs-7 bs-reset">
                <div class="login-copyright text-right">
                  <p>Copyright © 听听悦读 2018</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 <!-- </div>-->
</template>

<script>
import api from '../api'

export default {
  name: 'Login',
  data (router) {
    return {
      section: 'Login',
      loading: '',
      username: '',
      password: '',
      response: ''
    }
  },
  methods: {
    checkCreds: function () {
      const {username, password} = this
//      console.log(username)
      // this.$router.push('myDevice')
      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')
      // console.log(username)
      /* Making API call to authenticate a user */
      // console.log('serverURI is ' + this.serverUrl)
      api.request('get', '/user/login', {username, password})
        .then(response => {
          this.toggleLoading()

          var data = response.data.body
          console.log(JSON.stringify(data))
          /* if (data.status.code !== 201) {
            console.log('2')
            return
          } */
          console.log('3')
          /* Setting user in the state and caching record to the localStorage */
          if (data.data) {
            console.log('4')
            var token = data.data.id

            this.$store.commit('SET_USER', data.data.name)
            this.$store.commit('SET_TOKEN', token)
            this.$store.commit('SET_BTK_MENU', data.data.paths)
            this.$store.commit('SET_USERID', data.data.user_id)

            if (window.localStorage) {
              window.localStorage.setItem('user', JSON.stringify(data.data.name))
              window.localStorage.setItem('token', token)
              window.localStorage.setItem('btk_menu', JSON.stringify(data.dynamicRouter))
              window.localStorage.setItem('userid', data.data.id)
            }
            // this.$router.push(data.dynamicRouter[0].children[0].router_url)
            // this.$router.push(data.data.paths[0].children[0].resource)
            this.$router.push('/dashboard')
            // console.log('path is' + JSON.stringify(data.data.paths[0].children[0].path))
          }
        })
        .catch(error => {
          console.log('5')
          this.$store.commit('TOGGLE_LOADING')
          console.log(error)

          this.response = 'Server appears to be offline'
          this.toggleLoading()
        })
    },
    toggleLoading () {
      this.loading = (this.loading === '') ? 'loading' : ''
    },
    resetResponse () {
      this.response = ''
    }
  }
}
</script>

<style>
html, body, .container-table {
  height: 100%;
  background-color: #282B30 !important;
}
.container-table {
    display: table;
    color: white;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.input-group input {
  height: 4em;
}
</style>
