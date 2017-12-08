import * as types from './mutation-types'

const state = {

	isMenu: false,

	overlayVisible: false,

	pageView: false

}

const getters = {

	getIsMenu: state => state.isMenu,

	getOverlayVisible: state => state.overlayVisible,

	getPageView: state => state.pageView

}

const actions = {

	updateIsMenu ( {commit}, info ){

		commit(types.UPDATE_IS_MENU, info)

	},
	updateOverlayVisible ({commit},info) {

		commit(types.UPDATE_OVERLAY_VISIBLE, info)

	},

	updatePageView ({commit}, info) {

		commit(types.UPDATE_PAGE_VIEW,info)

	}
}

const mutations = {

	[types.UPDATE_IS_MENU] ( state, info ) {

		state.isMenu = info

	},

	[types.UPDATE_OVERLAY_VISIBLE] (state, info) {

		state.overlayVisible = info

	},

	[types.UPDATE_PAGE_VIEW] (state,info) {

		state.pageView = info

	}
}

export default {
	state,
	getters,
	actions,
	mutations
}