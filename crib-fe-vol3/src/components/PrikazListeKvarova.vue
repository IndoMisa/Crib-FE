<template>
    <div class="prikaz-liste-kvarova">
        <el-table :data="this.listaKvarova"
        >
            <el-table-column type="expand"
            >
                <template slot-scope="props">
                    <p>{{props.row.opis}}</p>
                </template>
            </el-table-column>
            <el-table-column label="Soba"
                             prop="soba"
                             width="60"
            >
            </el-table-column>
            <el-table-column label="Tip"
                             prop="tip"
            width="100">
            </el-table-column>
            <el-table-column
                    prop="hitno"
                    label="Hitno">
                <template slot-scope="scope">
                    <label v-if='scope.row.hitno === true'>Da</label>
                    <label v-else>Ne</label>
                </template>
            </el-table-column>
            <el-table-column
                    width="120">
                <template slot-scope="scope">
                    <el-button v-if="mode === 'zaPopravku'" @click.native.prevent="najaviPopravku(scope.$index)" type="text" size="small">Najavi posetu</el-button>
                    <el-button v-else @click.native.prevent="zavrsiPopravku(scope.$index)" type="text" size="small">Završi popravku</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import {Table, TableColumn, Checkbox, Button} from 'element-ui'
    export default{
        components:{
            Table,
            TableColumn,
            Checkbox,
            Button
        },
        data(){
            return{
                listaKvarovaZaPrikaz: this.listaKvarova,
                mode: this.mod,
            }
        },
        methods:{
            najaviPopravku: function(event){
                this.$emit('najaviPopravku', event)
            },
            zavrsiPopravku: function(popravka){
                this.$emit('zavrsiPopravku', popravka)
            }
        },
        props:['listaKvarova', 'mod'],
        watch: {
            listaKvarova: function(pom){
                this.listaKvarovaZaPrikaz = pom
            }
        }
    }
</script>
<style>
    .prikaz-liste-kvarova{
        height: 100%;
        width: 100%;
        overflow: auto;
    }
</style>