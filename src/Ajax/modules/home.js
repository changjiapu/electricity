import request from '@/Ajax/index.js'
//轮播数据获取
export function getBanner(){
    return request({
        url:'slides/getSlidesList',
        method:'get'
        
    })
}
//首页新品数据获取
export function getNewsGoods(pageNO,pageSize){
	return request({
		 url:'product/getNewGoods?pageNO=' +pageNO +'&pageSize=' +pageSize ,
        method:'get'
	})
}
//首页下拉菜单
export function getHomeNav(){
	return request({
		url:'product/getProductCategory?level=1&type=2',
		method:'get'
	})
}
//首页热门图片
export function homePopular(){
	return request({
		url:'activity/getAdvertisingList',
		method:'get'
	})
}
// 查询是否有活动
export function activityX(){
	return request({
		url:'activity/getTimeLimitedAdvertisingState',
		method:'get'
	})
}
//首页下拉菜单数据
export function getProductCategory(){
	return request({
		url:'/product/getProductCategory?level=1&type=2',
		method:'get'
	})
}
//获取seo优化信息
export function getSeoInformation(){
	return request({
		url:'/user/getSeoInformation',
		method:'get'
	})
}
//查询网站底部链接信息
export function getLinkLabelList(){
	return request({
		url:'/user/getLinkLabelList',
		method:'get'
	})
}