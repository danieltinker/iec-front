<template>
    <div>
        <div v-if="doneFetching">
            {{colorTheme}}
            <v-btn @click="testttt">fsafds</v-btn>
            LIST
        <div class="clock-main" style="text-align: center;margin-left:10px;margin-right:10px" v-if="params.show_clock">
            <v-data-table ref="tttt" id="mytable" style="width:100%"
        :headers="headers"
        :items="dataseet"
        mobile-breakpoint="0"
        :show-expand="false"
        :items-per-page="100"
        calculate-widths
        hide-default-footer
        group-by="category"
        :footer-props="{showFooterBorder: false}"
        :header-props="{showHeaderBorder: false}"
        :show-rows-border="false"
        
 

        class="elevation-1"
        disable-filtering
        disable-pagination
        
        dir="rtl"
      >
      <template v-slot:group.header="{ items }">
      <td  :colspan="titleTest.length" class="text-start text-xs-right" style="padding-right:30px;background-color:blue">
        <strong>{{ items[0].category }}</strong>
        <!-- <hr>
        <strong>{{ items[0].category }}</strong> -->
      </td>
      
    </template>

    

    
    <template v-for="(slot,i) in titleTest" v-slot:[`item.${slot}`]="{ item }">
    <strong  @click="testttt(item[slot])" v-if="typeof item[slot] == 'string' && item[slot].split('-')[0] == 'dot'" :key="i" class="dot" :style="'background-color:' + item[slot].split('-')[1]">   </strong>
    <strong  @click="testttt(item[slot],$event)" v-else-if="typeof item[slot] == 'string'" :key="i">    {{item[slot]}}</strong>
    <strong  @click="testttt(item[slot])" v-else-if="item[slot].toString().length > 22" :key="i">{{item[slot].toString()}}</strong>
    <strong v-else :key="i">{{item[slot]}}</strong>
<!-- 
    <strong v-if="item[slot].toString().length < 8" :key="i">{{ item[slot] }}</strong>
    <strong v-else :key="i">{{item[slot].toString().substring(0, 8) + ".."}}</strong> -->
</template>

<template slot="body.append">
    <tr>
        <th>150</th>
        <th>260</th> 
        <th>150</th>
        <th>260</th>
    </tr>
</template>


<template v-slot:body.append="{headers}">
    <tr>
        <td v-for="(header,i) in headers" :key="i">

            <div v-if="header.value == 'carbs'">
                22
            </div>

            <div v-if="header.value == 'field2'">
                {{field2Total}}
            </div>

            <div v-else>
                <!-- empty table cells for columns that don't need a sum -->
            </div>

        </td>
    </tr>
</template>



<template v-slot:footer>
    <div v-for="(item,i) in titleTest" :key="i">

<tr v-if="totalGet.includes(item)" style="display:inline-block;vertical-align: top;margin-left:14px">
    <v-container class="px-0" fluid>
    <td v-if="totalGet.includes(item)" colspan="4" style="padding-left:5px">סה"כ</td>
      <td>
        <span v-if="totalGet.includes(item)">{{ sumField(item).toFixed(2)}}</span>
      </td>
    </v-container>
    </tr>
</div>
  </template>
  
  
<template v-slot:body.append>
    <tr class="pink--text">
        <!-- <td v-for="item in titleTest" :key="item">
            <span v-if="totalGet.includes(item)">{{ sumField(item).toFixed(2).toString().substring(0, 8) + ".." }}</span>
        </td> -->
                        <td v-for="item in titleTest" :key="item" class="">
                            <span v-if="totalGet.includes(item)"> {{ sumField(item).toFixed(2)}} </span>
                            <span v-else>  </span></td>
                        
                    </tr>
                    
  </template>

    


    
      
      </v-data-table>

           </div>
    </div>
    <div class="loader" v-else>
        <div class="loader" v-if="!isErrorMsg">
            <v-progress-circular
            indeterminate
            color="purple"
            ></v-progress-circular>
        </div>
        <h1 v-else>  {{errorMSG}} </h1>
    </div>  



    <CardPopup ref="cardPop" :myItem="cardData"/>

