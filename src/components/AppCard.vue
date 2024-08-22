<template>
  <div class="card border border-0">
    <div class="card-body d-flex flex-column gap-1">
      <div class="img-container rounded rounded-3"></div>
      <!-- <div
        class="title-container rounded rounded-3 d-flex justify-content-center align-items-center"
      >
        {{ this.results.titolo }}
      </div> -->
      <button
      type="button"
      class="border border-0 btn btn-primary title-container rounded rounded-3 d-flex justify-content-center align-items-center"
      @click="openModal()"
    >
    {{ this.results.titolo }}
    </button>

    </div>
  </div>
</template>

<script>
import { store } from "../store";

export default {
  props: {
    results: Object,
  },
  data(){
    return{
      store
    }
  },
  methods:{
    openModal(){
        this.store.modalInfo = this.results
      this.store.modalOpen = !this.store.modalOpen

      console.log(this.store.modalOpen);
      
    }
  }
};
</script>

<style lang="scss" scoped>
@use "../scss/partials/variables" as *;
.card {
  aspect-ratio: 1;
  .card-body {
    .img-container {
      height: 80%;
      background: red;
    }
    .title-container {
      height: 20%;
      background: $primary-color;
      color: $white;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
