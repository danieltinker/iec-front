<!-- eslint-disable -->
<template>
    <div class="" dir="rtl" style="margin-top:15px">
        <div class="KPI2container">

        <v-card :hover="false" :ripple="false" style="padding:0;box-shadow: none;marin:0px;margin-bottom: 6px;margin-left:18px;margin-right:18px" min-width=200 class="main-crad" v-for="(item, index) in activeData" :key="index" :style="{
            backgroundColor: props_object.isDrillDown ? getCurrentTheme.kpi.drill_background : getCurrentTheme.kpi.main_background,
            border: props_object.activeIndex == index ? getCurrentTheme.legend_border_color : ' solid black 0px'
        }" @click="$emit('BoxClick',index);pulse()">
    <v-card-text style="padding:0px">
      <div class="text-block" :style="{ gridTemplateColumns: computedColumns(item) }">
        <span v-if="item.label" style="margin-right:4px" :align="props_object.params.style ? props_object.params.style.label_align : 'start'" :style="{ color: getCurrentTheme.kpi.main_label }">{{ numToLocaleString(item.label) }}</span>
        <strong v-if="object_condition_color(item.value)" class="dot" :style="'background-color:' + item.value['color']"></strong>
        <span v-else :align="props_object.params.style ? props_object.params.style.value_align : 'start'" :style="{ color: getCurrentTheme.kpi.value_color }">{{ numToLocaleString(item.value) }}</span>
        <span v-if="item.secondary_value" :align="props_object.params.style ? props_object.params.style.secondary_align : 'start'" :style="{ color: getCurrentTheme.kpi.main_label }">{{ numToLocaleString(item.secondary_value) }}</span>
      </div>
      
    </v-card-text>
  </v-card>

            <!-- <div class="grid-container" :style="{ 'grid-template-columns': getWidth(item) }" style="margin-right:5px">
                <div class="grid-item">
                    <span :align="props_object.params.style ? props_object.params.style.label_align : 'start'" style="display:block;word-wrap: break-word;font-family: almoni-bold"
                        :style="{ color: getCurrentTheme.kpi.main_label }">{{ numToLocaleString(item.label) }}
                    </span>
                </div>
                <div class="grid-item" style="margin-right:2px;padding-left:6px">
                    <strong v-if="object_condition_color(item.value)" class="dot" :style="'background-color:' + item.value['color']"></strong>
                    <span v-else :align="props_object.params.style ? props_object.params.style.value_align : 'start'"
                        style="display:block;word-wrap: break-word;font-family: almoni-medium"
                        :style="{ color: getCurrentTheme.kpi.value_color }"> {{ numToLocaleString(item.value) }}
                    </span>
                </div>
                <div class="grid-item" style="margin-right:4px;padding-left:8px">
                    <span :align="props_object.params.style ? props_object.params.style.secondary_align : 'start'" style="display:block;font-family: almoni-medium;word-wrap: break-word;"
                        :style="{ color: getCurrentTheme.kpi.main_label }">
                        {{ numToLocaleString(item.secondary_value) }} </span>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    props:["activeData","props_object"],
    created(){
      
    },
    watch:{
    },
    computed: {
    },
    methods:{
        computedColumns(item) {
            console.log("itemmmmmmmmmmmmmmmmmmmm",item);
            const numColumns = [item.label, item.value, item.secondary_value].filter(prop => !!prop).length;
            return `repeat(${numColumns}, 1fr)`;
    },pulse(){
      this.disabled=true
      setTimeout(() => {
        this.disabled=false
      }, 500);
    },
        getWidth(item) {
            let MyWidth = 0
            let obj_arr = Object.keys(item)
            if (obj_arr.includes("secondary_value")) {
                MyWidth++
            }
            if (obj_arr.includes("label")) {
                MyWidth++
            }
            if (obj_arr.includes("value")) {
                MyWidth++
            }
            let test = 100 / MyWidth + "%"
            return test + " " + test + " " + test
        },
        object_condition_color(item){
            return item ? typeof item == 'object' && Object.prototype.hasOwnProperty.call(item, 'color') : false
        },
    }

}
</script>

<style scoped>
.v-card--link:before {
  background: none;
}
/* .main-card {
    border-radius: 2px;
    font-size: 18px;
    font-family: almoni-demibold;
    margin-left:5px;
    margin-right:5px;
} */

.pulse{
          animation: pulse 0.1s;
    }
    @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
      transform: scale(0.95);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
.text-block {
  display: grid;
  /* grid-template-columns: auto; */
  gap: 10px;
  padding: 5px;
  font-size: 16px;
    font-family: almoni-medium;
}


.KPI2container {
  justify-content: center;
  align-items: center;
    padding-bottom: 20px;
    margin: 0 auto;
}



.kpi-label {
    padding-top: 0px;
    padding-bottom: 0px;
}

.kpi-value {
    width: 60px;
}

.kpi-value-sec {
    width: 60px
}
.kpi-box span {
    display: flex;
    font-size: 16px;
    font-family: almoni-demibold;
    color: #a8699d;
}

.kpi-box .kpi-sec-value {
    color: #606060
}


</style>