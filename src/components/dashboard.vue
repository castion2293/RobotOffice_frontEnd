<template>
    <v-app>
        <v-container
                style="min-height: 0;"
                grid-list-lg
        >
            <v-card>
                <v-card-title primary-title>
                    <div class="headline"><strong>{{ year }}年 {{ month }}月</strong></div>
                    <v-spacer></v-spacer>
                    <v-btn @click="prev" color=""><v-icon>keyboard_arrow_left</v-icon></v-btn>
                    <v-btn @click="next" color=""><v-icon>keyboard_arrow_right</v-icon></v-btn>
                </v-card-title>
                <v-container fluid>
                    <full-calendar :events="events" :config="config" ref="calendar" @event-selected="eventSelected"></full-calendar>
                </v-container>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "dashboard",
        data() {
            return {
                events: [
                    // {
                    //     title: '出席',
                    //     start: '2018-04-17T08:30:00',
                    //     end: '2018-04-17T17:30:00',
                    //     color: '#4FC3F7',
                    // },
                    // {
                    //     title: '請假',
                    //     start: '2018-04-07T08:30:00',
                    //     end: '2018-04-07T17:30:00',
                    //     color: '#81C784'
                    // },
                    // {
                    //     title: '出差',
                    //     start: '2018-04-16T08:30:00',
                    //     end: '2018-04-16T17:30:00',
                    //     color: '#FFA726'
                    // },
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
                color: {
                    present: '#4FC3F7',
                    holiday: '#81C784',
                    trip: '#FFA726',
                    rest: '#EF5350'
                }
            }
        },
        computed: {
            ...mapGetters([
               'schedule'
            ]),
        },
        mounted () {
            this.$store.dispatch('getSchedule')

            this.setYearMonth(this.date)

            setTimeout(() => {
                this.events = this.schedule
            }, 3000)
        },
        methods: {
            next() {
                this.$refs.calendar.fireMethod('next')

                this.date.setMonth(this.date.getMonth() + 1)

                this.setYearMonth(this.date)
            },
            prev() {
                this.$refs.calendar.fireMethod('prev')

                this.date.setMonth(this.date.getMonth() - 1)

                this.setYearMonth(this.date)
            },
            eventSelected (e) {
                console.log(e)
            },
            setYearMonth (date) {
                this.year = date.getFullYear()
                this.month = date.getMonth() + 1
            }
        },
    }
</script>

<style scoped>

</style>