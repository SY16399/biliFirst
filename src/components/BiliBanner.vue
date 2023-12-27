<script setup>

</script>

<template>
  <div class="BiliBanner">


    <div class="slideshow-container">
      <div class="mySlides fade">
        <img src="slide1.jpg" style="width:100%">
      </div>

      <div class="mySlides fade">
        <img src="slide2.jpg" style="width:100%">
      </div>

      <div class="mySlides fade">
        <img src="slide3.jpg" style="width:100%">
      </div>
      <div class="Banner_bottom">
        <span>{{message}}</span>
        <button class="prev" @click="plusSlides(-1)">&#10094;</button>
        <button class="next" @click="plusSlides(1)">&#10095;</button>
      </div>

    </div>
    <br>


  </div>
</template>
<script>
export default {
  data() {
    return {
      slideIndex: 0,
      message:"宗旨就是非常可爱"
    }
  },
  created() {
    this.showSlides();
  },
  methods: {
    showSlides() {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      this.slideIndex++;
      if (this.slideIndex > slides.length) {
        this.slideIndex = 1
      }
      slides[this.slideIndex - 1].style.display = "block";
      setTimeout(this.showSlides, 2000); // 切换时间间隔为 2 秒
    },
    plusSlides(n) {
      this.showSlides(this.slideIndex += n);
    }
  }
}
</script>
<style scoped>
.mySlides {
  width: 90%;
  height: 90%;
}

.Banner_bottom {
  margin-right: 0px;
}
</style>
<style scoped>
.BiliBanner {
  float: left;
  width: 45%;
  height: 410px;
  margin-left: 40px;
  display: flex;
  background: red;
}

</style>