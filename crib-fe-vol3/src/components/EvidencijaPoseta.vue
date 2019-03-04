<template>
    <div class="evidencija-poseta-container">
        <div class="posete-container">
            <el-dialog class="dialog-dodavanje" :visible.sync="dodavanjePosete">
                <forma-nova-poseta @zavrsenUnos="prihvatiNovuPosetu($event)"
                                   @close="prekiniDodavanje"></forma-nova-poseta>
            </el-dialog>
            <div class="prikaz-posete-header">
                <el-input style="width: 35%;" v-model="pretrazivanje" placeholder="Pretrazi"></el-input>
                <el-button @click="filtrirajListu">Prikaži</el-button>
            </div>
            <div class="prikaz-posete-content">
                <prikaz-poseta v-if="listaFormatiranaZaPrikaz.length > 0" @selectedPosete="registrujSelektovanePosete($event)"
                           :prosledjena-lista-poseta="listaFormatiranaZaPrikaz"></prikaz-poseta>
                <h1 v-else>Trenutno nema posetilaca!</h1>
            </div>
            <div class="prikaz-posete-footer">
                <el-button @click="dodavanjePosete = true" type="success">Dodaj posetu</el-button>
                <el-button @click="zavrsiIzabranePosete">Završi izabrane posete</el-button>
            </div>
            <h1></h1>
        </div>
    </div>
</template>
<script>
    import {} from 'element-ui'
    import {apiFetch, destinationUrl} from "../services/authFetch";
    import FormaNovaPoseta from './FormaNovaPoseta'
    import PrikazPoseta from './PrikazPoseta'

    export default {
        components: {
            FormaNovaPoseta,
            PrikazPoseta
        },
        data() {
            return {
                listaPoseta: [],
                listaFormatirana: [],
                listaFormatiranaZaPrikaz: [],
                dodavanjePosete: false,
                userId: this.idPortir,
                selektovanePosete: [],
                pretrazivanje: '',
            }
        },
        methods: {
            pribaviPosete: async function () {
                var that = this
                await apiFetch('GET', destinationUrl + "/poseta/sve").then(function (res) {
                    if (typeof(res) != 'string') {
                        that.listaPoseta = res
                        that.formatirajListu()
                        that.listaFormatiranaZaPrikaz = that.listaFormatirana
                        that.filtrirajListu()
                    }
                })
            },
            dodajPosetu: async function (body) {
                var that = this
                return await apiFetch('POST', destinationUrl + "/poseta/dodaj", {responseType: 'text'}, body).then(function (res) {
                    if (res.charAt(0) == "2") {
                        that.pribaviPosete()
                        return true
                    }
                    return false
                })
            },
            prekiniDodavanje: function () {
                this.dodavanjePosete = false
            },
            registrujSelektovanePosete: function (posete) {
                this.selektovanePosete = posete
            },
            prihvatiNovuPosetu: async function (poseta) {
                if (poseta != 'cancel') {
                    var flag = true
                    var that = this
                    for (var i = 0; i < poseta.brPosetilaca; i++) {
                        flag &= await that.dodajPosetu({id_portir: that.userId, soba: poseta.soba})
                    }
                    if (!flag) {
                        this.$message({message: "Greška prilikom registrovanja posete!", type: 'error'})
                        return
                    }
                    this.$message({message: "Uspešno registrovana poseta!", type: 'success'})
                }
                this.dodavanjePosete = false

            },
            formatirajListu: function () {
                var pom = null
                this.listaFormatirana = []
                this.listaPoseta.forEach(poseta => {
                    pom = this.listaFormatirana.find(x => x.soba == poseta.soba)
                    if (pom != null)
                        pom.brPosetilaca++
                    else
                        this.listaFormatirana.push({soba: poseta.soba, brPosetilaca: 1})
                })
                this.listaFormatirana.sort(function (x, y) {
                    var pom1 = Number.parseInt(x.soba.length == 3 ? x.soba.slice(0, 1) : x.soba.slice(0, 2))
                    var pom2 = Number.parseInt(y.soba.length == 3 ? y.soba.slice(0, 1) : y.soba.slice(0, 2))
                    if (pom1 > pom2)
                        return 1
                    if (pom1 < pom2)
                        return -1
                    return x.soba.toLowerCase().localeCompare(y.soba.toLowerCase())
                })
            },
            zavrsiPoseteZaSobu: async function (soba) {
                var that = this
                await apiFetch('DELETE', destinationUrl + "/poseta/obrisi?soba=" + soba, {responseType: 'text'}).then(function (res) {
                    if (res.charAt(0) == "2") {
                        that.$message({message: "Uspešno završene posete iz sobe: " + soba, type: 'success'})
                        return
                    }
                    that.$message({message:"Greška pri brisanju poseta!", type: 'error'})
                })
            },
            zavrsiIzabranePosete: async function () {
                if(this.selektovanePosete.length == 0){
                    this.$message({message:"Morate izabrati posete za brisanje.", type: 'warning'})
                    return
                }
                this.brisanjeIzabranih().then(this.pribaviPosete)
            },
            brisanjeIzabranih: async function () {

                for (var p of this.selektovanePosete) {
                    await this.zavrsiPoseteZaSobu(p.soba)
                }
            },
            filtrirajListu: function(){
                var that = this
                this.listaFormatiranaZaPrikaz = this.listaFormatirana.filter(x => x.soba.indexOf(that.pretrazivanje) > -1)
            }
        },
        props: ["idPortir"],
        beforeMount: async function() {
            var that = this
            await this.pribaviPosete()
        }
    }
</script>
<style>

    .dialog-dodavanje {
        width: 50%;
    }
    .prikaz-posete-header{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        height: 2.5em;
        width: 100%;
    }
    .prikaz-posete-footer{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        height: 2.5em;
        margin-top: 0.5em;
        width: 100%;
    }
    .prikaz-posete-content{
        height: calc(100% - 5em);
        overflow: auto;
        margin-top: 0.5em;
    }
    .evidencija-poseta-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .posete-container{
        width: 50%;
        height: 80%;
        background-color: rgba(244, 244, 245, 0.8);
        padding: 1em;
        padding-top: 1.5em;
        padding-bottom: 2em;
        border-radius: 5px;
    }

    @media screen and (max-width: 770px) {
        .posete-container{
            width: 90%;
            height: 90%;
        }
    }


</style>