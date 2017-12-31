<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  const serverUrl = 'http://106.14.2.153:9090/'
  export default {
    serverUrl,
    name: 'App',
    data () {
      return {
        section: 'Head'
      }
    },
    methods: {
      logout () {
        this.$store.commit('SET_USER', null)
        this.$store.commit('SET_TOKEN', null)

        if (window.localStorage) {
          window.localStorage.setItem('user', null)
          window.localStorage.setItem('token', null)
        }

        this.$router.push('/login')
      }
    }
  }
</script>
