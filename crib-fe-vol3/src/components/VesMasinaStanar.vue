<template>
    <div class="ves-masina-stanar-container">
        <div class="prijava-container">
            <h1>Prijava za veš mašinu</h1>
            <div class="unos">
                <label>Broj telefona:</label>
                <el-input v-model="brojTelefona"></el-input>
            </div>
            <div class="prijava-footer">
                <el-button @click="prihvatiPrijavu" class="button-prijava">Prijavi se</el-button>
                <label class="info-na-cekanju">Trenutno na čekanju: {{trenutnoNaCekanju}}</label>
            </div>
        </div>
        <!--<el-card class="prethodna-zaduzenja-container">
            <prikaz-zaduzenja v-if="prethodnaZaduzenja.length > 0" :zaduzenja="prethodnaZaduzenja"></prikaz-zaduzenja>
            <h2 v-else>Nemate prethodnih zaduženja za veš mašinu</h2>
        </el-card>-->
    </div>
</template>
<script>
    import {Card, Button, Input} from 'element-ui'
    import PrikazZaduzenja from "./PrikazZaduzenja";
    import {apiFetch, destinationUrl} from "../services/authFetch";
    import {getUserInfo} from "../services/contextManagement";

    export default {
        components: {
            PrikazZaduzenja,
            Card,
            Button,
            Input,
        },
        data() {
            return {
                prethodnaZaduzenja: [],
                trenutnoNaCekanju: '',
                brojTelefona: '',
                userId: '',
            }

        },
        methods:{
            prijavaZaMasinu: async function(brTelefona){
                  if(this.userId == ''){
                      this.$message('Greška prilikom prijave. Pokušajte da se prijavite ponovo.')
                      return
                  }
                  var body = {
                      id_stanar: this.userId,
                      telefon: brTelefona
                  }

                  return await apiFetch("POST", destinationUrl + "/vesmasina/dodaj", {responseType: 'text'}, body)
            },
            prihvatiPrijavu: async function(){
                if(this.brojTelefona == ''){
                    this.$message({message: "Morate uneti broj telefona", type: 'warning'})
                    return
                }
                if(isNaN(this.brojTelefona)){
                    this.$message({message: "Broj telefona nije u odgovarajućem formatu.", type: 'error'})
                    return
                }
                var that = this
                this.prijavaZaMasinu(this.brojTelefona).then(function(res){
                    if(res.charAt(0) == 2){
                        that.$message({message: "Uspešna prijava u red za veš mašinu", type: 'success'})
                        return
                    }
                    else if(res == "403"){
                        that.$message("Već ste prijavljeni u red za veš mašinu")
                    }
                    else
                        that.$message("Greška prilikom prijave.")
                })
            }


        },
        beforeMount: async function(){
            this.userId = getUserInfo().userId
            this.trenutnoNaCekanju = await apiFetch('GET', destinationUrl + "/vesmasina/broj_cekanja")
        }
    }
</script>
<style>
    .prijava-container {
        /*height: 12em;*/
        width: 100%;
        border: none;
        margin: 0;
        /*margin-top: 3vh;*/
    }

    .prijava-container h1 {
        font-size: 20px;
    }

    .button-prijava {
        margin-top: 0.5em;
    }

    .ves-masina-stanar-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .ves-masina-stanar-container > *{
        margin: 0 auto;
    }
    .info-na-cekanju{
        font-size: 14px;
    }
    .prijava-footer{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>