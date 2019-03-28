import request from '@/Ajax/index.js'
// 拉起支付页面
export function createPay(userId,detailId){
	return request({
		url:`/paypal/createPay?userId=${userId}&detailId=${detailId}`,
        method:'post',
    })
}
// 获取支付页面信息
export function getPayInformation(detailId){
	return request({
		url:`/order/getPayInformation?detailId=${detailId}`,
        method:'post',
    })
}