<template>
    <div class="dodavanje-zaposlenog-container">
        <el-dialog @close="$emit('zavrsenoDodavanje')" width="40%" visible>
            <forma-dodavanje-zaposlenog @editFinished="prihvatiUnosForme($event)" mod-forme="add"
                                        :dodavanje-zaposlenog="true"></forma-dodavanje-zaposlenog>
        </el-dialog>
    </div>
</template>
<script>
    import {Dialog} from 'element-ui'
    import FormaDodavanjeZaposlenog from "./FormDodavanjeZaposlenog"
    import {apiFetch, destinationUrl} from "../services/authFetch";

    export default {
        components: {
            FormaDodavanjeZaposlenog,
            Dialog,
        },
        data() {
            return {}
        },
        methods: {
            prihvatiUnosForme(event) {
                if (event != 'cancel') {
                    var that = this
                    apiFetch('POST', destinationUrl + "/crib/register", {responseType: 'text'}, event).then(function (res) {
                        if (res.charAt(0) == "2") {
                            that.$message({message: "Uspešna registracija zaposlenog.", type: "success"})

                            return
                        }
                        that.$message({message: "Greška pri registraciji zaposlenog.", type: "error"})
                    })
                }
                this.$emit("zavrsenoDodavanje")
            }
        }
    }
</script>
<style>
    .dodavanje-zaposlenog-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
    .dialog-dodavanje-zaposlenog >{
        width: 60%;
    }
</style>