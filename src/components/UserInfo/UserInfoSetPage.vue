<script setup>
//个人信息设置页

</script>

<template>
  <div class="most">
    <!-- toast 提示框 -->
    <!--    bootstrap提示框 toast  data-bs-delay 多长时间消失-->
    <div class="toast my-toast" data-bs-delay="1500">
      <div class="toast-body">
        <div class="alert alert-success info-box">
          操作成功
        </div>
      </div>
    </div>
    <!-- 核心内容区域 -->
    <div class="container">
      <ul class="my-nav">
        <li class="active">基本设置</li>
        <li>安全设置</li>
        <li>账号绑定</li>
        <li>新消息通知</li>
      </ul>
      <div class="content">
        <div class="info-wrap">
          <h3 class="title">基本设置</h3>
          <!--    action="javascript:;"    改由javaScript控制-->
          <!--    onsubmit="return false;" 禁止了表单的默认跳转，和默认提交行为-->
          <form class="user-form" action="javascript:;">
            <div class="form-item">
              <label for="email">邮箱</label>
              <input id="email" name="email" class="email" type="text" placeholder="请输入邮箱" autocomplete="off">
            </div>
            <div class="form-item">
              <label for="nickname">昵称</label>
              <input id="nickname" name="nickname" class="nickname" type="text" placeholder="请输入昵称"
                     autocomplete="off">
            </div>
            <div class="form-item">
              <label>性别</label>
              <label class="male-label"><input type="radio" name="gender" class="gender" value="0">男</label>
              <label class="male-label"><input type="radio" name="gender" class="gender" value="1">女</label>
            </div>
            <div class="form-item">
              <label for="birthday">出生日期</label>
              <input id="birthday" name="birthday" class="birthday" type="date"
                     autocomplete="off">
            </div>
            <div class="form-item">
              <label for="desc">我的签名</label>
              <textarea id="desc" name="desc" class="desc" placeholder="请输入个人签名" cols="20" rows="10"
                        autocomplete="off"></textarea>
            </div>
            <button class="submit" @click="submitUserInfo()">提交</button>
          </form>
        </div>
        <div class="avatar-box">
          <h4 class="avatar-title">头像</h4>
          <img class="prew" :src="avatar" alt="">
          <label for="uploadAvatar">更换头像</label>
          <input id="uploadAvatar" type="file" @change="upAvatar" class="upload">
        </div>

      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";

import axios from "axios";
import {serialize} from '@/assets/lib/form-serialize'
import { Toast } from 'bootstrap'
export default {
  data() {
    return {
      isLogin: true,
      userinfo: null,
      avatar: require('@/assets/picture/userHandler/头像.png')//解析成本地的样式
    }
  },
  created() {
    //如果未登录，跳转到登录页
    if (!this.isLogin) {
      //location.href = "/api/login"
    } else {
      //渲染异步信息
      this.rendererUser();
    }

  },
  methods: {
    //1.提交修改的用户信息
    submitUserInfo() {
      //2.收集表单信息
      const userFrom = document.querySelector('.user-form')
      //使用 serialize 插件得到多个表单数据,拿到最终的json对象
      const userObject = serialize(userFrom, {hash: true, empty: true})
      //3.提交到服务器保存
      //3.1性别数字字符串转成数字类型
      userObject.gender = +userObject.gender
      console.log(userObject)
      //3.2.axios提交数据
      const token = localStorage.getItem('token');
      axios({
        url: '/api/updateMyInfo',
        method: 'PUT',
        headers: {'token': token},
        data: userObject
      }).then(result => {
        const code = result.data.code
        console.log(code + " " + result.data.message)
        if (code === '200'){
          this.toastShow()
          setTimeout(()=>{
            window.location.reload(); // 刷新当前页面
          },2000)

        }
      }).catch(e => {
        console.log(e)
      })

    },
    //显示提示框
    toastShow(){
      const toastDom = document.querySelector('.my-toast')
      const toast = new Toast(toastDom)
      //alert(666)
      toast.show()
    }
    ,
    upAvatar() {
      //alert(666)
      const fileInput = document.getElementById('uploadAvatar')
      const file = fileInput.files[0];
      this.submitFile(file)
    },
    submitFile(file) {
      //2.使用FormData携带图片文件
      const fd = new FormData()
      fd.append('uploadAvatar', file)
      //3.基于axios将表单数据提交给服务其
      const token = localStorage.getItem('token');
      axios({
        url: '/api/uploadAvatar',
        method: 'POST',
        headers: {'token': token},
        data: fd,
      }).then(result => {
        const URI = result.data.data;
        this.avatar = URI
        console.log(result.data.code + " " + result.data.message + " " + URI)
      }).catch(error => {
        //alert(666)
        //console.log(error)
        // 处理登录失败的逻辑
        //this.alertFn(error.response, false)

        console.log(error) // 输出错误的响应信息
      });
    },
    //渲染用户信息
    async rendererUser() {
      //1.如果登录，获取用户信息
      const token = localStorage.getItem('token');
      await this.getUserInfo(token)
      //2.回显信息到标签上
      this.echoUserInfo(this.userinfo)
    },

    //回显信息到标签上
    echoUserInfo(userinfo) {
      //拿到用户对象
      const userObject = userinfo
      //遍历每一个属性
      Object.keys(userObject).forEach(key => {
        if (key === 'avatar') {
          //头像不为空更新
          //console.log(userObject[key]+"cscscsc")
          userObject[key] && (this.avatar = userObject[key])
        } else if (key === 'gender') {
          //获取性别单选框
          const gRadioList = document.querySelectorAll('.gender')
          //获取性别的数字 0男，1女
          const gNum = userObject[key];
          //通过性别数字，作为下标，找到对应的单选框，设置选中状态
          gRadioList[gNum].checked = true
        } else {
          // console.log(key)
          //赋予默认值
          var item = document.querySelector(`.${key}`);
          if (item != null)//很重要，作用是由于对应的标签和属性不一致，所以key不对应标签属性会有null，设置成null预防报错
            item.value = userObject[key]
          //包含了input data 对应，特殊：data的value 必须是yyyy-MM-dd形式
          // console.log(item)
        }
        // console.log(key)
      })

    },

    //利用token请求用户信息 标记为异步函数
    async getUserInfo(token) {
      //用户登录信息 等待执行完成
      await axios({
        url: '/api/getUserInfo',
        method: 'GET',
        headers: {'token': token}
      }).then((response) => {
        const userinfo = response.data.data
        console.log(userinfo)
        this.userinfo = userinfo
      }).catch(error => {
        console.log(error + " " + "")
        this.isLogin = false
      })
    },

  }
}
</script>
<style scoped>
.most {
  background-color: #f0f2f5;
  padding: 20px;
  -moz-user-select: none;
  /*火狐*/
  -webkit-user-select: none;
  /*webkit浏览器*/
  -ms-user-select: none;
  /*IE10*/
  -khtml-user-select: none;
  /*早期浏览器*/
  user-select: none;
  font-size: 14px;
}

