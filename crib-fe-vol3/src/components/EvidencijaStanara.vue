git<template>
    <div class="evidencija-stanara-container-wrapper">
        <div v-if="this.formMode != 'zaduzenja' " class="evidencija-stanara-container">
            <div class="stanari-referent-container">
                <filteri-stanara class="filter-box" @filterChange="primiFiltereStanara"></filteri-stanara>
                <div class="tabela-stanara-container">
                    <prikaz-stanara @selektovaniStanari="registrujSelekciju($event)"
                                    :listaStanaraZaPrikaz="this.listaStanaraZaPrikaz"></prikaz-stanara>
                </div>
                <div class="dugmici">
                    <el-button @click="addStanar"> Dodaj stanara</el-button>
                    <el-button @click="editStanar"> Izmeni stanara</el-button>
                    <el-button @click="deleteStanar">Obriši stanara</el-button>
                    <el-button @click="zahtevajZaduzenja">Prikaži zaduzenja</el-button>
                </div>
            </div>
        </div>
        <div v-else class="zaduzenja-referent-wrapper">
            <ZaduzenjaReferent @vratiEvidencijuStanara="prikaziEvidencijuStanara"
                               :idStanara="stanarZaIzmenu.id_korisnik"
                               :filteriZaduzenja="filteriZaduzenja"
                               ></ZaduzenjaReferent>
        </div>
        <el-dialog style="margin: 0 auto;" title="Koja zaduženja želite da vidite?" :before-close="odustani"
                   :visible.sync="this.prikazaniFilteriZaduzenja">
            <filteri-zaduzenja :idStanara="this.stanarZaduzenja"
                               @slanjeFiltera="primiFiltereZaduzenja"></filteri-zaduzenja>
        </el-dialog>

        <el-dialog style="margin: 0 auto;" :show-close="false" class="dialog-box" v-if="formMode != ''"
                   :visible.sync="this.formMode == 'add' || this.formMode == 'edit'">
            <form-stanar-info :dodavanje-zaposlenog="false" :modForme="this.formMode" :stanarZaIzmenu="this.stanarZaIzmenu"
                              @editFinished="editHandle($event)"></form-stanar-info>
        </el-dialog>
    </div>
