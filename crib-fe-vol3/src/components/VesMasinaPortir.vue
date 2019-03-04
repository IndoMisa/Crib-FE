<template>
    <div class="ves-masina-portir-container">
        <div class="prikaz-korisnika-container">
            <div class="prikaz-korisnika-header">
                <h1 class="prikaz-korisnika-title">Korisnici na čekanju:</h1>
                <el-button @click="refresh" type="success" icon="el-icon-refresh"></el-button>
            </div>
            <div class="prikaz-korisnika-content">
                <prikaz-liste-korisnika-ves-masine mode="cekanje" @dodeliVesMasinu="dodeliMasinu($event)"
                                                   :prosledjenaLista="this.listaCekanja"></prikaz-liste-korisnika-ves-masine>
            </div>
        </div>
        <div class="prikaz-korisnika-container">
            <h1 class="prikaz-korisnika-title">Lista trenutnih korisnika:</h1>
            <div class="prikaz-korisnika-content">
                <prikaz-liste-korisnika-ves-masine :loading="this.loading" mode="koriscenje"
                                                   @zavrsenoKoriscenje="zavrsiKoriscenje($event)"
                                                   :prosledjenaLista="this.listaKoriscenja"></prikaz-liste-korisnika-ves-masine>
            </div>
        </div>
    </div>
</template>
<script>
    import PrikazListeKorisnikaVesMasine from './PrikazListeKorisnikaVesMasine'
    import {apiFetch, destinationUrl} from "../services/authFetch";

    export default {
        components: {
            PrikazListeKorisnikaVesMasine,
        },
        data() {
            return {
                listaCekanja: [],
                listaKoriscenja: [],
                loading: false,
                br: 0,
            }
        },
        methods: {
            dodeliMasinu: async function (rBr) {
                var that = this
                await apiFetch('PUT', destinationUrl + "/vesmasina/dodeli/" + this.listaCekanja[rBr].id_prijave,
                    {responseType: 'text'}).then(async function (res) {
                    if (res.charAt(0) == 2) {
                        that.$message({message: "Uspešna dodela veš mašine.", type: 'success'})
                        await that.pribaviListuCekanja().then(function (res) {
                            that.$emit('checked', that.listaCekanja.count)
                        })
                    }
                    else
                        that.$message("Greška pri dodeli veš mašine.")
                    await that.pribaviListuKoriscenja()
                })
            },
            pribaviListuCekanja: async function () {
                var that = this
                this.loading = true
                await apiFetch("GET", destinationUrl + "/vesmasina/top_deset").then(function (res) {
                    if (typeof(res) != 'string') {
                        that.listaCekanja = res
                    }
                    else
                        that.$message("Greška prilikom pribavljanja liste čekanja")
                    that.loading = false
                })
            },
            pribaviListuKoriscenja: async function () {
                var that = this
                this.loading = true
                await apiFetch("GET", destinationUrl + "/vesmasina/koriscenje").then(function (res) {
                    if (typeof(res) != 'string') {
                        that.listaKoriscenja = res
                    }
                    else
                        that.$message("Greška prilikom pribavljanja liste čekanja")
                    that.loading = false
                })
            },
            zavrsiKoriscenje: async function (rBr) {
                var that = this
                await apiFetch('DELETE', destinationUrl + "/vesmasina/obrisi/" + that.listaKoriscenja[rBr].id_prijave, {responseType: 'text'}).then(async function (res) {
                    if (res.charAt(0) == '2') {
                        that.$message({message: "Uspešno završeno korišćenje veš mašine", type: 'success'})
                        await that.pribaviListuKoriscenja()
                    }
                    else
                        that.$message({message: "Završetak korišćenja veš mašine nije registrovan!", type: 'error'})
                })
            },
            refresh: async function(){
                var that = this
                this.pribaviListuCekanja().then(function () {
                    that.$emit('checked', that.listaCekanja.length)
                })
            }

        },
        beforeMount() {
            var that = this
            this.pribaviListuCekanja().then(function () {
                that.$emit('checked', that.listaCekanja.length)
            })
            this.pribaviListuKoriscenja()
        }
    }
</script>
<style>
    .ves-masina-portir-container {
        width: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .prikaz-korisnika-container {
        width: 45%;
        height: 60%;
        background-color: rgba(240, 240, 255, 0.8);
        padding: 1em;
        padding-top: 2em;
        padding-bottom: 2em;
        border-radius: 5px;
    }

    .prikaz-korisnika-title {
        font-size: 22px;
        height: 2em;
        margin: 0;
        display: flex;
    }
    .prikaz-korisnika-header{
        display: flex;
        justify-content: space-between;
    }
    .prikaz-korisnika-content {
        height: calc(100% - 2.5em);
        overflow-y: auto;
        margin-top: 0.5em;
    }

</style>