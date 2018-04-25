<template>
    <v-app>
        <h1>{{ present }}</h1>
        <h1>{{ holiday }}</h1>
        <h1>{{ trip }}</h1>
        <h1>{{ rest }}</h1>
    </v-app>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "statistic",
        data () {
            return {
                date: new Date(),
                year: '',
            }
        },
        computed: {
            ...mapGetters([
                'present',
                'holiday',
                'trip',
                'rest'
            ]),
        },
        mounted () {
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