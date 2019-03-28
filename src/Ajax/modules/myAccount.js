import request from '@/Ajax/index.js'
//获取用户详细信息
export  function getuserInfo(data){
    return request({
        url:`/user/getUserById?userId=${data}`,
        method:'post',
    })
}
// 获取客服服务信息
export  function getCustomerService(){
    return request({
        url:`/user/getCustomerService`,
        method:'get',
    })
}
//查询帮助信息
export  function getHelpList(){
    return request({
        url:`/user/getHelpList`,
        method:'get',
    })
}