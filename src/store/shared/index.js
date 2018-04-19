export default {
    state: {
        error: null,
    },
    getters: {
        error (state) {
            return state.error
        },
    },
    mutations: {
        setError (state, payload) {
            state.error = payload
        },
    },
    actions: {
        clearError ({commit}) {
            commit('setError', null)
        },
        takeError ({commit}, payload) {
            commit('setError', payload)
        },
    }
}