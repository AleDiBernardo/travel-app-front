<template>
  <main class="p-3 d-flex">
    <Sidebar/>
    <Results/>
  </main>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import Results from "./Results.vue";


export default {
  components: {
    Sidebar,
    Results
  },
};
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100vh;
  background-color: #ffb871;
}
</style>
