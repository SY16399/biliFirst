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
<!--    This is a Test-->
<!--  <FileToLoadTest></FileToLoadTest>-->
  <!--    文件传输-->
<!--  <FileLoad></FileLoad>-->

<!--    //用户信息修改-->
    <UserInfoSetPage></UserInfoSetPage>

  </div>
</template>

<script>

/*import BiliShortcut from "./components/BiliShortCut.vue";
import BiliBanner from "@/components/BiliBanner.vue";
import BiliUpVideos from "@/components/BiliUpVideos.vue";
import BottomVideos from "@/components/BottomVideos.vue";*/


// import FileToLoadTest from "@/components/File/FileToLoadTest.vue";


import UserInfoSetPage from "@/components/UserInfo/UserInfoSetPage.vue";

export default {
  name: 'App',
  //局部注册
  components: {
    UserInfoSetPage

    // FileToLoadTest

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
