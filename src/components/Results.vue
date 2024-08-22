
<template>
  <div class="container-fluid p-3">
    <div class="row row-cols-1 g-3" id="main-row">
      <div class="col" v-for="curTrip in filteredTrips" :key="curTrip.id">
        <AppCard :results="curTrip" />
      </div>
    </div>

    <div
      class="overlay d-flex justify-content-center align-items-center"
      v-if="this.store.modalOpen"
      @click="this.store.modalOpen = false"
    >
      <div
        class="modale d-flex flex-column py-4 px-5 rounded rounded-3 gap-4"
        @click.stop
      >
        <div class="top d-flex gap-4">
          <div class="img rounded rounded-3"></div>
          <div class="info rounded rounded-3 p-3 text-white d-flex flex-column">
            <h2 class="fw-bold">{{ this.store.modalInfo.titolo }}</h2>
            <h4>{{ this.store.modalInfo.destinazione }}</h4>
            <p class="fs-4">{{ this.store.modalInfo.descrizione }}</p>
          </div>
        </div>
        <div
          class="bottom  rounded rounded-3 d-flex p-3 text-white justify-content-between"
        >
          <div class="left d-flex flex-column fw-bold">
            <h2>Giorni</h2>

            <div class="container p-3" id="calendar">
              <div class="row row-cols-lg-5 row-cols-5 g-2">
                <div class="col" v-for="_, index in this.getDays()">
                  <div class="square rounded rounded-3 fs-3 fw-bold d-flex justify-content-center align-items-center">{{ index+1 }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="right d-flex flex-column fw-bold">
            <h2>Tappe</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppCard from "./AppCard.vue";

import { store } from "../store";
import { DateTime } from 'luxon';
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
  methods:{
    getDays(){
      const inizio = DateTime.fromISO(this.store.modalInfo.data_inizio);
      const fine = DateTime.fromISO(this.store.modalInfo.data_fine);
      const differenza = fine.diff(inizio, 'days');
      console.log(differenza.values.days);
      
      return differenza.values.days;
    }
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
@use "../scss/partials/variables" as *;
.container-fluid::-webkit-scrollbar{
  display: none;
}
.container-fluid {
  // debug
  // background-color: greenyellow;
  position: relative;

  overflow-y: scroll;
  .overlay {
    position: absolute;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }
  .modale {
    width: 80%;
    height: 95%;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    transform: translate(-50%, -50%);
    background: white;

    .top {
      .img {
        width: 55%;
        height: 350px;
        background: $primary-color;
      }
      .info {
        width: 45%;
        height: 350px;
        background: $primary-color;
      }
    }
    .bottom {
      background: $primary-color;
      overflow-y: hidden;
      height: 100%;
      .right {
        width: 50%;
        height: 100%;
        // background: red;
      }
      .left {
        width: 35%;
        height: 100%;
        // background: green;
        #calendar::-webkit-scrollbar-thumb {
          // display: none;
          // width: 5px;
          // height: 10px;
          background-color: white;
          border-radius: 5px;
        }
        #calendar::-webkit-scrollbar {
          // display: none;
          width: 5px;

          background-color: none;
          // border
        }
        #calendar{

          overflow-y: scroll;
          // overflow-x: hidden;

        }
        .square {
          // width: 50px;
          color: $primary-color;
          aspect-ratio: 1;
          cursor: pointer;
          // height: 50px;

          background: white;
        }
      }
    }
  }
}

@media (min-width: 500px) {
  #main-row {
    .col {
      width: 50%;
    }
  }
}
@media (min-width: 769px) {
  #main-row {
    .col {
      width: calc(100% / 3);
    }
  }
}
@media (min-width: 1025px) {
  #main-row {
    .col {
      width: calc(100% / 4);
    }
  }
}
</style>
