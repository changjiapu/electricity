import request from '@/Ajax/index.js'
//登陆请求接口
export function login(data){
    return request({
        url:'user/login',
        method:'post',
        data:data
    })
}
//获取用户信息
export function registerFun(data){
	 return request({
        url:'user/getUserById',
        method:'post',
        data:data
    })
}
// 用户注册
export function addUserBySystem(data){
    return request({
       url:'/user/addUserBySystem',
       method:'post',
       data:data
   })
}
//发送邮件验证
export function emailFun(data){
	 return request({
        url:'user/getEmailCode' +'?email='+data ,
        method:'post'
       
    })
}
//facebook登陆
export function facebookLogin(data){
    return request({
       url:'/user/facebookLogin',
       method:'post',
       data:data
   })
}
//订阅
export function subscribeToNews(data){
    return request({
       url:'/user/subscribeToNews',
       method:'post',
       data:data
   })
}
//谷歌登录
export function GoogleLogin(data){
    return request({
       url:'/user/GoogleLogin',
       method:'post',
       data:data
   })
}