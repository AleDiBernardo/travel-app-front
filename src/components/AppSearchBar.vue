<template>
  <div
    class="searchBar rounded-3 d-flex justify-content-center align-items-center"
  >
    <i class="fa-solid fa-magnifying-glass fs-3 text-white mx-2"></i>
    <input
      type="text"
      class="border border-0"
      placeholder="Cerca i tuoi viaggi"
    />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.searchBar {
  width: 100%;
//   height: 50px;
padding: 10px;
  background-color: #ffb871;
  i {
    cursor: pointer;
  }
  input {
    color: white;
    font-size: 20px;
    font-weight: bold;

    background-color: #ffb871;
  }
  input::placeholder {
    color: white;
    font-weight: bold;
  }
  input:focus {
    border: 0px;
  }
}
</style>
