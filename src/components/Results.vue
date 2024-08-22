<template>
  <div class="container-fluid p-3">
    <div class="row row-cols-1 g-3">
      <div class="col" v-for="curTrip in filteredTrips" :key="curTrip.id">
        <AppCard :results="curTrip" />
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
