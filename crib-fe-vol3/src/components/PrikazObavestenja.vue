<template>
    <div class="prikaz-obavestenja-container-wrapper">
        <div ref="kontejnerObavestenja" class="prikaz-obavestenja-container">
            <div class="announcementContainer">
                <el-card :key="obavestenje.id_obavestenje" class="obavestenje-card"
                         v-for="obavestenje in obavestenja">
                    <div class="obavestenjeHeader">
                        <h1>{{obavestenje.naslov}}</h1>
                        <el-button v-if="referentAutor == obavestenje.id_referent"
                                   @click="deleteObavestenje(obavestenje.id_obavestenje)"
                                   type="danger" circle>
                            <el-icon class="el-icon-delete"></el-icon>
                        </el-button>
                    </div>
                    <div>
                        <p>{{obavestenje.tekst}}</p>
                    </div>
                    <label class="datum-footer">{{obavestenje.vreme}}</label>
                </el-card>
            </div>
            <div class="pagination-container">
                <el-pagination background class="obavestenja-pagination" @current-change="pageChange($event)"
                               layout="prev, pager, next"
                               :total="this.brojObavestenja"
                               :page-size="5"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import CustomHeaderBar from "./CustomHeaderBar"
    import {Card, Button, Icon, Pagination} from "element-ui"

    export default {
        components: {
            CustomHeaderBar,
            Card,
            Button,
            Icon,
            Pagination,
        },
        data() {
            return {
                referentAutor: this.idReferenta,
                ukupanBrojObavestenja: this.brojObavestenja,
                obavestenja: this.obavestenjaZaPrikaz
            }
        },
        methods: {
            pageChange: function (event) {
                this.$emit('pageChange', event)
            },
            deleteObavestenje: function (event) {
                this.$emit('brisanjeObavestenja', event)

            }
        },
        props: ["obavestenjaZaPrikaz", "brojObavestenja", "idReferenta", "trenutnaStrana"],
        watch: {
            obavestenjaZaPrikaz: function (pom) {
                this.obavestenja = pom
                this.$refs['kontejnerObavestenja'].scrollTo(0, 0)
            },
            brojObavestenja: function (pom) {
                this.ukupanBrojObavestenja = pom
            }
        }

    }
</script>
<style>
    .prikaz-obavestenja-container-wrapper{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .prikaz-obavestenja-container {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding-right: 17px;
        box-sizing: content-box;
        /*padding-top: 4em;*/
    }

    .autor {
        font-size: 20px;
        margin: 0 auto;
    }

    .datum-footer {
        font-size: 18px;
        font-style: italic;
        float: right;

    }

    .pagination-container {
        display: flex;
        justify-content: center;
        width: 100%;
        heigth: 2em;
        opacity: 0.8;

    }

    .announcementContainer {
        /*display: flex;*/
        /*flex-direction: row;*/
        /*flex-wrap: wrap;*/
        /*height: calc(100% - 2em);*/
        /*overflow-y: auto;*/
    }

    .obavestenje-card {
        width: 80%;
        /*height: 20em;*/
        margin: 0 auto;
        padding-bottom: 0.5em;
        border: none;
        margin-top: 1.5em;
        overflow: auto;
        /*background-color: rgba(255,255,255,0.95)*/
        background-color: #F4F4F5;
        opacity: 0.8;

    }

    .obavestenjeHeader {
        height: 20%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

</style>