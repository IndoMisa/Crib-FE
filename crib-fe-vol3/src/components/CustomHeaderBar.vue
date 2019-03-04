<template>
    <div class="menuContainer">
        <el-menu class="headerBar" text-color="white" mode="horizontal" :router=false>
            <img @click="showHomePage" id="logoHeader" src="../assets/CribLogoWhiteTest.png"/>

            <div class="top-menu-button-container">
                <el-button v-if="this.list != undefined" style="width: 2em;" class="top-menu-button" @click="toggleSideMenu">
                    <el-icon class="el-icon-menu"></el-icon>
                </el-button>
                <el-button class="top-menu-button" @click="logout">Odjavi se</el-button>
            </div>
        </el-menu>
        <div class="body-container">
            <div v-if="this.menuShown && itemList != undefined" class="side-menu">
                <el-menu style="height: 100%; border: none;"
                         @select="emitMenuSelect($event)"
                         background-color="#4B9571" text-color="white" mode="vertical" :router=false>
                        <el-menu-item v-for="item in itemList" :key="item.key" class="side-menu-item"
                                      :index="item.index">
                            <img v-if="item.slika != undefined" style="height: 40%; margin-right: 0.5em;"
                                 :src="getImgUrl(item.slika)"/>{{item.label}}<el-badge v-if="item.index == 'vesmasina'" style="position: relative; top: -10px;" :value="brojac"></el-badge>
                        </el-menu-item>
                </el-menu>
            </div>
            <slot @countChanged="checkCount"></slot>
        </div>
    </div>
</template>
<script>
    import {Menu, MenuItem, Icon, Button} from 'element-ui'
    import {clearUserInfo, clearFormMode, clearPageShown} from "../services/contextManagement";
    import {deleteCredentials} from "../services/authFetch";

    export default {
        components: {
            Menu,
            MenuItem,
            Icon,
            Button,
        },
        data() {
            return {
                itemList: this.list,
                menuShown: true,
                slika: "../assets/megaphone.jpg",
                brojac: this.counter,
            }
        },
        methods: {
            checkCount: function(){
                console.log('cao')
            },
            getImgUrl(slika) {
                return require("../assets/" + slika)
            },
            emitMenuSelect: function (event) {
                this.$emit('changeView', event)
            },
            toggleSideMenu: function () {
                this.menuShown = !this.menuShown;
                // console.log(this.menuShown);
            },
            logout: function () {
                deleteCredentials()
                clearUserInfo()
                clearFormMode()
                clearPageShown()
                window.location.href = '/login'
            },
            showHomePage: function () {
                clearFormMode()
                this.$emit('changeView', '')
            }
        },
        props: ['list', 'counter'],
        watch: {
            counter: function(pom){
                this.brojac = pom
            }
        },
    }
</script>
<style scoped>
    .el-icon-menu {
        opacity: 0.7;
    }

    .is-active {
        color: #E1B866;
    }

    #logoHeader {
        width: 5em;
        height: 2.5em;
        margin-top: 0.5em;
        margin-left: 0.5em;
        margin-bottom: 0.25em;
    }

    .menuContainer {
        height: 100%;
        font-family: 'Montserrat', sans-serif;
    }

    .headerBar {

    }

    .body-container {
        display: flex;
        /*align-self: flex-start;*/
        flex-direction: row;
        height: calc(100% - 3.5em);
        position: relative;
    }

    .top-menu-button-container {
        position: absolute;
        top: 0;
        right: 0em;
        padding-right: 0.5em;
        padding-top: 0.5em;
        display: flex;
        justify-content: space-between;
    }

    .top-menu-button {
        height: 3em;
        display: flex;
        justify-content: center;

    }

    .side-menu {
        height: 100%;
        width: 14em;
    }

    .headerBar {
        height: 3.5em;
        border: none;
        position: relative;
        background-color: #3C775A;
    }


    .side-menu-item {
        width: 220px;
        display: flex;
        align-items: center;
    }


</style>