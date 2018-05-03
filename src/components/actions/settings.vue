<template>
    <v-app>
        <v-container grid-list-lg text-xs-center class="mt-5">
            <v-layout row wrap>
                <v-flex xs12 sm12 md6>
                    <v-card>
                        <v-card-title primary-title>
                            <div class="headline"><strong>基本資料</strong></div>
                        </v-card-title>
                        <v-card-text class="grey lighten-4">
                            <v-container
                                    fluid
                                    style="min-height: 0;"
                                    grid-list-lg
                            >
                                <v-form v-model="valid_1" ref="form_1" lazy-validation>
                                    <v-text-field
                                            label="姓名"
                                            v-model="name"
                                            :rules="nameRules"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            label="電子郵件"
                                            v-model="email"
                                            :rules="emailRules"
                                            required
                                    ></v-text-field>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                                :disabled="!valid_1"
                                                @click.prevent="profileSubmit"
                                                color="primary"
                                        >
                                            確認
                                        </v-btn>
                                        <v-btn @click="profileClear">清除</v-btn>
                                    </v-card-actions>
                                </v-form>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-flex>

                <v-flex xs12 sm12 md6>
                    <v-card>
                        <v-card-title primary-title>
                            <div class="headline"><strong>密碼重設</strong></div>
                        </v-card-title>
                        <v-card-text class="grey lighten-4">
                            <v-container
                                    fluid
                                    style="min-height: 0;"
                                    grid-list-lg
                            >
                                <v-form v-model="valid_2" ref="form_2" lazy-validation>
                                    <v-text-field
                                            label="輸入舊密碼"
                                            v-model="old_password"
                                            :append-icon="e1 ? 'visibility' : 'visibility_off'"
                                            :append-icon-cb="() => (e1 = !e1)"
                                            :type="e1 ? 'text' : 'password'"
                                            counter
                                    ></v-text-field>
                                    <v-text-field
                                            label="輸入新密碼"
                                            v-model="password"
                                            :append-icon="e2 ? 'visibility' : 'visibility_off'"
                                            :append-icon-cb="() => (e2 = !e2)"
                                            :type="e2 ? 'text' : 'password'"
                                            counter
                                    ></v-text-field>
                                    <v-text-field
                                            label="確認新密碼"
                                            v-model="password_confirmation"
                                            :append-icon="e3 ? 'visibility' : 'visibility_off'"
                                            :append-icon-cb="() => (e3 = !e3)"
                                            :type="e3 ? 'text' : 'password'"
                                            counter
                                    ></v-text-field>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                                :disabled="!valid_2"
                                                @click.prevent="passwordSubmit"
                                                color="primary"
                                        >
                                            確認
                                        </v-btn>
                                        <v-btn @click="passwordClear">清除</v-btn>
                                    </v-card-actions>
                                </v-form>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "settings",
        data () {
            return {
                valid_1: true,
                valid_2: true,
                name: '',
                email: '',
                e1: false,
                e2: false,
                e3: false,
                old_password: '',
                password: '',
                password_confirmation: '',
                nameRules: [
                    (v) => !!v || '必須填入姓名',
                ],
                emailRules: [
                    (v) => !!v || '必須填入Email',
                    (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || '必須是Email格式'
                ],
            }
        },
        computed: {
            ...mapGetters([
                'user',
            ]),
        },
        mounted () {
            this.name = this.user.name
            this.email = this.user.email
        },
        watch: {
            user () {
                this.name = this.user.name
                this.email = this.user.email
            }
        },
        methods: {
            ...mapActions([
                'resetUserProfile',
                'resetUserPassword'
            ]),
            profileSubmit () {
                if (this.$refs.form_1.validate()) {
                    this.resetUserProfile({
                        name: this.name,
                        email: this.email
                    })
                }
            },
            profileClear () {
                this.$refs.form_1.reset()
            },
            passwordSubmit () {
                if (this.$refs.form_2.validate()) {
                    this.resetUserPassword({
                        old_password: this.old_password,
                        password: this.password,
                        password_confirmation: this.password_confirmation
                    })
                }

                this.$refs.form_2.reset()
            },
            passwordClear () {
                this.$refs.form_2.reset()
            },
        }
    }
</script>

<style scoped>

</style>