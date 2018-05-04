<template>
    <v-app>
        <div class="loader1 hidden-xs-only">
            <v-progress-circular indeterminate v-bind:size="50" color="deep-orange accent-3"></v-progress-circular>
        </div>

        <div class="loader2 hidden-sm-and-up">
            <v-progress-circular indeterminate v-bind:size="50" color="deep-orange accent-3"></v-progress-circular>
        </div>
    </v-app>
</template>

<script>
    export default {
        name: "loader"
    }
</script>

<style lang="stylus" scoped>
    .loader1
        text-align: center
        padding-top:20%;
        padding-bottom:30%;
        height: 100%

    .loader2
        text-align: center
        padding-top:60%;
        padding-bottom:30%;
        height: 100%

    .progress-circular
        margin: 1rem
</style>