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
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "dashboard",
        data() {
            return {
                events: [],
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
            ]),
            fetch (year = null, month = null) {
                let data = {
                    year: !!year ? year : new Date().getFullYear(),
                    month: !!month ? month : new Date().getMonth() + 1
                }

                this.getSchedule(data)
            },
            next() {
                this.$refs.calendar.fireMethod('next')

                this.fetch(this.year, this.month + 1)

                this.date.setMonth(this.date.getMonth() + 1)

                this.setYearMonth(this.date)
            },
            prev() {
                this.$refs.calendar.fireMethod('prev')

                this.fetch(this.year, this.month - 1)

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