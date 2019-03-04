<template>
    <div class="prikaz-stanara">
        <el-table
                @select="changeSelected"
                v-if="this.listaStanara.length > 0"
                :data="this.listaStanara"
                ref="tabelaStanara">
            <el-table-column
                    type="selection">
            </el-table-column>
            <el-table-column
                    prop="id_korisnik"
                    label="ID"
                    class="table-column"
                    width="40"
            >
            </el-table-column>
            <el-table-column
                    prop="ime"
                    label="Ime"
                    class="table-column">
            </el-table-column>
            <el-table-column
                    prop="prezime"
                    label="Prezime"
                    class="table-column">
            </el-table-column>
            <el-table-column
                    prop="soba"
                    label="Soba"
                    class="table-column"
                    width="60"
            >
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="Email"
                    style="width: 20%"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="jmbg"
                    label="JMBG"
                    style="width: 20%"
                    show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <label v-else>Nema stanara sa navedenim filterima!</label>
    </div>
</template>
<script>
    import {Table, TableColumn} from 'element-ui'
    export default{
        components: {
            TableColumn,
            Table,
        },
        data(){
            return{
                listaStanara: this.listaStanaraZaPrikaz
            }
        },
        methods: {
            changeSelected: function () {
                this.$emit("selektovaniStanari", this.$refs.tabelaStanara.selection)
            }
        },
        watch: {
            listaStanaraZaPrikaz: function(pom){
                this.listaStanara = pom
            }
        },
        props: ['listaStanaraZaPrikaz'],
    }
</script>
<style>
    .prikaz-stanara{
        display: flex;
    }
</style>