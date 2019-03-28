import request from '@/Ajax/index.js'
//获取店铺发货地址
export  function getDeliveryAddress(id){
    return request({
        url:`/address/getDeliveryAddress?shopId=${id}`,
        method:'get',
    })
}
//获取店铺配送方式
export  function getStoreDistributions(id){
    return request({
        url:`/product/getStoreDistribution?shopId=${id}`,
        method:'get',
    })
}
//生成订单
export  function addOrder(data){
    return request({
        url:`/order/addOrder`,
        method:'post',
        data:data
    })
}