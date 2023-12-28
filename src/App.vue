<template>
  <div id="app">
    <HeadNavigation class="HeadNavigation"/>
<!--    <BiliShortcut/>
    <BiliBanner ></BiliBanner>
    <BiliUpVideos></BiliUpVideos>

    <BottomVideos></BottomVideos>-->
    <!-- 传数据   登录与注册-->
<!--    <LoginPages :ftoken="ftoken" @LoginSuccess="SuccessLogin()"  />
    <p> {{isSuccessLogin}}：{{ftoken}} </p>
    <RegisterPages></RegisterPages>-->
<!--<LoginAndRegister></LoginAndRegister>-->

  <!--    文件传输-->
  <FileLoad></FileLoad>
  </div>
</template>

<script>

/*import BiliShortcut from "./components/BiliShortCut.vue";
import BiliBanner from "@/components/BiliBanner.vue";
import BiliUpVideos from "@/components/BiliUpVideos.vue";
import BottomVideos from "@/components/BottomVideos.vue";*/

import FileLoad from "@/components/File/FileLoad.vue";

export default {
  name: 'App',
  //局部注册
  components: {
    FileLoad

    /*    BottomVideos,
        BiliBanner,
        BiliShortcut,
        BiliUpVideos,*/
  },
  data(){
    return{

      ftoken:'1',
      isSuccessLogin:false,
    }
  },
  //登录成功处理数据
  methods:{
    SuccessLogin(isSuccessLogin){
      this.isSuccessLogin = isSuccessLogin;
      //this.ftoken = token;
      this.ftoken = localStorage.getItem('token')
      alert(this.ftoken)
    }
}
}
</script>

<style>

#app {

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
