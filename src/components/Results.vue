<template>
  <div class="container-fluid p-3">
    <div class="row row-cols-1 g-3">
      <div class="col" v-for="curTrip in filteredTrips" :key="curTrip.id">
        <AppCard :results="curTrip" />

      </div>
    </div>
    <!-- {{ this.store.modalInfo.titolo }} -->
    <!-- Button trigger modal -->
    
    <!-- Modal -->
    <div
      v-if="this.store.modalOpen"
      class=""
      
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">{{ this.store.modalInfo.titolo }}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="this.store.modalOpen = false"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppCard from "./AppCard.vue";

import { store } from "../store";

export default {
  components: {
    AppCard,
  },
  mounted() {
    console.log("ciao");
    
    // this.$root.$on('open-modal', (data) => {
    //   this.modalData = data
    //   console.log(this.modalData);
      
    // })
  },
  computed: {
    filteredTrips() {
      const query = this.store.userQuery.toLowerCase();
      if (!query) {
        return this.store.tripsList;
      }

      return this.store.tripsList.filter((trip) => {
        return trip.titolo.toLowerCase().includes(query);
      });
    },
  },
  data() {
    return {
      store,
      modalData: null
    };
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  // debug
  // background-color: greenyellow;

  overflow-y: scroll;
}
@media (min-width: 500px) {
  .col {
    width: 50%;
  }
}
@media (min-width: 769px) {
  .col {
    width: calc(100% / 3);
  }
}
@media (min-width: 1025px) {
  .col {
    width: calc(100% / 4);
  }
}
</style>
