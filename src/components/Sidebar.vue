<template>
  <div class="sidebar py-3 px-2"  @click="this.store.modalOpen = false">
    <div class="search bg-white rounded-3 p-4">
      <AppSearchBar/>
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
  .sidebar {
    // debug
    // background-color: lightcoral;
    width: 25%;
    height: 100%;
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
