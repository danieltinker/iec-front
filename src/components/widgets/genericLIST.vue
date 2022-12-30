<!-- eslint-disable -->
<template>
    <div style="margin-top:10px">
        <div class="LISTcontainer" dir="rtl">
            <!-- start -->
            <v-data-table ref="tttt" id="mytable" style="width:100%" :headers="headers" :items="activeData"
                mobile-breakpoint="0" :show-expand="false" calculate-widths 
                :items-per-page="5"
                :hide-default-footer="activeData.length > 5 ? false : true"
                disable-filtering 
                :disable-pagination="activeData.length > 5 ? false : true"
                :footer-props="{
                    showFooterBorder: false,
                    showFirstLastPage: false,
                    firstIcon: 'mdi-arrow-collapse-left',
                    lastIcon: 'mdi-arrow-collapse-right',
                    prevIcon: 'mdi-arrow-right-thin',
                    nextIcon: 'mdi-arrow-left-thin',
                    'items-per-page-text':'שורות'
                }"
                :group-by="props_object.params.group_by ? 'category' : null" sort-by=""
                :header-props="{ showHeaderBorder: false }"
                :show-rows-border="false" class="elevation-1" dir="rtl">
                <template v-slot:group.header="{ items }">
                    <td :colspan="headers.length" class="list-total" style="height:30px">
                        <strong>{{ items[0].category.charAt(1) == '-' ?
                                items[0].category.split('-')[1] : items[0].category
                        }}</strong>
                        <!-- <hr>
                                          <strong>{{ items[0].category }}</strong> -->
                    </td>

                </template>

                <template v-slot:[`footer.page-text`]="items" dir="rtl"> 
  {{ items.pageStart }} - {{ items.pageStop }} &nbsp;מ&nbsp;-&nbsp; {{ items.itemsLength }}
</template>

                <template v-slot:item="{item, index}">
                    <tr>
                        <td v-for="(header, i) in headers" :key="i" :align="header.align" :style="[isBold.includes(header.value) ? {'color':'red'}:{'color':''},activeData[index]['isSum'] ? {'background-color':getCurrentTheme.list_data.total_color}:'']">
                            
                            <!-- <strong @click="overScrollWidth(index,item[header.value])"
                        v-if="typeof item[header.value] == 'string' && item[header.value].split('*-*')[0] == 'dot'" :key="i"
                        class="dot" :style="'background-color:' + item[header.value].split('*-*')[1]">
                    </strong> -->
                    <v-icon v-if="object_condition_icons(item[header.value])" class="my-2" :color="getCurrentTheme.hq_navbar.span_color_first" style="font-size: 30px; justify-content: right;">{{item[header.value]['icon']}}</v-icon>
                    <v-icon v-else-if="object_condition_color(item[header.value])" @click="overScrollWidth(header,index,item[header.value], $event)"  class="my-2" :color="item[header.value]['color']" style="font-size: 30px;    margin: 0px !important;">mdi-circle-medium</v-icon>

                    <!-- <strong v-else-if="object_condition_color(item[header.value])"
                    @click="overScrollWidth(header,index,item[header.value], $event)" 
                    class="dot" :style="'background-color:' + item[header.value]['color']"></strong> -->


                    <strong @click="overScrollWidth(header,index,item[header.value], $event)"
                        v-else-if="typeof item[header.value] == 'string'" :key="i + header">
                        {{ item[header.value] }}</strong>
                    <strong v-else :key="header + i">{{ item[header.value] }}</strong>
                                 
                                  
                            
                            
                            </td>
                    </tr>
                </template>


                <!-- <template v-for="(slot, i) in headers" v-slot:[`item.${slot.value}`]="{ item }">
                    <strong @click="overScrollWidth(item[slot.value])"
                        v-if="typeof item[slot.value] == 'string' && item[slot.value].split('*-*')[0] == 'dot'" :key="i"
                        class="dot" :style="'background-color:' + item[slot.value].split('*-*')[1]">
                    </strong>
                    <strong @click="overScrollWidth(item[slot.value], $event)"
                        v-else-if="typeof item[slot.value] == 'string'" :key="i + slot">
                        {{ item[slot.value] }}</strong>
                    <strong v-else :key="slot + i">{{ item[slot.value] }}</strong>
                </template> -->
                <template v-slot:body.append v-if="totalGet.length > 0">
                    <tr>
                        <td v-for="(item, i) in headers" :key="i" class="list-total" style="height:30px;">
                            <span v-if="i == 0 && !totalGet.includes(item.value)">סה"כ</span>
                            <div v-else>
                                <span v-if="totalGet.includes(item.value)"
                                    @click="overScrollWidth(item,i,sumField(item.value).toFixed(1), $event)"> {{
                                            sumField(item.value).toFixed(1)
                                    }} </span>
                                <span v-else> </span>
                            </div>
                        </td>

                    </tr>

                </template>

                <template slot="no-data">
                    {{ props_object.params.no_data ? props_object.params.no_data : "אין פריטים להצגה" }}
                </template>

            </v-data-table>


            <!-- end -->
        </div>


        <div v-if="props_object.params.bottom_text" dir="ltr" class="updateDate">
            <p>{{ props_object.params.bottom_text.substring(0, 5) == '$meta' ?
                props_object.meta_data[props_object.params.bottom_text.substring(6)] : props_object.params.bottom_text
            }}</p>
        </div>


        <CardPopup ref="cardPop" :myItem="cardData" />

    </div>