</template>
<script>
    import {Table, TableColumn} from 'element-ui'
    import FormStanarInfo from "./FormaStanarInfo";
    import FilteriZaduzenja from "./FilteriZaduzenja"
    import {
        getFormMode,
        setFormMode,
        setEditingStanar,
        getEditingStanar,
        clearEditingStanar,
        clearFormMode
    } from "../services/contextManagement";
    import ZaduzenjaReferent from "./ZaduzenjaReferent";
    import PrikazStanara from "./PrikazStanara";
    import FilteriStanara from "./FilteriStanara";
    import {destinationUrl, apiFetch} from "../services/authFetch";

    export default {
        components: {
            FilteriStanara,
            PrikazStanara,
            ZaduzenjaReferent,
            FormStanarInfo,
            Table,
            TableColumn,
            FilteriZaduzenja,
        },
        data() {
            return {
                prikazaniFilteriZaduzenja: false,
                listaStanaraZaPrikaz: [],
                listaStanara: [],
                zaduzenjaZaPrikaz: '',
                formMode: '',
                stanarZaduzenja: '',
                stanarZaIzmenu: '',
                selektovaniStanari: [],
                imeIPrezimeFilter: '',
                sobaFilter: '',
                filteriZaduzenja: {
                    tip: 'sve',
                    period: 'sve'
                },
            }
        },
        // props: [idFilter, imeFilter, prezimeFilter, sobaFilter],
        methods: {
            primiFiltereStanara: function (imeIPrezime, soba) {
                this.imeIPrezimeFilter = imeIPrezime
                this.sobaFilter = soba
                this.filtriranjeListe()
            },
            primiFiltereZaduzenja: function (filterTip, filterPeriod) {
                this.prikazaniFilteriZaduzenja = false
                this.filteriZaduzenja.tip = filterTip
                this.filteriZaduzenja.period = filterPeriod
                this.formMode = 'zaduzenja'
                setFormMode('zaduzenja')
                setEditingStanar(this.stanarZaIzmenu.id_korisnik)
            },
            filtriranjeListe() {
                // var filteredList = []
                var pom = this.imeIPrezimeFilter.split(" ");
                var that = this;
                this.listaStanaraZaPrikaz = this.listaStanara.filter(x => {
                    var retValue = true
                    for (var a of pom) {
                        retValue = x.ime.toLowerCase().indexOf(a.toLowerCase()) != -1
                            || x.prezime.toLowerCase().indexOf(a.toLowerCase()) != -1
                    }
                    retValue &= x.soba.toLowerCase().indexOf(that.sobaFilter.toLowerCase()) != -1
                    return retValue
                })
            },
            registrujSelekciju: function (listaSelektovanih) {
                this.selektovaniStanari = listaSelektovanih
            },
            closeForm: function () {
                if (this.formMode === 'edit')
                    clearEditingStanar()
                clearFormMode()
                this.formMode = ''
            },
            addStanar: function () {
                setFormMode('add')
                this.stanarZaIzmenu = {
                    id: '',
                    password: '',
                    ime: '',
                    prezime: '',
                    soba: '',
                    email: '',
                    jmbg: '',
                }
                this.formMode = 'add'
            },
            editStanar: function () {
                if (this.selektovaniStanari.length > 1) {
                    this.$message({message: 'Možete odabrati samo jednog stanara za izmenu', type: 'warning'})
                    return
                }
                if (this.selektovaniStanari.length == 0) {
                    this.$message({message: 'Morate izabrati stanara za izmenu', type: 'warning'})
                    return;
                }
                this.stanarZaIzmenu = this.selektovaniStanari[0]
                setEditingStanar(this.stanarZaIzmenu.id_korisnik)

                this.formMode = 'edit'
            },
            deleteStanar: async function () {
                if (this.selektovaniStanari.length > 1) {
                    this.$message({message: 'Možete odabrati samo jednog stanara za brisanje', type: 'warning'})
                    return
                }
                if (this.selektovaniStanari.length == 0) {
                    this.$message({message: 'Morate izabrati stanara za brisanje', type: 'warning'})
                    return;
                }
                var that = this
                var izabraniId = this.selektovaniStanari[0].id_korisnik
                await apiFetch('delete', destinationUrl + "/korisnik/obrisi/"
                    + izabraniId.toString(), {responseType: 'text'}).then(function (res) {
                    if (res.charAt(0) == '2') {
                        that.$message({message: 'Uspešno brisanje stanara!', type: 'success'})
                        that.listaStanaraZaPrikaz = that.listaStanaraZaPrikaz.filter(x => x.id_korisnik != izabraniId)
                    }
                    else
                        that.$message({message: "Brisanje nije uspelo!", type: 'error'})
                })
            },
            editHandle: async function (arg) {
                var pom = ''
                var tipZahteva = ''
                if (this.formMode == 'add') {
                    pom = '/crib/register'
                    tipZahteva = 'POST'
                }
                else {
                    pom = '/korisnik/izmeni'
                    tipZahteva = 'PUT'
                }
                this.formMode = ''
                if (arg === 'cancel')
                    return
                // console.log(arg)
                await apiFetch(tipZahteva, destinationUrl + pom, {responseType: 'text'}, arg).then(function (res) {
                    // console.log(res.toString())
                })
                var that = this
                this.pribaviStanare().then(function () {
                    that.filtriranjeListe()
                })
            },
            zahtevajZaduzenja: function () {
                if (this.selektovaniStanari.length > 1) {
                    this.$message({message: 'Možete odabrati samo jednog stanara za prikaz zaduženja', type: 'warning'})
                    return
                }
                if (this.selektovaniStanari.length == 0) {
                    this.$message({message: 'Morate izabrati stanara za prikaz zaduženja', type: 'warning'})
                    return;
                }
                this.stanarZaIzmenu = this.selektovaniStanari[0]
                this.prikazaniFilteriZaduzenja = true;
            },
            odustani: function () {
                this.filteriZaduzenja.tip = ''
                this.filteriZaduzenja.period = ''
                this.prikazaniFilteriZaduzenja = false
            },
            pribaviStanare: async function () {
                var that = this
                await apiFetch('GET', destinationUrl + '/korisnik/stanari', {responseType: 'json'}).then(function (res) {
                    that.listaStanara = res;
                })
            },
            prikaziEvidencijuStanara: function () {
                this.formMode = ''
                this.prikazaniFilteriZaduzenja = false
                this.stanarZaIzmenu = ''
            }
        },
        beforeMount() {
            var that = this;
            this.pribaviStanare().then(function () {
                that.listaStanaraZaPrikaz = that.listaStanara;
                var tmp = getFormMode().formMode;
                if (tmp === 'edit' || tmp === 'zaduzenja') {
                    that.stanarZaIzmenu = that.listaStanara.find(x => x.id_korisnik == getEditingStanar().stanarID)
                }
                if (tmp != null)
                    that.formMode = tmp;
            })

            //fetch all
        },
    }
</script>
<style>
    .filter-box {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-bottom: 1em;
        height: 3em;
    }

    .stanari-referent-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .tabela-stanara-container {
        height: calc(100% - 6em);
        overflow: auto;
        /*width: 100%;*/
    }

    .dialog-box {
        width: 60%;
    }

    /*.table-column {*/
    /*width: 15%;*/
    /*}*/

    .evidencija-stanara-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 80%;
        height: 80%;
        background-color: rgba(244, 244, 245, 0.9);
        opacity: 0.9;
        padding: 1em;
    }

    .evidencija-stanara-container-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dugmici {
        display: flex;
        justify-content: flex-end;
        margin-top: 0.5em;
        height: 3em;
    }
    .zaduzenja-referent-wrapper{
        height: 90%;
        width: 80%;
        border-radius: 5px;
        background-color: rgba(244, 244, 245, 0.9);
        padding: 1em;
    }

</style>