</div>
</template>

<script>
import CardPopup from './genericList/cardPopup.vue';
export default {
    // name:"basicKPI",
    props: {
        isDrillDown: { type: Boolean },
        drillDataProp: { type: Object, default: () => { } },
        params: { type: Object, required: false },
        view_ID: { type: Number },
        parentsParam: { type: Object }
    },
    mounted() {
        // console.log(this.$refs.tttt, "Dddddddddddddd");
        // console.log(this.headers.at(-1), "header");
        // for (let item in this.headers) {
        //     this.headers[item]["align"] = "center";
        //     console.log(this.headers[item], "item");
        // }
        // this.headers.at(-1)["align"] = "cetner";
        // this.headers.at(0)["align"] = "center";
    },
    watch: {
        drillDataProp() {
            this.jsonData = this.drillDataProp;
        }
    },
    data() {
        return {
            cardData:'',
            colortest: "green",
            //titleTest: ["name", "calories", "fat", "carbs"],
            titleTest: ["name", "calories", "fat"],
            activeTitle: 0,
            activeIndex: -1,
            succ_req: true,
            clicked_index: undefined,
            errorMSG: "",
            carouselActiveIndex: 0,
            carouselIndex: 0,
            drilldownData: [],
            jsonData: [],
            doneFetching: false,
            static_drill_data: {},
            headers: [
                {
                    text: "name",
                    align: "start",
                    sortable: false,
                    value: "name",width:'50%'
                },
                { text: "calories", value: "calories", sortable: false,align: "center",},
                { text: "fat", value: "fat", sortable: false,align: "center"},
                // { text: "carbs", value: "carbs", sortable: false},
                
            ],
            totalGet: ["fat","calories"],
            dataseet: [
                {
                    name: "1",
                    calories: 1,
                    fat: 6,
                    carbs: 24,
                    category: "באחאח",
                },
                {
                    name: "2",
                    calories: 237,
                    fat: 9,
                    carbs: 37,
                    category: "באחאח",
                },
                {
                    name: "dot-green",
                    calories: 262,
                    fat: 16,
                    carbs: 23,
                    category: "test",
                },
                {
                    name: "ggggggggggggggggggg",
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    category: "test",
                },
                {
                    name: "gggggggggggggggggggggggggg    ",
                    calories: 1,
                    fat: 1,
                    carbs: 1,
                    category: "test",
                },
                {
                    name: "6",
                    calories: 375,
                    fat: 0,
                    carbs: 94,
                    category: "test",
                },
                {
                    name: "7",
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    category: "test2",
                },
                {
                    name: "8",
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    category: "test2",
                },
            ]
        };
    },
    methods: {
        test() {
            console.log("hehehe");
        },
        testttt(item,e) {
            let inputText = item;
            let font = "16px Roberto";
  
            let canvas = document.createElement("canvas");
            let context = canvas.getContext("2d");
            context.font = font;
            let width = context.measureText(inputText).width +4;
            let formattedWidth = Math.ceil(width) + "px";
            console.log(formattedWidth);
            // if(width > e.path[1].clientWidth){
            //     this.$refs.cardPop.dialog = true
            // this.cardData = item

            // }

            if(e.path[1].offsetWidth < e.path[1].scrollWidth){
                this.$refs.cardPop.dialog = true
            this.cardData = item

            }
            console.log(e);
            console.log(e.path[1].clientWidth);
            console.log(item, "Dddddddddddddd");
        },
        sumField(key) {
            console.log(key,"kkkkkkkk1kkk");
            // sum data in give key (property)
            return this.dataseet.reduce((a, b) => a + (b[key] || 0), 0);
        }
    },
    computed: {
        isErrorMsg() {
            return this.errorMSG.length !== 0;
        },
        colorTheme() {
            return this.$store.getters.currentTheme.theme == "darkTheme" ? "blue" : "#646464";
        }
    },
    async created() {
        if (!this.isDrillDown) {
            if (this.succ_req) {
                await this.$myApi(this.params.drill_down_params.data_url)
                    .then(response => {
                    console.log(response.data);
                    this.drilldownData = response.data;
                    this.errorMSG = "";
                    if (this.params.data_category == undefined || this.params.selected_category == undefined) {
                        console.log("radio btns config failed fix data_category, selected category");
                        this.errorMSG = "אין מידע";
                    }
                    // do sth ...
                })
                    .catch(error => {
                    console.log(error, "drill DATA FETCH ERROR");
                    this.errorMSG = "אין מידע";
                });
            }
        }
        else {
            this.jsonData = this.drillDataProp;
        }
        //  flag used to render the charts syncronously only after data is ready
        if (this.errorMSG.length === 0) {
            this.doneFetching = true;
        }
    },
    components: { CardPopup }
}
</script>

