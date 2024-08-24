<template>
    <div class="w-100 h-100">
      <GoogleMap
        :api-key="this.apiKey"
        :center="this.center"
        :zoom="this.zoom"
      >
        <!-- <Marker :position="marker.position" /> -->
      </GoogleMap>
    </div>
  </template>
  
  <script>
  import { GoogleMap, Marker } from 'vue3-google-map';
  
  export default {
    components: {
      GoogleMap,
    //   Marker
    },
    props:{
        lat: Number,
        lon: Number
    },
    data() {
      return {
        apiKey: 'AIzaSyAxgbDOoGZRKFoE7SFmEyf1RhrMnPxuLzY',
        center: { lat: this.lat, lng: this.lon },
        zoom: 12,
        // marker: { position: { lat: this.lat, lng: this.lon } }
      }
    }
  }
  </script>