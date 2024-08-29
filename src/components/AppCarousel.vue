<template>
    <div class="container w-100 h-100 bg-white position-relative p-0">
      <button
      :disabled="this.currentImage === 0"
      :class="{disabled: this.currentImage === 0}"
        v-if="this.images.length > 1"
        class="position-absolute text-white fs-2 top-50 start-0 d-flex  mx-1 justify-content-center align-items-center rounded rounded-3"
        @click="previousImage"
      >
        <i class="fa-solid fa-caret-left"></i>
      </button>
      <img
          v-if="this.images.length > 0"
        :src="`http://127.0.0.1:8000/storage/${this.images[this.currentImage]}`"
        class="img-fluid rounded rounded-3"
        alt=""
      />
      <img v-else src="../assets/placeholder.jpg" class="img-fluid rounded rounded-3"  alt="">
      <button
      :disabled="this.currentImage === images.length - 1"
        v-if="this.images.length > 1"
        class="position-absolute text-white fs-2 top-50 end-0 d-flex mx-1 justify-content-center align-items-center rounded rounded-3"
        :class="{disabled: this.currentImage === images.length - 1}"
        @click="nextImage"
      >
        <i class="fa-solid fa-caret-right"></i>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
          currentImage: 0
      };
    },
    props:{
      images: Object
    },
    created(){
      console.log(this.images);
    },
    methods: {
      previousImage() {
        if (this.currentImage > 0) {
          this.currentImage--;
        }
      },
      nextImage() {
        if (this.currentImage < this.images.length - 1) {
          this.currentImage++;
        }
      }
    }
  };
  </script>

<style lang="scss" scoped>
@use "../scss/partials/variables" as *;

button {
  background: $primary-color;
  border: none;
  width: 40px;
  height: 40px;
  aspect-ratio: 1;
}
.img-fluid {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.disabled{
    background: lightgray;
}

</style>
