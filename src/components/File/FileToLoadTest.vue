<script setup>
//这是个测试文件URI使用的组件
</script>

<template>
  <div style="height: 60px">
    <img :src="ImgURI">
  </div>
</template>

<script>
import ImgToTest from "@/utils/ImgToTest";

export default {
  data() {
    return {
      ImgURI: ''//require('@/assets/picture/no_loader.png'),
    }
  },
  created() {
    ImgToTest.$on('sendImgUri', (URI) => {
      //设置ImgURI
      this.ImgURI = URI
      console.log(URI + "" + "To")
      //上传成功时保存在本地
      localStorage.setItem('ImgURI',this.ImgURI)
    })
    //网页运行后，获取URI网址使用
    const ImgURI = localStorage.getItem('ImgURI')
    console.log(ImgURI)
    //本第有背景才设置 利用短路的特性
    ImgURI && (this.ImgURI = ImgURI)
  }
}
</script>
<style scoped>

</style>