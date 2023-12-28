<script setup>

</script>

<template>
  <!--  在BootStrap中 model可以出现弹窗-->
  <!--    <div class="login-container " tabindex="-1">

        <div class="login-form ">

          <h2 class="modal-title">Login</h2>
        </div>
        <div class="alert " role="alert">
          提示消息
        </div>
        <input type="text" class="username" placeholder="Username" required>
        <input type="password" class="password" placeholder="Password" required>
        <button type="button" @click="submitForm()">Login{{ ftoken }}</button>
      </div>-->
  <!-- Button trigger modal -->


  <!-- Modal -->
  <div v-if="LoginHidden" class="modal fade LoginPages" id="LoginPages" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="staticBackdropLabel1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered ">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel1">Login</h1>
          <!--            data-bs-dismiss="modal"-->
          <button type="button" class="btn-close" id="myCloseButton" aria-label="Close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body login-form">
            <span class="Lalert alert" role="alert">
              提示消息
            </span>
          <input type="text" class="Lusername" placeholder="Username" required>
          <input type="password" class="Lpassword" placeholder="Password" required>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary Register" data-bs-target="#RegisterPages"
                  data-bs-toggle="modal">注册
          </button>
          <button type="button" class="btn btn-primary" @click="submitForm()">登录</button>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
// import { Modal } from 'bootstrap';
import axios from "axios";
//导入事件总线
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Bus from '../utils/EventBus'

export default {
  name: 'LoginPages',
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
  props: {
    ftoken: {
      type: String,
      required: true,
      default: '',
      validator(value) {
        if (value != null)
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
      isSuccessLogin: false,
      LoginHidden: true
    }
  },
  created() {
    if (this.isSuccessLogin) {
      location.href = "https://www.baidu.cn";
    }
  }
  //这是属于js方式
  // const  modal = document.getElementById('RegisterPages');
  // const  myModal = new bootstrap.Modal(modal)
  ,
  methods: {
    closeModel() {
      //方法 1 TODO 改用js关闭原生模态框
      //  获取模态框元素
      /*alert(777)
      //发现与模态框切换冲突
      //1.const myModal = new Modal(document.getElementsByName('modal'));
      const myModal = new Modal(document.querySelector('.modal'));
      // 关闭模态框
      myModal.hide()*/

      //方法2.使用 vue v-if关闭

      //this.LoginHidden = false

      //方法3.改用触发点击关闭安钮事件
      // 获取需要触发点击事件的元素
      const button = document.getElementById('myCloseButton');
      // 创建一个鼠标点击事件
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      // 触发点击事件
      button.dispatchEvent(clickEvent);


    },

    //封装的提示弹窗
    alertFn(msg, isSuccess) {
      const myAlert = document.querySelector('.Lalert');
      // 1> 显示提示框
      myAlert.classList.add('show')

      // 2> 实现细节
      myAlert.innerText = msg
      const bgStyle = isSuccess ? 'Lalert-success' : 'Lalert-danger'
      myAlert.classList.add(bgStyle)

      // 3> 过2秒隐藏
      setTimeout(() => {
        myAlert.classList.remove('show')
        // 提示：避免类名冲突，重置背景色
        myAlert.classList.remove(bgStyle)
      }, 2000)

      if (isSuccess) {
        //token 持久化
        localStorage.setItem('token',this.token)
        //TODO
        //登录成功进行设置通信告诉主页面登录成功,并提交token
        this.$emit('LoginSuccess', true)


        setTimeout(() => {
          this.closeModel()
        }, 3000)

        //登录成功进行跳转
        // location.href = "https://www.baidu.cn";

      }
    },
    //传递消息的方法
    //TODO 此处模拟的是登录更换头像
    sendMsg() {
      //触发事件
      Bus.$emit('sendMsg', true)
    },
    //提交表单
    submitForm() {
      // 1.2 获取用户名和密码
      const username = document.querySelector('.Lusername').value
      const password = document.querySelector('.Lpassword').value

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

      axios.post('/api/login', {
        username,
        password,
      })
            .then(response => {
            this.Processing_message(response)
            console.log(response)
          })
          .catch(error => {
            //alert(666)
            //console.log(error)
            // 处理登录失败的逻辑
            this.alertFn(error.response, false)

            console.log(error) // 输出错误的响应信息
          });
    },
    //处理登录消息
    Processing_message(response) {
      //alert(999)
      if (response.data.errorCode === "") {
        this.token = response.data.data.token
        this.alertFn(response.data.message, true)

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
.Lalert {
  transition: .5s;
  opacity: 0;
  margin-bottom: 10px;
  background-size: 90%;
  height: 20px;
  text-align: center;
}

.Lalert.show {
  opacity: 1;
}

.Lalert-danger {
  background: orangered;
}

.Lalert-success {
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
  //background-color: rgba(0, 0, 0, 0.5);
}

.Register {
  background: white;
  font-style: normal;
  color: #2c3e50;
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
  background-color: #F6F7F8;
}
</style>