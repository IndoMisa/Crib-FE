<template>
    <div class="prikaz-liste-korisnika-ves-masine-container">
        <el-table v-if="listaCekanja.length > 0" v-loading="this.showLoading" :data="listaCekanja"
        >
            <el-table-column label="Ime"
                             prop="ime"
                             width="100"
            >
            </el-table-column>
            <el-table-column label="Prezime"
                             prop="prezime"
                             width="100"
            >
            </el-table-column>
            <el-table-column label="Soba"
                             prop="soba"
                             width="60">
            </el-table-column>
            <el-table-column
                    label="Telefon"
                    prop="telefon"
                    width="110">
            </el-table-column>
            <el-table-column
                    width="120">
                <template slot-scope="scope">
                    <el-button v-if="mode === 'cekanje'" @click.native.prevent="dodeliVesMasinu(scope.$index)"
                               type="text" size="small">Dodeli veš
                        mašinu
                    </el-button>
                    <el-button v-if="mode === 'koriscenje'" @click.native.prevent="zavrsiKoriscenje(scope.$index)"
                               type="text" size="small">Završeno korišćenje
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="" v-else>
            <h1 class="empty-message" v-if="mode === 'cekanje'">Nema korisnika na čekanju</h1>
            <h1 class="empty-message" v-if="mode === 'koriscenje'">Nema veš mašina na korišćenju</h1>
        </div>
    </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {
                listaCekanja: this.prosledjenaLista,
                showLoading: this.loading,
            }
        },
        methods: {
            dodeliVesMasinu: function (event) {
                this.$emit('dodeliVesMasinu', event)
            },
            zavrsiKoriscenje: function (rBr) {
                this.$emit('zavrsenoKoriscenje', rBr)
            }
        },
        props: ["prosledjenaLista", "mode", "loading"],
        watch:
            {
                prosledjenaLista: function (pom) {
                    this.listaCekanja = pom
                },
                loading: function (pom) {
                    this.showLoading = pom
                }
            }
        ,
        beforeMount() {
        }
    }
</script>
<style>
    .prikaz-liste-korisnika-ves-masine-container {
        width: 100%;
    }

    .empty-message {
        font-size: 20px;
        font-weight: normal;
    }
</style>