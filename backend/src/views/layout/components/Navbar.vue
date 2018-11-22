<template>
    <el-menu mode="horizontal" class="navbar">
        <hamburger class="hamburger-container"/>
    </el-menu>
</template>

<script>
    import Hamburger from '@/components/Hamburger'

    export default{
        name:'Navbar',
        components:{
            Hamburger
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar{
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
    }
</style>