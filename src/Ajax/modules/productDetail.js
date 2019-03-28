import request from '@/Ajax/index.js'
//商品详情
export function getProductDetail(id,userId){
	return request({
		url:`/product/getProductById?productId=${id}&userId=${userId}`,
		method:'post'
	})
}
//获取处方定义信息
export function getPrescriptionKVList(){
	return request({
		url:`/prescription/getPrescriptionKVList`,
		method:'get'
	})
}
//获取用户处方信息
export function getPrescriptionUserList(userId){
	return request({
		url:`/prescription/getPrescriptionUserList?userId=${userId}`,
		method:'get'
	})
}
//添加用户处方信息
export function addPrescriptionByUser(data){
	return request({
		url:`/prescription/addPrescriptionByUser`,
		method:'post',
		data:data
	})
}