<template>
    <div>
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg"/>
        <sidebar class="sidebar-container"/>
        <div class="main-container">
            <navbar/>
            <app-main/>
        </div>
    </div>

</template>

<script>
    import  Navbar from '@/views/layout/components/Navbar'
    import Sidebar from '@/views/layout/components/Sidebar'
    import AppMain from '@/views/layout/components/AppMain'

    export default{
        name:'Layout',
        components:{
            Navbar,
            Sidebar,
            AppMain
        },
        computed:{
            sidebar(){
                return this.$store.state.app.sidebar
            },
            device() {
                return this.$store.state.app.device
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        &.mobile.openSidebar{
            position: fixed;
            top: 0;
        }
    }
    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }
</style>