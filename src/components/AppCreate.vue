<template>
  <div class="ms_bg p-5">
    
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <form @submit.prevent action="" class="bg-white py-3 px-5 rounded">
      <h1 class="text-center">Aggiungi Nuova Tappa</h1>

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
          v-model="formData.titolo"
        />
      </div>

      <!-- Text Input for Location -->
      <div class="mb-3">
        <label for="location" class="form-label">Luogo</label>
        <input
          type="text"
          id="location"
          class="form-control"
          placeholder="Inserisci il luogo"
          v-model="formData.luogo"
        />
      </div>

      <!-- Textarea for Description -->
      <div class="mb-3">
        <label for="description" class="form-label">Descrizione</label>
        <textarea
          id="description"
          class="form-control"
          rows="2"
          placeholder="Inserisci una descrizione"
          v-model="formData.descrizione"
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
      formData: {
        data: "",
        titolo: "",
        luogo: "",
        descrizione: "",
      },
      selectedFile: null,
      viaggioId: null,
      errorMessage: null,
    };
  },
  created() {
    this.viaggioId = this.$route.params.id;
    this.formData.data = this.store.curDate;
  },
  methods: {
    handleFileUpload(event) {
      // console.log(event);

      // Cattura il file selezionato
      this.selectedFile = event.target.files[0];
      // console.log(this.selectedFile);
    },
    submitForm() {
      let data = new FormData();
      data.append("viaggio_id", this.viaggioId);
      data.append("immagine", this.selectedFile);
      data.append("data", this.formData.data);
      console.log("Form: " + this.formData.data);
      
      data.append("titolo", this.formData.titolo);
      data.append("luogo", this.formData.luogo);
      data.append("descrizione", this.formData.descrizione);
      console.log("Data: " + data);

      // try {
      axios
        .post("http://127.0.0.1:8000/api/stages", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Tappa salvata con successo:", response);
          this.store.stages.push(response.data);
          this.$router.push('/');
        })
        .catch((error) => {
          this.errorMessage = "Errore nella creazione della tappa.";          
          // if (error.response && error.response.status === 422) {
          //   console.error("Errore di validazione:", error.response.data.errors);
          //   // Mostra gli errori di validazione nel frontend
          // } else {
          //   console.error("Errore nella richiesta:", error.message);
          // }
        });
      // console.log('Tappa salvata con successo:', response);
      // } catch (error) {
      //   console.error('Errore nel salvataggio della tappa:', error);
      // }
    },
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
