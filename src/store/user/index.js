import router from '../../router'

export default {
    state: {
        user: {
            id: '',
            name: '',
            email: '',
            token: '',
            holiday_days: '',
            holiday: '',
            rest: ''
        },
    },
    getters: {
        user (state) {
            return state.user
        }
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        },
    },
    actions: {
        signUserIn ({commit}, payload) {
            axios.post(`${host}/auth/login`, payload)
            .then(response => {
                let token = response.data.access_token

                this.dispatch('setAuthorization', token)

                axios.post(`${host}/auth/me`, payload)
                    .then(response => {

                        this.dispatch('initialUser', {data: response.data, token: token})

                        this.dispatch('setUserLocalStorage', {data: response.data, token: token})

                        // check is there any original url
                        let path = localStorage.getItem('original_url')

                        if (path !== undefined && path !== null) {
                            localStorage.removeItem('original_url')
                            router.push(path)
                        } else {
                            router.push('dashboard')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)

                commit('setError', error.response.data.error)
            })
        },
        signUserOut ({commit}) {
            this.dispatch('setAuthorization')

            axios.post(`${host}/auth/logout`)
                .then(response => {
                    console.log(response)

                    this.dispatch('initialUser', {data: '', token : ''})

                    this.dispatch('removeUserLocalStorage')

                    router.push('/')
                })
                .catch(error => {
                    console.log(error)
                })
        },
        autoSignIn ({commit}, payload = localStorage.getItem('office_token')) {

            this.dispatch('setAuthorization', payload)

            axios.post(`${host}/auth/me`)
            .then(response => {

                this.dispatch('initialUser', {data: response.data, token: payload})

                this.dispatch('setUserLocalStorage', {data: response.data, token: payload})

                router.push('/dashboard')
            })
            .catch(error => {
                console.log(error)

                this.dispatch('initialUser', {data: '', token : ''})

                this.dispatch('removeUserLocalStorage')

                router.push('/')
            })

        },
        resetUserProfile ({commit}, payload) {
            this.dispatch('setAuthorization')

            axios.post(`${host}/reset/profile`, payload)
                .then(response => {
                    console.log(response)

                    this.dispatch('initialUser', {data: response.data, token: localStorage.getItem('office_token')})

                    this.dispatch('setUserLocalStorage', {data: response.data, token: localStorage.getItem('office_token')})

                    commit('setSuccessSnackbar', true)

                    setTimeout( () => {
                        commit('setSuccessSnackbar', false)
                    }, 3000)
                })
                .catch(error => {
                    console.log(error)

                    commit('setError', error.response.data.error)
                })
        },
        resetUserPassword ({commit}, payload) {
            this.dispatch('setAuthorization')

            axios.post(host + '/reset/password', payload)
                .then(response => {
                    console.log(response)

                    this.dispatch('initialUser', {data: response.data, token: localStorage.getItem('office_token')})

                    this.dispatch('setUserLocalStorage', {data: response.data, token: localStorage.getItem('office_token')})

                    commit('setSuccessSnackbar', true)

                    setTimeout( () => {
                        commit('setSuccessSnackbar', false)
                    }, 3000)
                })
                .catch(error => {
                    console.log(error.response.data.message)

                    commit('setError', error.response.data.message)
                })
        },
        initialUser ({commit}, payload) {
            let user = {
                id: payload.data.id,
                name: payload.data.name,
                email: payload.data.email,
                token: payload.token,
                holiday_days: payload.data.holiday_days,
                holiday: payload.data.holiday,
                rest: payload.data.rest
            }

            commit('setUser', user)
        },
        setUserLocalStorage ({commit}, payload) {
            localStorage.setItem('office_id', payload.data.id)
            localStorage.setItem('office_name', payload.data.name)
            localStorage.setItem('office_email', payload.data.email)
            localStorage.setItem('office_token', payload.token)
        },
        removeUserLocalStorage ({commit}) {
            localStorage.removeItem('office_id')
            localStorage.removeItem('office_name')
            localStorage.removeItem('office_email')
            localStorage.removeItem('office_token')
        },
        setAuthorization ({commit}, payload = localStorage.getItem('office_token')) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload
        }
    }
}
