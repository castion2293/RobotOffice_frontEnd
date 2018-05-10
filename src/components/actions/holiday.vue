<template>
    <v-app>
        <v-layout class="mt-5">
            <v-flex md8 offset-md2>
                <v-card>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex md6 offset-md3>
                                <p class="text-xs-center title mt-3 mb-5 grey--text text--darken-1 hidden-xs-only">
                                    <strong>剩餘 特休:{{ user.holiday }}小時 / 補休:{{ user.rest }}小時</strong>
                                </p>
                                <p class="text-xs-center subheading title mt-3 mb-5 grey--text text--darken-1 hidden-sm-and-up">
                                    <strong>剩餘 特休:{{ user.holiday }}小時 / 補休:{{ user.rest }}小時</strong>
                                </p>
                            </v-flex>
                            <v-flex md6 offset-md3>
                                <v-select
                                        :items="states"
                                        v-model="type"
                                        label="假別"
                                        autocomplete
                                ></v-select>
                            </v-flex>
                            <v-flex md6 offset-md3 class="mt-3">
                                <v-menu
                                        ref="menu"
                                        lazy
                                        :close-on-content-click="false"
                                        v-model="menu"
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        :nudge-right="40"
                                        min-width="290px"
                                        :return-value.sync="date"
                                >
                                    <v-text-field
                                            slot="activator"
                                            label="請選擇日期"
                                            v-model="date"
                                            prepend-icon="event"
                                            readonly
                                    ></v-text-field>
                                    <v-date-picker
                                            v-model="date"
                                            locale="zh-cn"
                                            color="amber darken-2"
                                            @input="$refs.menu.save(date)"
                                    ></v-date-picker>
                                </v-menu>
                            </v-flex>

                            <v-card-text>
                                <v-layout>
                                    <v-flex md1 sm1 xs2 class="pt-3">
                                        <span><strong>從</strong></span>
                                    </v-flex>
                                    <v-flex md5 sm5 xs4>
                                        <v-menu
                                                ref="menu2"
                                                lazy
                                                :close-on-content-click="false"
                                                v-model="menu2"
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                :nudge-right="40"
                                                max-width="290px"
                                                min-width="290px"
                                                :return-value.sync="start_time"
                                        >
                                            <v-text-field
                                                    slot="activator"
                                                    label="請選擇時間"
                                                    v-model="start_time"
                                                    readonly
                                            ></v-text-field>
                                            <v-time-picker
                                                    v-model="start_time"
                                                    locale="zh-cn"
                                                    color="amber darken-2"
                                                    @change="$refs.menu2.save(start_time)"
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-flex>
                                    <v-flex md1 sm1 xs2 class="pt-3 pl-2">
                                        <span><strong>至</strong></span>
                                    </v-flex>
                                    <v-flex md5 sm5 xs4>
                                        <v-menu
                                                ref="menu3"
                                                lazy
                                                :close-on-content-click="false"
                                                v-model="menu3"
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                :nudge-right="40"
                                                max-width="290px"
                                                min-width="290px"
                                                :return-value.sync="end_time"
                                        >
                                            <v-text-field
                                                    slot="activator"
                                                    label="請選擇時間"
                                                    v-model="end_time"
                                                    readonly
                                            ></v-text-field>
                                            <v-time-picker
                                                    v-model="end_time"
                                                    locale="zh-cn"
                                                    color="amber darken-2"
                                                    @change="$refs.menu3.save(end_time)"
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-layout>
                    </v-card-text>

                    <v-card-text class="text-xs-center hidden-xs-only">
                        <v-btn @click="confirm" color="deep-orange accent-3" class="title mr-5" dark><strong>送出</strong></v-btn>
                    </v-card-text>

                    <v-card-text class="text-xs-center hidden-sm-and-up">
                        <v-btn block @click="confirm" color="deep-orange accent-3" class="title mr-5" dark><strong>送出</strong></v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-media
                        class="white--text"
                        height="200px"
                        src="https://s3.amazonaws.com/robot-office-pics/2018050804.jpg"
                ></v-card-media>
                <v-card-text>
                    <v-container grid-list-md>
                        <span >
                            <strong class="">
                                請
                            </strong>
                            <strong class="deep-orange--text text--accent-3">
                                {{ type }}
                            </strong>
                            <strong>
                                於{{ date }} 從{{ start_time }}至{{ end_time }} 共計 {{hours}} 小時
                            </strong>
                        </span>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-orange accent-3" flat @click.native="dialog = false"><strong>取消</strong></v-btn>
                    <v-btn color="deep-orange accent-3" flat @click.native="post"><strong>確認</strong></v-btn>
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
    import { mapGetters, mapActions  } from 'vuex'

    export default {
        name: "holiday",
        data () {
            return {
                type: null,
                states: [],
                date: null,
                menu: false,
                start_time: null,
                menu2: false,
                end_time: null,
                menu3: false,
                dialog: false,
                hours: null
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'error',
                'holidayType'
            ]),
            errorMessage () {
                return this.error !== null && this.error !== 'undefined'
            },
        },
        mounted () {
            this.$store.dispatch('getHolidayType')

            setTimeout(() => {
                this.states = this.holidayType
            }, 1000)
        },
        methods: {
            ...mapActions([
                'takeError',
                'clearError',
                'createSchedule'
            ]),
            confirm () {
                if (this.type !== null && this.date !== null && this.start_time !== null && this.end_time !== null ) {
                    let start = this.getTimestamp(this.start_time.split(':'))
                    let end = this.getTimestamp(this.end_time.split(':'))

                    if (this.checkTime(start, end)) {
                        this.dialog = !this.dialog
                    }
                }
                else {
                    this.takeError('請輸入 假別、日期及時間!!')
                }
            },
            post () {
                let data = {
                    category: 'Holiday',
                    date: this.date,
                    begin: this.start_time,
                    end: this.end_time,
                    type: this.type,
                    hours: this.hours
                }

                this.createSchedule(data)

                this.dialog = false
            },
            getTimestamp(...timeSet) {
                return new Date(1970,0,1,parseInt(timeSet[0][0]),parseInt(timeSet[0][1])).getTime()
            },
            checkTime (start, end) {
                if (start >= end) {
                    this.takeError('開始時間不可以晚於結束時間!!')
                    return false
                } else {
                    this.hours = this.setHours(start, end)

                    return true
                }
            },
            setHours (start, end) {
                let hours = ((end - start) / 3600000).toFixed(1)

                let decimal = hours - Math.floor(hours)

                if (decimal > 0.5) {
                    hours = Math.ceil(hours)
                } else if(decimal <= 0.5 && decimal > 0) {
                    hours = Math.floor(hours) + 0.5
                } else {
                    hours = Math.floor(hours)
                }

                return this.checkNoonAndSubstractHours(start, end, hours)
            },
            checkNoonAndSubstractHours (start, end, hours) {
                let noon_12 = new Date(1970,0,1,12,0).getTime()
                let noon_13 = new Date(1970,0,1,13,0).getTime()

                if (start >= noon_13 || end <= noon_12) {
                    return hours
                }

                return hours - 1
            },
            dismissError () {
                this.clearError()
            },
        }
    }
</script>

<style scoped>

</style>