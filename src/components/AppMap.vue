<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script setup>
import { Map, MapStyle, Marker, config } from "@maptiler/sdk";
import { shallowRef, onMounted, onUnmounted, markRaw } from "vue";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const mapContainer = shallowRef(null);
const map = shallowRef(null);

const props = defineProps({
  lat: Number,
  lng: Number,
});

onMounted(() => {
  console.log(props.lat);

  config.apiKey = "HAdhhdWUNFeYBPsN7Itt";

  const initialState = { lng: props.lng, lat: props.lat, zoom: 14 };

  map.value = markRaw(
    new Map({
      container: mapContainer.value,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    })
  );

  new Marker({ color: "#ffb871" })
    .setLngLat([props.lng, props.lat])
    .addTo(map.value);
}),
  onUnmounted(() => {
    map.value?.remove();
  });
</script>

<style scoped>

.map-wrap {
  position: relative;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  
}

.map {
  position: absolute;
  width: 85%;
  aspect-ratio: 1
}
</style>
