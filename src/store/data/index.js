import router from "../../router";

export default {
    state: {
        schedule: {},
        holiday_type: []
    },
    getters: {
        schedule (state) {
            return state.schedule
        },
        holidayType (state) {
            return state.holiday_type
        }
    },
    mutations: {
        setSchedule (state, payload) {
            state.schedule = payload
        },
        setHolidayType (state, payload) {
            state.holiday_type = payload
        },
    },
    actions: {
        getSchedule({commit}, payload) {
            this.dispatch('setAuthorization')

            axios.get(`${host}/schedule?year=${payload.year}&month=${payload.month}`)
                .then(response => {
                    commit('setSchedule', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        createSchedule({commit}, payload) {
            axios.post(`${host}/schedule`, payload)
                .then(response => {
                    setTimeout(() => {
                        this.dispatch('refreshUser')
                    }, 1000)

                    commit('setSuccessSnackbar', true)

                    router.push('/dashboard')

                    setTimeout( () => {
                        commit('setSuccessSnackbar', false)
                    }, 3000)
                })
                .catch(error => {
                    this.dispatch('takeError', error.response.data.error);
                })
        },
        deleteSchedule({commit}, payload) {
            axios.delete(`${host}/schedule/${payload}`)
                .then(response => {
                    setTimeout(() => {
                        this.dispatch('refreshUser')
                    }, 1000)

                    commit('setSuccessSnackbar', true)

                    setTimeout( () => {
                        commit('setSuccessSnackbar', false)
                    }, 3000)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getHolidayType({commit}) {
            axios.get(`${host}/holiday/type`)
                .then(response => {
                    commit('setHolidayType', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        refreshUser ({commit}) {
            this.dispatch('setAuthorization')

            axios.post(`${host}/auth/me`)
                .then(response => {
                    commit('setUser', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}