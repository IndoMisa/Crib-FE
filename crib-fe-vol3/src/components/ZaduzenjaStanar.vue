<template>
    <div style="width: 100%;">
        <div class="zaduzenja-background"></div>
        <el-dialog style="margin: 0 auto; margih-top: 15vh;" :show-close="false" :visible.sync="dialogFilters">
            <label>Koja zaduženja želite da vidite?</label>
            <filteri-zaduzenja @slanjeFiltera="primiFiltere"
                               @pribavljenaZaduzenja="primiPribavljenaZaduzenja($event)"></filteri-zaduzenja>
        </el-dialog>
        <div class="zaduzenja-container" v-if="!this.dialogFilters">
            <div class="zaduzenja-stanar-filteri-container">
                <label>Filteri:</label>
                <filteri-zaduzenja @slanjeFiltera="primiFiltere"></filteri-zaduzenja>
            </div>
            <prikaz-zaduzenja v-if="this.zaduzenja.length > 0" :rowsSelectable="false"
                              :zaduzenja="zaduzenja"></prikaz-zaduzenja>
            <div v-else class="zaduzenja-stanar-exception-container">
                <h1>Nema zaduženja sa navedenim filterima!</h1>
            </div>
        </div>
    </div>
</template>
<script>
    import CustomHeaderBar from "./CustomHeaderBar"
    import {Table, TableColumn, Button, Select, Option} from 'element-ui'
    import PrikazZaduzenja from "./PrikazZaduzenja";
    import FilteriZaduzenja from "./FilteriZaduzenja";
    import {apiFetch, destinationUrl} from "../services/authFetch";
    import {getUserInfo} from "../services/contextManagement";

    export default {
        components: {
            FilteriZaduzenja,
            PrikazZaduzenja,
            CustomHeaderBar,
            Table,
            TableColumn,
            Button,
            Option,
            Select,
        },
        data() {
            return {
                zaduzenja: [],
                dialogFilters: true,
                userId: '',
            }
        },
        methods: {
            prikazi: function () {
                Console.log('cao')
                // Console.log(this.selectedType)
                // Console.log(this.selectedPeriod)
            },
            primiFiltere: function (selectedType, selectedPeriod) {
                this.dialogFilters = false
                var pom = "/zaduzenje";
                if (selectedPeriod == 'mesecna')
                    pom += "/tekuci_mesec/"
                else
                    pom += "/sve_po_tipu/"
                pom += this.userId.toString() + "?tip=" + selectedType
                var that = this
                this.pribaviZaduzenja(pom).then(function (res) {
                    if (typeof(res) == 'string') {
                        console.log(res)
                        that.$message('Neuspešno pribavljanje zaduženja')
                        return
                    }
                    that.zaduzenja = res
                    if (selectedType != 'sve')
                        that.zaduzenja.map(x => x.tip = selectedType)

                    that.prevediUOblikZaPrikaz(that.zaduzenja)
                })

            },
            pribaviZaduzenja: async function (urlEnd) {
                return await apiFetch('GET', destinationUrl + urlEnd)
            },
            prevediUOblikZaPrikaz(zaduzenja) {
                zaduzenja.map(x => {
                    x.mesec = x.mesec.charAt(0).toUpperCase() + x.mesec.slice(1)
                    if (x.tip == 'ves-masina')
                        x.tip = 'Veš mašina'
                    else if (x.tip == 'stanarina')
                        x.tip = 'Stanarina'
                })
            }
        },
        beforeMount() {
            this.dialogFilters = true;
            this.userId = getUserInfo().userId
        }

    }
</script>
<style>
    .zaduzenja-stanar-exception-container{
        display: flex;
        justify-content: center;
    }
    .zaduzenja-stanar-exception-container h1{
        font-size: 20px;
        font-weight: normal;
        font-style: italic;
    }
    .zaduzenja-stanar-filteri-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .zaduzenja-container {
        width: 65%;
        opacity: 0.9;
        background-color: white;
        padding: 1em;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 1.5em;
    }

    .table-column {
        width: 33%;
    }

    .zaduzenja-background {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-image: url("../assets/zaduzenjaBackground.jpg");
    }
</style>