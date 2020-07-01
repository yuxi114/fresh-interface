<template>
  <div id="wrapper">
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <el-form-item label="Request URL" prop="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="Cookie" prop="cookie">
        <el-input v-model="form.cookie"></el-input>
      </el-form-item>
      <el-form-item label="随机时间(0~N秒)" prop="sec">
        <el-input v-model="form.sec" placeholder="请输入正整数"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')" :disabled="isDisabledStart">开始</el-button>
        <el-button @click="onStop('form')" :disabled="isDisabledStop">停止</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        url: '',
        cookie: '',
        sec: ''
      },
      rules: {
        url: [
          { required: true, message: '请输入Request URL', trigger: 'blur' }
        ],
        cookie: [
          { required: true, message: '请输入Cookie', trigger: 'blur' }
        ],
        sec: [
          { required: true, message: '请输入随机执行时间', trigger: 'blur' }
        ]
      },
      interval: '',
      isDisabledStart: false,
      isDisabledStop: true
    }
  },
  methods: {
    onSubmit (refsName) {
      const { ipcRenderer } = require('electron')
      this.$refs[refsName].validate(valid => {
        if (valid) {
          this.isDisabledStart = true
          this.isDisabledStop = false
          const { url, cookie, sec } = this.form
          this.interval = setInterval(() => {
            ipcRenderer.send('fresh-fnterface', url, cookie)
          }, Math.round(Math.random() * (1000 * sec)))
        }
      })
    },
    onStop (refsName) {
      // this.$refs[refsName].resetFields()
      clearInterval(this.interval)
      this.isDisabledStop = true
      this.isDisabledStart = false
    }
  }
}
</script>


