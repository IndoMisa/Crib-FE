<template>
    <div class="prikaz-odgovora-container">
        <div class="izabrani-zahtev">
            <h1>{{izabraniZahtev.autor}}</h1>
            <p>{{izabraniZahtev.tekst}}</p>
            <label class="datum-zahteva">{{izabraniZahtev.vreme}}</label>
        </div>
        <div class="odgovori-list-wrapper">
            <div v-if="listaOdgovora.length > 0" ref="odgovoriLista" class="odgovori-list">
                <div class="odgovor-box" v-for="odgovor in this.listaOdgovora" :key="odgovor.id">
                    <label class="autor">{{odgovor.autor}}</label>
                    <p>{{odgovor.tekst}}</p>
                    <label class="vreme-odgovora">{{odgovor.vreme}}</label>
                </div>
            </div>
            <h2 v-else>--Nema odgovora na izabrani zahtev--</h2>
        </div>
        <div class="new-answer">
            <el-input type="textarea" :rows="2" v-model="tekstOdgovor" placeholder="Unesi novi odgovor"></el-input>
            <el-button @click="dodajOdgovor" type="success" icon="el-icon-plus"></el-button>
        </div>
    </div>
</template>
<script>
    import {Button, Input} from 'element-ui'
    import {dBTimeToString} from "../services/pomocneFunkcije";
    import {apiFetch, destinationUrl} from "../services/authFetch";

    export default {
        components:
            {
                Button,
                Input
            },
        data() {
            return {
                izabraniZahtev: this.zahtevZaPrikaz,
                listaOdgovora: this.prosledjenaListaOdgovora,
                tekstOdgovor: '',
            }
        },
        methods: {
            dodajOdgovor: function () {
                console.log(this.listaOdgovora)
                if (this.textarea == '') {
                    this.$message({message: 'Morate da unesete tekst odgovora.', type: 'warning'})
                    return
                }
                this.$emit('dodavanjeOdgovora', this.tekstOdgovor)
                this.tekstOdgovor = ''
            },
        },
        props: ["prosledjenaListaOdgovora", "zahtevZaPrikaz"],
        watch: {
            prosledjenaListaOdgovora: async function (pom) {
                var that = this
                for (var x of pom) {
                    await apiFetch('GET', destinationUrl + '/korisnik/' + x.id_stanar.toString()).then(function (res) {
                        if (typeof(res) != 'string') {
                            x.autor = res.ime + " " + res.prezime + ", " + res.soba
                        }
                        else
                            x.autor = ""
                    })
                }
                this.listaOdgovora = pom
            },
            zahtevZaPrikaz: async function (pom) {
                this.izabraniZahtev = pom
            }
        },
        updated(){
            this.$refs['odgovoriLista'].scrollTo(10000, 10000)

        },
        beforeMount() {
            // console.log(this.prosledjenaListaOdgovora)
            this.izabraniZahtev = this.zahtevZaPrikaz
        }
    }

</script>
<style>
    .autor {
        font-size: 13px;
        /*font-weight: bold;*/
        font-style: italic;
    }

    .vreme-odgovora {
        float: right;
        font-size: 13px;
    }

    .odgovori-list-wrapper {
        height: calc(100% - 13em);
        width: 100%;
        overflow: hidden;
    }
    .odgovori-list-wrapper h2{
        font-size: 17px;
        font-weight: normal;
        font-style: italic;
    }
    .odgovori-list {
        width: 100%;
        max-height: 100%;
        overflow-y: scroll;
        padding-right: 17px;
        box-sizing: content-box;
    }

    .odgovori-list > * + * {
        border-top: 1px solid grey
    }

    .prikaz-odgovora-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        /*margin-left: 1em;*/
        /*padding: 1em;*/
        /*overflow: scroll*/
    }

    .new-answer {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 90%;
        height: 5em;
        margin: 0 auto;
    }

    .new-answer > * {
        height: 60%;
    }

    .odgovor-box {
        padding: 1em;
        padding-left: 3em;
        font-size: 14px;
    }

    .izabrani-zahtev {
        border-bottom: 1px solid gray;
        padding: 1em;
        padding-top: 2em;
        padding-bottom: 2em;
        position: relative;
    }

    .izabrani-zahtev h1 {
        font-size: 15px;
        font-style: italic;
        font-weight: normal;
        margin: 0;
    }
    .izabrani-zahtev p{
        font-size: 20px
    }
    .datum-zahteva {
        position: absolute;
        right: 1em;
        bottom: 0.5em;
        font-style: italic;
        font-size: 14px;
    }
</style>