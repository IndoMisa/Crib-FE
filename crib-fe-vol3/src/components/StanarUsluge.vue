<template>
    <div class="stanar-usluge-container">
        <div class="usluga-container">
            <ves-masina-stanar></ves-masina-stanar>
        </div>
        <div class="usluga-container">
            <kvarovi-stanar></kvarovi-stanar>
        </div>
    </div>
</template>
<script>
    import VesMasinaStanar from "./VesMasinaStanar";
    import KvaroviStanar from "./KvaroviStanar"

    export default {
        components: {
            VesMasinaStanar,
            KvaroviStanar,
        },

    }
</script>
<style>
    .stanar-usluge-container{
        width: 100%;
        max-height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }
    .usluga-container{
        width: 50%;
        margin: 0 auto;
        margin-top: 0.5em;
        background: rgba(240, 240, 255, 0.8);
        border-radius: 5px;
        padding: 1em;
    }
    @media only screen and (max-width: 770px){
        .usluga-container{
            width: 90%;
        }
    }

</style>