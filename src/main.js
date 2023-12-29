import Vue from 'vue'
import App from './App.vue'

//1.在main.js中进行全局注册,导入在最上方使用
import HeadNavigation from "./components/HeadNavigation.vue";
Vue.config.productionTip = true
Vue.component('HeadNavigation',HeadNavigation)
//2.注册登录.pages
import LoginPages from "@/components/LoginPages.vue";
Vue.component('LoginPages',LoginPages);
import RegisterPages from "@/components/RegisterPages.vue";
Vue.component('RegisterPages',RegisterPages)
/*new Vue({
  render: h => h(App),
}).$mount('#app')*/

import 'bootstrap/dist/css/bootstrap.min.css';
//在脚手架环境中不要使用这个
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.esm.js';
//注册登录和注册页
import LoginAndRegister from "@/components/LoginAndRegister.vue";
Vue.component('LoginAndRegister',LoginAndRegister)
// import 'bootstrap/dist/js/bootstrap.js'

//文件传输
import FileLoad from "@/components/File/FileLoad.vue";
Vue.component('FileLoad',FileLoad)
new Vue({
  el: '#app',
  render: (createElement) =>{
    return createElement(App)
  }

})//.$mount('#app')