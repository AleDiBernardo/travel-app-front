<template>
  <div class="card border border-0 ">
    <div class="card-body d-flex flex-column gap-1 h-100">
      <div class="img-container rounded rounded-3">
        <!-- <img :src="`http://127.0.0.1:8000/storage/stages/p1.webp`"/> -->
        <AppCarousel :images="getStagesImages()"/>
      </div>
     
      <button
        type="button"
        class="border border-0 btn btn-primary title-container rounded rounded-3 d-flex justify-content-center align-items-center position-relative"
        @click="openModal()"
      >
        {{ this.results.titolo }}
        <i class="fa-solid fa-square-up-right position-absolute" id="linkIcon"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
import { DateTime } from "luxon";
import AppCarousel from "./AppCarousel.vue";


export default {
  props: {
    results: Object,
  },
  created(){
    console.log(this.results.stages);

    
  },
  data() {
    return {
      store,
      date: [],
    };
  },
  computed: {
    
  },
  components:{
    AppCarousel

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
      return this.results.stages.filter(stage => stage.immagine !== null)
        .map(stage => stage.immagine);
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

      #linkIcon{
        right: 5px;
        top: 5px;
      }
    }
  }
}
</style>
