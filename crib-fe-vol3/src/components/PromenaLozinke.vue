<template>
    <div class="promena-lozinke-container">
        <h1>Promena lozinke</h1>
        <div class="form-lozinka-line">
            <label>Unsite staru lozinku:</label>
            <el-input type="password" v-model="oldPass"></el-input>
        </div>
        <div class="form-lozinka-line">
            <label>Unesite novu lozinku:</label>
            <el-input type="password" v-model="newPass"></el-input>
        </div>
        <div class="form-lozinka-line">
            <label>Ponovite lozinku:</label>
            <el-input type="password" v-model="newPassRe"></el-input>
        </div>
        <div class="form-lozinka-buttons">
            <el-button @click="potvrdiUnos">Potvrdi</el-button>
            <el-button @click="ponistiUnos">Poništi</el-button>
        </div>
    </div>
</template>
<script>
    import {} from 'element-ui'
    export default {
        components:{

        },
        data(){
            return{
                oldPass: '',
                newPass: '',
                newPassRe: '',
            }
        },
        methods: {
            validacijaPassworda: function(){
                if(this.newPass != this.newPassRe){
                    this.$message({message: "Lozinke se ne podudaraju", type: 'error'})
                    this.newPass = ''
                    this.newPassRe = ''
                    return false
                }
                if(this.oldPass.length > 16){
                    this.$message({message: "Lozinka može da ima najviše 16 karaktera", type: 'error'})
                    this.newPass = ''
                    this.newPassRe = ''
                    return false
                }
                return true

            },
            potvrdiUnos: function(){
                if(this.validacijaPassworda()){
                    var pass = {
                        newPassword: this.newPass,
                        oldPassword: this.oldPass
                    }
                    this.$emit("zavrsenaPromena", pass)
                }
            },
            ponistiUnos: function(){
                this.$emit("zavrsenaPromena", 'cancel')
            }
        }
    }
</script>
<style>
    .promena-lozinke-container{
        width: 100%;
        height: 100%;
    }
    .promena-lozinke-container h1{
        font-size: 23px;
        margin-bottom: 1.5em;
        display: flex;
        justify-content: center;
    }
    .form-lozinka-line{
        display: flex;
        flex-direction: row;
        margin-top: 2vh;
        align-items: center;
    }
    .form-lozinka-line label{
        width: 60%;
    }
    .form-lozinka-line label + * {
        width: 40%;
    }
    .form-lozinka-buttons{
        margin-top: 1.5em;
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
</style>