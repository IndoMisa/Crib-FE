<template>
    <div class="formStanarInfoContainer">
        <el-form>
            <div v-if="mod == 'add'" class="stavka-forme">
                <label>Password:</label>
                <el-input type="password" class="input-polje" v-model="password"></el-input>
            </div>
            <div class="stavka-forme">
                <label>Ime:</label>
                <el-input class="input-polje" v-model="ime"></el-input>
            </div>
            <div class="stavka-forme">
                <label>Prezime:</label>
                <el-input class="input-polje" v-model="prezime"></el-input>
            </div>
            <div class="stavka-forme">
                <label>Soba:</label>
                <el-input class="input-polje" v-model="soba"></el-input>
            </div>
            <div class="stavka-forme">
                <label>Email:</label>
                <el-input class="input-polje" v-model="email"></el-input>
            </div>
            <div class="stavka-forme">
                <label>JMBG:</label>
                <el-input class="input-polje" v-model="jmbg"></el-input>
            </div>
            <el-button @click="saveOrUpdate">Sačuvaj</el-button>
            <el-button @click="ponistiIzmene">Poništi</el-button>
        </el-form>
    </div>
</template>
<script>
    import {clearFormMode, clearEditingStanar, getFormMode} from "../services/contextManagement";
    import {validateEmail, validacijaSobe} from "../services/pomocneFunkcije";

    export default {
        components: {},
        data() {
            return {
                // id: this.stanarZaIzmenu.id,
                password: this.stanarZaIzmenu.password,
                ime: this.stanarZaIzmenu.ime,
                prezime: this.stanarZaIzmenu.prezime,
                soba: this.stanarZaIzmenu.soba,
                email: this.stanarZaIzmenu.email,
                jmbg: this.stanarZaIzmenu.jmbg,
                mod: this.modForme,
            }
        },
        methods: {
            validacija: function(){
                if (this.ime === '' || this.prezime === '' || this.soba === '' || this.email === ''
                    || this.jmbg === '') {
                    this.$message('Sva polja moraju biti popunjena')
                    return false
                }
                if(!validacijaSobe(this.soba)){
                    this.$message({message: 'Pogrešan format unosa sobe', type: 'error'})
                    return false
                }
                if(!validateEmail(this.email)){
                    this.$message({message: 'Pogrešan format email adrese', type: 'error'})
                    return false
                }
                if(isNaN(this.jmbg) || this.jmbg.toString().length != 13){
                    this.$message({message: 'JMBG mora da bude broj i da ima 13 cifara', type: 'error'})
                    return false
                }
                return true
            },
            saveOrUpdate: function () {
                if(!this.validacija())
                    return
                clearFormMode()
                clearEditingStanar()
                var retStanar = {
                    id_korisnik: this.stanarZaIzmenu.id_korisnik,
                    ime: this.ime,
                    prezime: this.prezime,
                    jmbg: Number(this.jmbg),
                    email: this.email,
                    password: this.password,
                    soba: this.soba.toLowerCase(),
                    tip: 'stanar'
                }
                this.$emit('editFinished', retStanar)
            },
            ponistiIzmene: function () {
                clearFormMode()
                clearEditingStanar()
                this.$emit('editFinished', 'cancel')
            },
        },
        props: ['stanarZaIzmenu', 'modForme'],

    }
</script>
<style>
    .input-polje {
        width: 70%;
    }

    .stavka-forme {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 1em;
    }
</style>