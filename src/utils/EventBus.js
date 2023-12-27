//1.创建一个都能访问到的时间总线(空的Vue实例)
import Vue from 'vue'
//通知不是通知一个，而是所有监听的都被通知
const Bus = new Vue();
//导出
export default Bus

