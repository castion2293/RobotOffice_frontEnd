<template>
    <v-app>
        <v-toolbar
          app
          :clipped-left="clipped"
          class="w3-black"
        >
            <v-spacer></v-spacer>
            <v-toolbar-title>
                <v-btn flat @click="dialog = !dialog">
                    <v-icon left class="white--text">exit_to_app</v-icon>
                    <b class="subheading white--text"><strong>登入</strong></b>
                </v-btn>
            </v-toolbar-title>
        </v-toolbar>
        <v-content class="my-content">
          <router-view/>
        </v-content>

        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-media
                        class="white--text"
                        height="200px"
                        src="https://www.intelligent.com/wp-content/uploads/2013/06/chapter_pic04-1.jpg"
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
    </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions  } from 'vuex'

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
    methods: {
        ...mapActions([
            'signUserIn',
        ]),
        login () {
            let data = {
                email: this.email,
                password: this.password
            }
            this.signUserIn(data)
            this.dialog = !this.dialog
        }
    }
}
</script>

<style scoped>
    .my-content {
        position: relative;
    }
</style>
