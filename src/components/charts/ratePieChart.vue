<template>
    <section class="pt-2 pb-2">
        <canvas ref="canvas" height="200"></canvas>
    </section>
</template>

<script>
    export default {
        name: "ratePieChart",
        data () {
            return {
                myChart: '',
                config: {
                    type: 'pie',
                    data: {
                        labels: [],
                        datasets: [{
                            data: [],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(129, 199, 132, 0.5)',
                                'rgba(153, 102, 255, 0.3)',
                                'rgba(255, 159, 64, 0.5)',
                                'rgba(194, 24, 91, 0.5)',
                                'rgba(244, 81, 30, 0.5)',
                                'rgba(56, 142, 60, 0.5)',
                                'rgba(40, 53, 147, 0.5)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(129, 199, 132, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(194, 24, 91, 1)',
                                'rgba(244, 81, 30, 1)',
                                'rgba(56, 142, 60, 1)',
                                'rgba(40, 53, 147, 1)',
                            ],
                            borderWidth: 1
                        }],
                    },
                    options: {
                        responsive: true,
                        legend: {
                            display: true,
                            position: 'right',
                        },
                        hover: {
                            mode: 'point'
                        },
                    }
                },
            }
        },
        mounted () {
            Event.listen('chart', data => {
                this.fetchData(data)
            })
        },
        methods: {
            fetchData (data) {
                this.config.data.labels = [`出席${data.presentDays}天`, `請假${data.holidayDays}天`, `出差${data.tripDays}天`]
                this.config.data.datasets[0].data = [data.presentDays, data.holidayDays, data.tripDays]

                let ctx = this.$refs.canvas
                this.myChart = new Chart(ctx, this.config)
            },
        }
    }
</script>

<style scoped>

</style>