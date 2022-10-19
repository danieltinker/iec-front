<template>
    <div id="app">
      <h1>see Chart.vue</h1>
      <Chart/>
    </div>
  </template>
  
  <script>
import Chart from "./genericGraph/Chart.vue";
  
  export default {
    name: "genericGraph",
    components: {
      Chart
    }
  };
  </script>
  
  <style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  h1 {
    margin: 1rem 0;
  }
  </style>
  