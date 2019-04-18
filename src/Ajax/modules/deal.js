import request from '@/Ajax/index.js'
//获取限时活动列表
export function getTimeLimitedAdvertisingList(){
    return request({
        url:'/activity/getTimeLimitedAdvertisingList',
        method:'get'
    })
}
//获取活动码
export function getExchangeCode(data){
    return request({
        url:'/activity/getExchangeCode',
        method:'post',
        data:data
    })
}