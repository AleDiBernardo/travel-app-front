<template>
  <div class="card border border-0">
    <div class="card-body d-flex flex-column gap-1 h-100 position-relative">
      <button
        class="btn text-info-emphasis position-absolute top-0 end-0"
        @click="goToEditTrip(this.results.id)"
      >
        <i class="fa-solid fa-pen"></i>
      </button>
      <button
        id="delBtn"
        class="btn text-danger position-absolute end-0"
        @click="deleteTrip(this.results.id, this.index)"
      >
        <i class="fa-solid fa-trash"></i>
      </button>
      <div class="img-container rounded rounded-3">
        <!-- <img :src="`http://127.0.0.1:8000/storage/stages/p1.webp`"/> -->
        <AppCarousel :images="getStagesImages()" />
      </div>

      <button
        type="button"
        class="border border-0 btn btn-primary title-container rounded rounded-3 d-flex justify-content-center align-items-center position-relative"
        @click="openModal()"
      >
        {{ this.results.titolo }}
        <i
          class="fa-solid fa-square-up-right position-absolute"
          id="linkIcon"
        ></i>
      </button>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
import { DateTime } from "luxon";
import AppCarousel from "./AppCarousel.vue";
import axios from "axios";


export default {
  props: {
    results: Object,
    index: Number
  },
  created() {
    console.log(this.results.stages);
  },
  data() {
    return {
      store,
      date: [],
    };
  },
  computed: {},
  components: {
    AppCarousel,
  },
  methods: {
    openModal() {
      this.store.modalInfo = this.results;
      // console.log("Dati Viaggio: " + this.store.modalInfo.titolo);

      this.store.days = this.getDays();
      this.store.modalOpen = true;
      // console.log(this.store.days);

      // console.log(this.store.modalOpen);
    },
    getStagesImages() {
      return this.results.stages
        .filter((stage) => stage.immagine !== null)
        .map((stage) => stage.immagine);
    },
    goToEditTrip(id) {
      console.log(id);
      window.location.href = `http://127.0.0.1:8000/trips/${id}/edit`;
    },
    deleteTrip(id, index) {
     
     axios
       .delete(`http://127.0.0.1:8000/api/trips/${id}`)
       .then((response) => {
          if (response.status === 200) {
            this.store.tripsList.splice(index, 1);
           
          }
       })
       .catch((error) => {
         console.error(
           "Errore durante la chiamata API per cancellare la tappa:",
           error
         );
       });
   },
    getDays() {
      const inizio = DateTime.fromISO(this.store.modalInfo.data_inizio);
      const fine = DateTime.fromISO(this.store.modalInfo.data_fine);
      const differenza = fine.diff(inizio, "days");
      const giorni = differenza.values.days + 1; // Includiamo anche il giorno finale
      // console.log("Giorni : " + giorni);

      this.date = [];
      for (let i = 0; i < giorni; i++) {
        const data = inizio
          .plus({ days: i })
          .setLocale("it")
          .toFormat("dd LLL yyyy");

        // const dataFormattata = data.toLocaleString(DateTime.MED);
        this.date.push(data);
      }
      // console.log("Date: " + this.date);

      return this.date;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../scss/partials/variables" as *;
.card {
  .bg {
    background: red;
  }
  aspect-ratio: 1;
  .card-body {
    #delBtn {
      top: 30px;
    }
    button {
      z-index: 1;
    }
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

      #linkIcon {
        right: 5px;
        top: 5px;
      }
    }
  }
}
</style>
