<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script>
import { Map, MapStyle, config } from "@maptiler/sdk";
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
  created() {
 
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

.map-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}


</style>
