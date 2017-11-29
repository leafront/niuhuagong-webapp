import * as types from './mutation-types'

const state = {
	activeCourse:0
}

const getters = {
	getActiveCourse: state=>state.activeCourse
}

const actions = {
	updateActiveCourse ( {commit}, select_id ){
		commit(types.UPDATE_ACTIVE_COURSE, select_id)
	}
}

const mutations = {
	[types.UPDATE_ACTIVE_COURSE] ( state, select_id ) {
		state.activeCourse = select_id
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}