<template>
    <div class="formStanarInfoContainer">
        <el-form>
            <div class="stavka-forme">
                <label>Tip:</label>
                <el-select class="input-polje" placeholder="Tip zaposlenog" v-model="tip">
                    <el-option label="Referent"
                               value="referent">
                    </el-option>
                    <el-option
                            label="Portir"
                            value="portir">
                    </el-option>
                    <el-option
                            label="Majstor"
                            value="majstor">
                    </el-option>
                </el-select>
            </div>
            <div class="stavka-forme">
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
                <label>Email:</label>
                <el-input class="input-polje" v-model="email"></el-input>
            </div>
            <div class="stavka-forme">
                <label>JMBG:</label>
                <el-input class="input-polje" v-model="jmbg"></el-input>
            </div>
            <el-button @click="dodajZaposlenog">Sačuvaj</el-button>
            <el-button @click="prekiniDodavanje">Poništi</el-button>
        </el-form>
    </div>
</template>
<script>
    import {validateEmail} from "../services/pomocneFunkcije";

    export default{
        data(){
            return{
                tip: '',
                password: '',
                ime: '',
                prezime: '',
                email: '',
                jmbg: '',
            }
        },
        methods:{
            validacija: function(){
                if (this.ime === '' || this.prezime === '' || this.email === ''
                    || this.jmbg === '') {
                    this.$message({message: 'Sva polja moraju biti popunjena', type: 'warning'})
                    return false
                }
                if(!validateEmail(this.email)){
                    this.$message({message: 'Pogrešan format email adrese', type: 'error'})
                    return false
                }
                if(isNaN(this.jmbg) || this.jmbg.length != 13){
                    this.$message({message: 'JMBG mora da bude broj i da ima 13 cifara', type: 'error'})
                    return false
                }
                return true
            },
            dodajZaposlenog: async function(){
                if(!this.validacija())
                    return
                var retStanar = {
                    ime: this.ime,
                    prezime: this.prezime,
                    jmbg: Number(this.jmbg),
                    email: this.email,
                    password: this.password,
                    tip: this.tip
                }
                this.$emit('editFinished', retStanar)
            },
            prekiniDodavanje: function(){
                this.$emit('editFinished', 'cancel')
            }

        }
    }
</script>
<style>
</style>