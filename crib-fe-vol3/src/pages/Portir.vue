<template>
    <div class="portir-container">
        <div class="portir-background"></div>
        <custom-header-bar :counter="counter" @changeView="changeComp($event)" :list="menuItems">
            <ves-masina-portir @checked="registerChecked($event)" v-if="showComp == 'vesmasina'"></ves-masina-portir>
            <evidencija-poseta :id-portir="userId" v-if="showComp == 'evidencijaposeta'"></evidencija-poseta>
        </custom-header-bar>
    </div>
</template>
<script>
    import EvidencijaPoseta from "../components/EvidencijaPoseta"
    import CustomHeaderBar from "../components/CustomHeaderBar"
    import VesMasinaPortir from "../components/VesMasinaPortir"
    import {getPageToShow, setPageShown, getUserInfo} from "../services/contextManagement";
    import {apiFetch, destinationUrl} from "../services/authFetch";

    export default {
        components: {CustomHeaderBar, VesMasinaPortir, EvidencijaPoseta},
        data() {
            return {
                menuItems: [
                    {
                        key: 1,
                        label: 'Evidencija poseta',
                        index: 'evidencijaposeta',
                        slika: 'evidencijaStanaraIcon.png'
                    },
                    {
                        key: 2,
                        label: 'Veš mašine',
                        index: 'vesmasina',
                        slika: 'vesMasinaIcon.png'
                    }
                ],
                showComp: 'evidencijaposeta',
                userId: -1,
                counter: 0,
                vidjeni: 0,
            }
        },
        methods: {
            changeComp: function (event) {
                if(event == '')
                    this.showComp = 'evidencijaposeta'
                else
                    this.showComp = event;
                setPageShown(this.showComp)
            },
            registerChecked: function(event){
                this.vidjeni = event
            },
            pribaviBrojCekanja: async function(){
                var that = this
                apiFetch('GET', destinationUrl + '/vesmasina/broj_cekanja').then(function(res){
                    if(typeof(res) != 'string'){
                        that.counter = res - that.vidjeni >= 0 ? res - that.vidjeni : 0
                    }
                })
            },
            checkPeriodically: function () {
                setInterval(this.pribaviBrojCekanja, 1000)
            }
        },
        beforeMount() {
            this.showComp = getPageToShow().pageShown
            if (this.showComp == null)
                this.showComp = 'evidencijaposeta'
            this.userId = getUserInfo().userId
            this.checkPeriodically()
        },
    }
</script>
<style>
    .portir-container {
        width: 100%;
        height: 100%;
        font-family: 'Montserrat', sans-serif;
    }

    .portir-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-size: cover;
        background-position: bottom;
        background-image: linear-gradient(
                rgba(50, 149, 150, 0.5),
                rgba(0, 0, 0, 0.5)
        ),
        url("../assets/domGlavniHol.jpg");
    }
</style>