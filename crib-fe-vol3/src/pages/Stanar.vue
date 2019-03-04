/* eslint-disable no-alert, no-console*/
<template>
    <div class="mainContainer" >
        <div class="stanar-background"></div>
        <custom-header-bar :list="this.menuItems" @changeView="changeView($event)">
            <zaduzenja-stanar v-if="this.showComp === 'zaduzenja'"></zaduzenja-stanar>
            <obavestenja-stanar v-if="this.showComp === 'obavestenja'"></obavestenja-stanar>
            <stanar-usluge v-if="this.showComp === 'usluge'"></stanar-usluge>
            <zahtevi-i-odgovori v-if="this.showComp === 'zahtevi'"></zahtevi-i-odgovori>
            <profil-stanara v-if="this.showComp === 'profil'"></profil-stanara>
            <pocetna-strana v-if="this.showComp === ''"></pocetna-strana>
        </custom-header-bar>
    </div>
</template>
<script>

    import CustomHeaderBar from "../components/CustomHeaderBar"
    import ZaduzenjaStanar from "../components/ZaduzenjaStanar"
    import ObavestenjaStanar from "../components/ObavestenjaStanar"
    import StanarUsluge from "../components/StanarUsluge"
    import PocetnaStrana from "../components/PocetnaStrana"
    import {getPageToShow, setPageShown, getUserInfo, clearUserInfo, clearFormMode, clearEditingStanar} from "../services/contextManagement";
    import ZahteviIOdgovori from "../components/ZahteviIOdgovori";
    import ProfilStanara from "../components/ProfilStanara";

    export default {
        components: {
            ProfilStanara,
            ZahteviIOdgovori,
            CustomHeaderBar,
            ZaduzenjaStanar,
            ObavestenjaStanar,
            StanarUsluge,
            PocetnaStrana,
        },
        data() {
            return {
                menuItems: [
                    {
                        key: 1,
                        label: 'Zaduženja',
                        index: 'zaduzenja',
                        slika: 'money.png'
                    },
                    {
                        key: 2,
                        label: 'Obaveštenja',
                        index: 'obavestenja',
                        slika: 'obavestenja.png'
                        // image: '../assets/logo.png'
                    },
                    {
                        key: 3,
                        label: 'Usluge',
                        index: 'usluge',
                        slika: 'usluge.png'
                    },
                    {
                        key: 4,
                        label: 'Zahtevi',
                        index: 'zahtevi',
                        slika: 'zahteviIcon.png'
                    },
                    {
                        key: 5,
                        label: 'Profil',
                        index: 'profil',
                        slika: 'profilIcon.png'
                    }
                ],
                showComp: '',
                showDialogZaduzenja: false,
                userId: -1,
                userType: 'stanar'
            }
        },
        methods: {
            changeView: function (index) {
                this.showComp = index
                setPageShown(index);

            },

        },
        beforeMount(){
            var index = getPageToShow().pageShown
            this.userId = getUserInfo().userId
            if(index != null){
                this.showComp = index
                return
            }
            this.showComp = ''
        },
    }
</script>
<style>
    img {
        height: 60%;
    }

    .mainContainer {
        height: 100%;
        font-family: 'Montserrat', sans-serif;
        /*overflow: hidden;*/
    }
    .stanar-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-image: linear-gradient(
                rgba(75, 149, 150, 0.5),
                rgba(0, 0, 0, 0.5)
        ), url("../assets/domGlavniHol.jpg");
        background-size: cover;
        background-position: bottom;
    }
</style>
/* eslint-disable no-alert, no-console*/