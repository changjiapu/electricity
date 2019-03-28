import request from '@/Ajax/index.js'
// 获取客服服务信息
export function getCustomerService(){
	return request({
		url:`/user/getCustomerService`,
        method:'get',
	})
}
//添加客户反馈
export function customerFeedback(data){
	return request({
		url:`/user/customerFeedback`,
        method:'post',
        data:data
	})
}
