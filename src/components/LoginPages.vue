<script setup>

</script>

<template>
  <div class="login-container">

    <div class="login-form">

      <h2>Login</h2>
      <div class="alert " role="alert">
        提示消息
      </div>
      <input type="text" class="username" placeholder="Username" required>
      <input type="password" class="password" placeholder="Password" required>
      <button type="button" @click="submitForm()">Login{{ftoken}}</button>
    </div>
  </div>
</template>
<script>


import axios from "axios";
//导入事件总线

import Bus from '../utils/EventBus'
export default {
  name:'LoginPages',
  //props: ['ftoken'],//和标签中的属性名一样,组件上自定义的一些属性
    //基础写法只进行了类型校验
/*  props:{//校验方式
    //校验的属性名:类型
    ftoken: String,
  },*/
  //完整写法
  /*props: {
    校验的属性名: {
      type: 类型, // Number String Boolean ...
      required: true, // 是否必填
      default: 默认值, // 默认值
      validator (value) {
        // 自定义校验逻辑
        return 是否通过校验
      }
    }
  },*/
  //父组件提供的数据自己不能改
  props:{
    ftoken:{
      type: String,
      required: true,
      default: '',
      validator(value){
        if (value!=null)
        return true
      }
    }

  },
  // 目标1：点击登录时，用户名和密码长度判断，并提交数据和服务器通信
  // 目标2：使用提示框，反馈提示消息
  // 2.1 获取提示框
  data() {
    return {
      token: "",
      isSuccessLogin:false,
    }
  },
  created() {
    if (this.isSuccessLogin){
      location.href = "https://www.baidu.cn";
    }
  },
  methods: {
    //封装的弹窗
    alertFn(msg, isSuccess) {
      const myAlert = document.querySelector('.alert');
      // 1> 显示提示框
      myAlert.classList.add('show')

      // 2> 实现细节
      myAlert.innerText = msg
      const bgStyle = isSuccess ? 'alert-success' : 'alert-danger'
      myAlert.classList.add(bgStyle)

      // 3> 过2秒隐藏
      setTimeout(() => {
        myAlert.classList.remove('show')
        // 提示：避免类名冲突，重置背景色
        myAlert.classList.remove(bgStyle)
      }, 2000)

      if (isSuccess) {
        //TODO
        //登录成功进行设置通信告诉主页面登录成功,并提交token
        this.$emit('LoginSuccess', true,this.token)

        //登录成功进行跳转
       // location.href = "https://www.baidu.cn";
      }
    },
    //传递消息的方法
    //TODO 此处模拟的是登录更换头像
    sendMsg(){
      //触发事件
      Bus.$emit('sendMsg',true)
    },
    //提交表单
    submitForm() {
      // 1.2 获取用户名和密码
      const username = document.querySelector('.username').value
      const password = document.querySelector('.password').value

      console.log(username, password)
      // 1.3 判断长度
      if (username.length < 5) {
        this.alertFn('用户名必须大于等于5位', false)
        console.log('用户名必须大于等于5位')
        console.log('用户名必须大于等于5位')
        return // 阻止代码继续执行
      }
      if (password.length < 6) {
        this.alertFn('密码必须大于等于6位', false)
        console.log('密码必须大于等于6位')
        return // 阻止代码继续执行
      }

      axios.post('http://localhost:8088/login', {
        username,
        password,
      })
          .then(response => {
            this.Processing_message(response)
          })
          .catch(error => {
            //console.log(error)
            // 处理登录失败的逻辑
            this.alertFn(error.response, false)

            console.log(error.response) // 输出错误的响应信息
          });
    },
    //处理登录消息
    Processing_message(response) {
      if (response.data.errorCode === "") {
        this.alertFn(response.data.message, true)
        this.token = response.data.data.token
        //alert(this.token)
        //TODO 发送登录事件通知导航栏更换头像
        this.sendMsg()

        console.log(response)
      } else {
        this.alertFn(response.data.errorMessage, false)
        console.log(response)
      }
    }
  },


  /**
   * 2.2 封装提示框函数，重复调用，满足提示需求
   * 功能：
   * 1. 显示提示框
   * 2. 不同提示文字msg，和成功绿色失败红色isSuccess（true成功，false失败）
   * 3. 过2秒后，让提示框自动消失
   */


}


</script>
<style scoped>
.alert {
  transition: .5s;
  opacity: 0;
  margin-bottom: 10px;
  background-size: 90%;
}

.alert.show {
  opacity: 1;
}

.alert-danger {
  background: orangered;
}

.alert-success {
  background: #00a1d6;
}
</style>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: skyblue;
}

.login-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}

.login-form h2 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
}

.login-form input[type="text"],
.login-form input[type="password"] {
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;
  margin-right: 1px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: skyblue;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: deepskyblue;
}
</style>