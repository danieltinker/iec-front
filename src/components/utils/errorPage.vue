<template>
    <div>
        <h1 class="main-context">{{ error_text }}</h1>
        
    </div>
</template>


<script>
export default {
  props: {
    error_text: { type: String, required: false },
  },
}

</script>


<style scoped>
.main-context{
    margin-top: 40px;
    text-align: center;
    font-family: almoni;
}
</style>