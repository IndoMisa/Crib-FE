<template>
    <div class="filteri">
        <el-select class="filter-select" v-model="selectedType" placeholder="Tip zaduženja">
            <el-option
                    v-for="opcija in this.opcijeTipZaduzenja"
                    :key="opcija.value"
                    :label="opcija.label"
                    :value="opcija.value"
            ><span style="float: left">{{ opcija.label }}</span></el-option>
        </el-select>
        <el-select class="filter-select" v-model="selectedPeriod" placeholder="Period zaduženja">
            <el-option
                    v-for="opcija in this.opcijePeriodZaduzenja"
                    :key="opcija.value"
                    :label="opcija.label"
                    :value="opcija.value"
            ><span style="float: left">{{ opcija.label }}</span></el-option>
        </el-select>
        <el-button @click="prihvatiFiltere">Prikaži</el-button>
    </div>
</template>
<script>
    import {Select, Button, Option} from 'element-ui'

    export default {
        components: {
            Select,
            Button,
            Option,
        },
        data() {
            return {
                opcijeTipZaduzenja: [
                    {
                        value: "sve",
                        label: "Sve"
                    },
                    {
                        value: "ves-masina",
                        label: "Veš mašina"
                    },
                    {
                        value: "stanarina",
                        label: "Stanarina"
                    }
                ],
                opcijePeriodZaduzenja: [
                    {
                        value: "mesecna",
                        label: "Mesečna"
                    },
                    {
                        value: "sve",
                        label: "Sve"
                    }

                ],
                selectedType: '',
                selectedPeriod: '',
            }
        },
        methods: {
            prihvatiFiltere: function () {
                if (this.selectedType == '' || this.selectedPeriod == '') {
                    this.$message("Morate izabrati filtere!")
                    return
                }

                this.$emit('slanjeFiltera', this.selectedType, this.selectedPeriod)
            }
        },
        props: ['idStanara']
    }
</script>
<style scoped>
    .filteri {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 0.5em;
    }

    .filter-select {
        /*color: black;*/
        /*opacity: 0.95;*/
    }

    .filteri * {
        margin-left: 1em;
    }

</style>