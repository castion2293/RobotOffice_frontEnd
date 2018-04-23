import router from "../../router";

export default {
    state: {
        holiday_type: []
    },
    getters: {
        holidayType (state) {
            return state.holiday_type
        }
    },
    mutations: {
        setHolidayType (state, payload) {
            state.holiday_type = payload
        },
    },
    actions: {
        createSchedule({commit}, payload) {
            axios.post(`${host}/schedule`, payload)
                .then(response => {
                    setTimeout(() => {
                        this.dispatch('refreshUser')
                    }, 1000)

                    router.push('/dashboard')
                })
                .catch(error => {
                    this.dispatch('takeError', error.response.data.error);
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