.container {
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  padding-left: 0;
  margin: 0 auto;
  min-width: 700px;
  max-width: 1000px;
  border-radius: 2px;
}

.my-nav {
  width: 200px;
  border-right: 1px solid #f0f0f0;
  list-style: none;
}

.my-nav li {
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  font-size: 14px;
}

.my-nav li.active {
  background-color: #e9f7fe;
  color: #448ef7;
  border-right: 4px solid #448ef7;
  font-weight: 600;
}

.content {
  padding-top: 10px;
  /* padding-left: 40px; */
  flex: 1;
  display: flex;
  justify-content: space-evenly;
}

.content .title {
  font-size: 20px;
  margin-bottom: 30px;
}

.content .info-wrap {
  /* margin-right: 20px; */
}

.content .avatar-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  /* flex: 1; */
  padding-top: 55px;
  width: 200px;
}

.content .avatar-box .avatar-title {
  font-size: 16px;
  text-align: left;
  align-self: flex-start;
  margin: 0;
}

.content .avatar-box .prew {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 15px;
}

.content .avatar-box label {
  width: 100px;
  height: 30px;
  transition: all .3s;
  box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
  cursor: pointer;
  font-size: 14px;
  border-radius: 2px;
  color: rgba(0, 0, 0, .85);
  border: 1px solid #d9d9d9;
  text-align: center;
  line-height: 30px;
}

.content .avatar-box label:hover {
  color: #40a9ff;
  border-color: #40a9ff;
  background: #fff;
}

.content .avatar-box #uploadAvatar {
  display: none;
}


.content .user-form label:not(.male-label) {
  display: block;
  margin-bottom: 15px;
  margin-top: 15px;
}

.content .user-form .form-item {
  margin-bottom: 20px;
}

.content .user-form .form-item .male-label {
  margin-right: 20px;
  display: inline-flex;
  align-items: center;
}

.content .user-form input[type=radio] {
  margin-right: 10px;
  outline: none;
  background-size: contain;
  border: 1px solid rgba(0, 0, 0, .25);
  border-radius: 50%;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  appearance: none;

}


.content .user-form input[type=radio]:checked {
  border-radius: 50%;
  border-color: #0d6efd;
  background-color: #0d6efd;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
}


.content .user-form input:not([type=radio]) {
  height: 30px;
  appearance: none;
}


.form-item input:not([type=radio]),
textarea {
  display: block;
  width: 330px;
  height: 150px;
  outline: none;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all .3s;
  padding-left: 5px;
}

.content .user-form textarea {
  padding-top: 10px;
  width: 350px;
  resize: none;
}


.content .user-form input:focus,
textarea:focus {
  border-color: #40a9ff;
  border-right-width: 1px;
  z-index: 1;
  border-color: #40a9ff;
  box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
  border-right-width: 1px;
  outline: 0;
}

.content .user-form button.submit {
  background: #4D8FF7;
  width: 78px;
  height: 32px;
  color: white;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: 0;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.toast {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
}

.toast .toast-body {
  padding: 0 !important;
}

.toast .alert-success {
  margin-bottom: 0 !important;
}
</style>