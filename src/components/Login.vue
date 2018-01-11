<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-md-4 col-sm-offset-4">
            <!-- login form -->
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

            <!-- errors -->
            <div v-if=response class="text-red"><p>{{response}}</p></div>
          </div>
        </div>
      </div>
  </div>
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
