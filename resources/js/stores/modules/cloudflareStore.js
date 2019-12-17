export default {
	namespaced: true,
	state     : {
		devMode: []
	},
	mutations : {
		SET_DEVMODE(state, payload) {
			state.devMode = payload;
		}
	},
	actions   : {
		setDevMode({commit}, payload) {
			commit('SET_DEVMODE', payload)
		}
	},
	getters   : {}
}