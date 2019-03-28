import request from '@/Ajax/index.js'
//轮播数据获取
export function getTrendsX(){
    return request({
        url:'activity/getTrendList',
        method:'get'
    })
}