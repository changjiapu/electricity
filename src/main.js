// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import $ from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.bus = new Vue()
/* eslint-disable no-new */
new Vue({ 
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App),
  data() {
    return {
      heightH:'',
      widthH: "", //当前设备的屏幕宽度
      imgUrl:'http://114.115.211.170:8080/web/file/showPicture?imageId='  //图片前缀
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
   