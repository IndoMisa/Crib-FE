<template>
    <div class="filteri-stanara-container">
        <div class="filter-container">
            <label>Ime i prezime</label>
            <el-input class="filter-input" @change="filterList" v-model=imeIPrezimeFilter></el-input>
        </div>
        <div class="filter-container">
            <label>Soba</label>
            <el-input class="filter-input" @change="filterList" v-model=sobaFilter></el-input>
        </div>
    </div>
</template>
<script>
    import {Input} from 'element-ui'

    export default {
        components: {
            Input
        },
        data() {
            return {
                imeIPrezimeFilter: '',
                sobaFilter: '',
            }
        },
        methods: {
            filterList: function () {
                this.$emit('filterChange', this.imeIPrezimeFilter, this.sobaFilter)
            }
        },
    }
</script>
<style>
    .filteri-stanara-container label{
        opacity: 0.6;
        margin-left: 1em;
    }
    .filter-input {
        width: 50%;
        padding-top: 0.5em;
    }

    .filter-container {
        height: 3em;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
    }
    .filter-container label{
        margin-right: 0.5em;
    }
</style>