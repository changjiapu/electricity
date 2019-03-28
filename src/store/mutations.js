import * as types from './mutation-types'
const mutations = {
	[types.SET_TOKEN](state, token) {
		state.token = token
	},
	[types.REMOVE_TOKEN](state) {
		state.token = ''
	},
	[types.SET_USERID](state,id) {
		state.userId = id
	},
	[types.REMOVE_USERID](state) {
		state.userId = ''
	},
}
export default mutations