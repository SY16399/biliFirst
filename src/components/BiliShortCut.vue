<script setup>

</script>

<template>
  <div class="biliShortCut">
    <div class="biliShortCut-left">
      <ul id="left_url">
        <li class="biliShortCut-left-item" v-for="(item,index) in left_item" :key="index">
          <a :href="item.url" target="_blank">{{ item.name }}</a>
        </li>
      </ul>
    </div>
    <div class="biliShortCut-center">
      <ul id="center_url">
        <li class="biliShortCut-center-item" v-for="(item,index) in center_item" :key="index">
          <a :href="item.url" target="_blank">{{ item.name }}</a>
        </li>
      </ul>
    </div>
    <div class="biliShortCut-right">
      <ul id="right-url">
        <li class="biliShortCut-right-item" v-for="(item,index) in right_item" :key="index">
          <a :href="item.url" target="_blank">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.biliShortCut {
  height: 100px;
  background: #ffffff;
  align-items: center;
  border-radius: 8px;
}

.biliShortCut-left {
  width: 100px;
  margin-left: 20px;
}

.biliShortCut-center {
  width: 748px;
}

.biliShortCut-right {
  width: 168px;
}

div div ul {
  list-style: none;
}

div div ul li {
  float: left;
}

.biliShortCut-left-item {
  height: 90%;
  width: 45%;
}
a {
  text-decoration: none;
}

#center_url {
  padding: 0 20px 0 0;
  display: flex;
  flex-wrap: wrap;
}

.biliShortCut-center-item {
  background: #F6F7F8;
  width: 9%;
  margin-top: 1%;
  margin-bottom: 1%;

}

#right-url {

  padding: 0 10px 0 0;


}
.biliShortCut-right-item{
  width: 33%;
  float: left;
  margin-top: 1%;
  margin-bottom: 1%;

}
.biliShortCut {
  display: flex;
  flex-wrap: wrap;
}

.biliShortCut-left,
.biliShortCut-center,
.biliShortCut-right {
  flex: auto;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline-block;
}
</style>
<script>
export default {
  name: "HeadNavigation",
  data() {
    return {
      left_item: [{url: '', name: '动态'},
        {url: '', name: '热门'}],
      center_item: [{url: '', name: '番剧'},
        {url: '', name: '国创'},
        {url: '', name: '综艺'},
        {url: '', name: '动画'},
        {url: '', name: '鬼畜'},
        {url: '', name: '舞蹈'},
        {url: '', name: '娱乐'},
        {url: '', name: '科技'},
        {url: '', name: '美食'},
        {url: '', name: '汽车'},
        {url: '', name: '运动'},
        {url: '', name: '电影'},
        {url: '', name: '电视剧'},
        {url: '', name: '纪录片'},
        {url: '', name: '游戏'},
        {url: '', name: '音乐'},
        {url: '', name: '影视'},
        {url: '', name: '知识'},
        {url: '', name: '咨询'},
        {url: '', name: '生活'},
        {url: '', name: '时尚'},
        {url: '', name: '更多'},
        /*{url:'' ,name:'投稿'}*/],
      right_item: [
        {url: '', name: '专栏'},
        {url: '', name: '活动'},
        {url: '', name: '社区中心'},
        {url: '', name: '直播'},
        {url: '', name: '课堂'},
        {url: '', name: '新歌热榜'},
      ]
    }

  }
  ,
  methods: {},
  created() {
  }
}
</script>
