import request from '@/Ajax/index.js'
//获取标签
export function getFace(){
	return request({
		url:'product/getProductParamList?shopId=1',
		method:'get'
	})
}
//列表页数据
export function getListData(data){
    return request({
        url:'product/getProductList',
        method:'post',
        data:data
        
    })
}
// 查询价格区间
export function getPriceX(data){
    return request({
        url:'product/getCommodityPriceRange',
        method:'get',
        data
    })
}
// 查询排序规则
export function getSortX(data){
    return request({
        url:'product/getSortingWay',
        method:'get',
        data
    })
}