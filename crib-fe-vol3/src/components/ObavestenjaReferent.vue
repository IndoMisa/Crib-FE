<template>
    <div class="obavestenja-referent-container">
        <div class="backgroundImage"></div>
        <div class="dugme-za-dodavanje-container">
            <el-button @click="formaDodavanjeShown = true" type="success" class="dugme-za-dodavanje" circle="">
                <el-icon class="el-icon-edit"></el-icon>
            </el-button>
            <el-dialog :before-close="handleFormClose" :visible.sync="formaDodavanjeShown">
                <novo-obavestenje-forma @zavrsenUnos="prihvatiUnosForme($event)"></novo-obavestenje-forma>
            </el-dialog>
        </div>
        <div class="obavestenja-referent-content">
            <prikaz-obavestenja :trenutnaStrana="trenutnaStrana" :idReferenta="this.idReferenta"
                                :brojObavestenja="this.brojObavestenja"
                                :obavestenjaZaPrikaz="this.obavestenjaZaPrikaz"
                                @brisanjeObavestenja="brisanjeObavestenja($event)"
                                @pageChange="promenaStrane($event)"></prikaz-obavestenja>
        </div>
    </div>
</template>
<script>
    import PrikazObavestenja from './PrikazObavestenja'
    import {Button, Icon, Dialog} from 'element-ui'
    import NovoObavestenjeForma from "./FormaNovoObavestenje";
    import {apiFetch, destinationUrl} from "../services/authFetch";
    import {dBTimeToString} from "../services/pomocneFunkcije";
    import {getUserInfo} from "../services/contextManagement";

    export default {
        components: {
            NovoObavestenjeForma,
            PrikazObavestenja,
            Button,
            Icon,
            Dialog,
        },
        data() {
            return {
                formaDodavanjeShown: false,
                brojObavestenja: 0,
                obavestenjaZaPrikaz: [],
                trenutnaStrana: 1,
                userId: '',
            }
        },
        methods: {
            promenaStrane: function (event) {
                this.trenutnaStrana = event
                this.pribaviObavestenja()
            },
            handleFormClose: function () {
                this.formaDodavanjeShown = false;
            },
            prihvatiUnosForme: function (event) {
                this.formaDodavanjeShown = false
                if (event === 'cancel')
                    return
                if (this.userId == '') {
                    this.$message({message: "Problem sa autentifikacijom. Molimo vas prijavite se ponovo.", type: 'error'})
                }
                event.id_referent = this.userId
                this.sacuvajObavestenje(event)
                this.pribaviObavestenja()
            },
            pribaviObavestenja: async function () {

                var that = this
                await apiFetch('GET', destinationUrl + "/obavestenje/straniceno?strana=" + (that.trenutnaStrana - 1).toString()
                    , {responseType: 'json'}).then(function (res) {
                    var date
                    res.rows.forEach(x => x.vreme = dBTimeToString(x.vreme))
                    that.brojObavestenja = res.count
                    that.obavestenjaZaPrikaz = res.rows
                })
            },
            sacuvajObavestenje: async function (body) {
                // console.log(this.idReferenta)
                var that = this
                return await apiFetch('POST', destinationUrl + "/obavestenje/dodaj", {responseType: 'text'}, body).then(async function(res){
                    if(res.charAt(0) == '2'){
                        that.$message({message: "Uspešno dodato obaveštenje.", type: "success"})
                        await that.pribaviObavestenja()
                        return
                    }
                    that.$message({message: "Greška pri dodavanju obaveštenja!", type: "error"})
                })
            },
            brisanjeObavestenja: async function (id) {
                var that = this
                await apiFetch('DELETE', destinationUrl + "/obavestenje/obrisi/" + id, {responseType: 'text'}).then(function (res) {
                    if (res.charAt(0) == "2") {
                        that.$message({message: "Uspešno brisanje obaveštenja", type: 'success'})
                        that.pribaviObavestenja()
                        return
                    }
                    else {
                        that.$message({message: "Greška prilikom brisanja obaveštenja!", type: 'error'})
                    }
                    that.pribaviObavestenja()
                })
            }

        },
        props: ["idReferenta"],

        beforeMount() {
            this.pribaviObavestenja()
            this.userId = getUserInfo().userId
        }
    }
</script>
<style>

    .obavestenja-referent-container {
        width: 100%;
        height: 100%;
    }

    .dugme-za-dodavanje-container {
        height: 4em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dugme-za-dodavanje {
        height: 4em;
        width: 4em;
    }

    .obavestenja-referent-content {
        height: calc(100% - 4em)

    }

    .backgroundImage {
        position: fixed;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: -1;
        background-image: url("../assets/domUlaz.jpg");
        background-size: cover;
        -webkit-filter: blur(6px);
        -moz-filter: blur(6px);
        -o-filter: blur(6px);
        -ms-filter: blur(6px);
        filter: blur(3px);
    }

</style>