<template>
  <div class="app">
    <hello-world />
    <WidgetSpace />
  </div>
</template>

<script>
  import HelloWorld from '../components/HelloWorld'
import WidgetSpace from '@/components/global/WidgetSpace.vue';
  export default {
    name: 'Home',
    components: {
    HelloWorld,
    WidgetSpace
},
  }
</script>
