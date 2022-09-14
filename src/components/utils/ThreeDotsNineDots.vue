<template>
    <div>
      <v-tooltip v-if="true">
        <template v-slot:activator="{ attrs }">
          <img
            style=""
            v-show="!isExpand"
            src="../../assets/Closed3DotslightTheme.svg"
            height="38"
            v-bind="attrs"
            @click="onExpandTooltipClick"
          />
          <img
            style=""
            v-show="isExpand"
            src="../../assets/Open3DotslightTheme.svg"
            height="38"
            v-bind="attrs"
            @click="onExpandTooltipClick"
          />
        </template>
      </v-tooltip>
      
      <v-tooltip v-if="false">
        <template v-slot:activator="{ attrs }">
          <img
            style=""
            v-show="!isExpand"
            src="../../assets/Closed3DotsdarkTheme.svg"
            height="38"
            v-bind="attrs"
            @click="onExpandTooltipClick"
          />
          <img
            style=""
            v-show="isExpand"
            src="../../assets/Open3DotsdarkTheme.svg"
            height="38"
            v-bind="attrs"
            @click="onExpandTooltipClick"
          />
        </template>
      </v-tooltip>
    </div>
  </template>
  
  <script>
  export default {
    props: ["isExpand"],
    methods: {
      onExpandTooltipClick() {
        this.$emit("switch-expand");
      },
    },
   
  };
  </script>