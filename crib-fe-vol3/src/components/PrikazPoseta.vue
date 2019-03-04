<template>
    <div class="prikaz-poseta-container">
        <el-table @select="emitSelectChange" ref="tabelaPoseta" :data="listaPoseta">
            <el-table-column type="selection"></el-table-column>
            <el-table-column
                    label="Soba"
                    prop="soba"
            ></el-table-column>
            <el-table-column
                    label="Broj posetilaca"
                    prop="brPosetilaca"
            ></el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default{
        components: {

        },
        data(){
            return{
                listaPoseta: this.prosledjenaListaPoseta
            }
        },
        methods:{
            emitSelectChange: function(){
                this.$emit('selectedPosete', this.$refs.tabelaPoseta.selection)
            }
        },
        props: ["prosledjenaListaPoseta"],
        watch:{
            prosledjenaListaPoseta: function(pom){
                this.listaPoseta = pom
            }
        },
    }
</script>
<style>
    .prikaz-poseta-container{
        width: 100%;
        height: 100%;
    }
</style>