<style scoped>
::v-deep .v-data-table > .v-data-table__wrapper > table {
    table-layout: fixed;
  width: 100% !important;  
    border-spacing: 0;
}
:global(:root) {
    --accent-color: {{colortest}};
}
/* .v-data-table td {
    border-bottom: none !important;
    background: transparent !important;
    background-color: transparent !important;
} */
::v-deep .v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
    padding: 0 0px;
    padding-right: 5px;
    /* word-wrap: break-word; */
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
    transition: height 0.2s cubic-bezier(0.4, 0, 0.6, 1);
}



::v-deep .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: 4px solid white;
}
#mytable tbody td {
    font-size: 20px !important;
}

.v-data-table::v-deep th {
  font-size: 15px !important;
  color:white !important
}
/* .mytable tbody tr:hover > .sorting_1 {
  background-color: #ffa;
} */
#mytable{
    /* pointer-events: none; */
    background-color: #F9F9F9;
}


::v-deep .v-data-table-header {
  background-color:  v-bind('colorTheme')
}
#mytable >>> tr:hover {
    background: inherit !important;
}

#mytable >>> th:hover {
    background: inherit !important;
}
/* ::v-deep tr:hover{ cursor: pointer;background-color: green; } */
/* ::v-deep th:hover{ cursor: pointer;background-color: green; } */
/* ::v-deep td:hover{ background-color:  transparent !important; } */
/* .v-table tr:hover:not(.v-table__expanded__content) {
  background: red !important;
  background-color: green  !important;
}
.row-pointer >>> tbody tr:not(.v-data-table__expanded__content) :hover {
 cursor: pointer;
 background-color: green  !important;
} */
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.KPIcontainer{
    display: grid;
    grid-template-columns: auto auto;
    row-gap: 10px;
    column-gap: 10px;
    justify-content: center;
    padding-bottom: 20px;
}
.kpi-box{
    padding-top: 4px;
    text-align: center;
    align-items: center;
    width: 165px;
    height: 80px;
    border-radius: 4px;
}
/* .kpi-box span:first-child{
    font-family: almoni;
    font-size: 20px;
    line-height: 30px;
} */

.loader{
    height: 400px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
}
.v-progress-circular{
    padding:40px;
}
.kpi-box span{
    display: inline-block;
    font-size: 16px;
    font-family: almoni-demibold;
    color: #a8699d;
}
.kpi-box .kpi-sec-value{
    color:#606060
}
#chartsHeaders {
    font-family: almoni;
    font-size: 16px;
    color: #606060;
    /* margin-bottom: 18px; */
}

.clock-drilldown{
    background-color: #E5E5E5;
    padding-bottom: 20px;
}

.drilldown-title{
    color:#606060;
    text-align: center;
}

.kpi-box span{
    display: inline-block;
    font-size: 18px;
    font-family: almoni-demibold;
    color: #a8699d;
}

.clock-drilldown{
    background-color: #E5E5E5;
    padding-bottom: 20px;
}

.carousel-flex {
  display: flex;
  flex-direction: column;
}

.carousel-flex >>> .v-window__next {
  background-color: transparent !important;
  color: transparent !important;
  top: 40% !important;
}
.carousel-flex >>> .v-window__prev {
  background-color: transparent !important;
  color: transparent !important;
  top:40% !important;
}
.radio-btn{
    display: inline-block !important;;
}

::v-deep .v-icon{
    display: none;
}

::v-deep .ma-0{
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
</style>