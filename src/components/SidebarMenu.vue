<template>
  <div >
    <!--<li class="header">设备管理</li>-->
     <!--<router-link tag="li" class="pageLink" to="/myDevice">-->
       <!--<a>-->
         <!--<i class="fa fa-desktop"></i>-->
         <!--<span class="page">我的设备</span>-->
       <!--</a>-->
     <!--</router-link>-->
     <!--<router-link tag="li" class="pageLink" to="/devicelist">-->
       <!--<a>-->
         <!--<i class="fa fa-table"></i>-->
         <!--<span class="page">设备管理</span>-->
       <!--</a>-->
     <!--</router-link>-->
     <!--<li class="header">用户管理</li>-->
     <!--<router-link tag="li" class="pageLink" to="/users">-->
       <!--<a>-->
         <!--<i class="fa fa-desktop"></i>-->
         <!--<span class="page">用户列表</span>-->
       <!--</a>-->
     <!--</router-link>-->
     <!--<router-link tag="li" class="pageLink" to="/org">-->
       <!--<a>-->
         <!--<i class="fa fa-table"></i>-->
         <!--<span class="page">组织机构</span>-->
       <!--</a>-->
     <!--</router-link>-->
     <!--<li class="header">系统管理</li>-->
     <!--<router-link tag="li" class="pageLink" to="/oplogs">-->
       <!--<a>-->
         <!--<i class="fa fa-table"></i>-->
         <!--<span class="page">操作日志</span>-->
       <!--</a>-->
     <!--</router-link>-->
     <!--<router-link tag="li" class="pageLink" to="/logs">-->
       <!--<a>-->
         <!--<i class="fa fa-table"></i>-->
         <!--<span class="page">消息日志</span>-->
       <!--</a>-->
     <!--</router-link>-->

     <!--<router-link tag="li" class="pageLink" to="/curve">-->
       <!--<a>-->
         <!--<i class="fa fa-table"></i>-->
         <!--<span class="page">曲线图</span>-->
       <!--</a>-->
     <!--</router-link>-->
     <!--<router-link tag="li" class="pageLink" to="/air">-->
       <!--<a>-->
         <!--<i class="fa fa-table"></i>-->
         <!--<span class="page">空气质量</span>-->
       <!--</a>-->
     <!--</router-link>-->
     <!--<router-link tag="li" class="pageLink" to="/echart">-->
       <!--<a>-->
         <!--<i class="fa fa-table"></i>-->
         <!--<span class="page">echart</span>-->
       <!--</a>-->
     <!--</router-link>-->
     <!--<router-link tag="li" class="pageLink" to="/login">-->
       <!--<a>-->
         <!--<i class="fa fa-table"></i>-->
         <!--<span class="page">注销登录</span>-->
       <!--</a>-->
     <!--</router-link>-->
     <!--<router-link tag="li" class="pageLink" to="/testtablepaging">-->
       <!--<a>-->
         <!--<i class="fa fa-table"></i>-->
         <!--<span class="page">分页测试</span>-->
       <!--</a>-->
     <!--</router-link>-->
     <!--<router-link tag="li" class="pageLink" to="/upload">-->
       <!--<a>-->
         <!--<i class="fa fa-table"></i>-->
         <!--<span class="page">上传测试</span>-->
       <!--</a>-->
     <!--</router-link>-->
    <!--<span v-for="item in arrayData" v-bind:key="item.parent">-->
    <!--<li class="header"><span style="color: #13ce66">{{item.parent}}</span> </li>-->

    <!--<router-link tag="li" class="pageLink" to="{{it.path}}" v-for="it in item.children" v-bind:key="it.name">-->
    <!--<a>-->
    <!--<i class="fa fa-desktop"></i>-->
    <!--<span class="page">{{it.name}}</span>-->
    <!--</a>-->
    <!--</router-link>-->

    <!--</span>-->
    <ul v-for="item in arrayData" class="sidebar-menu" :key="item.name">

    <li class="header" v-if="item.router_url==='-1'"><span>{{item.name}}</span></li>

    <li  class="pageLink" @click="to(it.router_url)" style="cursor: pointer;" v-for="it in item.children">
      <a>
        <i class="fa fa-book"></i>
        <span class="page">{{it.name}}</span>
      </a>
    </li>
    </ul>


    <!--<script>
      for (var i = 0; i < this.arrayData.length; i++) {

      }

    </script>-->


  </div>
</template>
<script>
  export default {
    name: 'SidebarName',
    data () {
      return {
        arrayData: []
      }
    },
    methods: {
      to (path) {
        console.log(path)
        this.$router.push(path)
//        this.$router.push('/org')
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      }
    },
    mounted () {
      // console.log('store.data = ' + JSON.stringify(this.$store.state.btk_menu))
      // this.arrayData = this.$store.state.btk_menu // getItem('SET_BTK_MENU')
      console.log(localStorage.getItem('btk_menu'))
      this.arrayData = JSON.parse(localStorage.getItem('btk_menu'))
      console.log('length is' + this.arrayData.length)
      /* for (var i = 0; i < this.arrayData.length; i++) {
        console.log('for is:' + this.arrayData[i])
      }
      console.log('menu1 is ' + this.arrayData) */
      // console.log('menu2 is ' + window.localStorage.getItem('MENU_DATA'))
    },
    computed: {}
  }
</script>

<style>
  /* override default */
  .sidebar-menu > li > a {
    padding: 12px 15px 12px 15px;
  }

  .sidebar-menu li.active > a > .fa-angle-left, .sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
    animation-name: rotate;
    animation-duration: .2s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>
