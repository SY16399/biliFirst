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
import '@/assets/css/BootStrap.css'
new Vue({
  el: '#app',
  render: (createElement) =>{
    return createElement(App)
  }

})//.$mount('#app')