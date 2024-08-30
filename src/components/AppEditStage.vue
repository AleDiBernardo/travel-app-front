<template>
  <div class="ms_bg p-5">

    <form @submit.prevent action="" class="bg-white py-3 px-5 rounded">
      <h1 class="text-center">Modifica La Tappa</h1>

      <!-- File Input for Image -->
      <div class="mb-3">
        <label for="image" class="form-label">Carica Immagine</label>
        <input
          type="file"
          id="image"
          class="form-control"
          @change="handleFileUpload"
        />
      </div>

      <!-- Text Input for Title -->
      <div class="mb-3">
        <label for="title" class="form-label">Titolo</label>
        <input
          type="text"
          id="title"
          class="form-control"
          placeholder="Inserisci il titolo"
          v-model="stageData.titolo"
        />
      </div>

      <!-- Text Input for Location -->
      <!-- <div class="mb-3">
        <label for="location" class="form-label">Luogo</label>
        <input
          type="text"
          id="location"
          class="form-control"
          placeholder="Inserisci il luogo"
          v-model="stageData.luogo"
        />
      </div> -->

      <!-- Textarea for Description -->
      <div class="mb-3">
        <label for="description" class="form-label">Descrizione</label>
        <textarea
          id="description"
          class="form-control"
          rows="2"
          placeholder="Inserisci una descrizione"
          v-model="stageData.descrizione"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn" @click="submitForm">Salva Tappa</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store";

export default {
  data() {
    return {
      store,
      stageData: null,
    };
  },
  created() {
    this.stageData = store.stages.find(
      (stage) => stage.id === Number(this.$route.params.id)
    );
    console.log(this.stageData);
  },
  methods: {
    handleFileUpload(event) {
      // console.log(event);

      // Cattura il file selezionato
      this.selectedFile = event.target.files[0];
      // console.log(this.selectedFile);
    },
    submitForm() {
        axios
        .put(`http://127.0.0.1:8000/api/stages/${this.$route.params.id}`, this.stageData)
    }
  },
};
</script>

<style lang="scss" scoped>
@use "../scss/partials/variables" as *;

.ms_bg {
  background-color: $primary-color;
  height: 100vh;
  overflow: hidden;

  form {
    .form-label {
      font-weight: bold;
      margin-bottom: 5px;
      display: block;
    }

    .form-control {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    input[type="file"]::file-selector-button {
      margin-right: 20px;
      margin-left: 1px;
      border: none;
      background: $primary-color;
      padding: 10px 20px;
      border-radius: 10px;
      color: #fff;
      cursor: pointer;
      transition: background 0.2s ease-in-out;
    }

    // input[type="file"]::file-selector-button:hover {
    //   background-color: #ff9c39;
    // }

    button {
      background-color: $primary-color;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.2s ease-in-out;

      &:hover {
        background-color: #ff9c39;
      }
    }
  }
}
</style>
