import * as types from './mutation-types'

const state = {

	isMenu: false,

	overlayVisible: true

}

const getters = {

	getIsMenu: state => state.isMenu,

	getOverlayVisible: state => state.overlayVisible

}

const actions = {

	updateIsMenu ( {commit}, info ){

		commit(types.UPDATE_IS_MENU, info)

	},
	updateOverlayVisible ({commit},info) {
		commit(types.UPDATE_OVERLAY_VISIBLE, info)
	}
}

const mutations = {

	[types.UPDATE_IS_MENU] ( state, info ) {

		state.isMenu = info

	},

	[types.UPDATE_OVERLAY_VISIBLE] (state, info) {

		state.overlayVisible = info

	}
}

export default {
	state,
	getters,
	actions,
	mutations
}