<template>
    <div class="pocetna-strana-container">
        <div class="home-page-container darken"></div>
        <h1>Dobrodošli na Crib web portal!</h1>
    </div>
</template>
<script>

    export default {
        components: {}
    }
</script>
<style>
    .home-page-container {
        z-index: -1;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;

    }
    .pocetna-strana-container{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .pocetna-strana-container h1{
        color: white;
        font-family: sans-serif;
        font-size: 50px;
        display: flex;
        justify-content: center;
        font-family: 'Montserrat', sans-serif;
    }
    .darken {
        background-size: cover;
        background-image:
                linear-gradient(
                        rgba(75, 149, 113, 0.5),
                        rgba(0, 0, 0, 0.5)
                ),
                url("../assets/domUlaz2.jpg");
    }
</style>