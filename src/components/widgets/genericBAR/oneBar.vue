<template>
  <div style="margin-left:10px">
    <label v-if="params.displayUpper" :style="'color : '+getCurrentTheme.one_bar.label_color" style="font-family: almoni;font-size:16px">
        {{numToLocaleString(upperLabel)}}
    </label>
    <div
      :style="
        'background-color: '+ getCurrentTheme.one_bar.background_bar + '; height: 169px; transform: rotate(180deg); margin-left: auto; margin-right: auto; width: ' +
        cWidth +
        ';'
      "
    >
      <div
        :style="{
          backgroundColor: data.color,
          opacity: isSelected ? isSelectedIndex? 1: 0.15 : 1,
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
    <label v-if="params.displayLower" :style="'color : '+getCurrentTheme.one_bar.label_color" style="font-family: almoni;font-size:16px">{{numToLocaleString(lowerLabel)}}</label>
  </div>

</template>

<script>

export default {
// Component Parameters
props: {
  data: { type: Object, required: true },
  cWidth: { type: String, required: false, default: "34px" },
  backgroundColor: { type: String, required: false, default: "#FFFFFF" },
  params:{type:Object,required:false},
  isSelectedIndex:{type:Boolean,required:false},
  isSelected:{type:Boolean,required:false},
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
label {
  font-family: almoni;
  font-size: 16px;
}

</style>
