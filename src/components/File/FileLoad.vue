<script setup>

</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="blue-div">
          <!--           使用FormData对象，暂时不用基础表单提交-->
          <!--          action="/api/upload" method="POST" enctype="multipart/form-data"-->
          <!--          禁用表单的默认提交行为-->
          <form onsubmit="return false;">
            <div class="form-group">
              <label for="upload_single_file" class="form-label text-light">Upload your file</label>
              <input type="file" name="single_file" id="upload_single_file" class="form-control"/>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <input type="submit" value="Submit" @click="uploadFileByButton" class="btn btn-primary me-md-2"/>
              <input type="reset" value="Reset" class="btn btn-outline-secondary"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ImgToTest from "@/utils/ImgToTest";
export default {
  mounted() {
      //this.uploadFile()
  },
  data() {
    return {}
  },
  methods: {
    //设置该文件的url 测试 TODO
    sendImgUri(URI){
      ImgToTest.$emit('sendImgUri',URI)
    },

    //设置文件就会传输文件
    uploadFileInput() {
      //文件选择元素->change改变事件
      document.querySelector('#upload_single_file').addEventListener('change', evt => {
        //1.获取文件 包含名字等信息
        const file = evt.target.files[0]
        console.log(file)
        //调用提交文的方法
        this.submitFile(file)
      })
    },
    submitFile(file) {
      //2.使用FormData携带图片文件
      const fd = new FormData()
      fd.append('single_file', file)
      //3.基于axios将表单数据提交给服务其
      axios({
        url: '/api/upload',
        method: 'POST',
        data: fd,
      }).then(result => {
        const URI = result.data.data.fileDownLoadUri;
        this.sendImgUri(URI)
        console.log(result.data.code + " " + result.data.message+" "+URI)
      }).catch(error => {
        //alert(666)
        //console.log(error)
        // 处理登录失败的逻辑
        //this.alertFn(error.response, false)

        console.log(error) // 输出错误的响应信息
      });
    },
    uploadFileByButton(){
      //获取输入狂元素
      const fileInput = document.getElementById('upload_single_file');
      //从输入框中拿到文件对象
      var file = fileInput.files[0];
      console.log(file)
      //文件提交
      this.submitFile(file)
    }

  }
}

</script>
<style scoped>
.blue-div {
  background-color: #3498db;
  padding: 20px;
  border-radius: 10px;
  margin: 20px;
}

.form-group {
  margin-bottom: 20px;
}
</style>