<template>
    <div class="zaduzenja-referent-container">
        <filteri-zaduzenja class="filteri-zaduzenja" :id-stanara="this.idStanara"
                           @slanjeFiltera="primiFiltere"></filteri-zaduzenja>
        <prikaz-zaduzenja class="prikaz-zaduzenja" @promenaSelektovanihZaduzenja="primiSelektovanaZaduzenja($event)"
                          :rowsSelectable="true"
                          :zaduzenja="this.zaduzenjaZaPrikaz"></prikaz-zaduzenja>
        <div class="dugmad-zaduzenja">
            <el-button id="btn-obrisi-zaduzenja" @click="obrisiSelektovanaZaduzenja">Ukloni zaduženja</el-button>
            <el-button @click="emitujNazad">Nazad</el-button>
        </div>
    </div>
</template>
<script>
    import FilteriZaduzenja from './FilteriZaduzenja'
    import PrikazZaduzenja from "./PrikazZaduzenja";
    import {apiFetch, destinationUrl} from "../services/authFetch";
    import {clearEditingStanar, clearFormMode} from "../services/contextManagement";

    export default {
        components: {
            PrikazZaduzenja,
            FilteriZaduzenja,
        },
        data() {
            return {
                zaduzenjaZaPrikaz: '',
                selektovanaZaduzenja: [],
                stanarId: this.idStanara,
                filterTip: this.filteriZaduzenja.tip,
                filterPeriod: this.filteriZaduzenja.period,
            }
        },
        methods: {
            primiSelektovanaZaduzenja: function (niz) {
                this.selektovanaZaduzenja = niz
            },
            obrisiSelektovanaZaduzenja: async function () {
                if (this.selektovanaZaduzenja.length == 0) {
                    this.$message("Morate izabrati bar jedno zaduženje za brisanje")
                    return
                }
                var that = this
                var flag = true
                for (var zaduzenje of this.selektovanaZaduzenja) {
                    await that.obrisiZaduzenjePoID(zaduzenje.id_zaduzenje).then(function (res) {
                        if (res.charAt(0) == "2") {
                            flag &= true
                        }
                        else {
                            flag &= false
                        }
                    })
                }
                if (flag) {
                    this.$message("Uspešno brisanje željenih zaduženja")
                    await this.pribaviZaduzenjaPoFilterima()
                    return
                }
                this.$message("Došlo je do greške prilikom brisanja!")
            },
            obrisiZaduzenjePoID: async function (id) {
                return await apiFetch('DELETE', destinationUrl + "/zaduzenje/obrisi_posebno/" + id, {responseType: 'text'})
            },
            primiFiltere: function (tip, period) {
                this.filterTip = tip
                this.filterPeriod = period
                this.pribaviZaduzenjaPoFilterima()
            }
            ,
            pribaviZaduzenjaPoFilterima: async function () {
                var urlEnd = "/zaduzenje";
                if (this.filterPeriod == 'mesecna')
                    urlEnd += "/tekuci_mesec/"
                else
                    urlEnd += "/sve_po_tipu/"
                urlEnd += this.stanarId.toString() + "?tip=" + this.filterTip
                var that = this
                await apiFetch('GET', destinationUrl + urlEnd).then(function (res) {
                    if (typeof(res) == 'string') {
                        that.$message('Neuspešno pribavljanje zaduženja')
                        return
                    }
                    that.zaduzenjaZaPrikaz = res
                    if (that.filterTip != 'sve')
                        that.zaduzenjaZaPrikaz.map(x => x.tip = that.filterTip)

                    that.prevediUOblikZaPrikaz(that.zaduzenjaZaPrikaz)
                })
            },
            prevediUOblikZaPrikaz(zaduzenja) {
                zaduzenja.map(x => {
                    x.mesec = x.mesec.charAt(0).toUpperCase() + x.mesec.slice(1)
                    if (x.tip == 'ves-masina')
                        x.tip = 'Veš mašina'
                    else if (x.tip == 'stanarina')
                        x.tip = 'Stanarina'
                })
            },
            emitujNazad: function () {
                clearEditingStanar()
                clearFormMode()
                this.$emit('vratiEvidencijuStanara')
            }
        },
        props: ['idStanara', 'filteriZaduzenja'],
        watch: {
            idStanara: function (pom) {
                this.stanarId = pom
            },
            filteriZaduzenja: function (pom) {
                this.filterTip = pom.tip
                this.filterPeriod = pom.period
            }
        },
        beforeMount() {
            this.pribaviZaduzenjaPoFilterima()

        }

    }
</script>
<style>
    .zaduzenja-referent-container {
        height: 100%;
        width: 100%;
    }

    .filteri-zaduzenja {
        height: 3em;
    }

    .dugmad-zaduzenja {
        height: 3em;
    }

    .prikaz-zaduzenja {
        hegiht: calc(100% - 7em);
    }

    #btn-obrisi-zaduzenja {
        margin-top: 1em;
    }
</style>