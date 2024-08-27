<template>
  <div
    class="searchBar rounded-3 d-flex justify-content-center align-items-center"
  >
    <i class="fa-solid fa-magnifying-glass fs-3 text-white mx-2"></i>
    <input
      v-model="this.store.userQuery"
      type="text"
      class="border border-0"
      placeholder="Cerca i tuoi viaggi"
    />
  </div>
</template>

<script>
import { store } from "../store";
import axios from "axios";

export default {
  data() {
    return {
      store,
    };
  },
  created(){
    this.getTrips();
  },
  methods:{
    getTrips(){
      axios.get('http://127.0.0.1:8000/api/trips')
      .then(resp => {
        // console.log(resp.data.results);
        this.store.tripsList = resp.data.results;
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@use "../scss/partials/variables" as *;
.searchBar {
  width: 100%;
  //   height: 50px;
  padding: 10px;
  background-color: $primary-color;
  i {
    cursor: pointer;
  }
  input {
    outline: none;
    color: $white;
    font-size: 20px;
    font-weight: bold;

    background-color: $primary-color;
  }
  input::placeholder {
    color: $white;
    font-weight: bold;
  }
}
</style>
