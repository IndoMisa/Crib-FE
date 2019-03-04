<template>
    <div class="kvarovi-stanar-container">
        <div class="prijava-kvara-kartica">
            <h1>Prijava kvara</h1>
            <div class="prijava-kvara-form-row">
                <label>Tip:</label>
                <el-select v-model="selectedKvarType" placeholder="Izaberite tip kvara">
                    <el-option v-for="kvarType in kvarTypeOptions" :value="kvarType.value" :key="kvarType.value"
                               :label="kvarType.label"></el-option>
                </el-select>
            </div>
            <div class="prijava-kvara-form-row">
                <label>Soba:</label>
                <el-input v-model="soba">
                </el-input>
            </div>
            <label>Opis:</label>
            <el-input type="textarea" :rows="5" v-model="opis">
            </el-input>
            <el-button @click="potvrdiUnos" id="dugme-prijavi-kvar">Prijavi</el-button>
        </div>
    </div>
</template>
<script>
    import {Card} from 'element-ui'
    import {apiFetch, destinationUrl} from "../services/authFetch";
    import {validacijaSobe} from "../services/pomocneFunkcije";

    export default {
        components: {
            Card,
        },
        data() {
            return {
                kvarTypeOptions: [
                    {
                        label: 'Problemi sa vodom',
                        value: 'voda'
                    },
                    {
                        label: 'Problemi sa elektrikom',
                        value: 'struja'
                    },
                    {
                        label: 'Problemi sa osvetljenjem',
                        value: 'svetlo'
                    },
                    {
                        label: 'Fizičko oštećenje',
                        value: 'ostecenje'
                    },

                ],
                selectedKvarType: '',
                soba: '',
                opis: ''
            }
        },
        methods: {
            prijaviKvar: async function (kvar) {
                return await apiFetch('POST', destinationUrl + "/ostecenje/dodaj", {responseType: 'text'}, kvar)
            },
            potvrdiUnos: async function () {
                if (this.selectedKvarType == '') {
                    this.$message({message: 'Morate izabrati tip kvara.', type: 'warning'})
                    return
                }
                if (this.soba == '') {
                    this.$message({message: 'Morate uneti broj sobe.', type: 'warning'})
                    return
                }
                if (this.opis == '') {
                    this.$message({message: 'Morate uneti opis kvara', type: 'warning'})
                    return
                }
                if (!validacijaSobe(this.soba)){
                    this.$message({message: 'Pogrešan format unosa sobe!', type: 'error'})
                    return
                }
                var kvar = {
                    soba: this.soba.toLowerCase(),
                    tip: this.selectedKvarType,
                    opis: this.opis
                }
                var that = this
                await this.prijaviKvar(kvar).then(function(res){
                        if (res.charAt(0) == '2'){
                            that.$message({message: "Uspešna prijava kvara!", type: 'success'})
                            that.opis = ''
                            that.soba = ''
                            that.selectedKvarType = ''
                        }
                        else
                            that.$message({message: "Greška prilikom prijave kvara!", type: 'error'})
                    }
                )
            }

        }
    }
</script>
<style>
    .prijava-kvara-form-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5em;
    }

    .prijava-kvara-form-row > * + * {
        width: 60%;
    }

    .prijava-kvara-kartica {
        border: none;
        padding: 0.5em;
    }

    .prijava-kvara-kartica h1 {
        font-size: 20px;
    }

    #dugme-prijavi-kvar {
        float: right;
        margin-top: 0.5em;
    }
</style>