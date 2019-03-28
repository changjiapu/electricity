import request from '@/Ajax/index.js'
//添加收藏
export function AddCollection(data){
    return request({
        url:'/collect/AddCollection',
        method:'post',
        data:data     
    })
}
// 获取用户收藏列表
export function queryCollectionList(id,page,pageSize){
    return request({
        url:`/collect/QueryCollectionList?userId=${id}&pageNo=${page}&pageSize=${pageSize}`,
        method:'get',
    })
}
//  删除收藏
export function delCollection(id,collectId){
    return request({
        url:`/collect/delCollection?userId=${id}&collectId=${collectId}`,
        method:'post',
    })
}