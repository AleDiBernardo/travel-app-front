<template>
    
        <div class="container-fluid p-3">
            <div class="row row-cols-lg-4 row-cols-md-3 row-cols-2 g-3">
                <div class="col">
                    <AppCard/>
                </div>
                <div class="col">
                    <AppCard/>
                </div>
                <div class="col">
                    <AppCard/>
                </div>
                <div class="col">
                    <AppCard/>
                </div>
                <div class="col">
                    <AppCard/>
                </div>
                <div class="col">
                    <AppCard/>
                </div>
                <div class="col">
                    <AppCard/>
                </div>
                <div class="col">
                    <AppCard/>
                </div>
                <div class="col">
                    <AppCard/>
                </div>
                <div class="col">
                    <AppCard/>
                </div>
                <div class="col">
                    <AppCard/>
                </div>
                <div class="col">
                    <AppCard/>
                </div>
                <div class="col">
                    <AppCard/>
                </div>
                <div class="col">
                    <AppCard/>
                </div>
                <div class="col">
                    <AppCard/>
                </div>
                <div class="col">
                    <AppCard/>
                </div>
            </div>
        </div>

  
</template>

<script>
import AppCard from "./AppCard.vue";

export default {
    components:{
        AppCard
    }
}
</script>

<style lang="scss" scoped>
.container-fluid {
    // debug
    // background-color: greenyellow;
   
    overflow-y: scroll;
}
</style>