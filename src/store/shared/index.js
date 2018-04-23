export default {
    state: {
        error: null,
        successSnackbar: false,
    },
    getters: {
        error (state) {
            return state.error
        },
        successSnackbar (state) {
            return state.successSnackbar
        },
    },
    mutations: {
        setError (state, payload) {
            state.error = payload
        },
        setSuccessSnackbar (state, payload) {
            state.successSnackbar = payload
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