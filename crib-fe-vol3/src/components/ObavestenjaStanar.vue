<template>
    <div class="obavestenja-stanar-container">
        <prikaz-obavestenja @pageChange="pageChange($event)" :obavestenja-za-prikaz="this.obavestenjaZaPrikaz"
                            :broj-obavestenja="this.brojObavestenja"></prikaz-obavestenja>
    </div>
</template>
<script>
    import PrikazObavestenja from "./PrikazObavestenja"
    import {apiFetch, destinationUrl} from "../services/authFetch";
    import {dBTimeToString} from "../services/pomocneFunkcije";

    export default {
        components: {
            PrikazObavestenja,
        },
        data() {
            return {
                obavestenjaZaPrikaz: [],
                trenutnaStrana: 1,
                brojObavestenja: 0,
            }
        },
        methods: {
            pribaviObavestenja: async function () {

                var that = this
                await apiFetch('GET', destinationUrl + "/obavestenje/straniceno?strana=" + (that.trenutnaStrana - 1).toString()
                    , {responseType: 'json'}).then(function (res) {
                    if (typeof(res) != 'string') {
                        var date
                        res.rows.forEach(x => x.vreme = dBTimeToString(x.vreme))
                        that.brojObavestenja = res.count
                        that.obavestenjaZaPrikaz = res.rows
                    }
                    else{
                        that.$message({message: "Greška prilikom pribavljanja obaveštenja!", type: 'error'})
                    }
                })
            },
            pageChange: function (event) {
                this.trenutnaStrana = event
                this.pribaviObavestenja()
            }
        },
        beforeMount: async function () {
            await this.pribaviObavestenja()
        }
    }
</script>
<style>
    .obavestenja-stanar-container {
        height: 100%;
        width: 100%;
        overflow: auto;
    }


</style>