<script setup>
//这是左侧视频组件
import BaseVideos from "@/components/BaseVideos.vue";
</script>

<template>
<div class="BiliUpVideos">
  <ul>
    <BaseVideos class="biliUpVideos" v-for="item in 6" :key="item"></BaseVideos>


  </ul>

</div>
</template>

<style scoped>
.BiliUpVideos {
  float: none;
  width: 50%;
  height: 410px;
  margin-left: 5px;
  display: flex;
  background: #00a1d6;
}
.biliUpVideos{
  float: left;
  margin-right: 1%;
}




</style>