<script setup>

</script>

<template>
  <div class="RegisterPages"><h1>注册</h1>
    <div class="alert" role="alert">
      提示消息
    </div>
    <div class="container">
      <form @submit.prevent="submitForm(2)">
        <label for="username">用户名</label>
        <input type="text" placeholder="请输入用户名" class="username" required>

        <label for="password">密码</label>
        <input type="password" placeholder="请输入密码" class="password" required>

        <label for="confirm-password">确认密码</label>
        <input type="password" placeholder="请确认密码" class="confirm-password" required>

        <button type="submit">注册</button>

        <div class="error">
          <!-- 错误提示将在这里展示 -->
        </div>
      </form>
    </div>
  </div>
</template>
<script>

//get
/*
axios({
  url:'url',
  params:{
    '参数名':'值'
  }
}).then(response=>{
  response.data
})
*/
//常用格式
/*axios({
  url: '目标资源地址',
  method: '请求方法',
  data: {
    参数名: 值
  }
}).then(result => {
  // 对服务器返回的数据做后续处理
})*/

//错误处理
/*axios({
  // ...请求选项
}).then(result => {
  // 处理成功数据
}).catch(error => {
  // 处理失败错误
})*/
import axios from "axios";

export default {
  name: "RegisterPages",
  data() {
    return {
      status: 1,
    }
  }
  ,
  methods: {
    submitForm(roleID) {
      // 1.2 获取用户名和密码
      const username = document.querySelector('.username').value
      const password = document.querySelector('.password').value
      const confirm_password = document.querySelector('.confirm-password').value
      // console.log(username, password)
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
      if (password !== confirm_password) {
        this.alertFn('两次输入密码不一致', false)
        console.log('两次输入密码不一致')
        return;
      }

      axios.post('http://localhost:8088/register', {
        name: username,
        password: password,
        roleId: roleID,
        status: this.status,
      })
          .then(response => {
            this.Processing_message(response)
          })
          .catch(error => {
            console.log(error)
            // 处理注册失败的逻辑
            this.alertFn(error.response.message, false)

            console.log(error.response.message)
          });
    },
    Processing_message(response){
      if (response.data.errorCode === ""){
        this.alertFn(response.data.message,true)
        console.log(response)
      }else{
        this.alertFn(response.data.errorMessage,false)
        console.log(response)
      }
    }

    ,
    alertFn(msg, isSuccess) {

      const myAlert = document.querySelector('.alert');
      // 1> 显示提示框
      myAlert.classList.add('show')

      // 2> 实现细节
      myAlert.innerText = msg
      const bgStyle = isSuccess ? 'alert-success' : 'alert-danger'
      myAlert.classList.add(bgStyle)

      // 3> 过2秒隐藏 使用定时器执行任务
      setTimeout(() => {
        myAlert.classList.remove('show')
        // 提示：避免类名冲突，重置背景色
        myAlert.classList.remove(bgStyle)
      }, 2000)
      if (isSuccess){
        //注册成功进行跳转
        location.href = "https://www.baidu.cn";
      }
    }
  },
  mounted() {
    document.querySelector('.search-input').focus()
  }

}

</script>
<!-- 提示框样式 -->
<style scoped>
.alert {
  height: 50px;
  transition: .5s;
  opacity: 0;
  margin: 0 auto;
  width: 45%;
  align-items: center;
}

.alert-danger {
  background: #ec3042
}
.alert-success {
  background: #7bec30
}
.alert.show {
  opacity: 1;
}
</style>
<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
}

h1 {
  text-align: center;
  margin-top: 50px;
}

form {
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  margin: 0px 0;
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 20px 20px;
  margin: 8px 0;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.container {
  width: 50%;
  margin: 0 auto;
  padding: 0px 20px;
}

.error {
  color: red;
}
</style>