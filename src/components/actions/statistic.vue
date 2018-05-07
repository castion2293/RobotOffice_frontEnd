<template>
    <v-app>
        <v-container
                style="min-height: 0;"
                grid-list-lg
        >
            <v-layout row wrap>
                <v-flex md6 sm12 xs12>
                    <v-card color="blue-grey darken-1" class="white--text">
                        <v-card-title primary-title class="headline">
                            <strong>休假時數總覽</strong>
                        </v-card-title>
                        <v-card class="white title grey--text text--darken-2">
                            <v-container
                                    style="min-height: 0;"
                                    grid-list-lg
                            >
                                <div class="mt-5 mb-5">
                                    <span><strong>
                                        今年度特休時數: <b class="blue--text text--darken-2">{{ user.holiday_days }}</b> hr
                                    </strong></span>
                                </div>
                                <v-divider></v-divider>
                                <div class="mt-5 mb-5">
                                    <span><strong>
                                        今年度特休剩餘時數: <b class="blue--text text--darken-2">{{ user.holiday }}</b> hr
                                    </strong></span>
                                </div>
                                <v-divider></v-divider>
                                <div class="mt-5 mb-5">
                                    <span><strong>
                                        今年度補休剩餘時數: <b class="blue--text text--darken-2">{{ user.rest }}</b> hr
                                    </strong></span>
                                </div>
                                <v-divider></v-divider>
                            </v-container>
                        </v-card>
                    </v-card>
                </v-flex>
                <v-flex md6 sm12 xs12>
                    <v-card color="deep-orange darken-1" class="white--text">
                        <v-card-title primary-title class="headline">
                            <strong>出席率</strong>
                            <v-spacer></v-spacer>
                            <strong>{{ ((1 - ( holiday.count / (present.count + holiday.count + trip.count))) * 100).toFixed(0) }}%</strong>
                        </v-card-title>
                        <v-card class="white">
                            <ratePieChart></ratePieChart>
                        </v-card>
                    </v-card>
                </v-flex>
                <v-flex md6 sm12 xs12>
                    <v-card color="light-blue lighten-2" class="white--text">
                        <v-card-title primary-title class="headline">
                            <strong>出席</strong>
                            <v-spacer></v-spacer>
                            <strong>天數: {{ present.count }}天</strong>
                        </v-card-title>
                        <v-card class="white">
                            <presentList></presentList>
                        </v-card>
                    </v-card>
                </v-flex>
                <v-flex md6 sm12 xs12>
                    <v-card color="green lighten-2" class="white--text">
                        <v-card-title primary-title class="headline">
                            <strong>請假</strong>
                            <v-spacer></v-spacer>
                            <strong>總時數: {{ holiday.hours_count }}小時</strong>
                        </v-card-title>
                        <v-card class="white">
                            <holidayList></holidayList>
                        </v-card>
                    </v-card>
                </v-flex>
                <v-flex md6 sm12 xs12>
                    <v-card color="orange lighten-1" class="white--text">
                        <v-card-title primary-title class="headline">
                            <strong>出差</strong>
                            <v-spacer></v-spacer>
                            <strong>總時數: {{ trip.hours_count }}小時</strong>
                        </v-card-title>
                        <v-card class="white">
                            <tripList></tripList>
                        </v-card>
                    </v-card>
                </v-flex>
                <v-flex md6 sm12 xs12>
                    <v-card color="red lighten-1" class="white--text">
                        <v-card-title primary-title class="headline">
                            <strong>補休</strong>
                            <v-spacer></v-spacer>
                            <strong>總時數: {{ rest.hours_count }}小時</strong>
                        </v-card-title>
                        <v-card class="white">
                            <restList></restList>
                        </v-card>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import ratePieChart from './../charts/ratePieChart'
    import presentList from '../lists/presentList'
    import holidayList from '../lists/holidayList'
    import tripList from '../lists/tripList'
    import restList from '../lists/restList'

    export default {
        name: "statistic",
        data () {
            return {
                date: new Date(),
                year: '',
                present_data: []
            }
        },
        components: {
            ratePieChart,
            presentList,
            holidayList,
            tripList,
            restList
        },
        computed: {
            ...mapGetters([
                'user',
                'present',
                'holiday',
                'trip',
                'rest'
            ]),
        },
        watch: {
            present () {
                Event.fire('presentData', this.present.data)
            },
            holiday () {
                Event.fire('holidayData', this.holiday.data)
            },
            trip () {
                Event.fire('tripData', this.trip.data)
            },
            rest () {
                Event.fire('restData', this.rest.data)

                setTimeout(() => {
                    Event.fire('chart', {
                        presentDays: this.present.count,
                        holidayDays: this.holiday.count,
                        tripDays: this.trip.count
                    })
                }, 1000)


                // close loader
                this.$store.dispatch('takeLoading', false)
            },
        },
        mounted () {
            this.$store.dispatch('takeLoading', true)

            this.fetch()
        },
        methods: {
            ...mapActions([
                'getAnalysisData'
            ]),
            fetch (year = null) {
                this.getAnalysisData({
                    year: !!year ? year : this.date.getFullYear(),
                    type: 'Present',
                    method: 'PresentAnalysis'
                })

                this.getAnalysisData({
                    year: !!year ? year : this.date.getFullYear(),
                    type: 'Holiday',
                    method: 'HolidayAnalysis'
                })

                this.getAnalysisData({
                    year: !!year ? year : this.date.getFullYear(),
                    type: 'Trip',
                    method: 'TripAnalysis'
                })

                this.getAnalysisData({
                    year: !!year ? year : this.date.getFullYear(),
                    type: 'Rest',
                    method: 'RestAnalysis'
                })
            }
        }
    }
</script>

<style scoped>

</style>