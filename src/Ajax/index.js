import axios from 'axios'
import store from '../store'
import router from '../router'
import {
  Message,
  Loading
} from 'element-ui'
let loading;

function startLoading() { //使用Element loading-start 方法 加载动画
  loading = Loading.service({
    lock: true,
    text: 'Loding',
    background: 'rgba(0,0,0,0.6)'
  })
}

function endLoading() { //使用Element loading-close 方法 关闭动画
  loading.close()
}
//生产环境判断 线下测试域名 线上服务器域名
const BASEAPI = process.env.NODE_ENV === 'development' ? 'https://www.jimhalo.com/web/' : 'https://www.jimhalo.com/web/'
// 创建axios实例
const request = axios.create({
  baseURL: BASEAPI, //请求接口域名
  timeout: 60000, // 请求超时设置
  withCredentials: false, //是否让axios请求携带 cookies 如果是用session验证此处为true 默认为false可以不写
  headers: {
    'content-type': 'application/json'
  } //请求头配置
});
// 请求拦截
request.interceptors.request.use(config => {
  startLoading();
  if (store.state.token) {
    // console.log(store.state.token)
    config.headers.token = `${store.state.token}`;
  } // 让每个请求头携带存入vuex中的token 根据实际情况自行修改
  return config;
}, error => {
  return Promise.reject(error);
});
//响应拦截
request.interceptors.response.use(response => {
  //结束加载动画
  endLoading()
  //此处判断token/ession是否过期然后跳转login页面 从新获取
  if (response.data.code == -30) {
    router.push('/login')  
  }
  return response;
}, error => {
  endLoading()
  console.log(error)
  return Promise.reject(error);
});

export default request
