import request from '@/Ajax/index.js'
// 加入购物车
export function addShopCart(data){
	return request({
		url:`/cart/addShopCart`,
        method:'post',
        data:data
	})
}
// 删除购物车
export function delShopCart(userId,cartId){
	return request({
		url:`/cart/delShopCart?userId=${userId}&cartId=${cartId}`,
        method:'get',
	})
}
// 清空购物车
export function emptyShopCart(id){
	return request({
		url:`/cart/emptyShopCart?userId=${id}`,
        method:'get',
	})
}
// 获取用户购物车信息
export function getShopCartList(id,pageNo,pageSize,){
	return request({
		url:`/cart/getShopCartList?userId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`,
        method:'get',
	})
}
//修改购物车商品数量
export function updateTheNumber(data){
	return request({
		url:`/cart/updateTheNumber`,
		method:'post',
		data:data
	})
}
