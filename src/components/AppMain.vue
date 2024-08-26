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
    Results,
  },
};
</script>

<style lang="scss" scoped>
@use "../scss/partials/variables" as *;
@media (max-width: 768px) {
  main{
    flex-direction: column;
  }
}
main {
  width: 100%;
  height: 100vh;
  background-color: $primary-color;
}
</style>
