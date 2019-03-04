<template>
    <div class="prikaz-zaduzenja-container">
        <el-table
                @select="promenaSelekcije"
                :data="zaduzenjaZaPrikaz"
                stripe
                ref="tabelaZaduzenja"
                :summary-method="getSum"
                sum-text="Sumirano"
                show-summary
                style="width:95%; margin: 0 auto;"
                v-if="this.zaduzenja.length > 0"
        >
            <el-table-column v-if="this.rowsSelectable" type="selection">
            </el-table-column>
            <el-table-column
                    prop="tip"
                    label="Tip"
                    class="table-column">
            </el-table-column>
            <el-table-column
                    prop="mesec"
                    label="Mesec"
                    class="table-column">
            </el-table-column>
            <el-table-column
                    prop="cena"
                    label="Iznos"
                    class="table-column">
            </el-table-column>
        </el-table>
        <label v-else>Nema zaduženja sa zadatim filterima</label>
    </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {
                zaduzenjaZaPrikaz: this.zaduzenja,
            }
        },
        props: ['zaduzenja', 'rowsSelectable'],
        methods: {
            promenaSelekcije: function(){
                this.$emit('promenaSelektovanihZaduzenja', this.$refs.tabelaZaduzenja.selection)
            },
            getSum: function () {
                const sums = [];
                sums[0] = '';
                sums[1] = 'Sumirano:';
                sums[2] = this.zaduzenja.reduce((acc, curr) => {
                    if (!isNaN(curr.cena)) {
                        return acc + curr.cena;
                    } else {
                        return acc;
                    }
                }, 0);
                return sums;
            }
        },
        watch:{
            zaduzenja: function(pom){
                this.zaduzenjaZaPrikaz = pom
            }
        },
        beforeMount(){
            // this.zaduzenjaZaPrikaz = this.$set('zaduzenja')
        }
    }
</script>
<style scoped>
    .prikaz-zaduzenja-container{
        margin-top: 1em;
        overflow: auto;
        /*max-height: 65vh;*/
    }
</style>