<template>
    <div class="evidencija-kvarova-container">
        <div class="majstor-background"></div>
        <div class="prikaz-kvarova-card">
            <div class="prikaz-kvarova-header">
                <h1>Lista kvarova za popravku:</h1>
            </div>
            <div class="prikaz-kvarova-content">
                <prikaz-liste-kvarova v-if="listaNenajavljenihPopravki.length > 0" :mod="'zaPopravku'"
                                      @najaviPopravku="najaviPopravku($event)"
                                      :listaKvarova="listaNenajavljenihPopravki"></prikaz-liste-kvarova>
                <div v-else class="prikaz-kvarova-exception">
                    <h2 >{{poruka}}</h2>
                    <img class="prikaz-kvarova-exception-slika" src="../assets/kvarImage.png"/>
                </div>
            </div>
        </div>
        <div class="prikaz-kvarova-card" v-if="listaNajavljenihPopravki.length > 0">
            <div class="prikaz-kvarova-header">
                <h1>Lista najavljenih kvarova:</h1>
            </div>
            <div class="prikaz-kvarova-content">
                <prikaz-liste-kvarova :mod="'najavljeni'" @zavrsiPopravku="zavrsiPopravku($event)"
                                      :lista-kvarova="listaNajavljenihPopravki"></prikaz-liste-kvarova>
            </div>
        </div>
    </div>
</template>
<script>
    import {Button} from "element-ui"
    import PrikazListeKvarova from "./PrikazListeKvarova";
    import {apiFetch, destinationUrl} from "../services/authFetch";
    import {getNajavljeniKvarovi, setNajavljeniKvarovi, clearNajavljeniKvarovi} from "../services/contextManagement";

    export default {
        components: {PrikazListeKvarova, Button},
        data() {
            return {
                listaKvarova: [],
                listaNenajavljenihPopravki: [],
                listaNajavljenihPopravki: [],
                poruka: 'Nema popravki za prikaz'
            }
        },
        methods: {
            osveziListu: function () {
                this.pribaviPopravke()
            },
            najaviPopravku: async function (popravka) {
                if (this.listaNajavljenihPopravki.length == 3) {
                    this.$message("Možete najaviti najviše 3 popravki u jednom trenutku")
                    return
                }
                var that = this
                await apiFetch("GET", destinationUrl + "/ostecenje/najavi/"
                    + this.listaNenajavljenihPopravki[popravka].id_ostecenje, {responseType: 'text'})
                    .then(function (res) {
                        if (res.charAt(0) == "2") {
                            that.$message("Uspešna najava popravke!")
                            that.listaNajavljenihPopravki.push(that.listaNenajavljenihPopravki[popravka])
                            that.listaNenajavljenihPopravki.splice(popravka, 1)
                            if (that.listaNajavljenihPopravki.length == 3)
                                that.poruka = "U jednom trenutku možete videti najviše 3 kvara"
                            console.log(that.listaNajavljenihPopravki)
                            setNajavljeniKvarovi(that.listaNajavljenihPopravki)
                        }
                        else {
                            that.$message("Greška prilikom najave popravke!")
                        }
                    })
            },
            zavrsiPopravku: async function (indeks) {
                var that = this
                apiFetch('DELETE', destinationUrl + '/ostecenje/obrisi/'
                    + this.listaNajavljenihPopravki[indeks].id_ostecenje.toString(), {responseType: 'text'}).then(async function (res) {
                    if (res.charAt(0) == '2') {
                        that.listaNajavljenihPopravki.splice(indeks, 1)
                        setNajavljeniKvarovi(that.listaNajavljenihPopravki)
                        await that.pribaviPopravke()
                        that.$message('Uspešno završena popravka.')
                        that.poruka = 'Nema popravki za prikaz'
                    }
                    else {
                        that.$message('Greška prilikom završetka kvara.')
                    }
                })
            },
            pribaviNajavljenePopravke: async function () {
                var lista = getNajavljeniKvarovi()
                var that = this
                for (var idKvar of lista) {
                    await apiFetch('GET', destinationUrl + "/ostecenje/" + idKvar.toString()).then(function(res){
                        if(typeof(res) != 'string')
                            that.listaNajavljenihPopravki.push(res)
                    })

                }
            },
            pribaviPopravke: async function () {
                if (this.listaNenajavljenihPopravki.length === 3) {
                    this.$message('Možete imati najviše 3 nenajavljene popravke u jednom trenutku')
                    return
                }
                var that = this
                await apiFetch('GET', destinationUrl + "/ostecenje/majstor").then(function (res) {
                    if (typeof(res) != "string") {
                        that.listaKvarova = res;
                        that.listaNenajavljenihPopravki = res.filter(x => {
                            var flag = true;
                            for (var najavljena of that.listaNajavljenihPopravki) {
                                flag &= x.id_ostecenje != najavljena.id_ostecenje
                            }
                            return flag
                        })
                    }
                })
            },
        },
        beforeMount: async function () {
            var that = this
            this.pribaviNajavljenePopravke().then(() => {
                this.pribaviPopravke()
            })
            // console.log(this.listaNajavljenihPopravki)
        }
    }
</script>
<style>
    .prikaz-kvarova-exception-slika{
        height: 10em;
        width: 10em;
    }
    .prikaz-kvarova-exception{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .prikaz-kvarova-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 3em;
    }

    .prikaz-kvarova-content {
        height: calc(100% - 3em);
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .prikaz-kvarova-header button {
        height: 3em;
        width: 3em;
        display: flex;
        justify-content: center;
    }

    .evidencija-kvarova-container {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .evidencija-kvarova-container h1 {
        font-size: 20px;
        opacity: 0.6;
    }

    .prikaz-kvarova-card {
        width: 40%;
        height: 60%;
        border-radius: 5px;
        padding: 1em;
        background: rgba(240, 240, 255, 0.8);
        border: none;
        margin-right: 1em;
    }

    .prikaz-kvarova-card h2 {
        opacity: 0.7;
        font-size: 17px;
        display: flex;
        justify-content: center;
    }

    .majstor-background {
        overflow: auto;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        background-image: url("../assets/majstorBackground.jpg");
        background-size: cover;
        background-position: bottom;
        -webkit-filter: blur(6px);
        -moz-filter: blur(6px);
        -o-filter: blur(6px);
        -ms-filter: blur(6px);
        filter: blur(1px);
    }
</style>