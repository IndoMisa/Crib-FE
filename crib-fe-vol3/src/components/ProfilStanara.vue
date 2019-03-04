<template>
    <div class="profil-stanara-container">
        <el-dialog width="30%" style="margin-top: 10vh;" :visible.sync="promenaLozinke">
            <promena-lozinke @zavrsenaPromena="primiIzmenuLozinke($event)"></promena-lozinke>
        </el-dialog>
        <div class="profil-stanara-card">
            <div class="profile-avatar"><img
                    style="min-width: 90px; min-height: 90px; max-width: 120px; max-height: 120px;"
                    src="../assets/profileAvatar.png"/>
            </div>
            <div class="profile-info-line">
                <label>Ime:</label>
                <label>{{ime}}</label>
            </div>
            <div class="profile-info-line">
                <label>Prezime:</label>
                <label>{{prezime}}</label>
            </div>
            <div class="profile-info-line">
                <label>Soba:</label>
                <label>{{soba}}</label>
            </div>
            <div class="profile-info-line">
                <label>Email:</label>
                <label>{{email}}</label>
            </div>
            <div class="profile-info-line">
                <label>JMBG:</label>
                <label>{{jmbg}}</label>
            </div>
            <el-button @click="promenaLozinke = true" icon="el-icon-" class="btn-change-password" type="">Promeni lozinku</el-button>
        </div>
    </div>
</template>
<script>
    import {} from 'element-ui'
    import {getUserInfo} from "../services/contextManagement";
    import {apiFetch, destinationUrl} from "../services/authFetch";
    import PromenaLozinke from "./PromenaLozinke"
    export default {
        components: {
            PromenaLozinke
        },
        data() {
            return {
                userId: '',
                ime: '',
                prezime: '',
                soba: '',
                email: '',
                jmbg: 0,
                promenaLozinke: false,
            }
        },
        methods: {
            pribaviStanara: async function () {
                var that = this
                apiFetch('GET', destinationUrl + "/korisnik/" + this.userId.toString()).then(function (res) {
                    if (typeof(res) == "string") {
                        that.$message({message: "Greška prilikom pribavljanja podataka", type: "error"})
                        return
                    }
                    that.ime = res.ime
                    that.prezime = res.prezime
                    that.soba = res.soba
                    that.email = res.email
                    that.jmbg = res.jmbg
                })
            },
            primiIzmenuLozinke: async function(body){
                this.promenaLozinke = false;

                if(body != 'cancel' && this.userId != null){
                    var that = this
                    body.id = this.userId
                    apiFetch('PUT', destinationUrl + '/korisnik/promeni_lozinku/', {responseType: 'text'}, body).then(function(res){
                        if(res.charAt(0) == "2"){
                            that.$message({message: "Uspešna promena lozinke!", type: 'success'})
                            return
                        }
                        that.$message({message: "Greška prilikom promene lozinke", type: 'error'})

                    })
                }
            }
        },
        beforeMount() {
            this.userId = getUserInfo().userId
            this.pribaviStanara()
        }
    }
</script>
<style>
    .profil-stanara-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }

    .profile-avatar {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .profil-stanara-card {
        padding: 1em;
        width: 45%;
        height: 80%;
        margin-top: 7vh;
        background: rgba(240, 240, 255, 0.8);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .profile-info-line {
        width: 80%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0 auto;
        margin-top: 4vh;
    }

    .profile-info-line label {
        width: 30%;
        font-size: 1.35vw;
    }

    .profile-info-line label + label {
        color: rgba(0, 0, 0, 0.7)
    }

    .btn-change-password {
        width: 30%;
        margin: 0 auto;
        margin-top: 1em;
        font-size: 1.2vw;
        display: flex;
        justify-content: center;
    }
</style>