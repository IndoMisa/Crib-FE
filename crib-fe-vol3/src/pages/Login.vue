<template>
    <div id="login-container">
        <div class="backgroundImage"></div>
        <el-card class="login-kartica">
            <img id="logoImage" src="../assets/CribLogoWhiteTest.png"/>
            <el-form class="form-input">
                <el-input @keyup.enter.native="submitLogin($event)" type="email" size="large" class="inputField" v-model="loginData.email"
                          placeholder="korisnik@primer.com"></el-input>
                <el-input @keyup.enter.native="submitLogin($event)" type="password" class="inputField" v-model="loginData.password"
                          placeholder="password"></el-input>
                <el-button  type="submit" id="dugme-submit" @click="submitLogin($event)" >Prijavi se</el-button>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import {Card, Input, Form, Button, Icon} from 'element-ui'
    import {apiFetch, destinationUrl, setCredentials} from "../services/authFetch";
    import {setUserInfo, getUserInfo} from "../services/contextManagement";
    import {validateEmail} from "../services/pomocneFunkcije";

    export default {
        components: {
            Card,
            Input,
            Form,
            Button,
            Icon,
        },
        data() {
            return {
                loginData: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            submitLogin: function () {
                if (this.loginData.email === "" || this.loginData.password === "") {
                    this.$message({
                        message: "Morate uneti mejl i lozinku!",
                        type: "error"
                    })
                    return
                }
                if (!validateEmail(this.loginData.email)) {
                    this.$message({
                        message: "Pogrešan format email adrese!",
                        type: "error"
                    })
                    return
                }
                this.logUser()


            },

            logUser: async function() {
                var that = this
                await apiFetch('POST', destinationUrl + '/crib/login', {
                    hasAuthHeader: false,
                    responseType: 'json'
                }, this.loginData)
                    .then(function (res) {
                        if (typeof(res) === 'string') {
                            that.$message({message: 'Pogrešan email ili lozinka', type: 'error'})
                            return
                        }
                        setCredentials(res.token)
                        setUserInfo(res.id, res.tip)
                        window.location.href = '/' + res.tip
                    })
            }
        },
    }
</script>
<style scoped>
    #dugme-submit {
        background-color: #CC8F14;
        style: none;
        border: none;
        color: white;
        width: 100%;
        margin-top: 1em;


    }

    #logoImage {
        width: 10em;
        height: 5em;
        margin: 0 auto;
        display: flex;
        justify-self: center;
    }

    #login-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

    }

    .backgroundImage {
        position: fixed;
        top: 0;
        background-image: url("../assets/domUlaz1.jpg");
        background-size: cover;
        background-position: top right;
        width: 100%;
        height: 100%;
        z-index: -1;
        -webkit-filter: blur(6px);
        -moz-filter: blur(6px);
        -o-filter: blur(6px);
        -ms-filter: blur(6px);
        filter: blur(3px);
    }

    .inputField {
        margin-top: 1em
    }

    .form-input {
        width: 75%;
        height: 30vh;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        margin-top: 15vh;
        justify-content: center;


    }

    .form-input > * {
        width: 100%;
        font-family: 'Montserrat', sans-serif;
        height: 2.5em;
    }

    .login-kartica {
        width: 30rem;
        height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: rgba(75, 149, 113, 0.7);
    }

    @media screen and (max-width: 770px) {
        .login-kartica {
            width: 100%;
            height: 100%;
        }

        .form-input {
            width: 80%;
        }
    }
</style>