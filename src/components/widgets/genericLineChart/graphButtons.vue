<template>
    <div class="btn-container8">
        <!-- <v-row dir="rtl" style="place-content:right;display: inline-flex;"></v-row> -->
        <v-row dir="rtl" style="place-content:right;display: inline-flex;">
            <v-btn class="main-btn" :ripple="false" v-for="(btnName, index) in arr_buttons" :key="index"
                :style="{ backgroundColor: props_object.isDrillDown ? getCurrentTheme.baseGenericPie.btn_color_drill : getCurrentTheme.baseGenericPie.btn_color, opacity: isClick.includes(index) ? 0.4 : '' }"
                @click="clickLegend(btnName.label, index)">
                <v-icon :color="btnName.color" style="font-size: 28px;    margin: 0px !important;width: 12px;margin-left:2px">mdi-circle-medium</v-icon>

                
                <span class="btn-span-graph" :style="'color:' + getCurrentTheme.baseGenericPie.span_color">
                    {{ btnName.label }}
                </span>
            </v-btn>
        </v-row>
    </div>
</template>

<script>
export default {
    props: ['arr_buttons', 'props_object'],
    data() {
        return {
            activeIndex: undefined,

            isClick: []
        }
    },
    methods: {
        clickLegend(x, y) {
            console.log("arr_buttons",this.arr_buttons.length,"isClick",this.isClick.length);
            console.log("arr_buttofdfdns",this.arr_buttons.length - this.isClick.length);
            const index = this.isClick.indexOf(y);
            if (this.isClick.includes(y)) {
                if (index > -1) { // only splice array when item is found
                    this.isClick.splice(index, 1); // 2nd parameter means remove one item only
                    this.$emit('buttonClick', x)
                }

            } else {
                if (this.arr_buttons.length - this.isClick.length != 1) {
                this.isClick.push(y)
                this.$emit('buttonClick', x)
                }
            }

            // const index = this.isClick.indexOf(y);
            // if (this.isClick.includes(y)) {
            //     if (index > -1) { // only splice array when item is found
            //         this.isClick.splice(index, 1); // 2nd parameter means remove one item only
            //     }

            // } else {
            //     this.isClick.push(y)
            // }
        },
        getColor(obj, index) {
            obj.color = this.defaultColors[index]
            return obj
        }
    },
    computed: {
        my_center(){
        let width = screen.width;
        let xn = (width-331) / 2
        return xn + "px"
      }
    },

}
</script>



<style scoped>
.btn-container8{
    margin-left:4%;
    margin-right:4%;
    padding-bottom: 20px;
    text-align: -webkit-right;
   }
   @media only screen and (max-width: 780px) {
  .btn-container8 {
    margin-left:v-bind('my_center');
    margin-right:v-bind('my_center');
    padding-bottom: 20px;
    text-align: -webkit-right;


}
}

/* @media only screen and (max-width: 780px) {
    .btn-container {
        margin-left: v-bind('my_center');
        margin-right: v-bind('my_center');
        padding-bottom: 20px;


    }
} */

:deep() .v-btn:not(.v-btn--round).v-size--default {
    padding-right: 8px;
}

.btn-span-graph {
    text-align: -webkit-right;
    margin-right: 4px;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 68px;
    white-space: nowrap;
    font-size: 14px;
    letter-spacing: 0;

}

.main-btn {
    font-family: almoni;
    margin: 8px;
    justify-content: right;
    overflow: hidden;
    border-radius: 6px;
    width: 102px !important;
    box-shadow: 0px 0px !important;
    /* box-shadow: 2px 2px 2px rgba(148, 148, 148, 0.427) !important; */
    box-shadow : v-bind('getCurrentTheme.barr_boxx_shadow') !important;

    /* text-align: -webkit-right;
         */
}

.main-btn::before {
    display: none;
}
</style>