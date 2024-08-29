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
      @click="closeModal()"
    >
      <div
        class="modale d-flex flex-column py-4 px-5 rounded rounded-3 gap-4"
        @click.stop
      >
        <div class="top d-flex gap-4">
          <div
            class="img rounded rounded-3 d-flex justify-content-center align-items-center"
          >
            <!-- {{ this.printSelectedStageImage() }} -->
            <img
              v-if="this.printSelectedStageImage()"
              :src="`http://127.0.0.1:8000/storage/${this.printSelectedStageImage()}`"
              class="w-100 h-100 rounded rounded-3 img-fluid"
            />
            <p v-else class="text-white fw-bold fs-4">
              Immagine non disponibile
            </p>
          </div>
          <div class="info rounded rounded-3 p-3 text-white d-flex flex-column">
            <h2 class="fw-bold">{{ this.store.modalInfo.titolo }}</h2>
            <h4>{{ this.store.modalInfo.destinazione }}</h4>
            <p class="fs-4">{{ this.store.modalInfo.descrizione }}</p>
          </div>
        </div>
        <div
          class="bottom rounded rounded-3 d-flex p-3 text-white justify-content-between"
        >
          <div class="left d-flex flex-column fw-bold">
            <h2>Giorni</h2>

            <div class="container p-3" id="calendar">
              <div class="row row-cols-1 g-2">
                <div
                  class="col"
                  v-for="(curData, index) in this.store.days"
                  :key="index"
                >
                  <div
                    @click="showStages(curData, index)"
                    class="square rounded rounded-3 fs-3 fw-bold d-flex justify-content-center align-items-center"
                    :class="{ clicked: this.selectedIndex === index }"
                  >
                    {{ curData }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right d-flex flex-column fw-bold">
            <div class="d-flex justify-content-between align-items-center">
              <h2>Tappe</h2>
              <router-link
                :to="`/create/${store.modalInfo.id}`"
                @click="getDate(this.selectedIndex)"
                class="btn fs-3 text-white fw-bold"
                ><i class="fa-solid fa-plus"></i></router-link
              >
            </div>
            <div class="container p-3" id="calendar">
              <div class="row row-cols-1 g-2">
                <div
                  @click="openStage(index, curData.id)"
                  class="col"
                  v-if="this.store.stages.length > 0"
                  v-for="(curData, index) in this.store.stages"
                  :key="index"
                >
                  <div
                    class="square rounded rounded-3 px-1 d-flex flex-column justify-content-center align-items-center"
                  >
                    <div
                      class="d-flex justify-content-center align-items-center w-100 position-relative"
                    >
                      <div class="fs-3 fw-bold">{{ curData.titolo }}</div>
                      <button
                        class="btn text-danger position-absolute end-0"
                        @click="deleteStage(curData.id, index)"
                        @click.stop
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                    <div
                      v-if="this.stageClicked && this.selectedStage === index"
                      class="d-flex flex-column justify-content-start align-items-start"
                    >
                      <div v-if="curData.descrizione">
                        <p class="fs-5">
                          {{ curData.descrizione }}
                        </p>
                      </div>
                      <div v-else>
                        <p>Descrizione non disponibile</p>
                      </div>
                    </div>
                    <AppMap
                      v-if="this.stageClicked && this.selectedStage === index"
                      class="rounded rounded-3 border-white"
                      :lng="Number(curData.longitudine)"
                      :lat="Number(curData.latitudine)"
                      @click.stop
                    />
                  </div>
                </div>
                <p v-else class="fs-3 text-center">Non ci sono tappe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppCard from "./AppCard.vue";
import AppMap from "./AppMap.vue";

import { store } from "../store";
import { DateTime } from "luxon";
import axios from "axios";

export default {
  components: {
    AppCard,
    AppMap,
  },

  methods: {
    showStages(data, index) {
      this.selectedIndex = index;
      this.stageClicked = false;
      this.store.stages = [];

      let formattedData = this.formatData(data);

      this.store.modalInfo.stages.forEach((stage) => {
        if (stage.data == formattedData) {
          this.store.stages.push(stage);
        }
      });
    },
    closeModal() {
      this.store.modalOpen = false;
      this.stageClicked = false;
      this.selectedIndex = 0;
      this.selectedStage = 0;
      this.selectedId = 0;
      this.store.stages = [];
    },
    openStage(index, id) {
      index !== this.selectedStage
        ? (this.stageClicked = true)
        : (this.stageClicked = !this.stageClicked);
      this.selectedId = id;
      this.selectedStage = index;
      console.log(this.selectedStage);
    },
    getDate(index) {
      console.log(this.store.days[index]);

      this.store.curDate = DateTime.fromFormat(
        this.store.days[index],
        "dd LLL yyyy",
        { locale: "it" }
      ).toISODate();
      console.log("Formattata: " + this.store.curDate);
    },
    printSelectedStageImage() {
      if (this.selectedId) {
        const selectedStage = this.store.stages.find(
          (stage) => stage.id === this.selectedId
        );

        if (selectedStage) {
          return selectedStage.immagine;
        } else {
          return null;
        }
      }
    },
    formatData(dataString) {
      const parti = dataString.split(" ");

      const mesi = [
        "gen",
        "feb",
        "mar",
        "apr",
        "mag",
        "giu",
        "lug",
        "ago",
        "set",
        "ott",
        "nov",
        "dic",
      ];
      const data = new Date(parti[2], mesi.indexOf(parti[1]), parti[0]);

      data.setDate(data.getDate() + 1);
      const dataFormattata = data.toISOString().slice(0, 10);

      return dataFormattata;
    },
    deleteStage(id, index) {
      // console.log("Store Stages: " + this.store.stages);
      this.selectedIndex = index;
      console.log("Selected Stage: " + this.selectedStage);
      axios.delete(`http://127.0.0.1:8000/api/stages/${id}`);
      this.store.stages.splice(this.selectedStage, 1);
    },
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
      selectedIndex: 0,
      stageClicked: false,
      selectedStage: 0,
      selectedId: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../scss/partials/variables" as *;
.container-fluid::-webkit-scrollbar {
  display: none;
}
.container-fluid {
  .img-fluid {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .clicked {
    background-color: rgb(231, 231, 231) !important;
  }
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
        #calendar::-webkit-scrollbar-thumb {
          background-color: white;
          border-radius: 5px;
        }
        #calendar::-webkit-scrollbar {
          width: 5px;

          background-color: none;
        }
        #calendar {
          overflow-y: scroll;
        }
        .square {
          color: $primary-color;
          cursor: pointer;

          background: white;
        }
      }
      .left {
        width: 35%;
        height: 100%;
        #calendar::-webkit-scrollbar-thumb {
          background-color: white;
          border-radius: 5px;
        }
        #calendar::-webkit-scrollbar {
          width: 5px;

          background-color: none;
        }
        #calendar {
          overflow-y: scroll;
        }
        .square {
          color: $primary-color;
          cursor: pointer;

          background: white;

          &:hover {
            background-color: rgb(231, 231, 231);
          }
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
