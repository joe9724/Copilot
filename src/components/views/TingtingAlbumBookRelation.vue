<template>
  <section class="content">

    <div class="row center-block" style="background: #ffffff">
      <!--
      <div id="example1_length" class="dataTables_length">
        <router-link  class="pageLink" to="/album/add">
          <a>
            <span class="page" style="float:right;margin:5px"><el-button type="success" plain>添加专辑</el-button></span>

          </a>
        </router-link>

      </div>
      -->
      <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入书名拼音"
        v-model="value2"
        :data="data2">
      </el-transfer>
      <!-- /.box-body -->
    </div>

  </section>
</template>

<script>
  // import $ from 'jquery'
  // import api from '../../api'
  // import { formatDateBtk, formatStatus } from '../../filters/index.js'

  export default {
    data () {
      const generateData2 = _ => {
        const data = []
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu']
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          })
        })
        return data
      }
      return {
        data2: generateData2(),
        value2: [],
        filterMethod (query, item) {
          // alert('aaa')
          return item.pinyin.indexOf(query) > -1
        }
      }
    }
  }

</script>

<style>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>
