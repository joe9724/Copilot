<template>
  <div>
    <h1 class="text-center">预警设置</h1>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="PROJECT0_T1">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT0_T2">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT0_T33">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT0_T4">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT0_T5">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT1_T1">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT1_T2">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT1_T3">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT1_T4">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT1_T5">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT2_T1">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT2_T2">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT2_T3">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT2_T4">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT2_T5">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT3_T1">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT3_T2">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT3_T3">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT3_T4">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT3_T5">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT4_T1">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT4_T2">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT4_T3">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT4_T4">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT4_T5">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT5_T1">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT5_T2">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT5_T3">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT5_T4">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT5_T5">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT6_T1">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT6_T2">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT6_T3">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT6_T4">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT6_T5">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT7_T1">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT7_T2">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT7_T3">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT7_T4">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="PROJECT7_T5">
              <el-input v-model="form.name"></el-input>
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
  export default {
    data () {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit () {
        this.$router.push('/devicelist')
        console.log('submit!')
      }
    }
  }
</script>

<style>
  .datetime-picker input {
    height: 4em !important;
  }
</style>
