<template>
    <div>
    <vue-gauge
      :refid="'type-unique-id'"
      :options="{
        needleValue: 80.0,
        arcColors: ['rgb(48, 240, 2)', 'yellow', 'red'],
        arcDelimiters: [80, 90],
        hasNeedle: true,
        needleColor: 0,
        
      }"
    >
    </vue-gauge>
80
</div>
  </template>
  <style scoped>
    test {
        color:blue
    }
    :deep() path {
        d:88 !important
    }

    :deep() svg path:nth-last-child(4) {
        
    d: path('M 850 300 C 850 300 350 300 350 300 L 348.1 205.39 L 120 400.39 L 348.1 606.19 L 350 500 C 850 500 850 500 850 500 z') !important;
}

:deep() svg path:nth-last-child(5) {
    fill:white; 
    d:path('M51.49898804818025,-37.41620496624274L-2.5715604787795696,-3.539449350390395L-3.539449350390395,2.5715604787795696L2.5715604787795696,3.539449350390395L51.49898804818025,-37.41620496624274')       
            }

  </style>
  <script>
  import VueGauge from "vue-gauge";
  export default {
    components: { VueGauge },
  };
  </script>
  
  