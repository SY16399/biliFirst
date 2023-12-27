<script setup>

</script>

<template>
<div class="BasseVideos">
  <video width="225px" height="85%" autostart="true" loop="loop" controls>
    <source src="../assets/MP4.mp4" type="video/mp4"/>
  </video><br>
  <p>{{message}}</p>
</div>
</template>

<style scoped>
  .BasseVideos{
    margin-top: 1%;
    border-radius: 4px;
    height: 48%;
    background: white;
    margin-left: 1%;
    margin-bottom: 1%;
  }
</style>