// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import $ from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n'
Vue.use(ElementUI);
Vue.use(VueI18n)
Vue.config.productionTip = false
Vue.prototype.bus = new Vue()
 
const i18n = new VueI18n({
  // 从本地存储中取，如果没有默认为中文，
  // 这样可以解决切换语言后，没记住选择的语言，刷新页面后还是默认的语言
  locale:'en',
  
  messages: {
    'zh':  require('./vuei18n/zh'), // 中文语言包
    'en': require('./vuei18n/en') // 英文语言包
  }
})

new Vue({ 
  el: '#app',
  i18n,
  store,
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App),
  data() {
    return {
      heightH:'',
      widthH: "", //当前设备的屏幕宽度
      imgUrl:'https://www.jimhalo.com/web/file/showPicture?imageId='  //图片前缀
    }
  },
  mounted(){
    window.fbAsyncInit = function() {
      FB.init({
        appId: "366208474212027",
        cookie: true,
        xfbml: true,
        version: "v3.2"
      });

      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }
})
   