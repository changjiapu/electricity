import request from '@/Ajax/index.js'
// 添加商品评论
export function addComment(data){
	return request({
		url:`/comment/addComment`,
        method:'post',
        data:data
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
//获取商品评论
export function getCommentList(sType,productId,pageNo,pageSize,userId){
	if(!userId){
		return request({
			url:`/comment/getCommentList?sType=${sType}&productId=${productId}&pageNo=${pageNo}&pageSize=${pageSize}`,
			method:'get',
		})
	}else{
		return request({
			url:`/comment/getCommentList?sType=${sType}&productId=${productId}&pageNo=${pageNo}&pageSize=${pageSize}&userId=${userId}`,
			method:'get',
		})
	}

}
//评论点赞
export function giveALike(userId,commentId){
	return request({
		url:`/comment/giveALike?userId=${userId}&commentId=${commentId}`,
        method:'get',
	})
}
//获取评论排序方式
export function getCommentSortingWay(){
	return request({
		url:`/comment/getCommentSortingWay`,
        method:'get',
	})
}
//用户是否可以对当前商品进行评论
export function canYouComment(userId,productId){
	return request({
		url:`/comment/canYouComment?userId=${userId}&productId=${productId}`,
        method:'get',
	})
}