</template>

<script>
import CardPopup from './genericList/cardPopup.vue';
export default {
    props: ["activeData", "props_object"],
    data() {
        return {
            cardData: '',
            colortest: "green",
            meta_data: null,
            headers: undefined,
            totalGet: undefined,
            isIntersection:[],
            isBold:[]
        }
    },
    components: {
        CardPopup,
    },
    methods: {
        overScrollWidth(header,index,item, e) {
            console.log("index : ",index," | item : ",item," | object : ",header," | e : ",e);
            if(this.isIntersection.includes(header.value)){
                this.$emit('BoxClick',index)
            }
            else{
                if (e.path[1].offsetWidth < e.path[1].scrollWidth) {
                this.$refs.cardPop.dialog = true
                this.cardData = item
            }
            }
        },
        sumField(key) {
            // sum data in give key (property)
            return this.props_object.jsonData[this.props_object.params.selected_category][0].reduce((a, b) => a + (b[key] || 0), 0);
        },
        object_condition_color(item){
            return item ? typeof item == 'object' && Object.prototype.hasOwnProperty.call(item, 'color') : false
        },
        object_condition_icons(item){
        return item ? typeof item == 'object' && Object.prototype.hasOwnProperty.call(item, 'icon') : false
        }
        
    },
    computed: {},
    created() {
        this.headers = this.props_object.params.headers
        this.totalGet = this.props_object.params.totalGet
    }
}
</script>

<style scoped>



:deep() .v-data-footer * {
    color: v-bind('getCurrentTheme.drill_title_color');
}

.updateDate {
    font-family: almoni-medium;
    font-size: 16px;
    text-align: center;
    color: v-bind('getCurrentTheme.list_data.font_color')
}

#mytable :deep() .v-data-table-header {
    height: 24px !important;
}

:deep() .v-data-table>.v-data-table__wrapper>table>tbody>tr>td,
.v-data-table>.v-data-table__wrapper>table>tbody>tr>th,
.v-data-table>.v-data-table__wrapper>table>thead>tr>td,
.v-data-table>.v-data-table__wrapper>table>thead>tr>th,
.v-data-table>.v-data-table__wrapper>table>tfoot>tr>td,
.v-data-table {


    border-radius: 0 0 0 0 !important;
    box-shadow: 0px 0px !important
}

#mytable :deep() .v-data-table-header tr th {
    height: 24px !important;
    padding-left: 0px;
    padding-right: 8px;
}

.list-total {
    font-family: almoni-bold !important;
    font-size: 16px !important;
    background-color: v-bind('getCurrentTheme.list_data.total_color');
    padding: 0px !important;

}

:deep() .v-data-table>.v-data-table__wrapper>table {
    table-layout: fixed;
    width: 100% !important;
    border-spacing: 0;
}

:deep() .v-data-table>.v-data-table__wrapper>table>tbody>tr>td,
.v-data-table>.v-data-table__wrapper>table>tbody>tr>th,
.v-data-table>.v-data-table__wrapper>table>thead>tr>td,
.v-data-table>.v-data-table__wrapper>table>thead>tr>th,
.v-data-table>.v-data-table__wrapper>table>tfoot>tr>td,
.v-data-table>.v-data-table__wrapper>table>tfoot>tr>th {
    /* padding: 0 0px;
    padding-right: 5px; */
    /* word-wrap: break-word; */
    background-color: "#F7F7F9";
    text-overflow: ellipsis;
    height: 40px;
    overflow: hidden;
    white-space: nowrap;
    transition: height 0.2s cubic-bezier(0.4, 0, 0.6, 1);
}

