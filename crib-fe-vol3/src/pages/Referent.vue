<template>
    <div class="mainContainer">
        <div class="referent-background"></div>
        <custom-header-bar @changeView="setComponent($event)" :list="this.menuItems">
            <evidencija-stanara v-if="showComp === 'evidencijastanara'"></evidencija-stanara>
            <obavestenja-referent :idReferenta="userId" v-if="showComp === 'obavestenja'"></obavestenja-referent>
            <dodavanje-zaposlenog @zavrsenoDodavanje="zavrsiDodavanje" v-if="showComp == 'dodavanjezaposlenog'"></dodavanje-zaposlenog>
            <pocetna-strana v-if="showComp === ''"></pocetna-strana>
        </custom-header-bar>
    </div>
</template>
<script>
    import CustomHeaderBar from "../components/CustomHeaderBar";
    import EvidencijaStanara from "../components/EvidencijaStanara";
    import {getPageToShow, setPageShown, getUserInfo} from "../services/contextManagement";
    import Zaduzenja from "../components/ZaduzenjaStanar";
    import ObavestenjaReferent from "../components/ObavestenjaReferent";
    import PocetnaStrana from "../components/PocetnaStrana";
    import DodavanjeZaposlenog from "../components/DodavanjeZaposlenog"

    export default {
        components: {PocetnaStrana, ObavestenjaReferent, Zaduzenja, EvidencijaStanara, CustomHeaderBar, DodavanjeZaposlenog},
        data() {
            return {
                menuItems: [
                    {
                        key: 1,
                        label: 'Evidencija stanara',
                        index: 'evidencijastanara',
                        slika: 'evidencijaStanaraIcon.png'
                    },
                    {
                        key: 2,
                        label: 'Obaveštenja',
                        index: 'obavestenja',
                        slika: 'obavestenja.png'
                    },
                    {
                        key: 3,
                        label: 'Dodavanje zaposlenog',
                        index: 'dodavanjezaposlenog',
                        slika: 'dodavanjeZaposlenog.png'
                    }
                ],
                showComp: '',
                userId: -1,
                userType: 'referent'
            }
        },
        methods:{
            setComponent(component){
                this.showComp = component;
                setPageShown(this.showComp);
            },
            zavrsiDodavanje(){
                this.showComp = 'evidencijastanara'
                setPageShown('evidencijastanara')
            }
        },
        beforeMount(){
            var userInfo = getUserInfo()
            this.userId = userInfo.userId;
            var index = getPageToShow().pageShown;
            console.log(index)
            if(index != null){
                this.showComp = index
                return
            }
            this.showComp = ''
        },
    }
</script>
<style>
    .mainContainer{
        height: 100%;
        /*overflow: auto;*/
        font-family: 'Montserrat', sans-serif;

    }
    .referent-background {
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