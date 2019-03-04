<template>
    <div class="zahtevi-i-odgovori-container">
        <div class="zahtevi-container noselect">
            <prikaz-zahteva @dodavanjeZahteva="dodajZahtev($event)" @prikaziOdgovore="primiIzabraniZahtev($event)"
                            :zahteviZaPrikaz="this.listaZahteva"></prikaz-zahteva>
        </div>
        <div v-if="this.izabraniZahtev != ''" class="odgovori-container noselect">
            <prikaz-odgovora @dodavanjeOdgovora="dodajOdgovor($event)" :zahtevZaPrikaz="this.izabraniZahtev"
                             :prosledjenaListaOdgovora="this.listaOdgovora"></prikaz-odgovora>
        </div>
    </div>
</template>
<script>
    import PrikazZahteva from './PrikazZahteva'
    import PrikazOdgovora from './PrikazOdgovora'
    import {getUserInfo} from "../services/contextManagement";
    import {apiFetch, destinationUrl} from "../services/authFetch";
    import {dBTimeToString, pribaviImePrezimeISobuToString} from "../services/pomocneFunkcije";

    export default {
        components: {
            PrikazOdgovora,
            PrikazZahteva,
        },
        data() {
            return {
                listaZahteva: [],
                listaOdgovora: [],
                izabraniZahtev: '',
                userId: -1,
            }
        },
        methods: {
            primiIzabraniZahtev: async function (event) {
                // console.log(event)
                var that = this
                this.izabraniZahtev = this.listaZahteva.find(x => x.id_komunikacija === event)
                var res = await this.pribaviOdgovore(this.izabraniZahtev.id_komunikacija)
                res.forEach(x => x.vreme = dBTimeToString(x.vreme))
                this.listaOdgovora = res
                // console.log(this.izabraniZahtev)
            },
            pribaviOdgovore: async function (idPosta) {
                return await apiFetch('GET', destinationUrl + "/komunikacija/odgovori_posta/" + idPosta.toString())
            },
            pribaviZahteve: async function () {
                return await apiFetch('GET', destinationUrl + "/komunikacija/svi_postovi")
            },
            dodajZahtev: async function (tekst) {
                var body = {
                    tekst: tekst,
                    tip: 'post',
                    id_stanar: this.userId,
                    // id_zahtev: this.izabraniZahtev.id_komunikacija
                }
                var that = this
                await apiFetch('POST', destinationUrl + "/komunikacija/dodaj", {responseType: 'text'}, body).then(async function (res) {
                    if (res.charAt(0) == "2") {
                        that.pribaviZahteve().then(function (res) {
                            that.listaZahteva = res
                            that.listaZahteva.forEach(x => x.vreme = dBTimeToString(x.vreme))
                        })
                        that.$message({message: "Uspešno dodat zahtev", type: "success"})
                    }
                    else
                        that.$message({message: "Greška pri dodavanju zahteva", type: 'error'})
                })

            },
            dodajOdgovor: async function (tekst) {
                var body = {
                    tekst: tekst,
                    tip: 'odgovor',
                    id_stanar: this.userId,
                    id_zahtev: this.izabraniZahtev.id_komunikacija
                }
                var that = this
                await apiFetch('POST', destinationUrl + "/komunikacija/dodaj", {responseType: 'text'}, body).then(async function (res) {
                    if (res.charAt(0) != '2') {
                        that.$message({
                            message: 'Dodavanje odgovora nije uspelo!',
                            type: 'error'
                        })
                        return
                    }
                    that.pribaviOdgovore(that.izabraniZahtev.id_komunikacija).then(function (res) {
                        if (typeof(res) != 'string') {
                            res.forEach(x => x.vreme = dBTimeToString(x.vreme))
                            that.listaOdgovora = res
                        }
                    })

                })
                this.$message({message: "Dodali ste odgovor", type: 'warning'})
            }
        },
        beforeMount: async function () {
            this.userId = getUserInfo().userId
            var that = this
            var tmp
            that.pribaviZahteve().then(function (res) {
                that.listaZahteva = res
                that.listaZahteva.forEach(x => x.vreme = dBTimeToString(x.vreme))
            })
        }
    }
</script>
<style scoped>

    .zahtevi-i-odgovori-container {
        min-width: 60%;
        height: 90%;
        margin: 0 auto;
        margin-top: 2vh;
        /*padding: 1em;*/
        /*overflow: auto;*/
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .zahtevi-container {
        width: 50%;
        height: 100%;
        display: flex;
        background: rgba(244, 244, 245, 0.8);
        border-radius: 5px;
        padding-left: 17px;
    }

    .odgovori-container {
        width: 30%;
        height: 100%;
        margin-left: 1em;
        background: rgba(244, 244, 245, 0.8);
        border-radius: 5px;
        padding-left: 1em;
        padding-right: 1em;
    }


    .noselect {
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: -moz-none;
        -o-user-select: none;
        user-select: none;

    }
</style>