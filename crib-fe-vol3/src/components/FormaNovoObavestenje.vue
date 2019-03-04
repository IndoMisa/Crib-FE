<template>
    <div class="forma-novo-obavestenje-container">
        <div>
            <label>Naslov:</label>
            <el-input v-model="naslov"></el-input>
        </div>
        <label class="form-line">Tekst:</label>
        <el-input type="textarea" v-model="obavestenjeText" :rows="10"></el-input>
        <div class="form-line">
            <el-button @click="potvrdiUnos" type="success">Sačuvaj</el-button>
            <el-button @click="ponisti" type="danger">Poništi</el-button>
        </div>
    </div>
</template>
<script>
    import {Form, Input, Button} from 'element-ui'

    export default {
        components: {
            Form,
            Input,
            Button,
        },
        data() {
            return {
                obavestenjeText: '',
                naslov: '',
            }
        },
        methods: {
            potvrdiUnos: function () {
                if (this.naslov === '') {
                    this.$message('Morate uneti naslov obavestenja')
                    return
                }
                if (this.obavestenjeText === '') {
                    this.$message('Morate uneti tekst obavestenja')
                    return
                }
                var novo = {
                    tekst: this.obavestenjeText,
                    naslov: this.naslov,
                }
                this.obavestenjeText = ''
                this.naslov = ''
                this.$emit('zavrsenUnos', novo)
            },
            ponisti: function () {
                this.$emit('zavrsenUnos', 'cancel')
            }
        }
    }
</script>
<style>
    .forma-novo-obavestenje-container {
        width: 100%;
        height: 100%;
    }
    .form-line{
        display: block;
        margin-top: 1em;
    }
</style>