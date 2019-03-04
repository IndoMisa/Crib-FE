<template>
    <div class="prikaz-zahteva-container">
        <div class="zahtevi-lista-wrapper">
            <div ref="zahteviLista" class="zahtevi-lista">
                <div v-for="zahtev in listaZahteva" @dblclick="showOdgovor(zahtev.id_komunikacija)"
                     class="single-zahtev-container">
                    <h1>{{zahtev.autor}}</h1>
                    <p>{{zahtev.tekst}}</p>
                    <label class="footer-date">{{zahtev.vreme}}</label>
                </div>
            </div>
        </div>
        <div class="new-request">
            <el-input type="textarea" :rows="2" placeholder="Unesi novi zahtev" v-model="textarea"></el-input>
            <el-button @click="dodajZahtev" type="success" icon="el-icon-plus"></el-button>
        </div>
    </div>
</template>
<script>
    import {Card, Form, Input, Button} from 'element-ui'
    import {apiFetch, destinationUrl} from "../services/authFetch";
    import {getUserInfo} from "../services/contextManagement";
    import {dBTimeToString} from "../services/pomocneFunkcije";

    export default {

        components: {
            Card,
            Form,
            Input,
            Button,
        },
        data() {
            return {
                textarea: "",
                listaZahteva: this.zahteviZaPrikaz,
                userId: -1,
            }
        },
        methods: {
            showOdgovor: function (event) {
                // console.log(this.listaZahteva)
                this.$emit('prikaziOdgovore', event)
            },
            dodajZahtev: function () {
                if (this.textarea == '') {
                    this.$message('Morate da unesete tekst zahteva.')
                    return
                }
                this.$emit('dodavanjeZahteva', this.textarea)
                this.textarea = ''
            }
        },
        props: ["zahteviZaPrikaz"],
        watch: {
            zahteviZaPrikaz: async function (pom) {
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
                that.listaZahteva = pom

            }
        },
        updated(){
            this.$refs['zahteviLista'].scrollTo(10000, 10000)
        },
        beforeMount() {
            this.userId = getUserInfo().userId
        }
    }
</script>
<style>

    .zahtevi-content {
        /*height: 83%;*/

    }

    .zahtevi-lista-wrapper {
        height: calc(100% - 4em);
        width: 100%;
        overflow: hidden;
    }

    .zahtevi-lista {
        width: 100%;
        max-height: 100%;
        overflow-y: scroll;
        padding-right: 17px;
        box-sizing: content-box;
    }

    .footer-date {
        font-size: 14px;
        font-style: italic;
        display: flex;
        float: right;
    }

    .new-request {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 80%;
        height: 4em;
        margin: 0 auto;
        /*margin-bottom: 1em;*/
        /*margin-top: 1em;*/
    }
    .new-request > *{
        height: 60%;
    }

    .single-zahtev-container {

        /*border: 0.5px solid lightgray;*/
        /*border-radius: 5px;*/
        padding-top: 1em;
        padding-bottom: 2em;
        padding-left: 3em;
        padding-right: 3em;
        position: relative;
        /*background: rgba(20, 150, 100, 0.3);*/
        /*margin-top: 1em;*/
    }

    .single-zahtev-container + .single-zahtev-container {
        border-top: 1px solid gray;
    }

    .prikaz-zahteva-container {
        width: 100%;
        height: 100%;
        /*padding-left: 1em;*/
        /*overflow: auto;*/
    }

    .single-zahtev-container h1 {
        font-weight: normal;
        font-style: italic;
        font-size: 15px;
    }

    .el-textarea__inner {
        padding: 0.5em;
        height: 100%;
    }
</style>