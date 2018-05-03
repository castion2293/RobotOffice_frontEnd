<template>
    <v-app>
        <v-container
                style="min-height: 0;"
                grid-list-lg
        >
            <v-card>
                <v-card-title primary-title class="hidden-xs-only">
                    <div class="headline"><strong>{{ year }}年 {{ month }}月</strong></div>
                    <v-spacer></v-spacer>
                    <v-btn @click="prev" color=""><v-icon>keyboard_arrow_left</v-icon></v-btn>
                    <v-btn @click="next" color=""><v-icon>keyboard_arrow_right</v-icon></v-btn>
                </v-card-title>
                <div class="hidden-sm-and-up text-xs-center">
                    <div class="pt-2">
                        <span class="headline text-xs-center"><strong>{{ year }}年 {{ month }}月</strong></span>
                    </div>
                    <div class="mt-3">
                        <v-btn @click="prev" color=""><v-icon>keyboard_arrow_left</v-icon></v-btn>
                        <v-btn @click="next" color=""><v-icon>keyboard_arrow_right</v-icon></v-btn>
                    </div>
                </div>
                <v-container fluid>
                    <full-calendar :events="events" :config="config" ref="calendar" @event-selected="eventSelected"></full-calendar>
                </v-container>
            </v-card>
        </v-container>

        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title class="title"><strong>刪除資料</strong></v-card-title>
                <v-card-text>
                    <p class="text-xs-center grey--text text--darken-2">{{ content.title }} 於 {{ content.date }} 從 {{ content.start }} 至 {{ content.end }} </p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-orange accent-3" flat @click.native="dialog = false"><strong>取消</strong></v-btn>
                    <v-btn color="deep-orange accent-3" flat @click.native="deleting"><strong>刪除</strong></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "dashboard",
        data() {
            return {
                events: [

                ],
                config: {
                    defaultView: 'month',
                    locale: 'zh-cn',
                    firstDay: 0,
                    header: {
                        left: '',
                        center: '',
                        right: ''
                    },
                    height: 530,
                },
                date: new Date(),
                year: '',
                month: '',
                method: 'Calendar',
                dialog: false,
                content: {
                    title: '',
                    date: '',
                    start: '',
                    end: ''
                },
                schedule_id: ''
            }
        },
        computed: {
            ...mapGetters([
               'schedule'
            ]),
        },
        watch: {
            schedule () {
                this.events = this.schedule
            }
        },
        mounted () {
            this.fetch()

            this.setYearMonth(this.date)
        },
        methods: {
            ...mapActions([
                'getSchedule',
                'deleteSchedule'
            ]),
            fetch (year = null, month = null) {
                let data = {
                    year: !!year ? year : this.date.getFullYear(),
                    month: !!month ? month : this.date.getMonth() + 1,
                    method: this.method
                }

                this.getSchedule(data)
            },
            next() {
                this.$refs.calendar.fireMethod('next')
                this.date.setMonth(this.date.getMonth() + 1)
                this.setYearMonth(this.date)

                this.fetch(this.year, this.month)

            },
            prev() {
                this.$refs.calendar.fireMethod('prev')
                this.date.setMonth(this.date.getMonth() - 1)
                this.setYearMonth(this.date)

                this.fetch(this.year, this.month)
            },
            setYearMonth (date) {
                this.year = date.getFullYear()
                this.month = date.getMonth() + 1
            },
            eventSelected (e) {
                this.content = {
                    title: e.title.split('~')[0],
                    date: e.start._i.split('T')[0],
                    start: e.start._i.split('T')[1],
                    end: (!!e.end) ? e.end._i.split('T')[1] : null
                }

                this.schedule_id = e.id

                this.dialog = !this.dialog
            },
            deleting () {
                this.deleteSchedule(this.schedule_id)

                this.dialog = !this.dialog

                setTimeout(() => {
                    this.fetch(this.year, this.month)
                }, 1000)
            }

        },
    }
</script>

<style scoped>

</style>