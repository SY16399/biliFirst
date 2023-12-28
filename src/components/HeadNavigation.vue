<script setup>

</script>
<template>
  <div class="HeadNavigation">
    <header id="header-Layout">
      <!-- 左边部分 -->
      <nav>
        <div class="header-Layout-left">
          <ul id="left_url">
            <li v-for="(item,index) in left_header" :key="index">
              <a :href="item.url" target="_blank">{{ item.name }}</a></li>
          </ul>
        </div>
      </nav>

      <!-- 中间部分 -->
      <div class="search-bar">

        <form action="">
          <input class="search-input" type="text" value="" placeholder="歪嘴战神在b站恰饭的日子"/>
          <button class="search-button" value="">搜索</button>
        </form>
      </div>

      <!--data-bs-toggle="modal" data-bs-target="#LoginPages"   登录框显示，暂时现写上 href="#"  开发其他组件-->
      <a class="btn btn-primary" href="#"><img id="head-portrait" :src="headImgPath" alt="登录"></a>
      <!-- 右边部分 -->
      <nav>
        <div class="header-Layout-right">
          <ul id="">
            <li>

            </li>
            <li v-for="(item,index) in right_header" :key="index">
              <a :href="item.url" target="_blank">{{ item.name }}</a>
            </li>
            <li id="upload">
              <a href="https://member.bilibili.com/v2#/upload/video/frame">投稿</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
</template>


<script>
//监听事件总线
import Bus from "@/utils/EventBus";

export default {
  name: "HeadNavigation",
  data() {
    return {
      //headImgPath: process.env.BASE_URL + 'no_loader.png',
      headImgPath: require('@/assets/picture/no_loader.png'),
      left_header: [{url: '', name: '主站'},
        {url: '', name: '番剧'},
        {url: '', name: '游戏中心'},
        {url: '', name: '直播'},
        {url: '', name: '漫画'},
        {url: '', name: '下载APP'}],
      right_header: [{url: '', name: '大会员'},
        {url: '', name: '消息'},
        {url: '', name: '动态'},
        {url: '', name: '收藏'},
        {url: '', name: '历史'},
        {url: '', name: '创作中心'},
        /*{url:'' ,name:'投稿'}*/]
    }
  }
  ,
  methods: {},
  mounted() {
    document.querySelector('.search-input').focus()
  },
  created() {
    //等待被通知登录成功
    //2.在创建的时候就进行监听
    Bus.$on('sendMsg', (msg) => {
      //alert("被发送消息"+msg)
      console.log("HeadNavigation:" + "被发送消息" + msg)
      this.headImgPath = require('@/assets/logo.png')
    })
  }

}
</script>

<style scoped>

* {
  height: 60px;
  margin: 0;
  padding: 0;
  text-align: center;
  align-items: center;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.HeadNavigation header {
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.header-Layout-left {
  margin-top: 20px;
  width: 100%;

}

.header-Layout-right {
  margin-top: 20px;
  width: 100%;
}

nav div ul {
  list-style: none;
  display: flex;
  align-items: center;
}

nav div ul li {
  margin-right: 15px;
}

nav div ul li:hover {
  background: #F6F7F8;
  height: 30px;
}

nav div ul li a {
  text-decoration: none;
  color: #333;
  padding: 10px;
}

.search-bar {
  width: 30%;
  flex-grow: 1;
  margin: 0 10px;
}

.search-bar input {
  width: 80%;
  height: 25px;
  padding: 0px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #F6F7F8;
  margin-top: 20px;
  /*border: 1px solid #ccc;*/
}

.btn {
  background: none;
  border: none;
  margin-top: 10px;
}

.search-bar input:hover {

  background: white;
}

.search-bar button {
  width: 15%;
  height: 30px;
  float: right;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #00a1d6;
  color: #fff;
  position: relative;
  top: 15px;

}

.search-bar button:hover {
  background-color: #0088af;
}

#upload {
  background: #ee97b3;
}

#head-portrait {
  width: 30px;
  height: 30px;
  border-radius: 50%
}

#head-contribute {
  float: left;
  padding: 0;
  border: 0;
  position: relative;
  left: -10px;
}
</style>