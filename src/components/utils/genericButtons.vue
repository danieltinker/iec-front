<template>
    <div class="btn-container">
            <v-row dir="rtl" style="place-content:right;display: inline-flex;">
                <v-btn class="main-btn" :ripple="false" v-for="(btnName, index) in activeData" :key="index"
                    :style="{ backgroundColor: props_object.isDrillDown ? getCurrentTheme.baseGenericPie.btn_color_drill : getCurrentTheme.baseGenericPie.btn_color, border: props_object.activeIndex == index ? getCurrentTheme.legend_border_color : ' solid black 0px' }"
                    @click="$emit('BoxClick',index)">
                    <span class="dot"
                        :style="{ backgroundColor: btnName.color ? btnName.color : getColor(btnName, index).color }"></span>
                    <span class="btn-span" :style="'color:' + getCurrentTheme.baseGenericPie.span_color">
                        {{ btnName.label }}
                    </span>
                </v-btn>
            </v-row>

            <v-row dir="rtl" style="place-content:center;display: inline-flex;"
                v-if="!props_object.params.data_intersection && !props_object.params.click_open_drill_enabled">
                <div v-for="(btnName, index) in activeData" :key="index" class="labels">
                    <span class="dot" style="margin-left:5px"
                        :style="{ backgroundColor: btnName.color ? btnName.color : getColor(btnName, index).color }"></span>
                    <span :style="'color:' + getCurrentTheme.baseGenericPie.span_color" style="margin-left:5px">
                        {{ btnName.label }}
                    </span>
                </div>
            </v-row>
        </div>
</template>