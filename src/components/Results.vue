<template>
    
        <div class="container-fluid p-3">
            <div class="row row-cols-1 g-3">
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
        AppCard,
    }
}
</script>

<style lang="scss" scoped>
.container-fluid {
    // debug
    // background-color: greenyellow;
   
    overflow-y: scroll;
}
@media (min-width: 500px) {
  .col{
    width: 50%;
  }
}
@media (min-width: 769px) {
  .col{
    width: calc(100% / 3);
  }
}
@media (min-width: 1025px) {
  .col{
    width: calc(100% / 4);
  }
}
</style>