<script setup>

</script>

<template>
  <!--  <div class="RegisterPages"><h1>注册</h1>
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
            &lt;!&ndash; 错误提示将在这里展示 &ndash;&gt;
          </div>
        </form>
      </div>
    </div>-->
  <div v-show="isRegister" class="modal fade RegisterPages" id="RegisterPages" data-bs-backdrop="static"
       data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="staticBackdropLabel2" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered ">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel2">Register</h1>
          <button type="button" class="btn-close" id="myCloseRegister" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <span class="Ralert alert" role="alert">
              提示消息
            </span>
          <input type="text" placeholder="请输入用户名" class="Rusername" required>
          <input type="password" placeholder="请输入密码" class="Rpassword" required>
          <input type="password" placeholder="请确认密码" class="Rconfirm-password" required>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="submitForm(2)" >注册</button>
          <button type="button" class="btn btn-secondary" data-bs-target="#LoginPages" data-bs-toggle="modal">登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import axios from "axios";

export default {
  name: "RegisterPages",
  data() {
    return {
      status: 1,
      isRegister: true
    }
  }
  ,
  methods: {
    closeModel() {
      const button = document.getElementById('myCloseRegister');

      // 创建一个鼠标点击事件
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });

      // 触发点击事件
      button.dispatchEvent(clickEvent);
    },
    submitForm(roleID) {

      // 1.2 获取用户名和密码
      const username = document.querySelector('.Rusername').value
      const password = document.querySelector('.Rpassword').value
      const confirm_password = document.querySelector('.Rconfirm-password').value
      console.log(username, password)
      // 1.3 判断长度
      if (username.length < 5) {
        this.alertFn('用户名必须大于等于5位', false)
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

      axios.post('/api/register', {
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
    Processing_message(response) {
      if (response.data.errorCode === "") {
        this.alertFn(response.data.message, true)
        console.log(response)
      } else {
        this.alertFn(response.data.errorMessage, false)
        console.log(response)
      }
    }

    ,
    alertFn(msg, isSuccess) {

      const myAlert = document.querySelector('.Ralert');
      // 1> 显示提示框
      myAlert.classList.add('show')
      // 2> 实现细节
      myAlert.innerText = msg
      const bgStyle = isSuccess ? 'Ralert-success' : 'Ralert-danger'
      myAlert.classList.add(bgStyle)

      // 3> 过2秒隐藏 使用定时器执行任务
      setTimeout(() => {
        myAlert.classList.remove('show')
        // 提示：避免类名冲突，重置背景色
        myAlert.classList.remove(bgStyle)
      }, 2000)

      if (isSuccess) {
        //注册成功关闭弹窗
        setTimeout(this.closeModel, 3000)

        //注册成功进行跳转
        //location.href = "https://www.baidu.cn";

      }
    }
  },

}
</script>
<!-- 提示框样式 -->
<style scoped>
.Ralert {
  transition: .5s;
  opacity: 0;
  margin-bottom: 10px;
  background-size: 90%;
  height: 20px;
  text-align: center;
}

.Ralert.show {
  opacity: 1;
}

.Ralert-danger {
  background: orangered;
}

.Ralert-success {
  background: #00a1d6;
}
</style>
<style scoped>
/* 自定义模态框样式 */
.RegisterPages .modal-dialog {
  width: 400px; /* 设置模态框的宽度 */
}

.modal-body input[type="text"],
.modal-body input[type="password"] {
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.RegisterPages .modal-header {
  background-color: #f8f9fa; /* 设置模态框头部的背景颜色 */
  border-bottom: none; /* 去除模态框头部的边框 */
}

.RegisterPages .modal-title {
  color: #333; /* 设置模态框标题的颜色 */
}

.RegisterPages .modal-body {
  padding: 20px; /* 设置模态框主体的内边距 */
}

.RegisterPages .modal-footer {
  background-color: #f8f9fa; /* 设置模态框底部的背景颜色 */
  border-top: none; /* 去除模态框底部的边框 */
}

.RegisterPages .btn-primary {
  background-color: #007bff; /* 设置注册按钮的背景颜色 */
  border-color: #007bff; /* 设置注册按钮的边框颜色 */
}

.RegisterPages .btn-primary:hover {
  background-color: #0069d9; /* 设置鼠标悬停时注册按钮的背景颜色 */
  border-color: #0069d9; /* 设置鼠标悬停时注册按钮的边框颜色 */
}

.RegisterPages .btn-secondary {
  background-color: #f8f9fa; /* 设置切换到登录按钮的背景颜色 */
  border-color: #f8f9fa; /* 设置切换到登录按钮的边框颜色 */
  color: #333; /* 设置切换到登录按钮的文本颜色 */
}

.RegisterPages .btn-secondary:hover {
  background-color: #e9ecef; /* 设置鼠标悬停时切换到登录按钮的背景颜色 */
  border-color: #e9ecef; /* 设置鼠标悬停时切换到登录按钮的边框颜色 */
}
</style>