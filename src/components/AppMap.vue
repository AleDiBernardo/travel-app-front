<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<!-- <script setup>
import { Map, MapStyle, config } from "@maptiler/sdk";
import { shallowRef, onMounted, onUnmounted, markRaw } from "vue";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const mapContainer = shallowRef(null);
const map = shallowRef(null);

const props = defineProps({
    lat:Number,
    lon: Number
})

onMounted(() => {
  config.apiKey = "HAdhhdWUNFeYBPsN7Itt";

  const initialState = { lng: this.lon, lat: this.lat, zoom: 14 };

  map.value = markRaw(
    new Map({
      container: mapContainer.value,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    })
  );
}),
  onUnmounted(() => {
    map.value?.remove();
  });
</script> -->

  
  <script>
  import { Map, MapStyle, config } from '@maptiler/sdk';
  export default {
    props: {
      lat: {
        type: Number,
        required: true,
      },
      lon: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        map: null,
      };
    },
    mounted() {
      config.apiKey = "HAdhhdWUNFeYBPsN7Itt";
  
      const initialState = { lng: this.lon, lat: this.lat, zoom: 14 };
  
      this.map = new Map({
        container: this.$refs.mapContainer,
        style: MapStyle.STREETS,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom,
      });
    },
    beforeDestroy() {
      this.map?.remove();
    },
  };
  </script>
  

<style scoped>
/* .maplibregl-ctrl-bottom-right {
  display: none !important;
} */
.map-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1; /* calculate height of the screen minus the heading */
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
