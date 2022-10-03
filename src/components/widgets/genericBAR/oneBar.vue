<template>
  <div style="margin-left:10px">
    <label v-if="data.displayUpper">{{
      upperLabel
          }}</label>
    <div
      :style="
        'background-color: #777; height: 169px; transform: rotate(180deg); margin-left: auto; margin-right: auto; width: ' +
        cWidth +
        ';'
      "
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
    <label v-if="data.displayLower">{{lowerLabel}}</label>
  </div>

</template>

<script>
export default {
// Component Parameters
props: {
  data: { type: Object, required: true },
  cWidth: { type: String, required: false, default: "34px" },
  backgroundColor: { type: String, required: false, default: "#FFFFFF" },
  params:{type:Object,required:false}
},
computed: {
  precentage: function () {
    return (this.data.value / (this.data.max_value / 100)).toFixed(1);
  },
  max_precentage: function () {
    return (this.data.max_value / (this.data.max_value / 100)).toFixed(1);
  },
  upperLabel(){
    return this.params.switch ? this.params.precentage ? this.precentage + "%" : this.data.value : this.params.precentage ? this.max_precentage + "%" : this.data.max_value
  },
  lowerLabel(){
    return this.params.switch ? this.params.precentage ? this.max_precentage + "%" : this.data.max_value : this.params.precentage ? this.precentage + "%" : this.data.value
  }
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
</style>
