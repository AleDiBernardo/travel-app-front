<template>
  <div class="sidebar py-3 px-2"  @click="this.store.modalOpen = false">
    <div class="search bg-white rounded-3 p-4 d-flex flex-column gap-5">
      <AppSearchBar/>
      <div class="buttons d-flex flex-column gap-3">
        <a href="http://127.0.0.1:8000/trips/create" class="text-center text-decoration-none w-100 my_btn fs-5 p-2 fw-bold text-white rounded-3">Crea un viaggio</a>
      </div>
    </div>
  </div>
</template>

<script>
import AppSearchBar from "./AppSearchBar.vue";
import { store } from "../store";



export default {
  components: {

    AppSearchBar,
  },
  data(){
    return {
      store
    }
  }
};
</script>

<style lang="scss" scoped>
@use "../scss/partials/variables" as *;

  .sidebar {
    // debug
    // background-color: lightcoral;
    width: 25%;
    height: 100%;

    .my_btn{
      background: none;
      border: none;
      background-color: $primary-color;
      
      &:hover{
        background-color: lightgray;
      }
    }
  }
@media (max-width: 768px) {
  .sidebar{
    width: 100%;
  }
}

@media (width: 768px){
  .sidebar{
    height: auto;
  }
}

@media (min-width: 769px) {
  .search {
      height: 100%;
    }
}
@media (min-width: 426px) {
  .sidebar{
    height: auto;
  }
}
</style>
