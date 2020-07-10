<template>
  <div id="app">
    <div class="top-bar">
      <!-- Display Navbar -->
      <Navbar />
      <!-- Display router content -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {};
  }
};
</script>

<style>
* {
  font-size: 1rem;
}
body {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: "Raleway", sans-serif;
  background-color: #f4f6fb;
  box-sizing: border-box;
}
#app {
  position: relative;
  width: 100%;
  min-height: 100%;
  padding: 10px;
  color: #333;
  font-family: "Raleway", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f4f6fb;
}
</style>
