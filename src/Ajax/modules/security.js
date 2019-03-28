import request from '@/Ajax/index.js'
//修改用户昵称
export  function updUserNikeName(data){
    return request({
        url:`/user/updUserNikeName`,
        method:'post',
        data:data
    })
}
//修改用户电话
export  function updUserPhone(data){
    return request({
        url:`/user/updUserPhone`,
        method:'post',
        data:data
    })
}
//修改用户邮箱
export  function updUserEmail(data){
    return request({
        url:`/user/updUserEmail`,
        method:'post',
        data:data
    })
}
//修改用户密码
export  function updUserPassword(data){
    return request({
        url:`/user/updUserPassword`,
        method:'post',
        data:data
    })
}
//生成图文验证码
export  function verification(data){
    return request({
        url:`/user/verification?userId=${data}`,
        method:'get',
    })
}
