<template>
    <div class="majstor-container">
        <custom-header-bar @changeView="setComponent($event)">
            <evidencija-kvarova></evidencija-kvarova>
        </custom-header-bar>
    </div>
</template>
<script>
    import CustomHeaderBar from "../components/CustomHeaderBar";
    import EvidencijaKvarova from "../components/EvidencijaKvarova";
    import {getPageToShow, setPageShown} from "../services/contextManagement";

    export default{
        components: {EvidencijaKvarova, CustomHeaderBar},
        data(){
            return{
                menuItems: [
                    {
                        key: 1,
                        label: 'Lista kvarova',
                        index: 'listakvarova',
                    },
                ],
                showComp: '',
            }
        },
        methods: {
            setComponent: function(component){
                this.showComp = component;
                setPageShown(this.showComp);
            },
        },
        beforeMount(){
            var index = getPageToShow().pageShown;
            if(index != null)
                this.showComp = index
        },
    }
</script>
<style>
    .majstor-container{
        height: 100%;
        font-family: 'Montserrat', sans-serif;
    }
</style>