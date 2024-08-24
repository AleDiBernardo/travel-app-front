<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script setup>
import { Map, MapStyle, config } from "@maptiler/sdk";
import { shallowRef, onMounted, onUnmounted, markRaw } from "vue";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const mapContainer = shallowRef(null);
const map = shallowRef(null);



onMounted(() => {
  config.apiKey = "HAdhhdWUNFeYBPsN7Itt";

  const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

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
</script>

<style scoped>
.maplibregl-ctrl-bottom-right {
  display: none !important;
}
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
