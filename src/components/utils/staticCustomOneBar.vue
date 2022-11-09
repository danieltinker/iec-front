<template>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <div
          v-bind="attrs"
          v-on="on"
          :style="'background-color: '+ backgroundColor +'; height: 180px; transform: rotate(180deg); margin-left: auto; margin-right: auto; width: '+ cWidth +';'"
        >
          <div
            :style="{
              backgroundColor: data.color,
              width: cWidth,
              height: toINT(precentage) + '%',
              marginTop: 'auto',
              cursor: 'default',
              maxHeight: '100%',
              transitionProperty: 'height',
              transitionDuration: '0.4s',
            }"
          >
            &emsp;
          </div>
        </div>
      </template>
      <span class="toolStyle">{{ data.value }} / {{ data.max_value }}</span>
    </v-tooltip>
  </template>
  
  <script>
  export default {
    // Component Parameters
    props: {
      data: { type: Object, required: true },
      cWidth: { type: String, required: false, default: "35px" },
      backgroundColor: { type: String, required: false, default: "#FFFFFF" },
    },
    computed: {
      precentage: function () {
        return (this.data.value / (this.data.max_value / 100)).toFixed(2);
      },
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .name {
    text-align: right;
    color: #777;
    font-family: almoni;
    font-weight: 600;
    font-size: 1.1rem;
  }
  
  styleBar {
    background-color: lightgrey;
    height: 10px;
    transition-property: width;
    transition-duration: 0.4s;
  }
  
  .toolStyle {
    font-size: 15px;
  }
  </style>
  