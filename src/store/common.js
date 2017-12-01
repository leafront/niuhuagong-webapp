import * as types from './mutation-types'

const state = {
	isMenu: false
}

const getters = {

	getIsMenu: state => state.isMenu

}

const actions = {

	updateIsMenu ( {commit}, info ){

		commit(types.UPDATE_IS_MENU, info)

	}
}

const mutations = {

	[types.UPDATE_IS_MENU] ( state, info ) {

		state.isMenu = info

	}
}

export default {
	state,
	getters,
	actions,
	mutations
}