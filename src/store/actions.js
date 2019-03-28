import * as types from './mutation-types'

//保存token
export const getToken = function({commit,state},token){
	commit(types.SET_TOKEN, token)
}
//删除token
export const removeToken = function({commit,state},token){
	commit(types.SET_TOKEN,'')
}


