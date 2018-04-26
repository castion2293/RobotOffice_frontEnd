<template>
    <v-app>
        <v-layout class="mt-5">
            <v-flex md8 offset-md2>
                <v-card>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex md6 offset-md3>
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
                            <v-flex md6 offset-md3>
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
                                        :return-value.sync="time"
                                >
                                    <v-text-field
                                            slot="activator"
                                            label="請選擇時間"
                                            v-model="time"
                                            prepend-icon="access_time"
                                            readonly
                                    ></v-text-field>
                                    <v-time-picker
                                            v-model="time"
                                            locale="zh-cn"
                                            color="amber darken-2"
                                            @change="$refs.menu2.save(time)"
                                    ></v-time-picker>
                                </v-menu>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-card-text class="text-xs-center hidden-xs-only">
                        <v-btn @click="confirm(1)" color="deep-orange accent-3" class="title mr-5" dark><strong>打卡上班</strong></v-btn>
                        <v-btn @click="confirm(2)" color="cyan darken-3" class="title ml-5" dark><strong>打卡下班</strong></v-btn>
                    </v-card-text>
                    <v-card-text>
                        <v-btn block @click="confirm(1)" color="deep-orange accent-3" class="title" dark><strong>打卡上班</strong></v-btn>
                        <v-btn block @click="confirm(2)" color="cyan darken-3" class="title mt-4" dark><strong>打卡下班</strong></v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-media
                        class="white--text"
                        height="200px"
                        src="http://www.killahbeez.com/wordpress/wp-content/uploads/2010/09/f1.jpg"
                ></v-card-media>
                <v-card-text>
                    <v-container grid-list-md>
                        <span>
                            <strong class="deep-orange--text text--accent-3">打卡{{ work }}</strong>
                            <strong> 日期: {{ date }}   時間: {{ time }}</strong>
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
    </v-app>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: "present",
        data () {
            return {
                date: null,
                menu: false,
                time: null,
                menu2: false,
                dialog: false,
                work: ''
            }
        },
        methods: {
            ...mapActions([
                'createSchedule'
            ]),
            confirm (type) {
                this.work = this.chooseType(type)
                this.date = this.chooseDate(this.date)
                this.time = this.chooseTime(this.time)

                this.dialog = !this.dialog
            },
            post () {
                let data = {
                    category: 'Present',
                    work: this.work,
                    date: this.date,
                    time: this.time
                }

                this.createSchedule(data)

                this.dialog = false
            },
            chooseType (type) {
                if (type === 1) {
                    return '上班'
                }
                return '下班'
            },
            chooseDate (date) {
                if (Boolean(date)) {
                    return date
                }

                return this.findDate()
            },
            chooseTime (time) {
                if (Boolean(time)) {
                    return time
                }

                return this.findTime()
            },
            findDate () {
                let now = new Date()
                let year = now.getFullYear().toString()
                let month = (now.getMonth() + 1).toString()
                let day = now.getDate().toString()

                if (month.length === 1) {
                    month = '0' + month
                }

                if (day.length === 1) {
                    day = '0' + day
                }

                return `${year}-${month}-${day}`
            },
            findTime () {
                let now = new Date()
                let hour = now.getHours().toString()
                let mins = now.getMinutes().toString()

                if (hour.length === 1) {
                    hour = '0' + hour
                }

                if (mins.length === 1) {
                    mins = '0' + mins
                }

                return `${hour}:${mins}`
            }
        }
    }
</script>

<style scoped>

</style>