:deep() .v-data-table>.v-data-table__wrapper>table>tbody>tr>td,
.v-data-table>.v-data-table__wrapper>table>tbody>tr>th,
.v-data-table>.v-data-table__wrapper>table>thead>tr>td,
.v-data-table>.v-data-table__wrapper>table>thead>tr>th,
.v-data-table>.v-data-table__wrapper>table>tfoot>tr>td,
.v-data-table>.v-data-table__wrapper>table>tfoot>tr {
    font-size: 14px;
    font-family: almoni-light;
    color: v-bind('getCurrentTheme.list_data.font_color');
    padding-left: 0px;
    padding-right: 8px;

}

:deep() .theme--light.v-data-table>.v-data-table__wrapper>table>tbody>tr:not(:last-child)>td:not(.v-data-table__mobile-row),
.theme--light.v-data-table>.v-data-table__wrapper>table>tbody>tr:not(:last-child)>th:not(.v-data-table__mobile-row) {
    border-bottom: 4px solid v-bind('getCurrentTheme.list_data.border_color');
}

/* #mytable tbody td {
    font-size: 20px !important;
} */

.v-data-table:deep() th {
    font-size: 15px !important;
    color: white !important
}

/* .mytable tbody tr:hover > .sorting_1 {
  background-color: #ffa;
} */

#mytable {
    /* pointer-events: none; */
    background-color: v-bind('getCurrentTheme.list_data.background_color');
}


:deep() .v-data-table-header {
    background-color: v-bind('getCurrentTheme.global_theme_color');
    font-family: almoni;
    font-size: 222px !important;
    height: 4px !important;
}

#mytable :deep() tr:hover {
    background: inherit !important;
}

#mytable :deep() th:hover {
    background: inherit !important;
}

:deep() .v-icon {
    /* display: none; */
}

:deep() .ma-0 {
    display: none;
}


.dot {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    display: flex;
    margin: 2%;
    direction: rtl;
}

.flex-center {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.LISTcontainer {
    display: grid;
    grid-template-columns: auto auto;
    row-gap: 10px;
    column-gap: 10px;
    justify-content: center;
    padding-bottom: 20px;
    margin-right: 2% !important;
}

#chartsHeaders {
    font-family: almoni-medium;
    font-size: 18px;
    color: v-bind('getCurrentTheme.generic_title_color');
    /* margin-bottom: 18px; */
}


/* :deep() .v-data-footer .v-icon {
    color:white !important
} */

/* :deep() .v-input--selection-controls__ripple {
    height: 0px;
}

:deep() .v-input--selection-controls__input .v-icon {
    color: v-bind('getCurrentTheme.global_radio');
}

:deep() .v-input--selection-controls .v-radio>.v-label {
    color: v-bind('getCurrentTheme.drill_title_color');
    margin-right: 6px;
}

:deep() .v-input--radio-group.v-input--radio-group--row .v-radio {
    margin-right: 0px !important;
} */

/* .kpi-box {
    padding-top: 4px;
    text-align: center;
    align-items: center;
    width: 165px;
    height: 80px;
    border-radius: 4px;
} */

/* .kpi-box span:first-child{
    font-family: almoni;
    font-size: 20px;
    line-height: 30px;
} */

/* .loader {
    height: 400px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
} */

/* .v-progress-circular {
    padding: 40px;
} */

/* .kpi-box span {
    display: inline-block;
    font-size: 16px;
    font-family: almoni-demibold;
    color: #a8699d;
} */

/* .kpi-box .kpi-sec-value {
    color: #606060
} */



/* .clock-drilldown {
    background-color: #E5E5E5;
    padding-bottom: 20px;
}

.drilldown-title {
    padding-top: 16px;
    color: v-bind('getCurrentTheme.drill_title_color');
    font-size: 24px;
    text-align: center;
    font-family: almoni;
} */

/* .kpi-box span {
    display: inline-block;
    font-size: 18px;
    font-family: almoni-demibold;
    color: #a8699d;
} */

/* .clock-drilldown {
    background-color: #E5E5E5;
    padding-bottom: 20px;
}

.carousel-flex {
    display: flex;
    flex-direction: column;
}

.carousel-flex :deep() .v-window__next {
    background-color: transparent !important;
    color: transparent !important;
    top: 40% !important;
} */

/* .carousel-flex :deep() .v-window__prev {
    background-color: transparent !important;
    color: transparent !important;
    top: 40% !important;
}

.radio-btn {
    display: inline-block !important;
    ;
} */
</style>