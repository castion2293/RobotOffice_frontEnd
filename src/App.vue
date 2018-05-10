<template>
    <v-app>
        <loader v-if="loading"></loader>
        <sucessSnackbar></sucessSnackbar>

        <v-toolbar
          app
          :clipped-left="clipped"
          :class="background"
        >
            <v-toolbar-title v-show="userIsAuthenticated">
                <v-btn flat @click="" to="/dashboard">
                    <b class="title white--text"><strong>羅博特科技e化系統</strong></b>
                </v-btn>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title v-show="!userIsAuthenticated">
                <v-btn flat @click="dialog = !dialog">
                    <v-icon left class="white--text">exit_to_app</v-icon>
                    <b class="subheading white--text"><strong>登入</strong></b>
                </v-btn>
            </v-toolbar-title>

            <v-toolbar-title v-show="userIsAuthenticated">
                <span class="hidden-xs-only white--text">{{ user.name }}</span>
                <v-menu offset-y>
                    <v-btn icon slot="activator" dark>
                        <v-icon>keyboard_arrow_down</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile @click="" to="/actions/present">
                            <v-icon class="mr-3" color="deep-orange accent-3">alarm</v-icon>
                            <v-list-tile-title class="mr-3"><strong>打卡</strong></v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="" to="/actions/holiday">
                            <v-icon class="mr-3" color="deep-orange accent-3">date_range</v-icon>
                            <v-list-tile-title class="mr-3"><strong>請假</strong></v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="" to="/actions/trip">
                            <v-icon class="mr-3" color="deep-orange accent-3">flight</v-icon>
                            <v-list-tile-title class="mr-3"><strong>出差</strong></v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="" to="/actions/rest">
                            <v-icon class="mr-3" color="deep-orange accent-3">note_add</v-icon>
                            <v-list-tile-title class="mr-3"><strong>補休</strong></v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="" to="/actions/statistic">
                            <v-icon class="mr-3" color="deep-orange accent-3">equalizer</v-icon>
                            <v-list-tile-title class="mr-3"><strong>統計</strong></v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="" to="/actions/settings">
                            <v-icon class="mr-3" color="deep-orange accent-3">settings</v-icon>
                            <v-list-tile-title class="mr-3"><strong>設定</strong></v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="logout" to="">
                            <v-icon class="mr-3" color="deep-orange accent-3">keyboard_tab</v-icon>
                            <v-list-tile-title class="mr-3"><strong>登出</strong></v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-title>
        </v-toolbar>

        <div v-if="userIsAuthenticated">
            <v-content>
                <router-view/>
            </v-content>
        </div>

        <div v-else>
            <router-view/>
        </div>

        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-media
                        class="white--text"
                        height="200px"
                        src="https://s3.amazonaws.com/robot-office-pics/2018050802.jpg"
                >
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                <span class="headline"><strong>使用者登入</strong></span>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-media>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="電子郵件" required v-model="email"></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-flex xs12>
                            <v-text-field label="密碼" type="password" required v-model="password"></v-text-field>
                        </v-flex>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-orange accent-3" flat @click.native="dialog = false"><strong>取消</strong></v-btn>
                    <v-btn color="deep-orange accent-3" flat @click.native="login"><strong>登入</strong></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="errorMessage" persistent max-width="500px">
            <v-card>
                <v-alert color="error" icon="warning" value="true">
                    {{ error }}
                </v-alert>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click.native="dismissError">
                        <v-icon>cancel</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions  } from 'vuex'
import loader from './components/loader'
import sucessSnackbar from './components/successSnackbar'

export default {
    data () {
        return {
                clipped: false,
                dialog: false,
                email: '',
                password: '',
            }
        },
    name: 'App',
    components: {
        sucessSnackbar,
        loader
    },
    computed: {
        ...mapGetters([
            'user',
            'error',
            'loading'
        ]),
        userIsAuthenticated () {
            return this.user.token !== null && this.user.token !== 'undefined' && this.user.token !== ''
        },
        errorMessage () {
            return this.error !== null && this.error !== 'undefined'
        },
        background () {
            if (this.userIsAuthenticated) {
                return 'black'
            }

            return 'transparent'
        }
    },
    mounted ()  {
        this.$store.dispatch('refreshUser')
    },
    methods: {
        ...mapActions([
            'signUserIn',
            'signUserOut',
            'clearError'
        ]),
        login () {
            let data = {
                email: this.email,
                password: this.password
            }
            this.signUserIn(data)
            this.dialog = !this.dialog
        },
        logout () {
            this.signUserOut()
        },
        dismissError () {
            this.clearError()
        },
    }
}
</script>

<style scoped>

</style>
