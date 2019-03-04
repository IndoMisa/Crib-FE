<template>
    <div class="form-nova-poseta-container">
        <div class="stavka-forme">
            <label>Soba:</label>
            <el-input v-model="soba" class="input-dodavanje"></el-input>
        </div>
        <div class="stavka-forme">
            <label>Broj posetilaca:</label>
            <el-input-number v-model="brPosetilaca" :min="1" :max="20" class="input-dodavanje"></el-input-number>
        </div>
        <div class="dugmad-forme">
            <el-button @click="zavrsiUnos('ok')">Potvrdi</el-button>
            <el-button @click="zavrsiUnos('cancel')">Poništi</el-button>
        </div>
    </div>
</template>
<script>
    import {} from 'element-ui'
    import {validacijaSobe} from "../services/pomocneFunkcije";

    export default {
        components: {},
        data() {
            return {
                soba: '',
                brPosetilaca: 1,
            }
        },
        methods: {
            zavrsiUnos: function (poruka) {
                var pom;
                if (poruka == 'cancel')
                    pom = poruka
                else {
                    if(!validacijaSobe(this.soba)) {
                        this.$message({message: "Pogrešan format unosa sobe", type: 'error'})
                        return
                    }
                    pom = {
                        soba: this.soba,
                        brPosetilaca: this.brPosetilaca
                    }
                }
                this.$emit("zavrsenUnos", pom)
            }
        },
        props: []
    }
</script>
<style>
    .stavka-forme {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .stavka-forme label {
        width: 30%;
    }

    .input-dodavanje {
        width: 60%;
    }

    .dugmad-forme {
        display: flex;
        justify-content: flex-end;
    }
</style>