import request from '@/Ajax/index.js'
// 获取订单列表
export function queryOrderList(userId,state,pageNo,pageSize){
    return request({
        url:`/order/queryOrderList?userId=${userId}&state=${state}&pageNo=${pageNo}&pageSize=${pageSize}`,
        method:'post',
    })
}
// 删除订单
export function deleteOrder(detailId){
    return request({
        url:`/order/deleteOrder?detailId=${detailId}`,
        method:'post',
    })
}
// 取消订单
export function cancelOrder(detailId){
    return request({
        url:`/order/cancelOrder?detailId=${detailId}`,
        method:'post',
    })
}
// 确认收货
export function ConfirmOrder(){
    return request({
        url:`/order/ConfirmOrder?detailId=1`,
        method:'post'
    })
}
//查看订单详情
export function getOrderDetailById(detailId){
    return request({
        url:`/order/getOrderDetailById?detailId=${detailId}`,
        method:'post',
    })
}