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
   
    <div class="overlay d-flex justify-content-center align-items-center" v-if="this.store.modalOpen" @click="this.store.modalOpen = false">

    
      <div class="modale d-flex flex-column py-4 px-5 rounded rounded-3 gap-4" @click.stop> 
        <div class="top d-flex gap-4">
          <div class="img rounded rounded-3"></div>
          <div class="info rounded rounded-3"></div>
        </div>
        <div class="bottom h-100 w-100 rounded rounded-3"></div>
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
      modalData: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  // debug
  // background-color: greenyellow;
  position: relative;

  overflow-y: scroll;
  .overlay{
    position: absolute;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }
  .modale {

    width: 80%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
    background: white;
    

    .top{
      .img{
        width: 60%;
        height: 400px;
        background: red;
      }
      .info{
        width: 40%;
        height: 400px;
        background: green;
      }
    }
    .bottom{
      background: lightblue;
    }
  }
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
