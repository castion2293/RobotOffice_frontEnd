<template>
    <v-app>
        <div class="bgimg-1">
            <div class="bg-title-1 text-xs-center">
                <h1 class="white--text mb-3 text-xs-center display-2 hidden-xs-only"><b>羅博特科技e化系統</b></h1>
                <h1 class="white--text mb-3 text-xs-center display-1 hidden-sm-and-up"><b>羅博特科技e化系統</b></h1>
            </div>
        </div>
    </v-app>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bgimg-1:before {
        position: absolute;
        content: "";
        display: block;
        width: 100%;
        background-color: rgba(0,0,0,.25);
        height: 100vh;
    }

    .bgimg-1 {
        opacity: 1;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url('https://s3.amazonaws.com/robot-office-pics/2018050801.jpg');
        min-height: 100vh;
    }

    .bg-title-1 {
        width: 100%;
        position: absolute;
        top: 20em;
    }
</style>
