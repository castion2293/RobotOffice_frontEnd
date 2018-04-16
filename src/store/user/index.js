import router from '../../router'

export default {
    state: {
        user: {
            id: '',
            name: '',
            email: '',
            photo: '',
            token: '',
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
        setUserToken (state, payload) {
            state.user.token = payload
        },
        setUser (state, payload) {
            state.user.id = payload.id
            state.user.name = payload.name
            state.user.email = payload.email
            state.user.photo = payload.photo
            state.user.holiday = payload.holiday
            state.user.rest = payload.rest
        }
    },
    actions: {
        signUserIn ({commit}, payload) {
            axios.post(`${host}/auth/login`, payload)
            .then(response => {
                let token = response.data.access_token
                localStorage.setItem('office_token', token)

                commit('setUserToken', token)

                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                axios.post(`${host}/auth/me`, payload)
                    .then(response => {
                        commit('setUser', response.data)

                        localStorage.setItem('office_id', response.data.id)
                        localStorage.setItem('office_name', response.data.name)
                        localStorage.setItem('office_email', response.data.email)
                        localStorage.setItem('office_photo', response.data.photo)

                        router.push('/dashboard')
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
        },
        autoSignIn ({commit}, payload) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload

            axios.post(`${host}/auth/me`, payload)
            .then(response => {
                commit('setUser', response.data)

                localStorage.setItem('office_id', response.data.id)
                localStorage.setItem('office_name', response.data.name)
                localStorage.setItem('office_email', response.data.email)
                localStorage.setItem('office_photo', response.data.photo)

                router.push('/dashboard')
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
