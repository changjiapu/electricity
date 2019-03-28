import request from '@/Ajax/index.js'
//获取用户地址集合
export function getAddresslist(data) {
  return request({
    url: `/address/getUserAddressListByUserId?userId=${data}`,
    method: 'post',
  })
}
//添加用户地址
export function Address(data) {
  return request({
    url: `/address/addUserAddress`,
    method: 'post',
    data: data
  })
}
//删除用户地址
export function AddressDelete(data) {
  return request({
    url: `/address/delAddById`,
    method: 'post',
    data: data
  })
}
//修改用户地址信息
export function updAddById(data) {
    return request({
      url: `/address/updAddById`,
      method: 'post',
      data: data
    })
  }
//设置或取消默认地址
export function Default(data) {
  return request({
    url: `/address/updAddDefaultById`,
    method: 'post',
    data: data
  })
}
